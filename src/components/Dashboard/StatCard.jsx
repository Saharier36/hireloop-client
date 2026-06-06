import React from "react";
import { Card } from "@heroui/react";

// Individual Reusable Card Component matching HeroUI v3 anatomy
export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-zinc-400",
}) {
  return (
    <Card
      variant="default"
      className="border-none bg-zinc-900/50 backdrop-blur-md text-zinc-100 w-full"
    >
      <Card.Content className="p-2 flex flex-col gap-4 justify-between min-h-[60px]">
        {/* Icon Container */}
        <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center self-start">
          {Icon && <Icon className={`text-xl ${iconColor}`} />}
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-1">
          <Card.Description className="text-xs font-medium text-zinc-400 tracking-wide uppercase m-0">
            {title}
          </Card.Description>
          <Card.Title className="text-3xl font-bold tracking-tight text-white m-0">
            {value}
          </Card.Title>
        </div>
      </Card.Content>
    </Card>
  );
}

