import { ProductOption } from '@/services/shopify/generated/types';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

import type { SelectedOptions } from './ProductContent';
import Swatch from './Swatch';

extend([namesPlugin]);

type ProductOptionsProps = {
  options: ProductOption[];
  selectedOptions: SelectedOptions;
  setSelectedOptions(name: string, value: string): void;
};

export default function ProductOptions({ options, selectedOptions, setSelectedOptions }: ProductOptionsProps) {
  return (
    <div>
      {options.map((option) => (
        <div key={option.id}>
          <h2 className="uppercase">{option.name}</h2>
          <menu className="flex flex-row flex-wrap gap-4">
            {option.values.map((value) => {
              const active = selectedOptions[option.name.toLowerCase()];
              const hasColor = option.name.toLowerCase() === `color`;
              const color = hasColor && colord(value.toLowerCase()).toHex();
              return (
                <li key={`${option.id}-${value}`}>
                  <Swatch
                    optionName={option.name}
                    value={value.toLowerCase()}
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
