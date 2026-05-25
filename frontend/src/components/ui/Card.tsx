import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card ( {
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> ) {
  return (
    <div
      className={ cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900",
        className
      ) }
      { ...props }
    >
      { children }
    </div>
  );
}

export function CardHeader ( {
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> ) {
  return (
    <div className={ cn( "p-6 pb-3", className ) } { ...props }>
      { children }
    </div>
  );
}

export function CardContent ( {
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> ) {
  return (
    <div className={ cn( "p-6 pt-3", className ) } { ...props }>
      { children }
    </div>
  );
}