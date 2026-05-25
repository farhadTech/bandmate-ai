import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input ( { className, ...props }: InputProps ) {
  return (
    <input
      className={ cn(
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-blue-950",
        className
      ) }
      { ...props }
    />
  );
}