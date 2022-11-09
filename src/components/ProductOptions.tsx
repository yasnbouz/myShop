import type { ProductOption } from '@/services/shopify/generated/types';
import type { ProductOptionsType } from '@/utils/helpers';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

import Swatch from './Swatch';

extend([namesPlugin]);

type ProductOptionsProps = {
  options: ProductOption[];
  selectedOptions: ProductOptionsType;
  setSelectedOptions(name: string, value: string): void;
};
export default function ProductOptions({ options, selectedOptions, setSelectedOptions }: ProductOptionsProps) {
  return (
    <div className="space-y-8">
      {options.map((option) => (
        <div key={option.id}>
          <strong className="inline-block text-blue-gray-600 uppercase font-bold pb-3">Select {option.name}</strong>
          <menu className="flex flex-row flex-wrap gap-3">
            {option.values.map((value) => {
              const active = selectedOptions[option.name.toLowerCase()];
              const hasColor = option.name.toLowerCase() === `color`;
              const color = hasColor && colord(value).toHex();
              return (
                <li key={`${option.id}-${value}`}>
                  <Swatch
                    optionName={option.name}
                    value={value}
                    color={color || ``}
                    active={active === value.toLowerCase()}
                    setSelectedOptions={() => setSelectedOptions(option.name, value)}
                  />
                </li>
              );
            })}
          </menu>
        </div>
      ))}
    </div>
  );
}
