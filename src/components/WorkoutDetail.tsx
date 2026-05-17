import { saveCompletedWorkout } from "@/utils/workoutStorage";

// Inside your WorkoutDetail component
const handleCompleteWorkout = () => {
  if (!workout) return;

  saveCompletedWorkout({
    id: crypto.randomUUID(),
    name: workout.name,
    date: new Date().toLocaleDateString(),
    calories: 320,
    duration: 45,
  });

  alert("Workout Completed 🔥");
};

<button
  onClick={handleCompleteWorkout}
  className="w-full bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all py-4 rounded-2xl text-lg font-bold mt-8 shadow-lg shadow-green-500/20"
>
  Complete Workout ✅
</button>