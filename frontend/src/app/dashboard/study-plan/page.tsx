"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Brain,
  Headphones,
  Lightbulb,
  Mic,
  PenLine,
  RefreshCcw,
} from "lucide-react";
import StudyPlanHeader from "@/components/study-plan/StudyPlanHeader";
import StudyStats from "@/components/study-plan/StudyStats";
import StudyDayCard, { StudyDay } from "@/components/study-plan/StudyDayCard";

const initialDays: StudyDay[] = [
  {
    id: 1,
    day: "Monday",
    date: "Day 1",
    focus: "Writing Foundation",
    tasks: [
      {
        id: 101,
        title: "Write one Task 2 opinion essay",
        skill: "Writing",
        duration: "40 mins",
        icon: PenLine,
        color: "blue",
        completed: false,
      },
      {
        id: 102,
        title: "Review 10 high-band linking phrases",
        skill: "Vocabulary",
        duration: "20 mins",
        icon: Brain,
        color: "cyan",
        completed: false,
      },
      {
        id: 103,
        title: "Analyze one band 7 sample answer",
        skill: "Writing",
        duration: "25 mins",
        icon: BookOpen,
        color: "blue",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    day: "Tuesday",
    date: "Day 2",
    focus: "Speaking Fluency",
    tasks: [
      {
        id: 201,
        title: "Record Speaking Part 1 answers",
        skill: "Speaking",
        duration: "20 mins",
        icon: Mic,
        color: "green",
        completed: false,
      },
      {
        id: 202,
        title: "Practice one Part 2 cue card",
        skill: "Speaking",
        duration: "15 mins",
        icon: Mic,
        color: "green",
        completed: false,
      },
      {
        id: 203,
        title: "Review filler words and hesitation",
        skill: "Speaking",
        duration: "15 mins",
        icon: Lightbulb,
        color: "purple",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    day: "Wednesday",
    date: "Day 3",
    focus: "Listening Accuracy",
    tasks: [
      {
        id: 301,
        title: "Complete Listening Section 2",
        skill: "Listening",
        duration: "30 mins",
        icon: Headphones,
        color: "purple",
        completed: false,
      },
      {
        id: 302,
        title: "Check spelling mistakes",
        skill: "Listening",
        duration: "15 mins",
        icon: BookOpen,
        color: "cyan",
        completed: false,
      },
      {
        id: 303,
        title: "Practice keyword prediction",
        skill: "Listening",
        duration: "20 mins",
        icon: Brain,
        color: "purple",
        completed: false,
      },
    ],
  },
  {
    id: 4,
    day: "Thursday",
    date: "Day 4",
    focus: "Reading Speed",
    tasks: [
      {
        id: 401,
        title: "Complete one Reading Passage 2",
        skill: "Reading",
        duration: "25 mins",
        icon: BookOpen,
        color: "cyan",
        completed: false,
      },
      {
        id: 402,
        title: "Practice True / False / Not Given",
        skill: "Reading",
        duration: "20 mins",
        icon: Brain,
        color: "cyan",
        completed: false,
      },
      {
        id: 403,
        title: "Review wrong answers",
        skill: "Reading",
        duration: "15 mins",
        icon: Lightbulb,
        color: "purple",
        completed: false,
      },
    ],
  },
  {
    id: 5,
    day: "Friday",
    date: "Day 5",
    focus: "Writing Improvement",
    tasks: [
      {
        id: 501,
        title: "Write one Task 1 report",
        skill: "Writing",
        duration: "25 mins",
        icon: PenLine,
        color: "blue",
        completed: false,
      },
      {
        id: 502,
        title: "Fix grammar mistakes from old essay",
        skill: "Grammar",
        duration: "20 mins",
        icon: Brain,
        color: "purple",
        completed: false,
      },
      {
        id: 503,
        title: "Rewrite one weak paragraph",
        skill: "Writing",
        duration: "20 mins",
        icon: PenLine,
        color: "blue",
        completed: false,
      },
    ],
  },
  {
    id: 6,
    day: "Saturday",
    date: "Day 6",
    focus: "Mini Mock Test",
    tasks: [
      {
        id: 601,
        title: "Complete Listening mini test",
        skill: "Listening",
        duration: "30 mins",
        icon: Headphones,
        color: "purple",
        completed: false,
      },
      {
        id: 602,
        title: "Complete Reading mini test",
        skill: "Reading",
        duration: "35 mins",
        icon: BookOpen,
        color: "cyan",
        completed: false,
      },
      {
        id: 603,
        title: "Review score and weak areas",
        skill: "Analytics",
        duration: "20 mins",
        icon: Lightbulb,
        color: "green",
        completed: false,
      },
    ],
  },
  {
    id: 7,
    day: "Sunday",
    date: "Day 7",
    focus: "Review and Recovery",
    tasks: [
      {
        id: 701,
        title: "Review vocabulary notebook",
        skill: "Vocabulary",
        duration: "20 mins",
        icon: Brain,
        color: "cyan",
        completed: false,
      },
      {
        id: 702,
        title: "Watch one speaking sample",
        skill: "Speaking",
        duration: "20 mins",
        icon: Mic,
        color: "green",
        completed: false,
      },
      {
        id: 703,
        title: "Plan next week’s weak areas",
        skill: "Planning",
        duration: "15 mins",
        icon: Lightbulb,
        color: "purple",
        completed: false,
      },
    ],
  },
];

export default function StudyPlanPage () {
  const [ days, setDays ] = useState<StudyDay[]>( initialDays );
  const [ activeDay, setActiveDay ] = useState( 1 );

  const totalTasks = days.reduce( ( sum, day ) => sum + day.tasks.length, 0 );

  const completedTasks = days.reduce(
    ( sum, day ) => sum + day.tasks.filter( ( task ) => task.completed ).length,
    0
  );

  const activeDayData = useMemo(
    () => days.find( ( day ) => day.id === activeDay ),
    [ activeDay, days ]
  );

  function handleToggleTask ( taskId: number ) {
    setDays( ( prevDays ) =>
      prevDays.map( ( day ) => ( {
        ...day,
        tasks: day.tasks.map( ( task ) =>
          task.id === taskId
            ? {
              ...task,
              completed: !task.completed,
            }
            : task
        ),
      } ) )
    );
  }

  function handleRegenerate () {
    setDays( initialDays );
    setActiveDay( 1 );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <StudyPlanHeader onRegenerate={ handleRegenerate } />

      <StudyStats completedTasks={ completedTasks } totalTasks={ totalTasks } />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Weekly Study Schedule
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Click a day to expand tasks. Click each task to mark it complete.
            </p>
          </div>

          { days.map( ( day ) => (
            <StudyDayCard
              key={ day.id }
              day={ day }
              active={ activeDay === day.id }
              onSelect={ setActiveDay }
              onToggleTask={ handleToggleTask }
            />
          ) ) }
        </div>

        <div className="space-y-6">
          <AIRecommendation activeDay={ activeDayData } />

          <SkillFocus />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/30 dark:text-blue-300">
                <RefreshCcw size={ 22 } />
              </div>

              <div>
                <h2 className="text-lg font-black text-slate-950 dark:text-white">
                  Plan Rules
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Keep the rhythm simple.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <p>• Complete at least 2 tasks daily.</p>
              <p>• Practice your weakest skill 3 times per week.</p>
              <p>• Take one mini mock test every Saturday.</p>
              <p>• Review mistakes before starting new practice.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AIRecommendation ( { activeDay }: { activeDay?: StudyDay; } ) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300">
          <Lightbulb size={ 22 } />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">
            AI Recommendation
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Based on your active study day.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          { activeDay?.day }: { activeDay?.focus }
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Focus on quality over speed today. After completing each task, spend
          5 minutes writing down your mistake pattern. This will help the AI
          generate better recommendations later.
        </p>
      </div>
    </div>
  );
}

function SkillFocus () {
  const skills = [
    { label: "Writing", value: 35, color: "bg-blue-600" },
    { label: "Speaking", value: 25, color: "bg-green-600" },
    { label: "Listening", value: 20, color: "bg-purple-600" },
    { label: "Reading", value: 20, color: "bg-cyan-600" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-black text-slate-950 dark:text-white">
        Weekly Skill Focus
      </h2>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Distribution of this week’s practice time.
      </p>

      <div className="mt-6 space-y-5">
        { skills.map( ( skill ) => (
          <div key={ skill.label }>
            <div className="mb-2 flex justify-between text-sm font-bold">
              <span className="text-slate-700 dark:text-slate-200">
                { skill.label }
              </span>
              <span className="text-slate-400">{ skill.value }%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={ `h-full rounded-full ${ skill.color } transition-all duration-700` }
                style={ { width: `${ skill.value }%` } }
              />
            </div>
          </div>
        ) ) }
      </div>
    </div>
  );
}
