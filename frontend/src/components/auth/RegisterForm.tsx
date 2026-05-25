"use client";

import Link from "next/link";
import { Eye, Mail, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterForm () {
  const [ showPassword, setShowPassword ] = useState( false );

  return (
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
          Full name
        </label>

        <div className="relative">
          <User
            size={ 18 }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input placeholder="John Doe" className="pl-11" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
          Email address
        </label>

        <div className="relative">
          <Mail
            size={ 18 }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <Input type="email" placeholder="you@example.com" className="pl-11" />
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

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
          Target IELTS Band
        </label>

        <select className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950">
          <option>Select your target band</option>
          <option>6.0</option>
          <option>6.5</option>
          <option>7.0</option>
          <option>7.5</option>
          <option>8.0+</option>
        </select>
      </div>

      <Button type="submit" className="w-full py-3">
        Create account
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
        Sign up with Google
      </button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{ " " }
        <Link href="/login" className="font-bold text-blue-600">
          Log in
        </Link>
      </p>
    </form>
  );
}