import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button ( {
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps ) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline:
      "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100 active:scale-[0.98] dark:border-slate-700 dark:text-white dark:hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 active:scale-[0.98] dark:text-slate-300 dark:hover:bg-slate-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
  };

  return (
    <button
      type={ type }
      className={ cn(
        "inline-flex cursor-pointer items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[ variant ],
        className
      ) }
      { ...props }
    >
      { children }
    </button>
  );
}