import clsx from 'clsx';
import { AiOutlineCheck } from 'react-icons/ai';

type SwatchProps = {
  color: string;
  value: string;
  active: boolean;
  setSelectedOptions(): void;
};
export default function Swatch({ setSelectedOptions, value, color, active }: SwatchProps) {
  return (
    <button
      type="button"
      onClick={setSelectedOptions}
      className={clsx(`flex justify-center items-center uppercase tracking-wide border-2 border-light-400`, {
        'h-8 w-8 rounded-full p-5': color,
        'text-sm text-gray-900 w-16 h-16 p-8 rounded-lg': !color,
        '!border-amber-500 text-amber-500 font-bold': active,
      })}
      style={{ backgroundColor: color }}
    >
      {color && active && (
        <span className="flex justify-center items-center">
          <AiOutlineCheck className="text-amber-500" size="24px" />
        </span>
      )}
      {!color ? value : null}
    </button>
  );
}
