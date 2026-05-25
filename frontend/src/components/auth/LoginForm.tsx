"use client";

import Link from "next/link";
import { Eye, Mail, LockKeyhole } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm () {
  const [ showPassword, setShowPassword ] = useState( false );

  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
          Email address
        </label>

        <div className="relative">
          <Mail
            size={ 18 }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="email"
            placeholder="you@example.com"
            className="pl-11"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={ 18 }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input
            type={ showPassword ? "text" : "password" }
            placeholder="••••••••"
            className="pl-11 pr-12"
          />

          <button
            type="button"
            onClick={ () => setShowPassword( !showPassword ) }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-white"
          >
            <Eye size={ 18 } />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-sm font-bold text-blue-600 transition hover:text-blue-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full py-3">
        Log in
      </Button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="text-sm font-semibold text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:scale-[1.01] hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        <span className="text-xl font-black text-red-500">G</span>
        Continue with Google
      </button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{ " " }
        <Link href="/register" className="font-bold text-blue-600">
          Sign up
        </Link>
      </p>
    </form>
  );
}