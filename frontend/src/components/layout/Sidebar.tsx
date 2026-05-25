"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function Sidebar () {
  const pathname = usePathname();
  const [ open, setOpen ] = useState( false );

  return (
    <>
      <button
        onClick={ () => setOpen( true ) }
        className="fixed left-4 top-4 z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:scale-105 hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
      >
        <Menu size={ 22 } />
      </button>

      { open && (
        <div
          onClick={ () => setOpen( false ) }
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      ) }

      <aside
        className={ cn(
          "fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        ) }
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                B
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                BandMate AI
              </span>
            </Link>

            <button
              onClick={ () => setOpen( false ) }
              className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            >
              <X size={ 20 } />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
            { sidebarLinks.map( ( item ) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={ item.href }
                  href={ item.href }
                  onClick={ () => setOpen( false ) }
                  className={ cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:translate-x-1",
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
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30">
              <LogOut size={ 20 } />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}