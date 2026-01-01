import { useEffect, useRef } from 'react';

interface PlayableCellProps {
  value?: number;
  isSelected: boolean;
  isError: boolean;
  isLocked: boolean;
  onClick: () => void;
  onChange: (value: number | undefined) => void;
}

export default function PlayableCell({
  value,
  isSelected,
  isError,
  isLocked,
  onClick,
  onChange,
}: PlayableCellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers 1-9 and backspace/delete
    if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange(undefined);
      e.preventDefault();
    } else if (e.key >= '1' && e.key <= '9') {
      onChange(parseInt(e.key));
      e.preventDefault();
    } else if (e.key === '0' || e.key === ' ') {
      onChange(undefined);
      e.preventDefault();
    }
  };

  const bgColor = isError
    ? 'bg-red-100 dark:bg-red-900/30'
    : isSelected
    ? 'bg-blue-100 dark:bg-blue-900/40'
    : 'bg-white dark:bg-gray-800';

  const textColor = isError
    ? 'text-red-700 dark:text-red-300'
    : isLocked
    ? 'text-gray-500 dark:text-gray-400'
    : 'text-gray-900 dark:text-gray-100';

  const borderColor = isSelected
    ? 'border-blue-500 dark:border-blue-400 border-2'
    : 'border-gray-400 dark:border-gray-600';

  return (
    <div
      className={`relative w-12 h-12 ${bgColor} ${borderColor} transition-all duration-150 cursor-pointer hover:shadow-lg`}
      onClick={onClick}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[1-9]"
        maxLength={1}
        value={value || ''}
        readOnly={isLocked}
        onKeyDown={handleKeyDown}
        onChange={() => {}} // Controlled by onKeyDown
        className={`w-full h-full text-center text-xl font-bold ${textColor} bg-transparent outline-none cursor-pointer ${
          isLocked ? 'cursor-not-allowed' : ''
        }`}
        tabIndex={-1}
      />
    </div>
  );
}
