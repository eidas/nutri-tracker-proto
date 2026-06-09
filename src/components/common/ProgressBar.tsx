interface Props {
  value: number;
  max: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({ value, max, color = 'bg-emerald-500', label, showValue = true }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  const over = value > max;
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-600">{label}</span>
          <span className={over ? 'text-red-500 font-semibold' : 'text-slate-700'}>
            {value} / {max}
          </span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all ${over ? 'bg-red-500' : color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
