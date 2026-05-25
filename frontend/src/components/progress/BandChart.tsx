"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const bandData = [
  { week: "W1", band: 5.8 },
  { week: "W2", band: 6.0 },
  { week: "W3", band: 6.1 },
  { week: "W4", band: 6.2 },
  { week: "W5", band: 6.4 },
  { week: "W6", band: 6.5 },
  { week: "W7", band: 6.6 },
];

const studyData = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.1 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1.2 },
  { day: "Sat", hours: 3.0 },
  { day: "Sun", hours: 2.2 },
];

export default function BandChart () {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Band Score Trend
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Weekly estimated band improvement.
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ bandData }>
              <defs>
                <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={ 0.35 } />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={ 0 } />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={ 0.2 } />
              <XAxis dataKey="week" />
              <YAxis domain={ [ 5, 8 ] } />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="band"
                stroke="#2563eb"
                strokeWidth={ 3 }
                fill="url(#bandGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">
          Study Consistency
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Daily study hours this week.
        </p>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ studyData }>
              <CartesianGrid strokeDasharray="3 3" opacity={ 0.2 } />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#7c3aed" radius={ [ 12, 12, 0, 0 ] } />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}