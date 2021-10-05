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
    <>
      <button
        type="button"
        onClick={setSelectedOptions}
        className={clsx(`shadow-lg text-white h-8 w-8 bg-dark-100 flex justify-center items-center uppercase tracking-wide p-5 rounded-full border-2 border-transparent`, {
          'border-amber-500 text-amber-500': active,
          'bg-gray-800': !color,
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
    </>
  );
}
