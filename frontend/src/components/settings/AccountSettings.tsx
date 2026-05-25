"use client";

import { KeyRound, LogOut, ShieldCheck, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AccountSettings () {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Account & Security
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage password, session, and account actions.
        </p>
      </div>

      <div className="space-y-4">
        <Action
          icon={ KeyRound }
          title="Change password"
          description="Update your account password."
          button="Change"
          variant="outline"
        />

        <Action
          icon={ ShieldCheck }
          title="Two-factor authentication"
          description="Add extra protection to your account later."
          button="Setup"
          variant="outline"
        />

        <Action
          icon={ LogOut }
          title="Logout from all devices"
          description="End active sessions on other devices."
          button="Logout"
          variant="outline"
        />

        <Action
          icon={ Trash2 }
          title="Delete account"
          description="Permanently delete your account and data."
          button="Delete"
          variant="danger"
        />
      </div>
    </section>
  );
}

function Action ( {
  icon: Icon,
  title,
  description,
  button,
  variant,
}: {
  icon: typeof KeyRound;
  title: string;
  description: string;
  button: string;
  variant: "outline" | "danger";
} ) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-4 dark:border-slate-800 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-slate-100 p-3 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Icon size={ 20 } />
        </div>

        <div>
          <h3 className="font-black text-slate-950 dark:text-white">
            { title }
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            { description }
          </p>
        </div>
      </div>

      <Button
        variant={ variant === "danger" ? "danger" : "outline" }
        className="sm:w-28"
      >
        { button }
      </Button>
    </div>
  );
}