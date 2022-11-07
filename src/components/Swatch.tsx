import clsx from 'clsx';

type SwatchProps = {
  color: string;
  value: string;
  active: boolean;
  optionName: string;
  setSelectedOptions(): void;
};
export default function Swatch({ setSelectedOptions, value, color, active, optionName }: SwatchProps) {
  return (
    <button
      tabIndex={0}
      type="button"
      onClick={setSelectedOptions}
      className={clsx(`flex justify-center items-center uppercase tracking-wide border-2 border-light-400`, {
        'h-8 w-8 rounded-full p-5': color,
        'text-sm text-gray-900 w-16 h-16 p-8 rounded-lg': !color,
        '!border-amber-500 text-amber-500 font-bold': active,
      })}
      style={{ backgroundColor: color }}
      aria-label={`${optionName} ${value}`}
    >
      {color && active && (
        <span className="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
      )}
      {!color ? value : null}
    </button>
  );
}
