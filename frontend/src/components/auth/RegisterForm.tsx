"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ApiError } from "@/lib/api";
import { registerUser } from "@/lib/auth";

export default function RegisterForm () {
  const router = useRouter();

  const [ fullName, setFullName ] = useState( "Sarah Ahmed" );
  const [ email, setEmail ] = useState( "sarah@example.com" );
  const [ password, setPassword ] = useState( "12345678" );
  const [ confirmPassword, setConfirmPassword ] = useState( "12345678" );
  const [ targetBand, setTargetBand ] = useState( "7.0" );
  const [ showPassword, setShowPassword ] = useState( false );

  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( "" );

  async function handleSubmit ( event: FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    setError( "" );

    if ( !fullName.trim() ) {
      setError( "Please enter your full name." );
      return;
    }

    if ( !email.trim() ) {
      setError( "Please enter your email address." );
      return;
    }

    if ( password.length < 6 ) {
      setError( "Password must be at least 6 characters." );
      return;
    }

    if ( password !== confirmPassword ) {
      setError( "Passwords do not match." );
      return;
    }

    try {
      setLoading( true );

      await registerUser( {
        full_name: fullName,
        email,
        password,
      } );

      router.push( "/onboarding" );
    } catch ( err ) {
      if ( err instanceof ApiError ) {
        setError( err.message );
      } else {
        setError( "Could not create account. Please try again." );
      }
    } finally {
      setLoading( false );
    }
  }

  return (
    <form onSubmit={ handleSubmit } className="space-y-5">
      { error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          { error }
        </div>
      ) }

      <Field label="Full name" icon={ User }>
        <Input
          value={ fullName }
          onChange={ ( event ) => setFullName( event.target.value ) }
          placeholder="John Doe"
          className="pl-11"
        />
      </Field>

      <Field label="Email address" icon={ Mail }>
        <Input
          type="email"
          value={ email }
          onChange={ ( event ) => setEmail( event.target.value ) }
          placeholder="you@example.com"
          className="pl-11"
        />
      </Field>

      <Field label="Password" icon={ Lock }>
        <Input
          type={ showPassword ? "text" : "password" }
          value={ password }
          onChange={ ( event ) => setPassword( event.target.value ) }
          placeholder="••••••••"
          className="pl-11 pr-11"
        />

        <button
          type="button"
          onClick={ () => setShowPassword( ( value ) => !value ) }
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
        >
          { showPassword ? <EyeOff size={ 18 } /> : <Eye size={ 18 } /> }
        </button>
      </Field>

      <Field label="Confirm password" icon={ Lock }>
        <Input
          type={ showPassword ? "text" : "password" }
          value={ confirmPassword }
          onChange={ ( event ) => setConfirmPassword( event.target.value ) }
          placeholder="••••••••"
          className="pl-11"
        />
      </Field>

      <div>
        <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
          Target IELTS Band
        </label>

        <select
          value={ targetBand }
          onChange={ ( event ) => setTargetBand( event.target.value ) }
          className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
        >
          <option>6.0</option>
          <option>6.5</option>
          <option>7.0</option>
          <option>7.5</option>
          <option>8.0</option>
          <option>8.5</option>
          <option>9.0</option>
        </select>
      </div>

      <Button type="submit" disabled={ loading } className="w-full py-3.5 text-base">
        { loading ? (
          <>
            <Loader2 size={ 18 } className="mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        ) }
      </Button>

      <div className="relative flex items-center py-2">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <span className="px-4 text-xs font-bold text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <Button type="button" variant="outline" className="w-full py-3.5 text-base">
        Continue with Google
      </Button>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{ " " }
        <Link
          href="/login"
          className="cursor-pointer font-black text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          Log in
        </Link>
      </p>
    </form>
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
