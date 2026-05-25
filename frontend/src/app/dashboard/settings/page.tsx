"use client";

import { useState } from "react";
import SettingsHeader from "@/components/settings/SettingsHeader";
import ProfileSettings from "@/components/settings/ProfileSettings";
import GoalSettings from "@/components/settings/GoalSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AccountSettings from "@/components/settings/AccountSettings";

type NotificationKey =
  | "emailReminders"
  | "practiceAlerts"
  | "weeklyReports"
  | "studyNudges";

export default function SettingsPage () {
  const [ saved, setSaved ] = useState( false );

  const [ profile, setProfile ] = useState( {
    fullName: "Sarah Ahmed",
    email: "sarah@example.com",
    country: "Bangladesh",
  } );

  const [ goals, setGoals ] = useState( {
    ieltsType: "Academic",
    targetBand: "7.0",
    currentBand: "6.0",
    examDate: "2026-08-15",
    studyTime: "2 hours",
  } );

  const [ notifications, setNotifications ] = useState<
    Record<NotificationKey, boolean>
  >( {
    emailReminders: true,
    practiceAlerts: true,
    weeklyReports: true,
    studyNudges: false,
  } );

  function handleSave () {
    setSaved( true );

    setTimeout( () => {
      setSaved( false );
    }, 2500 );
  }

  function toggleNotification ( key: NotificationKey ) {
    setNotifications( ( prev ) => ( {
      ...prev,
      [ key ]: !prev[ key ],
    } ) );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <SettingsHeader onSave={ handleSave } />

      { saved && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-bold text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
          Settings saved successfully.
        </div>
      ) }

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <ProfileSettings
            fullName={ profile.fullName }
            email={ profile.email }
            country={ profile.country }
            onFullNameChange={ ( value ) =>
              setProfile( ( prev ) => ( { ...prev, fullName: value } ) )
            }
            onEmailChange={ ( value ) =>
              setProfile( ( prev ) => ( { ...prev, email: value } ) )
            }
            onCountryChange={ ( value ) =>
              setProfile( ( prev ) => ( { ...prev, country: value } ) )
            }
          />

          <GoalSettings
            ieltsType={ goals.ieltsType }
            targetBand={ goals.targetBand }
            currentBand={ goals.currentBand }
            examDate={ goals.examDate }
            studyTime={ goals.studyTime }
            onIeltsTypeChange={ ( value ) =>
              setGoals( ( prev ) => ( { ...prev, ieltsType: value } ) )
            }
            onTargetBandChange={ ( value ) =>
              setGoals( ( prev ) => ( { ...prev, targetBand: value } ) )
            }
            onCurrentBandChange={ ( value ) =>
              setGoals( ( prev ) => ( { ...prev, currentBand: value } ) )
            }
            onExamDateChange={ ( value ) =>
              setGoals( ( prev ) => ( { ...prev, examDate: value } ) )
            }
            onStudyTimeChange={ ( value ) =>
              setGoals( ( prev ) => ( { ...prev, studyTime: value } ) )
            }
          />
        </div>

        <div className="space-y-6">
          <NotificationSettings
            settings={ notifications }
            onToggle={ toggleNotification }
          />

          <ThemeCard />

          <AccountSettings />
        </div>
      </section>
    </div>
  );
}

function ThemeCard () {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-black text-slate-950 dark:text-white">
        Theme Preference
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Use the moon/sun button in the top navigation to switch between light
        and dark mode.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800">
          <div className="h-24 rounded-xl bg-slate-100" />
          <p className="mt-3 text-sm font-black text-slate-900">Light Mode</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
          <div className="h-24 rounded-xl bg-slate-800" />
          <p className="mt-3 text-sm font-black text-white">Dark Mode</p>
        </div>
      </div>
    </section>
  );
}
