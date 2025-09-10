import { cn } from "@/lib/utils";
import { IconSalad } from "@tabler/icons-react";

const AppIcon = ({ className }: { className?: string }) => {
  return <IconSalad className={cn("text-slate-500", className)} />;
};

export default AppIcon;
