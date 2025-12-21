interface HintDisplayProps {
  hints: number[];
  orientation: 'row' | 'col';
}

export default function HintDisplay({ hints, orientation }: HintDisplayProps) {
  return (
    <div
      className={`
        flex items-center justify-end gap-1 px-2
        ${orientation === 'row' ? 'flex-row' : 'flex-col'}
        text-sm font-mono text-slate-300
      `}
    >
      {hints.map((hint, index) => (
        <span
          key={index}
          className="font-semibold bg-slate-700/50 px-1.5 py-0.5 rounded"
        >
          {hint}
        </span>
      ))}
    </div>
  );
}
