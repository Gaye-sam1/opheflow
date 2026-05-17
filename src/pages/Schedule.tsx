import { Link } from "react-router-dom";
import { Clock, Dumbbell, Bed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { weeklySchedule } from "@/data/workouts";

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

const Schedule = () => {
  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      <h1 className="text-3xl font-black tracking-tight mb-2">Weekly Schedule</h1>
      <p className="text-muted-foreground mb-8">Your training plan for the week — gym, home, and rest days balanced.</p>

      <div className="space-y-3">
        {weeklySchedule.map((day) => {
          const isToday = day.day === today;
          return (
            <div
              key={day.day}
              className={`gradient-card rounded-xl border p-5 transition-all ${
                isToday ? "border-primary shadow-glow" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    day.isRest ? "bg-secondary" : "gradient-primary"
                  }`}>
                    {day.isRest ? (
                      <Bed className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Dumbbell className="h-5 w-5 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{day.day}</h3>
                      {isToday && (
                        <Badge className="gradient-primary text-primary-foreground text-[10px] px-2 py-0">
                          Today
                        </Badge>
                      )}
                    </div>
                    {day.isRest ? (
                      <p className="text-sm text-muted-foreground">Rest & Recovery</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {day.workout!.name} · {day.workout!.type === "gym" ? "Gym" : "Home"}
                      </p>
                    )}
                  </div>
                </div>

                {!day.isRest && day.workout && (
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {day.workout.durationMinutes} min
                    </span>
                    <Link
                      to={`/workouts/${day.workout.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
