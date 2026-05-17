export type MuscleGroup = "chest" | "back" | "shoulders" | "legs" | "arms" | "core" | "full-body" | "calves" | "glutes" | "pelvic-floor";
export type WorkoutType = "gym" | "home";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  type: WorkoutType;
  sets: number;
  reps: string;
  restSeconds: number;
  description: string;
  postureTips: string[];
  commonMistakes: string[];
}

export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  difficulty: Difficulty;
  durationMinutes: number;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
  description: string;
}

export interface ScheduleDay {
  day: string;
  workout: Workout | null;
  isRest: boolean;
}

const exercises: Exercise[] = [
  // --- EXISTING ---
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    muscleGroup: "chest",
    type: "gym",
    sets: 4,
    reps: "8-10",
    restSeconds: 90,
    description: "The king of chest exercises. Lie on a flat bench and press a barbell upward.",
    postureTips: [
      "Keep your feet flat on the floor",
      "Retract your shoulder blades and squeeze them together",
      "Maintain a slight arch in your lower back",
      "Grip the bar slightly wider than shoulder width",
      "Lower the bar to mid-chest level"
    ],
    commonMistakes: [
      "Flaring elbows too wide (keep at 45°)",
      "Bouncing the bar off your chest",
      "Lifting hips off the bench"
    ]
  },
  {
    id: "squats",
    name: "Barbell Back Squat",
    muscleGroup: "legs",
    type: "gym",
    sets: 4,
    reps: "6-8",
    restSeconds: 120,
    description: "The fundamental lower body compound movement for building leg strength and mass.",
    postureTips: [
      "Place the bar on your upper traps, not your neck",
      "Keep your chest up and core braced",
      "Push your knees out over your toes",
      "Descend until thighs are parallel to the floor",
      "Drive up through your heels"
    ],
    commonMistakes: [
      "Letting knees cave inward",
      "Rounding the lower back",
      "Not reaching proper depth"
    ]
  },
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    muscleGroup: "back",
    type: "gym",
    sets: 4,
    reps: "5-6",
    restSeconds: 150,
    description: "A full-body compound lift that primarily targets the posterior chain.",
    postureTips: [
      "Stand with feet hip-width apart, bar over mid-foot",
      "Hinge at hips, keep back flat and neutral spine",
      "Grip the bar just outside your knees",
      "Drive through the floor, extending hips and knees together",
      "Lock out at the top with shoulders back"
    ],
    commonMistakes: [
      "Rounding the lower back",
      "Jerking the bar off the floor",
      "Bar drifting away from your body"
    ]
  },
  {
    id: "overhead-press",
    name: "Overhead Press",
    muscleGroup: "shoulders",
    type: "gym",
    sets: 3,
    reps: "8-10",
    restSeconds: 90,
    description: "A standing press that builds shoulder strength and stability.",
    postureTips: [
      "Stand with feet shoulder-width apart",
      "Grip bar at shoulder width, elbows slightly in front",
      "Brace your core and glutes tight",
      "Press the bar straight up, moving your head out of the way",
      "Lock out arms fully at the top"
    ],
    commonMistakes: [
      "Excessive lower back arch",
      "Pressing the bar forward instead of straight up",
      "Not fully locking out at the top"
    ]
  },
  {
    id: "barbell-curl",
    name: "Barbell Curl",
    muscleGroup: "arms",
    type: "gym",
    sets: 3,
    reps: "10-12",
    restSeconds: 60,
    description: "Classic bicep isolation exercise for arm size and strength.",
    postureTips: [
      "Stand tall with shoulder-width grip",
      "Keep elbows pinned to your sides",
      "Curl the weight up in a controlled arc",
      "Squeeze at the top for a count",
      "Lower slowly — don't let gravity do the work"
    ],
    commonMistakes: [
      "Swinging your body for momentum",
      "Moving elbows forward during the curl",
      "Using too much weight with bad form"
    ]
  },
  {
    id: "pushups",
    name: "Push-Ups",
    muscleGroup: "chest",
    type: "home",
    sets: 4,
    reps: "15-20",
    restSeconds: 60,
    description: "The classic bodyweight chest and tricep exercise you can do anywhere.",
    postureTips: [
      "Hands slightly wider than shoulder-width",
      "Body in a straight line from head to heels",
      "Core and glutes engaged throughout",
      "Lower until chest nearly touches the floor",
      "Push back up to full arm extension"
    ],
    commonMistakes: [
      "Sagging hips or piking up",
      "Not going through full range of motion",
      "Flaring elbows out to 90°"
    ]
  },
  {
    id: "bodyweight-squats",
    name: "Bodyweight Squats",
    muscleGroup: "legs",
    type: "home",
    sets: 4,
    reps: "20-25",
    restSeconds: 45,
    description: "An essential lower body movement for building leg endurance and mobility.",
    postureTips: [
      "Feet shoulder-width apart, toes slightly out",
      "Keep your chest tall and look forward",
      "Sit back and down like into a chair",
      "Go as deep as mobility allows",
      "Press through the full foot to stand"
    ],
    commonMistakes: [
      "Heels coming off the ground",
      "Knees collapsing inward",
      "Leaning too far forward"
    ]
  },
  {
    id: "plank",
    name: "Plank Hold",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "45-60 sec",
    restSeconds: 45,
    description: "An isometric core exercise that builds endurance and stability.",
    postureTips: [
      "Forearms on ground, elbows under shoulders",
      "Body in a perfectly straight line",
      "Engage your core — pull belly button to spine",
      "Squeeze glutes and quads",
      "Keep your neck neutral, gaze at the floor"
    ],
    commonMistakes: [
      "Letting hips sag toward the floor",
      "Piking hips too high",
      "Holding breath instead of breathing steadily"
    ]
  },
  {
    id: "burpees",
    name: "Burpees",
    muscleGroup: "full-body",
    type: "home",
    sets: 3,
    reps: "12-15",
    restSeconds: 60,
    description: "A full-body explosive exercise that builds conditioning and burns calories.",
    postureTips: [
      "Start standing, then drop into a squat with hands on floor",
      "Jump feet back to push-up position",
      "Perform a push-up with good form",
      "Jump feet forward to hands",
      "Explode upward, reaching arms overhead"
    ],
    commonMistakes: [
      "Skipping the push-up or doing it lazily",
      "Landing with locked knees on the jump",
      "Not fully extending at the top"
    ]
  },
  {
    id: "lunges",
    name: "Walking Lunges",
    muscleGroup: "legs",
    type: "home",
    sets: 3,
    reps: "12 each leg",
    restSeconds: 60,
    description: "A unilateral leg exercise that improves balance and builds each leg independently.",
    postureTips: [
      "Take a long stride forward",
      "Lower until both knees are at 90°",
      "Keep your torso upright, core braced",
      "Front knee tracks over the ankle",
      "Push off the front foot to step through"
    ],
    commonMistakes: [
      "Knee going past toes excessively",
      "Leaning forward too much",
      "Taking too short a step"
    ]
  },
  {
    id: "pull-ups",
    name: "Pull-Ups",
    muscleGroup: "back",
    type: "home",
    sets: 4,
    reps: "6-10",
    restSeconds: 90,
    description: "The ultimate bodyweight back exercise. Use a door-frame bar or park bar.",
    postureTips: [
      "Grip slightly wider than shoulder-width, palms away",
      "Start from a dead hang with arms fully extended",
      "Pull by driving elbows down and back",
      "Chin above the bar at the top",
      "Lower with control — no dropping"
    ],
    commonMistakes: [
      "Using kipping or swinging momentum",
      "Not going to full extension at the bottom",
      "Shrugging shoulders up to ears"
    ]
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "30 sec",
    restSeconds: 30,
    description: "A dynamic core exercise that also elevates your heart rate.",
    postureTips: [
      "Start in a high plank position",
      "Drive one knee toward your chest",
      "Quickly alternate legs in a running motion",
      "Keep hips level — don't let them bounce",
      "Maintain a strong plank base throughout"
    ],
    commonMistakes: [
      "Hips bouncing up and down",
      "Not driving knees far enough forward",
      "Hands shifting out of position"
    ]
  },

  // --- NEW: ABS / CORE ---
  {
    id: "crunches",
    name: "Crunches",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "20-25",
    restSeconds: 30,
    description: "A classic abdominal exercise that isolates the upper abs.",
    postureTips: [
      "Lie on your back with knees bent, feet flat",
      "Place hands behind your head, elbows out",
      "Curl your shoulders off the ground using your abs",
      "Exhale as you crunch up, hold for a beat",
      "Lower slowly with control"
    ],
    commonMistakes: [
      "Pulling on your neck with your hands",
      "Using momentum instead of ab engagement",
      "Coming up too high — it's a crunch, not a sit-up"
    ]
  },
  {
    id: "bicycle-crunches",
    name: "Bicycle Crunches",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "20 each side",
    restSeconds: 30,
    description: "A rotational core exercise that targets the obliques and rectus abdominis.",
    postureTips: [
      "Lie on your back, hands behind head",
      "Lift shoulders off the floor",
      "Bring right elbow to left knee while extending right leg",
      "Alternate sides in a pedaling motion",
      "Keep lower back pressed into the floor"
    ],
    commonMistakes: [
      "Moving too fast without control",
      "Pulling on the neck",
      "Not fully extending the straight leg"
    ]
  },
  {
    id: "leg-raises",
    name: "Leg Raises",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "12-15",
    restSeconds: 45,
    description: "An excellent lower ab exercise. Lie flat and raise your legs to 90 degrees.",
    postureTips: [
      "Lie flat, hands under your glutes for support",
      "Keep legs straight or with a slight bend",
      "Raise legs to 90° using lower abs",
      "Lower legs slowly — don't let them drop",
      "Keep lower back pressed into the floor"
    ],
    commonMistakes: [
      "Arching the lower back off the floor",
      "Using hip flexors instead of abs",
      "Dropping legs too fast on the way down"
    ]
  },
  {
    id: "flutter-kicks",
    name: "Flutter Kicks",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "30 sec",
    restSeconds: 30,
    description: "A rapid alternating leg movement that torches the lower abs.",
    postureTips: [
      "Lie on your back, hands under glutes",
      "Lift both legs a few inches off the ground",
      "Alternate kicking legs up and down rapidly",
      "Keep legs straight and core tight",
      "Press lower back into the floor"
    ],
    commonMistakes: [
      "Lower back lifting off the floor",
      "Bending the knees too much",
      "Holding your breath"
    ]
  },
  {
    id: "russian-twist",
    name: "Russian Twist",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "20 each side",
    restSeconds: 30,
    description: "A seated rotational exercise that sculpts the obliques.",
    postureTips: [
      "Sit with knees bent, feet slightly off the floor",
      "Lean back to about 45 degrees",
      "Clasp hands together or hold a weight",
      "Rotate torso side to side, touching the floor",
      "Keep your core braced throughout"
    ],
    commonMistakes: [
      "Moving only the arms instead of the torso",
      "Rounding the back excessively",
      "Going too fast without control"
    ]
  },

  // --- NEW: LEGS ---
  {
    id: "leg-press",
    name: "Leg Press",
    muscleGroup: "legs",
    type: "gym",
    sets: 4,
    reps: "10-12",
    restSeconds: 90,
    description: "A machine-based compound leg exercise for building quad and glute strength.",
    postureTips: [
      "Sit with back flat against the pad",
      "Place feet shoulder-width on the platform",
      "Lower the weight until knees are at 90°",
      "Press through your heels to extend",
      "Don't lock your knees fully at the top"
    ],
    commonMistakes: [
      "Placing feet too high or too low",
      "Letting knees cave inward",
      "Locking knees out at full extension"
    ]
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    muscleGroup: "legs",
    type: "gym",
    sets: 3,
    reps: "8-10",
    restSeconds: 90,
    description: "A hip-hinge movement that targets hamstrings and glutes with a barbell.",
    postureTips: [
      "Hold barbell with overhand grip, feet hip-width",
      "Keep a slight bend in your knees",
      "Hinge at the hips, pushing them backward",
      "Lower the bar along your legs to mid-shin",
      "Squeeze glutes to return to standing"
    ],
    commonMistakes: [
      "Rounding the lower back",
      "Bending knees too much (it's a hip hinge)",
      "Bar drifting away from the legs"
    ]
  },
  {
    id: "jump-squats",
    name: "Jump Squats",
    muscleGroup: "legs",
    type: "home",
    sets: 3,
    reps: "15-20",
    restSeconds: 45,
    description: "An explosive plyometric squat that builds leg power and burns calories.",
    postureTips: [
      "Start in a squat position, feet shoulder-width",
      "Explode upward, jumping as high as possible",
      "Land softly on the balls of your feet",
      "Immediately sink back into the next squat",
      "Swing arms for momentum"
    ],
    commonMistakes: [
      "Landing with locked knees",
      "Not squatting deep enough before jumping",
      "Landing too loud — focus on soft landings"
    ]
  },
  {
    id: "wall-sit",
    name: "Wall Sit",
    muscleGroup: "legs",
    type: "home",
    sets: 3,
    reps: "30-45 sec",
    restSeconds: 45,
    description: "An isometric leg exercise that builds quad endurance against a wall.",
    postureTips: [
      "Press your back flat against a wall",
      "Slide down until thighs are parallel to the floor",
      "Knees at 90° directly over ankles",
      "Keep your core engaged and back flat",
      "Hold the position — don't slide down"
    ],
    commonMistakes: [
      "Thighs not reaching parallel",
      "Knees going past toes",
      "Pushing off the wall with your hands"
    ]
  },

  // --- NEW: CALVES ---
  {
    id: "calf-raises",
    name: "Standing Calf Raises",
    muscleGroup: "calves",
    type: "home",
    sets: 4,
    reps: "15-20",
    restSeconds: 30,
    description: "Target the gastrocnemius by rising onto your toes from a standing position.",
    postureTips: [
      "Stand on a step edge with heels hanging off",
      "Rise up onto the balls of your feet as high as possible",
      "Squeeze the calves hard at the top",
      "Lower slowly below the step for a full stretch",
      "Keep your legs straight throughout"
    ],
    commonMistakes: [
      "Bouncing at the bottom without pausing",
      "Not going through full range of motion",
      "Bending knees during the movement"
    ]
  },
  {
    id: "seated-calf-raise",
    name: "Seated Calf Raise",
    muscleGroup: "calves",
    type: "gym",
    sets: 4,
    reps: "12-15",
    restSeconds: 45,
    description: "A machine exercise targeting the soleus muscle of the calf while seated.",
    postureTips: [
      "Sit with pad snug on your lower thighs",
      "Place balls of feet on the foot plate",
      "Raise heels as high as possible",
      "Hold and squeeze at the top",
      "Lower slowly for a deep stretch"
    ],
    commonMistakes: [
      "Using too much weight with partial reps",
      "Bouncing the weight instead of controlled reps",
      "Not getting a full stretch at the bottom"
    ]
  },

  // --- NEW: GLUTES ---
  {
    id: "hip-thrust",
    name: "Barbell Hip Thrust",
    muscleGroup: "glutes",
    type: "gym",
    sets: 4,
    reps: "10-12",
    restSeconds: 90,
    description: "The best exercise for glute activation and growth. Uses a bench and barbell.",
    postureTips: [
      "Sit with upper back against a bench, barbell over hips",
      "Feet flat on the floor, shoulder-width apart",
      "Drive through heels, raising hips to full extension",
      "Squeeze glutes hard at the top",
      "Lower hips with control"
    ],
    commonMistakes: [
      "Hyperextending the lower back at the top",
      "Feet too far or too close to the bench",
      "Not squeezing glutes at the top"
    ]
  },
  {
    id: "glute-bridge",
    name: "Glute Bridge",
    muscleGroup: "glutes",
    type: "home",
    sets: 3,
    reps: "15-20",
    restSeconds: 30,
    description: "A bodyweight glute activation exercise perfect for home workouts.",
    postureTips: [
      "Lie on your back, knees bent, feet flat on the floor",
      "Arms at your sides, palms down",
      "Push through your heels to raise hips",
      "Squeeze glutes at the top, hold for 2 seconds",
      "Lower hips slowly back to the ground"
    ],
    commonMistakes: [
      "Pushing through toes instead of heels",
      "Not squeezing glutes at the top",
      "Arching the lower back excessively"
    ]
  },

  // --- NEW: ARMS ---
  {
    id: "tricep-dips",
    name: "Tricep Dips",
    muscleGroup: "arms",
    type: "home",
    sets: 3,
    reps: "10-15",
    restSeconds: 60,
    description: "A bodyweight exercise targeting the triceps using a chair or parallel bars.",
    postureTips: [
      "Grip the edge of a chair or parallel bars",
      "Keep your body close to the support",
      "Lower by bending elbows to about 90°",
      "Push back up to full arm extension",
      "Keep elbows pointed backward, not out"
    ],
    commonMistakes: [
      "Flaring elbows out to the sides",
      "Going too deep and straining shoulders",
      "Using legs to push up instead of arms"
    ]
  },
  {
    id: "hammer-curls",
    name: "Hammer Curls",
    muscleGroup: "arms",
    type: "gym",
    sets: 3,
    reps: "10-12",
    restSeconds: 60,
    description: "A dumbbell curl variation with neutral grip that targets the brachialis and forearms.",
    postureTips: [
      "Stand with dumbbells at sides, palms facing inward",
      "Keep elbows pinned at your sides",
      "Curl both dumbbells up simultaneously",
      "Squeeze at the top",
      "Lower with control"
    ],
    commonMistakes: [
      "Swinging the body for momentum",
      "Rotating wrists during the movement",
      "Not controlling the lowering phase"
    ]
  },

  // --- NEW: SHOULDERS ---
  {
    id: "lateral-raises",
    name: "Lateral Raises",
    muscleGroup: "shoulders",
    type: "gym",
    sets: 3,
    reps: "12-15",
    restSeconds: 60,
    description: "An isolation exercise for the lateral deltoids to build wider shoulders.",
    postureTips: [
      "Stand with dumbbells at your sides",
      "Raise arms out to the sides until parallel to the floor",
      "Keep a slight bend in your elbows",
      "Lead with your elbows, not your hands",
      "Lower slowly back to starting position"
    ],
    commonMistakes: [
      "Using too much weight and swinging",
      "Raising arms above shoulder level",
      "Shrugging shoulders up toward ears"
    ]
  },

  // --- NEW: CHEST (GYM) ---
  {
    id: "dumbbell-fly",
    name: "Dumbbell Chest Fly",
    muscleGroup: "chest",
    type: "gym",
    sets: 3,
    reps: "10-12",
    restSeconds: 60,
    description: "An isolation chest exercise that stretches and contracts the pec muscles.",
    postureTips: [
      "Lie on a flat bench with a dumbbell in each hand",
      "Start with arms extended above chest, slight elbow bend",
      "Open arms wide in an arc until you feel a chest stretch",
      "Squeeze chest to bring the dumbbells back together",
      "Maintain the same elbow bend throughout"
    ],
    commonMistakes: [
      "Straightening arms and turning it into a press",
      "Going too deep and straining shoulders",
      "Using too much weight with poor control"
    ]
  },

  // --- NEW: BACK (GYM) ---
  {
    id: "cable-rows",
    name: "Seated Cable Rows",
    muscleGroup: "back",
    type: "gym",
    sets: 3,
    reps: "10-12",
    restSeconds: 60,
    description: "A cable machine exercise that builds mid-back thickness and lat width.",
    postureTips: [
      "Sit upright with feet on the platform, knees slightly bent",
      "Grip the handle with arms fully extended",
      "Pull the handle toward your lower chest",
      "Squeeze shoulder blades together at the end",
      "Return the handle slowly with control"
    ],
    commonMistakes: [
      "Leaning too far back to pull the weight",
      "Rounding the upper back",
      "Not squeezing the shoulder blades together"
    ]
  },

  // --- NEW: MORE ABS ---
  {
    id: "dead-bug",
    name: "Dead Bug",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "10 each side",
    restSeconds: 30,
    description: "A core stability exercise where you extend opposite arm and leg while keeping your back flat.",
    postureTips: [
      "Lie on your back with arms extended toward ceiling",
      "Bend knees at 90° above hips",
      "Slowly extend opposite arm and leg toward the floor",
      "Keep lower back pressed into the ground the entire time",
      "Return to start and alternate sides"
    ],
    commonMistakes: [
      "Arching the lower back off the floor",
      "Moving too quickly without control",
      "Holding your breath instead of breathing steadily"
    ]
  },
  {
    id: "toe-touches",
    name: "Toe Touches",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "15-20",
    restSeconds: 30,
    description: "Lie on your back with legs straight up and reach your hands to touch your toes.",
    postureTips: [
      "Lie flat with legs pointing straight up at 90°",
      "Reach both hands toward your toes",
      "Lift shoulder blades off the floor using your abs",
      "Lower back down with control",
      "Keep legs as straight as possible"
    ],
    commonMistakes: [
      "Using neck muscles to pull up instead of abs",
      "Bending legs excessively",
      "Dropping back down too fast"
    ]
  },
  {
    id: "v-ups",
    name: "V-Ups",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "12-15",
    restSeconds: 45,
    description: "An advanced ab exercise where you simultaneously raise legs and torso to form a V shape.",
    postureTips: [
      "Start lying flat with arms extended overhead",
      "Simultaneously raise legs and upper body",
      "Reach hands toward toes at the top",
      "Keep legs and arms straight throughout",
      "Lower back down with control"
    ],
    commonMistakes: [
      "Bending knees instead of keeping legs straight",
      "Using momentum instead of controlled movement",
      "Not engaging core fully — relying on hip flexors"
    ]
  },
  {
    id: "heel-taps",
    name: "Heel Taps",
    muscleGroup: "core",
    type: "home",
    sets: 3,
    reps: "20 each side",
    restSeconds: 30,
    description: "An oblique exercise — lie on your back with knees bent and alternate tapping each heel.",
    postureTips: [
      "Lie on your back with knees bent, feet flat on the floor",
      "Lift shoulder blades slightly off the ground",
      "Reach one hand to tap the same-side heel",
      "Alternate sides in a controlled side-bend motion",
      "Keep core braced throughout"
    ],
    commonMistakes: [
      "Lifting too high and turning it into a crunch",
      "Moving hips instead of bending at the waist",
      "Going too fast without feeling the obliques"
    ]
  },

  // --- NEW: PELVIC FLOOR / KEGEL ---
  {
    id: "kegel",
    name: "Kegel Hold",
    muscleGroup: "pelvic-floor",
    type: "home",
    sets: 3,
    reps: "10 × 5s hold",
    restSeconds: 30,
    description: "Strengthen your pelvic floor muscles by contracting and holding. Benefits bladder control, posture, and core stability.",
    postureTips: [
      "Sit or lie in a comfortable position",
      "Tighten your pelvic floor muscles (as if stopping urination)",
      "Hold the contraction for 5 seconds",
      "Relax fully for 5 seconds",
      "Keep breathing normally — don't hold your breath"
    ],
    commonMistakes: [
      "Squeezing glutes or thighs instead of pelvic floor",
      "Holding your breath during the contraction",
      "Bearing down instead of lifting up"
    ]
  },
  {
    id: "reverse-kegel",
    name: "Reverse Kegel",
    muscleGroup: "pelvic-floor",
    type: "home",
    sets: 3,
    reps: "10 × 5s hold",
    restSeconds: 30,
    description: "The opposite of a kegel — focus on relaxing and lengthening the pelvic floor muscles for balance and flexibility.",
    postureTips: [
      "Sit comfortably with relaxed posture",
      "Instead of tightening, gently push down and relax the pelvic floor",
      "Breathe deeply into your belly as you release",
      "Hold the relaxed position for 5 seconds",
      "Return to neutral and repeat"
    ],
    commonMistakes: [
      "Bearing down too forcefully",
      "Confusing it with a regular kegel (tightening)",
      "Tensing the abdomen instead of relaxing the pelvic floor"
    ]
  },
];

// Helper to find exercise by ID
const ex = (id: string) => exercises.find(e => e.id === id)!;

const gymWorkouts: Workout[] = [
  {
    id: "gym-push",
    name: "Push Day",
    type: "gym",
    difficulty: "intermediate",
    durationMinutes: 60,
    muscleGroups: ["chest", "shoulders", "arms"],
    exercises: [ex("bench-press"), ex("dumbbell-fly"), ex("overhead-press"), ex("lateral-raises")],
    description: "Focus on pushing movements — chest, shoulders, and triceps."
  },
  {
    id: "gym-pull",
    name: "Pull Day",
    type: "gym",
    difficulty: "intermediate",
    durationMinutes: 55,
    muscleGroups: ["back", "arms"],
    exercises: [ex("deadlift"), ex("cable-rows"), ex("barbell-curl"), ex("hammer-curls")],
    description: "Build a strong back and biceps with pulling movements."
  },
  {
    id: "gym-legs",
    name: "Leg Day",
    type: "gym",
    difficulty: "advanced",
    durationMinutes: 65,
    muscleGroups: ["legs", "glutes", "calves"],
    exercises: [ex("squats"), ex("leg-press"), ex("romanian-deadlift"), ex("hip-thrust"), ex("seated-calf-raise")],
    description: "Heavy compound leg training for maximum lower body development."
  },
  {
    id: "gym-shoulders-arms",
    name: "Shoulders & Arms",
    type: "gym",
    difficulty: "intermediate",
    durationMinutes: 50,
    muscleGroups: ["shoulders", "arms"],
    exercises: [ex("overhead-press"), ex("lateral-raises"), ex("barbell-curl"), ex("hammer-curls")],
    description: "Dedicated shoulder and arm work for balanced upper body development."
  },
  {
    id: "gym-glutes",
    name: "Glute Focus",
    type: "gym",
    difficulty: "intermediate",
    durationMinutes: 45,
    muscleGroups: ["glutes", "legs"],
    exercises: [ex("hip-thrust"), ex("romanian-deadlift"), ex("leg-press")],
    description: "Targeted glute training with heavy compound movements."
  },
];

const homeWorkouts: Workout[] = [
  {
    id: "home-hiit",
    name: "HIIT Blast",
    type: "home",
    difficulty: "intermediate",
    durationMinutes: 30,
    muscleGroups: ["full-body", "core"],
    exercises: [ex("burpees"), ex("mountain-climbers"), ex("jump-squats"), ex("pushups")],
    description: "High-intensity interval training to torch calories at home."
  },
  {
    id: "home-strength",
    name: "Bodyweight Strength",
    type: "home",
    difficulty: "beginner",
    durationMinutes: 40,
    muscleGroups: ["chest", "legs", "back"],
    exercises: [ex("pushups"), ex("bodyweight-squats"), ex("pull-ups"), ex("lunges")],
    description: "Build strength with zero equipment using your bodyweight."
  },
  {
    id: "home-core",
    name: "Core Crusher",
    type: "home",
    difficulty: "beginner",
    durationMinutes: 20,
    muscleGroups: ["core"],
    exercises: [ex("plank"), ex("crunches"), ex("bicycle-crunches"), ex("mountain-climbers")],
    description: "Sculpt your midsection with focused core work."
  },
  {
    id: "home-abs",
    name: "Abs Shredder",
    type: "home",
    difficulty: "intermediate",
    durationMinutes: 25,
    muscleGroups: ["core"],
    exercises: [ex("leg-raises"), ex("bicycle-crunches"), ex("russian-twist"), ex("flutter-kicks"), ex("plank")],
    description: "An intense ab-focused workout to build a strong, defined midsection."
  },
  {
    id: "home-legs",
    name: "Leg Burner",
    type: "home",
    difficulty: "intermediate",
    durationMinutes: 35,
    muscleGroups: ["legs", "calves", "glutes"],
    exercises: [ex("bodyweight-squats"), ex("lunges"), ex("jump-squats"), ex("wall-sit"), ex("calf-raises"), ex("glute-bridge")],
    description: "A complete lower body workout — quads, hamstrings, glutes, and calves."
  },
  {
    id: "home-glutes",
    name: "Glute & Booty",
    type: "home",
    difficulty: "beginner",
    durationMinutes: 20,
    muscleGroups: ["glutes", "legs"],
    exercises: [ex("glute-bridge"), ex("lunges"), ex("wall-sit"), ex("calf-raises")],
    description: "Target your glutes and lower body with bodyweight moves."
  },
  {
    id: "home-arms",
    name: "Arms & Upper Body",
    type: "home",
    difficulty: "intermediate",
    durationMinutes: 25,
    muscleGroups: ["arms", "chest", "back"],
    exercises: [ex("pushups"), ex("tricep-dips"), ex("pull-ups")],
    description: "Build arm and upper body strength without any equipment."
  },
  {
    id: "home-pelvic",
    name: "Pelvic Floor Strength",
    type: "home",
    difficulty: "beginner",
    durationMinutes: 10,
    muscleGroups: ["pelvic-floor", "core"],
    exercises: [ex("kegel"), ex("reverse-kegel"), ex("glute-bridge"), ex("dead-bug")],
    description: "Strengthen your pelvic floor and deep core with targeted exercises."
  },
  {
    id: "home-abs-advanced",
    name: "Advanced Abs",
    type: "home",
    difficulty: "advanced",
    durationMinutes: 25,
    muscleGroups: ["core"],
    exercises: [ex("v-ups"), ex("toe-touches"), ex("heel-taps"), ex("dead-bug"), ex("leg-raises"), ex("flutter-kicks")],
    description: "A challenging ab routine with V-ups, toe touches, and more for a shredded core."
  },
];

export const allWorkouts = [...gymWorkouts, ...homeWorkouts];
export const allExercises = exercises;

export const weeklySchedule: ScheduleDay[] = [
  { day: "Monday", workout: gymWorkouts[0], isRest: false },
  { day: "Tuesday", workout: homeWorkouts[0], isRest: false },
  { day: "Wednesday", workout: gymWorkouts[1], isRest: false },
  { day: "Thursday", workout: homeWorkouts[3], isRest: false },
  { day: "Friday", workout: gymWorkouts[2], isRest: false },
  { day: "Saturday", workout: homeWorkouts[4], isRest: false },
  { day: "Sunday", workout: null, isRest: true },
];
