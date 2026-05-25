"use client";

import { Mail, User, MapPin } from "lucide-react";
import Input from "@/components/ui/Input";

type Props = {
  fullName: string;
  email: string;
  country: string;
  onFullNameChange: ( value: string ) => void;
  onEmailChange: ( value: string ) => void;
  onCountryChange: ( value: string ) => void;
};

export default function ProfileSettings ( {
  fullName,
  email,
  country,
  onFullNameChange,
  onEmailChange,
  onCountryChange,
}: Props ) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Profile Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update your personal information.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-3xl font-black text-white shadow-lg shadow-blue-600/20">
          S
        </div>

        <div>
          <h3 className="font-black text-slate-950 dark:text-white">
            Student Profile
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Avatar upload will be added later.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Full Name" icon={ User }>
          <Input
            value={ fullName }
            onChange={ ( event ) => onFullNameChange( event.target.value ) }
            placeholder="Your full name"
            className="pl-11"
          />
        </Field>

        <Field label="Email Address" icon={ Mail }>
          <Input
            type="email"
            value={ email }
            onChange={ ( event ) => onEmailChange( event.target.value ) }
            placeholder="you@example.com"
            className="pl-11"
          />
        </Field>

        <Field label="Country" icon={ MapPin }>
          <Input
            value={ country }
            onChange={ ( event ) => onCountryChange( event.target.value ) }
            placeholder="Bangladesh"
            className="pl-11"
          />
        </Field>
      </div>
    </section>
  );
}

function Field ( {
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof User;
  children: React.ReactNode;
} ) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
        { label }
      </label>

      <div className="relative">
        <Icon
          size={ 18 }
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
        />
        { children }
      </div>
    </div>
  );
}