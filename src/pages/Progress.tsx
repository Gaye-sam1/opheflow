import { Flame, Trophy, Calendar, Dumbbell, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { allWorkouts } from "@/data/workouts";

const Progress = () => {
  const { logs, currentStreak, longestStreak, totalWorkouts, thisWeekCount, thisMonthCount } = useProgress();

  const totalMinutes = logs.reduce((sum, l) => sum + l.durationMinutes, 0);
  const gymCount = logs.filter((l) => l.workoutType === "gym").length;
  const homeCount = logs.filter((l) => l.workoutType === "home").length;

  // Last 7 days activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    const dayStr = d.toLocaleDateString("en-US", { weekday: "short" });
    const count = logs.filter((l) => {
      const ld = new Date(l.completedAt);
      ld.setHours(0, 0, 0, 0);
      return ld.getTime() === d.getTime();
    }).length;
    return { dayStr, count, isToday: i === 6 };
  });

  const maxDayCount = Math.max(...last7Days.map((d) => d.count), 1);

  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      <h1 className="text-3xl font-black tracking-tight mb-2">Your Progress</h1>
      <p className="text-muted-foreground mb-8">Track your consistency and celebrate your wins.</p>

      {/* Streak Banner */}
      <div className="gradient-primary rounded-2xl p-6 mb-8 shadow-glow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-foreground/80 font-medium">Current Streak</p>
            <p className="text-5xl font-black text-primary-foreground">{currentStreak}</p>
            <p className="text-sm text-primary-foreground/80 mt-1">
              {currentStreak === 1 ? "day" : "days"} in a row
            </p>
          </div>
          <Flame className="h-16 w-16 text-primary-foreground/30" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Total Workouts", value: totalWorkouts, icon: Dumbbell },
          { label: "Longest Streak", value: `${longestStreak}d`, icon: Trophy },
          { label: "This Week", value: thisWeekCount, icon: Calendar },
          { label: "Total Minutes", value: totalMinutes, icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="gradient-card rounded-xl border border-border p-4">
            <stat.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <div className="gradient-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Last 7 Days
        </h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {last7Days.map((day) => (
            <div key={day.dayStr} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-20">
                <div
                  className={`w-full max-w-[40px] rounded-t-md transition-all ${
                    day.count > 0 ? "gradient-primary" : "bg-secondary"
                  }`}
                  style={{
                    height: day.count > 0 ? `${Math.max((day.count / maxDayCount) * 100, 20)}%` : "12%",
                  }}
                />
              </div>
              <span className={`text-xs font-medium ${day.isToday ? "text-primary" : "text-muted-foreground"}`}>
                {day.dayStr}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gym vs Home split */}
      <div className="gradient-card rounded-xl border border-border p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Workout Split</h2>
        <div className="flex gap-4">
          <div className="flex-1 text-center p-4 rounded-lg bg-secondary">
            <p className="text-2xl font-bold">{gymCount}</p>
            <p className="text-xs text-muted-foreground mt-1">🏋️ Gym</p>
          </div>
          <div className="flex-1 text-center p-4 rounded-lg bg-secondary">
            <p className="text-2xl font-bold">{homeCount}</p>
            <p className="text-xs text-muted-foreground mt-1">🏠 Home</p>
          </div>
          <div className="flex-1 text-center p-4 rounded-lg bg-secondary">
            <p className="text-2xl font-bold">{thisMonthCount}</p>
            <p className="text-xs text-muted-foreground mt-1">📅 This Month</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        {logs.length === 0 ? (
          <div className="gradient-card rounded-xl border border-border p-8 text-center">
            <Dumbbell className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No workouts logged yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Complete a workout to start tracking!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.slice(0, 20).map((log) => (
              <div
                key={log.id}
                className="gradient-card rounded-xl border border-border p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{log.workoutName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.completedAt).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      · {log.durationMinutes} min · {log.workoutType === "gym" ? "🏋️" : "🏠"}{" "}
                      {log.workoutType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
