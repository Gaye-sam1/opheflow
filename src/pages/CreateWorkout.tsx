import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allExercises, type Exercise, type WorkoutType, type Difficulty, type MuscleGroup } from "@/data/workouts";
import { useCustomWorkouts } from "@/hooks/useCustomWorkouts";
import { toast } from "@/hooks/use-toast";

const muscleGroups: MuscleGroup[] = ["chest", "back", "shoulders", "legs", "arms", "core", "full-body"];

interface CustomExercise {
  tempId: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: string;
  restSeconds: number;
}

const CreateWorkout = () => {
  const navigate = useNavigate();
  const { addWorkout } = useCustomWorkouts();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<WorkoutType>("gym");
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const [duration, setDuration] = useState(30);

  // Exercises from library
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState("");

  // Custom exercises
  const [customExercises, setCustomExercises] = useState<CustomExercise[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [newExName, setNewExName] = useState("");
  const [newExMuscle, setNewExMuscle] = useState<MuscleGroup>("chest");
  const [newExSets, setNewExSets] = useState(3);
  const [newExReps, setNewExReps] = useState("10");
  const [newExRest, setNewExRest] = useState(60);

  const filteredLibrary = allExercises.filter(
    (ex) =>
      !selectedExercises.some((s) => s.id === ex.id) &&
      ex.name.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  const addFromLibrary = (ex: Exercise) => {
    setSelectedExercises((prev) => [...prev, ex]);
  };

  const removeLibraryExercise = (id: string) => {
    setSelectedExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const addCustomExercise = () => {
    const trimmed = newExName.trim();
    if (!trimmed) return;
    if (trimmed.length > 100) {
      toast({ title: "Name too long", description: "Exercise name must be under 100 characters.", variant: "destructive" });
      return;
    }
    setCustomExercises((prev) => [
      ...prev,
      {
        tempId: crypto.randomUUID(),
        name: trimmed,
        muscleGroup: newExMuscle,
        sets: newExSets,
        reps: newExReps.trim() || "10",
        restSeconds: newExRest,
      },
    ]);
    setNewExName("");
    setNewExSets(3);
    setNewExReps("10");
    setNewExRest(60);
    setShowCustomForm(false);
  };

  const removeCustomExercise = (id: string) => {
    setCustomExercises((prev) => prev.filter((e) => e.tempId !== id));
  };

  const totalExercises = selectedExercises.length + customExercises.length;

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();

    if (!trimmedName) {
      toast({ title: "Missing name", description: "Please enter a workout name.", variant: "destructive" });
      return;
    }
    if (trimmedName.length > 80) {
      toast({ title: "Name too long", description: "Workout name must be under 80 characters.", variant: "destructive" });
      return;
    }
    if (totalExercises === 0) {
      toast({ title: "No exercises", description: "Add at least one exercise.", variant: "destructive" });
      return;
    }

    const allMuscles = new Set<MuscleGroup>();
    selectedExercises.forEach((e) => allMuscles.add(e.muscleGroup));
    customExercises.forEach((e) => allMuscles.add(e.muscleGroup));

    const customAsExercises: Exercise[] = customExercises.map((ce) => ({
      id: `custom-${ce.tempId}`,
      name: ce.name,
      muscleGroup: ce.muscleGroup,
      type,
      sets: ce.sets,
      reps: ce.reps,
      restSeconds: ce.restSeconds,
      description: "",
      postureTips: [],
      commonMistakes: [],
    }));

    const workout = {
      id: `custom-${crypto.randomUUID()}`,
      name: trimmedName,
      description: trimmedDesc || `Custom ${type} workout`,
      type,
      difficulty,
      durationMinutes: duration,
      muscleGroups: Array.from(allMuscles),
      exercises: [...selectedExercises, ...customAsExercises],
    };

    addWorkout(workout);
    toast({ title: "🎉 Workout Created!", description: `${trimmedName} added to your workouts.` });
    navigate("/workouts");
  };

  return (
    <div className="pt-20 md:pt-20 pb-24 md:pb-12 container mx-auto px-6">
      <Link to="/workouts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Workouts
      </Link>

      <h1 className="text-3xl font-black tracking-tight mb-6">Create Workout</h1>

      {/* Basic Info */}
      <div className="space-y-4 mb-8">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Workout Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My Upper Body Blast"
            maxLength={80}
            className="bg-secondary border-border"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your workout..."
            maxLength={300}
            className="bg-secondary border-border resize-none"
            rows={2}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Type</label>
            <Select value={type} onValueChange={(v) => setType(v as WorkoutType)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gym">🏋️ Gym</SelectItem>
                <SelectItem value="home">🏠 Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Difficulty</label>
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Duration (min)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Math.max(1, Math.min(180, Number(e.target.value) || 1)))}
              min={1}
              max={180}
              className="bg-secondary border-border"
            />
          </div>
        </div>
      </div>

      {/* Exercises Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            Exercises {totalExercises > 0 && <span className="text-primary">({totalExercises})</span>}
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowExercisePicker(!showExercisePicker)}
              className="text-xs"
            >
              <Dumbbell className="h-3.5 w-3.5 mr-1" /> From Library
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Custom
            </Button>
          </div>
        </div>

        {/* Exercise Picker */}
        {showExercisePicker && (
          <div className="gradient-card rounded-xl border border-border p-4 mb-4">
            <Input
              value={exerciseSearch}
              onChange={(e) => setExerciseSearch(e.target.value)}
              placeholder="Search exercises..."
              className="bg-secondary border-border mb-3"
            />
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filteredLibrary.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-2">No exercises found</p>
              ) : (
                filteredLibrary.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => addFromLibrary(ex)}
                    className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium">{ex.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {ex.sets}×{ex.reps} · {ex.muscleGroup}
                      </span>
                    </div>
                    <Plus className="h-4 w-4 text-primary" />
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Custom Exercise Form */}
        {showCustomForm && (
          <div className="gradient-card rounded-xl border border-border p-4 mb-4 space-y-3">
            <Input
              value={newExName}
              onChange={(e) => setNewExName(e.target.value)}
              placeholder="Exercise name"
              maxLength={100}
              className="bg-secondary border-border"
            />
            <div className="grid grid-cols-2 gap-3">
              <Select value={newExMuscle} onValueChange={(v) => setNewExMuscle(v as MuscleGroup)}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {muscleGroups.map((mg) => (
                    <SelectItem key={mg} value={mg} className="capitalize">{mg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  value={newExSets}
                  onChange={(e) => setNewExSets(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                  placeholder="Sets"
                  min={1}
                  max={20}
                  className="bg-secondary border-border"
                />
                <Input
                  value={newExReps}
                  onChange={(e) => setNewExReps(e.target.value)}
                  placeholder="Reps"
                  maxLength={10}
                  className="bg-secondary border-border"
                />
                <Input
                  type="number"
                  value={newExRest}
                  onChange={(e) => setNewExRest(Math.max(0, Math.min(300, Number(e.target.value) || 0)))}
                  placeholder="Rest"
                  min={0}
                  max={300}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <Button size="sm" onClick={addCustomExercise} className="gradient-primary text-primary-foreground">
              Add Exercise
            </Button>
          </div>
        )}

        {/* Selected exercises list */}
        <div className="space-y-2">
          {selectedExercises.map((ex, i) => (
            <div key={ex.id} className="flex items-center gap-3 gradient-card rounded-lg border border-border p-3">
              <span className="text-xs font-bold text-primary bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ex.name}</p>
                <p className="text-xs text-muted-foreground">{ex.sets}×{ex.reps} · {ex.muscleGroup}</p>
              </div>
              <button onClick={() => removeLibraryExercise(ex.id)} className="text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {customExercises.map((ex, i) => (
            <div key={ex.tempId} className="flex items-center gap-3 gradient-card rounded-lg border border-primary/20 p-3">
              <span className="text-xs font-bold text-primary bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center">
                {selectedExercises.length + i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{ex.name}</p>
                <p className="text-xs text-muted-foreground">{ex.sets}×{ex.reps} · {ex.muscleGroup} · ✨ Custom</p>
              </div>
              <button onClick={() => removeCustomExercise(ex.tempId)} className="text-muted-foreground hover:text-destructive">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {totalExercises === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Dumbbell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No exercises added yet.</p>
              <p className="text-xs mt-1">Pick from the library or create your own.</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} className="w-full gradient-primary text-primary-foreground font-semibold shadow-glow py-6 text-base">
        Save Workout
      </Button>
    </div>
  );
};

export default CreateWorkout;
