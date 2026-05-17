import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Exercise } from "@/data/workouts";
import { exerciseImages } from "@/data/exerciseImages";

const muscleColors: Record<string, string> = {
  chest: "bg-primary/20 text-primary",
  back: "bg-success/20 text-success",
  shoulders: "bg-accent/20 text-accent-foreground",
  legs: "bg-destructive/20 text-destructive",
  arms: "bg-primary/20 text-primary",
  core: "bg-success/20 text-success",
  "full-body": "bg-accent/20 text-accent-foreground",
};

const ExerciseCard = ({ exercise, index }: { exercise: Exercise; index?: number }) => {
  const [expanded, setExpanded] = useState(false);
  const image = exerciseImages[exercise.id];

  return (
    <div className="gradient-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          {index !== undefined && (
            <span className="flex items-center justify-center w-8 h-8 rounded-full gradient-primary text-sm font-bold text-primary-foreground shrink-0">
              {index + 1}
            </span>
          )}
          {image && (
            <img
              src={image}
              alt={exercise.name}
              width={640}
              height={512}
              loading="lazy"
              className="w-14 h-14 rounded-lg object-cover shrink-0"
            />
          )}
          <div>
            <h4 className="font-medium text-foreground">{exercise.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {exercise.sets} sets × {exercise.reps} · {exercise.restSeconds}s rest
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`hidden sm:inline-flex ${muscleColors[exercise.muscleGroup]}`}>
            {exercise.muscleGroup}
          </Badge>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Large illustration */}
          {image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`${exercise.name} demonstration`}
                width={640}
                height={512}
                className="w-full max-h-64 object-contain bg-card rounded-lg"
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground">{exercise.description}</p>

          <div>
            <h5 className="flex items-center gap-1.5 text-sm font-medium text-success mb-2">
              <CheckCircle2 className="h-4 w-4" />
              Proper Posture
            </h5>
            <ul className="space-y-1.5">
              {exercise.postureTips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="flex items-center gap-1.5 text-sm font-medium text-destructive mb-2">
              <AlertTriangle className="h-4 w-4" />
              Common Mistakes
            </h5>
            <ul className="space-y-1.5">
              {exercise.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
