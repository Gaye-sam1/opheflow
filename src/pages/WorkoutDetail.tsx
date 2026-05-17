import { useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  Clock,
  Flame,
  Dumbbell,
  CheckCircle2,
  Trash2,
  Play,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { allWorkouts } from "@/data/workouts";

import ExerciseCard from "@/components/ExerciseCard";
import WorkoutTimer from "@/components/WorkoutTimer";

import { useProgress } from "@/hooks/useProgress";
import { useCustomWorkouts } from "@/hooks/useCustomWorkouts";

import { toast } from "@/hooks/use-toast";

import {
  addXP,
  XP_PER_WORKOUT,
} from "@/utils/xp";

import { updateStreak } from "@/utils/streak";

const WorkoutDetail = () => {
  const { id } = useParams();

  const {
    customWorkouts,
    deleteWorkout,
  } = useCustomWorkouts();

  const allCombined = [
    ...allWorkouts,
    ...customWorkouts,
  ];

  const workout = allCombined.find(
    (w) => w.id === id
  );

  const isCustom =
    workout?.id.startsWith("custom-") ?? false;

  const {
    logWorkout,
    isCompletedToday,
  } = useProgress();

  const navigate = useNavigate();

  const [showTimer, setShowTimer] =
    useState(false);

  /**
   * Workout not found
   */
  if (!workout) {
    return (
      <div className="pt-20 pb-24 container mx-auto px-6 text-center">
        <p className="text-muted-foreground">
          Workout not found.
        </p>

        <Link
          to="/workouts"
          className="text-primary hover:underline mt-4 inline-block"
        >
          ← Back to Workouts
        </Link>
      </div>
    );
  }

  /**
   * Completion state
   */
  const completed =
    isCompletedToday(workout.id);

  /**
   * Delete workout
   */
  const handleDelete = () => {
    deleteWorkout(workout.id);

    toast({
      title: "Workout Deleted",
      description: `${workout.name} has been removed.`,
    });

    navigate("/workouts");
  };

  /**
   * Complete workout
   */
  const handleComplete = () => {
    /**
     * Prevent duplicate completion
     */
    if (completed) {
      toast({
        title: "Already Completed",
        description:
          "You already completed this workout today.",
      });

      return;
    }

    /**
     * Save progress
     */
    logWorkout({
      id: workout.id,
      name: workout.name,
      type: workout.type,
      durationMinutes:
        workout.durationMinutes,
    });

    /**
     * Workout history
     */
    const history = JSON.parse(
      localStorage.getItem(
        "opheflow-history"
      ) || "[]"
    );

    const completedWorkout = {
      id: crypto.randomUUID(),
      name: workout.name,
      date: new Date().toLocaleDateString(),
      calories: 320,
      duration:
        workout.durationMinutes,
      type: workout.type,
    };

    history.unshift(completedWorkout);

    localStorage.setItem(
      "opheflow-history",
      JSON.stringify(history)
    );

    /**
     * XP System
     */
    const updatedXP =
      addXP(XP_PER_WORKOUT);

    /**
     * Streak System
     */
    const updatedStreak =
      updateStreak();

    /**
     * Success toast
     */
    toast({
      title: "🔥 Workout Complete!",
      description: `+${XP_PER_WORKOUT} XP • 🔥 ${updatedStreak} Day Streak • ⭐ ${updatedXP} XP`,
    });
  };

  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      {/* Back Button */}
      <Link
        to="/workouts"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Workouts
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="text-3xl font-black tracking-tight">
            {workout.name}
          </h1>

          <Badge
            variant="outline"
            className="capitalize"
          >
            {workout.type}
          </Badge>

          {isCustom && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-primary/40 text-primary"
            >
              Custom
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground mb-4">
          {workout.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {workout.durationMinutes} min
          </span>

          <span className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4" />
            {workout.exercises.length} exercises
          </span>

          <span className="flex items-center gap-1">
            <Flame className="h-4 w-4" />
            {workout.difficulty}
          </span>
        </div>

        {/* Muscle Groups */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {workout.muscleGroups.map(
            (mg) => (
              <Badge
                key={mg}
                variant="secondary"
                className="capitalize"
              >
                {mg}
              </Badge>
            )
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 flex-wrap">
          {/* Timer */}
          <Button
            onClick={() =>
              setShowTimer(true)
            }
            variant="outline"
            className="font-semibold border-primary/40 text-primary hover:bg-primary/10"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Timer
          </Button>

          {/* Complete */}
          {completed ? (
            <Button
              disabled
              className="bg-green-500/20 text-green-400 border border-green-500/30"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Completed Today
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Complete Workout
            </Button>
          )}

          {/* Delete */}
          {isCustom && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              className="border-red-500/30 text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Exercises */}
      <h2 className="text-xl font-bold mb-4">
        Exercises
      </h2>

      <div className="space-y-3">
        {workout.exercises.map(
          (ex, i) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              index={i}
            />
          )
        )}
      </div>

      {/* Timer */}
      {showTimer && (
        <WorkoutTimer
          exercises={workout.exercises}
          onComplete={() => {
            if (!completed) {
              handleComplete();
            }
          }}
          onClose={() =>
            setShowTimer(false)
          }
        />
      )}
    </div>
  );
};

export default WorkoutDetail;