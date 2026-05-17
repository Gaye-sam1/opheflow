import { Link } from "react-router-dom";
import { Clock, Flame, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Workout } from "@/data/workouts";

const difficultyColor: Record<string, string> = {
  beginner: "bg-success/20 text-success",
  intermediate: "bg-primary/20 text-primary",
  advanced: "bg-destructive/20 text-destructive",
};

const WorkoutCard = ({ workout, isCustom }: { workout: Workout; isCustom?: boolean }) => {
  return (
    <Link
      to={`/workouts/${workout.id}`}
      className="group block gradient-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-glow transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {workout.name}
            </h3>
            {isCustom && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                Custom
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{workout.description}</p>
        </div>
        <Badge variant="outline" className={difficultyColor[workout.difficulty]}>
          {workout.difficulty}
        </Badge>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {workout.durationMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <Dumbbell className="h-3.5 w-3.5" />
          {workout.exercises.length} exercises
        </span>
        <span className="flex items-center gap-1">
          <Flame className="h-3.5 w-3.5" />
          {workout.type === "gym" ? "Gym" : "Home"}
        </span>
      </div>
    </Link>
  );
};

export default WorkoutCard;
