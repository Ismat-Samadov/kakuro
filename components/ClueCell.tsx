import { Clue } from '@/types/kakuro';

interface ClueCellProps {
  clue: Clue;
}

export default function ClueCell({ clue }: ClueCellProps) {
  return (
    <div className="relative w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
      {/* Diagonal line */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-600"
          />
        </svg>
      </div>

      {/* Down clue (top-right) */}
      {clue.down !== undefined && (
        <div className="absolute top-0.5 right-1 text-xs font-semibold text-gray-300">
          {clue.down}
        </div>
      )}

      {/* Across clue (bottom-left) */}
      {clue.across !== undefined && (
        <div className="absolute bottom-0.5 left-1 text-xs font-semibold text-gray-300">
          {clue.across}
        </div>
      )}
    </div>
  );
}
