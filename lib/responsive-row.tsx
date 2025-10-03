import { cn } from "./utils";

type ResponsiveRowProps = {
  children: React.ReactNode;
  className?: string;
  gridCols?: string;
};

export function ResponsiveRow({ children, className, gridCols }: ResponsiveRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        gridCols ?? "sm:grid-cols-[1fr_120px_80px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
