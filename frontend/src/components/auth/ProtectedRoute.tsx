"use client";

import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { clearAuthSession, getAuthToken, getCurrentUser } from "@/lib/auth";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute ( { children }: ProtectedRouteProps ) {
  const router = useRouter();
  const [ checking, setChecking ] = useState( true );

  useEffect( () => {
    let mounted = true;

    async function checkAuth () {
      const token = getAuthToken();

      if ( !token ) {
        clearAuthSession();
        router.replace( "/login" );
        return;
      }

      try {
        const user = await getCurrentUser();

        if ( !user ) {
          clearAuthSession();
          router.replace( "/login" );
          return;
        }

        if ( mounted ) {
          setChecking( false );
        }
      } catch {
        clearAuthSession();
        router.replace( "/login" );
      }
    }

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [ router ] );

  if ( checking ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950 dark:bg-slate-950 dark:text-white">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
            <ShieldCheck size={ 30 } />
          </div>

          <h1 className="mt-5 text-2xl font-black">Checking session</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Please wait while we verify your login session.
          </p>

          <Loader2 className="mx-auto mt-6 animate-spin text-blue-600" size={ 28 } />
        </div>
      </main>
    );
  }

  return <>{ children }</>;
}