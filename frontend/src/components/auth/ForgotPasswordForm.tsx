"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForgotPasswordForm () {
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

      <Button type="submit" className="w-full py-3">
        Send Reset Link
      </Button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Remember your password?{ " " }
        <Link href="/login" className="font-bold text-blue-600">
          Back to Login
        </Link>
      </p>
    </form>
  );
}