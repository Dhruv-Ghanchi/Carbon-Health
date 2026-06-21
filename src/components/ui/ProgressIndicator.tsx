import { cn } from '../../utils/cn';

interface ProgressIndicatorProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  className?: string;
  colorClass?: string;
}

export function ProgressIndicator({ value, max = 100, label, className, colorClass = "bg-carbon-500" }: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className={cn("h-2.5 rounded-full transition-all duration-500 ease-out", colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
