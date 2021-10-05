import { Product } from '@/services/shopify/generated/types';
import { Dispatch, SetStateAction } from 'react';
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
    <div className="space-y-8">
      {product.options.map((o) => (
        <div key={o.id}>
          <h2 className="text-lg uppercase text-gray-800 font-bold mb-4">{o.name}</h2>
          <div className="flex flex-row space-x-4">
            {o.values.map((value) => {
              const active = selectedOptions[o.name.toLowerCase()];
              const hasColor = o.name.toLowerCase() === `color`;
              const color = hasColor && colord(value.toLowerCase()).toHex();
              return (
                <Swatch
                  key={`${o.id}-${value}`}
                  value={value.toLowerCase()}
                  color={color || ``}
                  active={active === value.toLowerCase()}
                  setSelectedOptions={() => setSelectedOptions(o.name, value)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
