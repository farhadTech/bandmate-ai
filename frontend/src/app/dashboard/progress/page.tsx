"use client";

import ProgressHeader from "@/components/progress/ProgressHeader";
import ProgressStats from "@/components/progress/ProgressStats";
import BandChart from "@/components/progress/BandChart";
import SkillBreakdown from "@/components/progress/SkillBreakdown";
import RecentActivity from "@/components/progress/RecentActivity";
import AIInsights from "@/components/progress/AIInsights";

export default function ProgressPage () {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-8 duration-500">
      <ProgressHeader />
      <ProgressStats />
      <BandChart />
      <SkillBreakdown />

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_0.8fr]">
        <RecentActivity />
        <AIInsights />
      </section>
    </div>
  );
}
