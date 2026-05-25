"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ApiError } from "@/lib/api";
import { loginUser } from "@/lib/auth";

export default function LoginForm () {
  const router = useRouter();

  const [ email, setEmail ] = useState( "sarah@example.com" );
  const [ password, setPassword ] = useState( "12345678" );
  const [ rememberMe, setRememberMe ] = useState( true );
  const [ showPassword, setShowPassword ] = useState( false );

  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( "" );

  async function handleSubmit ( event: FormEvent<HTMLFormElement> ) {
    event.preventDefault();
    setError( "" );

    if ( !email.trim() || !password.trim() ) {
      setError( "Please enter your email and password." );
      return;
    }

    try {
      setLoading( true );

      await loginUser( {
        email,
        password,
      } );

      router.push( "/dashboard" );
    } catch ( err ) {
      if ( err instanceof ApiError ) {
        setError( err.message );
      } else {
        setError( "Could not log in. Please try again." );
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

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={ rememberMe }
            onChange={ ( event ) => setRememberMe( event.target.checked ) }
            className="h-4 w-4 cursor-pointer rounded border-slate-300"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="cursor-pointer text-sm font-black text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" disabled={ loading } className="w-full py-3.5 text-base">
        { loading ? (
          <>
            <Loader2 size={ 18 } className="mr-2 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log in"
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
        Don&apos;t have an account?{ " " }
        <Link
          href="/register"
          className="cursor-pointer font-black text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          Sign up
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
  icon: typeof Mail;
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
