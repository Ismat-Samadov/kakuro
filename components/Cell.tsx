import { CellState } from '@/lib/types';

interface CellProps {
  state: CellState;
  isSelected: boolean;
  onClick: () => void;
}

export default function Cell({ state, isSelected, onClick }: CellProps) {
  const getBackgroundColor = () => {
    if (state === 'filled') return 'bg-blue-500';
    if (state === 'marked') return 'bg-slate-700';
    return 'bg-slate-800';
  };

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square w-full relative
        ${getBackgroundColor()}
        ${isSelected ? 'ring-4 ring-yellow-400' : 'ring-1 ring-slate-600'}
        hover:ring-2 hover:ring-yellow-300
        transition-all duration-150
        focus:outline-none
      `}
      tabIndex={-1}
    >
      {state === 'marked' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-3/4 h-3/4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
