interface ProgressBarProps {
  value: number;
  goal: number;
}

export function ProgressBar({ value, goal }: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / goal) * 100), 100);

  return (
    <div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="eyebrow">{percentage}% of goal reached</p>
    </div>
  );
}
