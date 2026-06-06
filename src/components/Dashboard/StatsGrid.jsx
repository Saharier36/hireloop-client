import { StatCard } from "./StatCard";

// The Data-Driven Grid Shell
export default function StatsGrid({ statsData = [] }) {
  if (!statsData || statsData.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}
