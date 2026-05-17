import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { allWorkouts, type WorkoutType } from "@/data/workouts";
import { useCustomWorkouts } from "@/hooks/useCustomWorkouts";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";

const Workouts = () => {
  const [filter, setFilter] = useState<"all" | WorkoutType>("all");
  const { customWorkouts } = useCustomWorkouts();

  const combined = [...allWorkouts, ...customWorkouts];
  const filtered = filter === "all" ? combined : combined.filter(w => w.type === filter);

  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-black tracking-tight">Workouts</h1>
        <Link to="/workouts/create">
          <Button size="sm" className="gradient-primary text-primary-foreground font-semibold shadow-glow">
            <Plus className="h-4 w-4 mr-1" /> Create
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground mb-6">Browse gym and home workout programs.</p>

      <div className="flex gap-2 mb-8">
        {(["all", "gym", "home"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f === "all" ? "All" : f === "gym" ? "🏋️ Gym" : "🏠 Home"}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((w) => (
          <WorkoutCard key={w.id} workout={w} isCustom={w.id.startsWith("custom-")} />
        ))}
      </div>
    </div>
  );
};

export default Workouts;
