import {
  getWorkoutHistory,
} from "@/utils/workoutStorage";

export default function History() {
  const workouts =
    getWorkoutHistory();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8 pb-28">
      <h1 className="text-4xl font-bold mb-8">
        Workout History
      </h1>

      <div className="space-y-4">
        {workouts.length === 0 ? (
          <div className="text-slate-400">
            No workouts completed yet.
          </div>
        ) : (
          workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <h2 className="text-2xl font-bold">
                {workout.name}
              </h2>

              <p className="text-slate-400 mt-2">
                📅 {workout.date}
              </p>

              <div className="flex gap-4 mt-4">
                <div className="bg-slate-800 px-4 py-2 rounded-xl">
                  🔥 {workout.calories} kcal
                </div>

                <div className="bg-slate-800 px-4 py-2 rounded-xl">
                  ⏱️ {workout.duration} min
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}