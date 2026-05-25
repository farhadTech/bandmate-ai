"use client";

import { Bell, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Topbar () {
  const [ dark, setDark ] = useState( false );

  useEffect( () => {
    const savedTheme = localStorage.getItem( "theme" );

    if ( savedTheme === "dark" ) {
      document.documentElement.classList.add( "dark" );
      setDark( true );
    }
  }, [] );

  function toggleTheme () {
    const next = !dark;
    setDark( next );

    if ( next ) {
      document.documentElement.classList.add( "dark" );
      localStorage.setItem( "theme", "dark" );
    } else {
      document.documentElement.classList.remove( "dark" );
      localStorage.setItem( "theme", "light" );
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8">
      <div className="ml-12 flex-1 lg:ml-0">
        <div className="relative max-w-md">
          <Search
            size={ 18 }
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search for practice, resources..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button className="hidden sm:inline-flex">
          Upgrade to Premium
        </Button>

        <button
          onClick={ toggleTheme }
          className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:scale-105 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          { dark ? <Sun size={ 20 } /> : <Moon size={ 20 } /> }
        </button>

        <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition hover:scale-105 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
          <Bell size={ 20 } />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </span>
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-50 text-sm font-bold text-blue-600 dark:bg-blue-950">
          S
        </div>
      </div>
    </header>
  );
}