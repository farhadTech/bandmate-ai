"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Bookmark,
  CalendarDays,
  ClipboardList,
  Headphones,
  Home,
  LogOut,
  Menu,
  Mic,
  PenLine,
  Settings,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { clearAuthSession } from "@/lib/auth";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Writing", href: "/dashboard/writing", icon: PenLine },
  { label: "Speaking", href: "/dashboard/speaking", icon: Mic },
  { label: "Listening", href: "/dashboard/listening", icon: Headphones },
  { label: "Reading", href: "/dashboard/reading", icon: BookOpen },
  { label: "Mock Test", href: "/dashboard/mock-test", icon: ClipboardList },
  { label: "Study Plan", href: "/dashboard/study-plan", icon: CalendarDays },
  { label: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { label: "Vocabulary", href: "/dashboard/vocabulary", icon: Bookmark },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const bottomNavLinks = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Writing", href: "/dashboard/writing", icon: PenLine },
  { label: "Speaking", href: "/dashboard/speaking", icon: Mic },
  { label: "Mock", href: "/dashboard/mock-test", icon: ClipboardList },
  { label: "More", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar () {
  const pathname = usePathname();
  const router = useRouter();
  const [ open, setOpen ] = useState( false );

  function isActiveRoute ( href: string ) {
    if ( href === "/dashboard" ) {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith( `${ href }/` );
  }

  function handleLogout () {
    clearAuthSession();
    setOpen( false );
    router.push( "/login" );
    router.refresh();
  }

  return (
    <>
      {/* Mobile / Tablet top menu button */ }
      <button
        type="button"
        onClick={ () => setOpen( true ) }
        className="fixed left-4 top-4 z-50 cursor-pointer rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:scale-105 hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu size={ 22 } />
      </button>

      {/* Mobile / Tablet overlay */ }
      { open && (
        <button
          type="button"
          onClick={ () => setOpen( false ) }
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation menu"
        />
      ) }

      {/* Desktop sidebar + mobile drawer */ }
      <aside
        className={ cn(
          "fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        ) }
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
            <Link
              href="/dashboard"
              onClick={ () => setOpen( false ) }
              className="flex cursor-pointer items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                B
              </div>

              <span className="text-xl font-bold text-slate-900 dark:text-white">
                BandMate AI
              </span>
            </Link>

            <button
              type="button"
              onClick={ () => setOpen( false ) }
              className="cursor-pointer rounded-lg p-2 transition hover:bg-slate-100 active:scale-95 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Close navigation menu"
            >
              <X size={ 20 } />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
            { sidebarLinks.map( ( item ) => {
              const Icon = item.icon;
              const active = isActiveRoute( item.href );

              return (
                <Link
                  key={ item.href }
                  href={ item.href }
                  onClick={ () => setOpen( false ) }
                  className={ cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:translate-x-1 active:scale-[0.98]",
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  ) }
                >
                  <Icon size={ 20 } />
                  { item.label }
                </Link>
              );
            } ) }
          </nav>

          <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <button
              type="button"
              onClick={ handleLogout }
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.98] dark:hover:bg-red-950/30"
            >
              <LogOut size={ 20 } />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile / Tablet bottom navigation */ }
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          { bottomNavLinks.map( ( item ) => {
            const Icon = item.icon;
            const active = isActiveRoute( item.href );

            return (
              <Link
                key={ item.href }
                href={ item.href }
                className={ cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-xs font-black transition-all duration-200 active:scale-95",
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                ) }
              >
                <Icon size={ 20 } />
                <span className="truncate">{ item.label }</span>
              </Link>
            );
          } ) }
        </div>
      </nav>
    </>
  );
}