"use client";

import { CalendarDays, GraduationCap, Target, Timer } from "lucide-react";

type Props = {
  ieltsType: string;
  targetBand: string;
  currentBand: string;
  examDate: string;
  studyTime: string;
  onIeltsTypeChange: ( value: string ) => void;
  onTargetBandChange: ( value: string ) => void;
  onCurrentBandChange: ( value: string ) => void;
  onExamDateChange: ( value: string ) => void;
  onStudyTimeChange: ( value: string ) => void;
};

export default function GoalSettings ( {
  ieltsType,
  targetBand,
  currentBand,
  examDate,
  studyTime,
  onIeltsTypeChange,
  onTargetBandChange,
  onCurrentBandChange,
  onExamDateChange,
  onStudyTimeChange,
}: Props ) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          IELTS Goal Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Adjust your target band and study plan preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <SelectField
          label="IELTS Type"
          icon={ GraduationCap }
          value={ ieltsType }
          onChange={ onIeltsTypeChange }
          options={ [ "Academic", "General Training" ] }
        />

        <SelectField
          label="Target Band"
          icon={ Target }
          value={ targetBand }
          onChange={ onTargetBandChange }
          options={ [ "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0" ] }
        />

        <SelectField
          label="Current Band"
          icon={ Target }
          value={ currentBand }
          onChange={ onCurrentBandChange }
          options={ [ "4.5", "5.0", "5.5", "6.0", "6.5", "7.0" ] }
        />

        <div>
          <label className="mb-2 block text-sm font-black text-slate-800 dark:text-slate-100">
            Exam Date
          </label>

          <div className="relative">
            <CalendarDays
              size={ 18 }
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
            />

            <input
              type="date"
              value={ examDate }
              onChange={ ( event ) => onExamDateChange( event.target.value ) }
              className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
            />
          </div>
        </div>

        <SelectField
          label="Daily Study Time"
          icon={ Timer }
          value={ studyTime }
          onChange={ onStudyTimeChange }
          options={ [ "30 minutes", "1 hour", "1.5 hours", "2 hours", "3+ hours" ] }
        />
      </div>
    </section>
  );
}

function SelectField ( {
  label,
  icon: Icon,
  value,
  options,
  onChange,
}: {
  label: string;
  icon: typeof Target;
  value: string;
  options: string[];
  onChange: ( value: string ) => void;
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

        <select
          value={ value }
          onChange={ ( event ) => onChange( event.target.value ) }
          className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950"
        >
          { options.map( ( option ) => (
            <option key={ option }>{ option }</option>
          ) ) }
        </select>
      </div>
    </div>
  );
}