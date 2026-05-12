interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "red" | "blue" | "yellow";
}

export const StatCard = ({
  label,
  value,
  description,
  color = "blue",
}: StatCardProps) => {
  const colors = {
    blue: "border-blue-500 text-blue-600",
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
    yellow: "border-yellow-500 text-yellow-600",
  };

  return (
    <div
      className={`p-4 bg-white rounded-xl border-l-4 ${colors[color]}`}
    >
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
};
