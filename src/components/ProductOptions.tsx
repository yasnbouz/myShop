import { Product } from '@/services/shopify/generated/types';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

import type { SelectedOptions } from './ProductContent';
import Swatch from './Swatch';

extend([namesPlugin]);

type ProductOptionsProps = {
  product: Product;
  selectedOptions: SelectedOptions;
  setSelectedOptions(name: string, value: string): void;
};

export default function ProductOptions({ product, selectedOptions, setSelectedOptions }: ProductOptionsProps) {
  return (
    <div>
      {product.options.map((o) => (
        <div key={o.id}>
          <h2 className="uppercase">{o.name}</h2>
          <menu className="flex flex-row flex-wrap gap-4">
            {o.values.map((value) => {
              const active = selectedOptions[o.name.toLowerCase()];
              const hasColor = o.name.toLowerCase() === `color`;
              const color = hasColor && colord(value.toLowerCase()).toHex();
              return (
                <li key={`${o.id}-${value}`}>
                  <Swatch value={value.toLowerCase()} color={color || ``} active={active === value.toLowerCase()} setSelectedOptions={() => setSelectedOptions(o.name, value)} />
                </li>
              );
            })}
          </menu>
        </div>
      ))}
    </div>
  );
}
