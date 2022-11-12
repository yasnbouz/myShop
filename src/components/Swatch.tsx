import clsx from 'clsx';

type SwatchProps = {
  color: string;
  value: string;
  active: boolean;
  optionName: string;
  setSelectedOptions(): void;
};
export default function Swatch({ setSelectedOptions, value, color, active, optionName }: SwatchProps) {
  const className = clsx(`flex justify-center items-center uppercase tracking-wide border-2 border-light-400`, {
    'h-12 w-12 rounded-full p-1': color,
    'text-blue-gray-800 text-md w-16 h-16 rounded-lg': !color,
    '!border-amber-500 !text-amber-500 font-bold': active,
  });
  return (
    <button
      tabIndex={0}
      type="button"
      onClick={setSelectedOptions}
      title={value}
      className={className}
      style={color ? { backgroundColor: color } : {}}
      aria-label={`${optionName} ${value}`}
    >
      {color && active && (
        <span className="flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
      )}
      {!color ? value : null}
    </button>
  );
}
