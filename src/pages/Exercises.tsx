import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allExercises, type MuscleGroup, type WorkoutType } from "@/data/workouts";
import ExerciseCard from "@/components/ExerciseCard";

const muscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "legs", "arms", "core", "glutes", "calves", "pelvic-floor", "full-body"];

const Exercises = () => {
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | "all">("all");
  const [typeFilter, setTypeFilter] = useState<WorkoutType | "all">("all");

  const filtered = allExercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = muscleFilter === "all" || ex.muscleGroup === muscleFilter;
    const matchesType = typeFilter === "all" || ex.type === typeFilter;
    return matchesSearch && matchesMuscle && matchesType;
  });

  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      <h1 className="text-3xl font-black tracking-tight mb-2">Exercise Library</h1>
      <p className="text-muted-foreground mb-6">
        Learn proper form, posture tips, and common mistakes for every exercise.
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary border-border"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "gym", "home"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              typeFilter === t
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {t === "all" ? "All Types" : t === "gym" ? "Gym" : "Home"}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setMuscleFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            muscleFilter === "all"
              ? "bg-primary/20 text-primary"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          All Muscles
        </button>
        {muscleGroups.map(mg => (
          <button
            key={mg}
            onClick={() => setMuscleFilter(mg)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              muscleFilter === mg
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {mg}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No exercises found.</p>
        ) : (
          filtered.map((ex) => <ExerciseCard key={ex.id} exercise={ex} />)
        )}
      </div>
    </div>
  );
};

export default Exercises;
