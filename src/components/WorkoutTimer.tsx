import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, SkipForward, RotateCcw, X, Timer, Dumbbell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Exercise } from "@/data/workouts";
import { exerciseImages } from "@/data/exerciseImages";

type TimerPhase = "ready" | "working" | "resting" | "finished";
type WindowWithWebkitAudioContext = Window & {
  webkitAudioContext?: typeof AudioContext;
};

interface WorkoutTimerProps {
  exercises: Exercise[];
  onComplete: () => void;
  onClose: () => void;
}

const WorkoutTimer = ({ exercises, onComplete, onClose }: WorkoutTimerProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<TimerPhase>("ready");
  const [restTime, setRestTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const exercise = exercises[exerciseIndex];
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets =
    exercises.slice(0, exerciseIndex).reduce((sum, ex) => sum + ex.sets, 0) + (currentSet - 1);
  const overallProgress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  // Elapsed timer
  useEffect(() => {
    if (phase !== "ready" && phase !== "finished") {
      const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
      return () => clearInterval(id);
    }
  }, [phase]);

  // Alert when rest finishes
  const triggerAlert = useCallback(() => {
    // Vibration
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
    // Audio beep using Web Audio API
    try {
      const AudioContextClass =
        window.AudioContext || (window as WindowWithWebkitAudioContext).webkitAudioContext;

      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      const playBeep = (time: number, freq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
        osc.start(time);
        osc.stop(time + 0.3);
      };
      playBeep(ctx.currentTime, 880);
      playBeep(ctx.currentTime + 0.35, 880);
      playBeep(ctx.currentTime + 0.7, 1320);
    } catch {
      return;
    }
  }, []);

  // Rest countdown
  useEffect(() => {
    if (phase === "resting" && isRunning && restTime > 0) {
      intervalRef.current = setInterval(() => {
        setRestTime((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setPhase("working");
            setIsRunning(false);
            triggerAlert();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [phase, isRunning, restTime, triggerAlert]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const startWorkout = () => {
    setPhase("working");
    setIsRunning(false);
  };

  const completeSet = useCallback(() => {
    const isLastSet = currentSet >= exercise.sets;
    const isLastExercise = exerciseIndex >= exercises.length - 1;

    if (isLastSet && isLastExercise) {
      setPhase("finished");
      onComplete();
      return;
    }

    if (isLastSet) {
      // Move to next exercise
      setExerciseIndex((i) => i + 1);
      setCurrentSet(1);
      setRestTime(exercise.restSeconds);
      setPhase("resting");
      setIsRunning(true);
    } else {
      // Next set, start rest
      setCurrentSet((s) => s + 1);
      setRestTime(exercise.restSeconds);
      setPhase("resting");
      setIsRunning(true);
    }
  }, [currentSet, exercise, exerciseIndex, exercises.length, onComplete]);

  const skipRest = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRestTime(0);
    setPhase("working");
    setIsRunning(false);
  };

  const togglePause = () => setIsRunning((r) => !r);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setExerciseIndex(0);
    setCurrentSet(1);
    setPhase("ready");
    setIsRunning(false);
    setRestTime(0);
    setElapsedSeconds(0);
  };

  const image = exerciseImages[exercise?.id];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          <span className="font-bold">Workout Timer</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-mono">{formatTime(elapsedSeconds)}</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={overallProgress} className="h-1 rounded-none" />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        {phase === "ready" && (
          <div className="text-center space-y-6 max-w-sm">
            <Dumbbell className="h-16 w-16 text-primary mx-auto" />
            <div>
              <h2 className="text-2xl font-black">Ready to Go?</h2>
              <p className="text-muted-foreground mt-2">
                {exercises.length} exercises · {totalSets} total sets
              </p>
            </div>
            <Button onClick={startWorkout} size="lg" className="gradient-primary text-primary-foreground font-bold shadow-glow px-8">
              <Play className="h-5 w-5 mr-2" /> Start Workout
            </Button>
          </div>
        )}

        {phase === "working" && exercise && (
          <div className="text-center space-y-6 max-w-sm w-full">
            {image && (
              <img src={image} alt={exercise.name} className="w-32 h-32 object-contain mx-auto rounded-xl" />
            )}
            <div>
              <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                Exercise {exerciseIndex + 1} of {exercises.length}
              </p>
              <h2 className="text-2xl font-black">{exercise.name}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{exercise.muscleGroup}</p>
            </div>

            <div className="gradient-card rounded-2xl border border-border p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-black text-primary">{currentSet}</p>
                  <p className="text-xs text-muted-foreground">of {exercise.sets} sets</p>
                </div>
                <div>
                  <p className="text-3xl font-black">{exercise.reps}</p>
                  <p className="text-xs text-muted-foreground">reps</p>
                </div>
                <div>
                  <p className="text-3xl font-black">{exercise.restSeconds}s</p>
                  <p className="text-xs text-muted-foreground">rest</p>
                </div>
              </div>
            </div>

            <Button onClick={completeSet} size="lg" className="gradient-primary text-primary-foreground font-bold shadow-glow px-8 w-full py-6 text-base">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              {currentSet >= exercise.sets && exerciseIndex >= exercises.length - 1
                ? "Finish Workout"
                : "Set Complete"}
            </Button>
          </div>
        )}

        {phase === "resting" && (
          <div className="text-center space-y-6 max-w-sm w-full">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Rest Time</p>
              <p className="text-7xl font-black text-primary font-mono">{restTime}</p>
              <p className="text-muted-foreground mt-2 text-sm">seconds remaining</p>
            </div>

            {/* Circular progress indicator */}
            <div className="relative w-40 h-40 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                <circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="hsl(var(--primary))" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={
                    exercise ? 2 * Math.PI * 70 * (1 - restTime / exercise.restSeconds) : 0
                  }
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black font-mono text-primary">{restTime}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Next: <span className="text-foreground font-medium">
                {currentSet <= exercise.sets
                  ? `${exercise.name} — Set ${currentSet}`
                  : exercises[exerciseIndex]?.name ?? "Done"}
              </span>
            </p>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={togglePause} className="px-6">
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Resume"}
              </Button>
              <Button variant="outline" onClick={skipRest} className="px-6">
                <SkipForward className="h-4 w-4 mr-2" /> Skip Rest
              </Button>
            </div>
          </div>
        )}

        {phase === "finished" && (
          <div className="text-center space-y-6 max-w-sm">
            <div className="text-6xl">🎉</div>
            <div>
              <h2 className="text-2xl font-black">Workout Complete!</h2>
              <p className="text-muted-foreground mt-2">
                {exercises.length} exercises · {totalSets} sets · {formatTime(elapsedSeconds)}
              </p>
            </div>
            <Button onClick={onClose} size="lg" className="gradient-primary text-primary-foreground font-bold shadow-glow px-8">
              Done
            </Button>
          </div>
        )}
      </div>

      {/* Footer with reset */}
      {phase !== "ready" && phase !== "finished" && (
        <div className="p-4 border-t border-border flex justify-center">
          <Button variant="ghost" size="sm" onClick={resetTimer} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkoutTimer;
