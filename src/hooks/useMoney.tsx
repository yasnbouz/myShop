import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { MoneyV2 } from '@/services/shopify/generated/types';

function useLazyFormatter(locale: string, options?: Intl.NumberFormatOptions) {
  return useMemo(() => {
    let memoized: Intl.NumberFormat;
    // eslint-disable-next-line no-return-assign
    return () => (memoized ??= new Intl.NumberFormat(locale, options));
  }, [locale, options]);
}

export function useMoney(money: MoneyV2) {
  const { locale } = useRouter();
  if (!locale) {
    throw new Error(`useMoney(): Unable to get 'locale' from 'useRouter()'`);
  }
  const amount = parseFloat(money.amount);
  const options: Intl.NumberFormatOptions = useMemo(() => ({ style: `currency`, currency: money.currencyCode }), [money.currencyCode]);
  const defaultFormatter = useLazyFormatter(locale, { ...options, minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const localizedMoney = defaultFormatter().format(amount);
  return {
    localizedMoney,
    defaultFormatter,
  };
}
