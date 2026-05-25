export const defaultTemplates = [
  {
    "id": "full_body_3_day",
    "name": "Full Body Starter",
    "splitType": "full_body",
    "daysPerWeek": 3,
    "frequencyPerMuscle": "2-3x/week",
    "experienceLevel": "beginner",
    "goal": ["hypertrophy", "general_strength", "body_recomposition"],
    "description": "A 3-day full body program for beginners focused on learning movement patterns, building balanced muscle, and training each muscle 2-3x/week.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "fb_day_1" },
      { "dayNumber": 2, "label": "Wednesday", "workoutDayId": "fb_day_2" },
      { "dayNumber": 3, "label": "Friday", "workoutDayId": "fb_day_3" }
    ],
    "workoutDays": [
      {
        "id": "fb_day_1",
        "name": "Full Body A (Squat Focus)",
        "focusArea": ["quads", "chest", "back", "shoulders", "arms", "core"],
        "warmup": "5-10 min brisk walk + 1-2 ramp-up sets for first compound lift",
        "notes": "Leave 1-3 reps in reserve on most sets. Focus on technique.",
        "exercises": [
          {
            "id": "ex_fb_1",
            "exerciseName": "Barbell Back Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "6-8",
            "repRange": { "min": 6, "max": 8 },
            "restSeconds": 120,
            "tempo": "2-0-1",
            "rir": 2,
            "substitutions": ["Goblet Squat", "Leg Press"],
            "notes": "Brace hard and control the eccentric."
          },
          {
            "id": "ex_fb_1b",
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 2,
            "reps": "8-10",
            "repRange": { "min": 8, "max": 10 },
            "restSeconds": 120,
            "tempo": "3-0-1",
            "rir": 2,
            "substitutions": ["Dumbbell RDL", "Seated Leg Curl"],
            "notes": "Push hips back; feel stretch in hamstrings."
          },
          {
            "id": "ex_fb_2",
            "exerciseName": "Flat Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "6-8",
            "repRange": { "min": 6, "max": 8 },
            "restSeconds": 120,
            "tempo": "2-1-1",
            "rir": 2,
            "substitutions": ["Dumbbell Bench Press", "Machine Chest Press"],
            "notes": "Use full range with shoulder blades set."
          },
          {
            "id": "ex_fb_3",
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "repRange": { "min": 8, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-1-1",
            "rir": 2,
            "substitutions": ["Assisted Pull-Up", "Chest Supported Row"],
            "notes": "Pull elbows toward hips."
          },
          {
            "id": "ex_fb_4",
            "exerciseName": "Seated Dumbbell Shoulder Press",
            "muscleGroup": "shoulders",
            "sets": 2,
            "reps": "8-10",
            "repRange": { "min": 8, "max": 10 },
            "restSeconds": 90,
            "tempo": "2-0-1",
            "rir": 2,
            "substitutions": ["Machine Shoulder Press", "Barbell Overhead Press"],
            "notes": "Do not overarch lower back."
          },
          {
            "id": "ex_fb_5",
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "10-12",
            "repRange": { "min": 10, "max": 12 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Overhead Rope Extension", "Dips Machine"],
            "notes": "Lock elbows near torso."
          },
          {
            "id": "ex_fb_6",
            "exerciseName": "Standing Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "10-12",
            "repRange": { "min": 10, "max": 12 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["EZ Bar Curl", "Cable Curl"],
            "notes": "Avoid swinging."
          },
          {
            "id": "ex_fb_7",
            "exerciseName": "Plank",
            "muscleGroup": "core",
            "sets": 2,
            "reps": "30-45s",
            "repRange": { "min": 30, "max": 45 },
            "restSeconds": 45,
            "tempo": "iso",
            "rir": 1,
            "substitutions": ["Dead Bug", "Pallof Press"],
            "notes": "Neutral spine; avoid hip sag."
          }
        ]
      },
      {
        "id": "fb_day_2",
        "name": "Full Body B (Hinge & Vertical)",
        "focusArea": ["hamstrings", "glutes", "back", "shoulders", "chest", "arms"],
        "warmup": "5-8 min bike + hip hinge and shoulder mobility",
        "notes": "Slightly higher reps; focus on smooth tempo.",
        "exercises": [
          {
            "id": "ex_fb2_1",
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "6-10",
            "repRange": { "min": 6, "max": 10 },
            "restSeconds": 120,
            "tempo": "3-0-1",
            "rir": 2,
            "substitutions": ["Good Morning", "Seated Leg Curl"],
            "notes": "Keep bar close; hinge at hips."
          },
          {
            "id": "ex_fb2_2",
            "exerciseName": "Walking Lunge",
            "muscleGroup": "quads",
            "sets": 2,
            "reps": "10-12/leg",
            "repRange": { "min": 10, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-0-1",
            "rir": 2,
            "substitutions": ["Reverse Lunge", "Split Squat"],
            "notes": "Long stride; controlled knee tracking."
          },
          {
            "id": "ex_fb2_3",
            "exerciseName": "Overhead Press",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "6-8",
            "repRange": { "min": 6, "max": 8 },
            "restSeconds": 120,
            "tempo": "2-0-1",
            "rir": 2,
            "substitutions": ["Seated DB Press", "Machine Shoulder Press"],
            "notes": "Tight core; bar over mid-foot."
          },
          {
            "id": "ex_fb2_4",
            "exerciseName": "Pull-Up or Assisted Pull-Up",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "6-10",
            "repRange": { "min": 6, "max": 10 },
            "restSeconds": 120,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Lat Pulldown"],
            "notes": "Chest up; full stretch at bottom."
          },
          {
            "id": "ex_fb2_5",
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "8-12",
            "repRange": { "min": 8, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Incline Barbell Press", "Machine Incline Press"],
            "notes": "Slight arch; control the bottom."
          },
          {
            "id": "ex_fb2_6",
            "exerciseName": "Cable Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 2,
            "reps": "12-15",
            "repRange": { "min": 12, "max": 15 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["DB Lateral Raise"],
            "notes": "Lead with elbows; slight torso lean."
          },
          {
            "id": "ex_fb2_7",
            "exerciseName": "Hanging Knee Raise",
            "muscleGroup": "core",
            "sets": 2,
            "reps": "10-15",
            "repRange": { "min": 10, "max": 15 },
            "restSeconds": 60,
            "tempo": "2-0-1",
            "rir": 1,
            "substitutions": ["Captain’s Chair", "Reverse Crunch"],
            "notes": "Posterior pelvic tilt at top."
          }
        ]
      },
      {
        "id": "fb_day_3",
        "name": "Full Body C (Mixed / Higher Reps)",
        "focusArea": ["quads", "glutes", "back", "chest", "shoulders", "arms", "calves"],
        "warmup": "5-10 min brisk cardio + dynamic full-body warm-up",
        "notes": "Higher rep focus and slightly lighter loads. Get a good pump.",
        "exercises": [
          {
            "id": "ex_fb3_1",
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "repRange": { "min": 10, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-0-1",
            "rir": 1,
            "substitutions": ["Hack Squat", "Goblet Squat"],
            "notes": "Control depth; avoid bouncing."
          },
          {
            "id": "ex_fb3_2",
            "exerciseName": "Hip Thrust",
            "muscleGroup": "glutes",
            "sets": 2,
            "reps": "8-12",
            "repRange": { "min": 8, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Glute Bridge", "Cable Pull-Through"],
            "notes": "Pause and squeeze at the top."
          },
          {
            "id": "ex_fb3_3",
            "exerciseName": "Chest Supported Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "repRange": { "min": 8, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Cable Row", "Dumbbell Row"],
            "notes": "Pause briefly at peak contraction."
          },
          {
            "id": "ex_fb3_4",
            "exerciseName": "Dumbbell Bench Press",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "8-12",
            "repRange": { "min": 8, "max": 12 },
            "restSeconds": 90,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Machine Chest Press", "Push-Ups"],
            "notes": "Neutral or slight flare of elbows."
          },
          {
            "id": "ex_fb3_5",
            "exerciseName": "Face Pull",
            "muscleGroup": "shoulders",
            "sets": 2,
            "reps": "12-15",
            "repRange": { "min": 12, "max": 15 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 1,
            "substitutions": ["Rear Delt Fly"],
            "notes": "Pull toward forehead; rotate externally."
          },
          {
            "id": "ex_fb3_6",
            "exerciseName": "Cable Triceps Overhead Extension",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "12-15",
            "repRange": { "min": 12, "max": 15 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 0,
            "substitutions": ["Dumbbell Overhead Extension"],
            "notes": "Good stretch at the bottom."
          },
          {
            "id": "ex_fb3_7",
            "exerciseName": "EZ-Bar Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "10-12",
            "repRange": { "min": 10, "max": 12 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 0,
            "substitutions": ["Cable Curl", "DB Curl"],
            "notes": "Control eccentric; no swinging."
          },
          {
            "id": "ex_fb3_8",
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 3,
            "reps": "12-15",
            "repRange": { "min": 12, "max": 15 },
            "restSeconds": 60,
            "tempo": "2-1-1",
            "rir": 0,
            "substitutions": ["Seated Calf Raise"],
            "notes": "Full stretch at bottom, pause at top."
          }
        ]
      }
    ]
  },

  {
    "id": "upper_lower_4_day",
    "name": "Upper / Lower Classic",
    "splitType": "upper_lower",
    "daysPerWeek": 4,
    "frequencyPerMuscle": "2x/week",
    "experienceLevel": "intermediate",
    "goal": ["hypertrophy", "strength", "body_recomposition"],
    "description": "A balanced 4-day upper/lower split with strong recovery and solid weekly muscle frequency. Each muscle is trained about twice per week with moderate-to-high volume.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday",    "workoutDayId": "ul_day_1" },
      { "dayNumber": 2, "label": "Tuesday",   "workoutDayId": "ul_day_2" },
      { "dayNumber": 3, "label": "Thursday",  "workoutDayId": "ul_day_3" },
      { "dayNumber": 4, "label": "Friday",    "workoutDayId": "ul_day_4" }
    ],
    "workoutDays": [
      {
        "id": "ul_day_1",
        "name": "Upper A (Heavy)",
        "focusArea": ["chest", "back", "shoulders", "biceps", "triceps"],
        "warmup": "5–10 min rower + shoulder mobility + 1–2 ramp-up sets for first compound.",
        "notes": "Prioritize controlled compounds first. Slight strength emphasis with lower reps.",
        "exercises": [
          {
            "exerciseName": "Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 4,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Incline Barbell Press", "Flat Dumbbell Press"]
          },
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Overhead Press",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Seated Dumbbell Press", "Machine Shoulder Press"]
          },
          {
            "exerciseName": "Weighted Pull-Up or Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Neutral-Grip Pull-Up", "Close-Grip Pulldown"]
          },
          {
            "exerciseName": "Incline Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "8-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ-Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "8-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Dip Machine", "Close-Grip Bench Press"]
          }
        ]
      },
      {
        "id": "ul_day_2",
        "name": "Lower A (Heavy)",
        "focusArea": ["quads", "glutes", "hamstrings", "calves", "core"],
        "warmup": "5–8 min bike + lower body mobility + 1–2 ramp-up sets for squats.",
        "notes": "Use full range where possible. Strength emphasis with heavier compounds.",
        "exercises": [
          {
            "exerciseName": "Back Squat",
            "muscleGroup": "quads",
            "sets": 4,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Front Squat", "Hack Squat"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Stiff-Leg Deadlift", "Good Morning"]
          },
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Bulgarian Split Squat", "Goblet Squat"]
          },
          {
            "exerciseName": "Lying or Seated Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Cable Leg Curl", "Nordic Curl (assisted)"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 4,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Seated Calf Raise", "Leg Press Calf Raise"]
          },
          {
            "exerciseName": "Hanging Leg Raise",
            "muscleGroup": "core",
            "sets": 3,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Captain’s Chair Leg Raise", "Cable Crunch"]
          }
        ]
      },
      {
        "id": "ul_day_3",
        "name": "Upper B (Hypertrophy)",
        "focusArea": ["chest", "back", "delts", "arms"],
        "warmup": "Band warm-up + 1 ramp-up set for first press and row.",
        "notes": "Slightly higher reps than Upper A. Focus on pump and control.",
        "exercises": [
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Incline Machine Press", "Incline Barbell Press"]
          },
          {
            "exerciseName": "Flat Machine Chest Press",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Dumbbell Bench Press", "Push-Ups"]
          },
          {
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Pull-Up", "Single-Arm Pulldown"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Row", "Chest Supported Row"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Rear Delt Cable Fly"]
          },
          {
            "exerciseName": "Barbell or Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ-Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Overhead Rope Extension", "Dip Machine"]
          }
        ]
      },
      {
        "id": "ul_day_4",
        "name": "Lower B (Hypertrophy)",
        "focusArea": ["glutes", "hamstrings", "quads", "calves"],
        "warmup": "Bike + hinge pattern warm-up + 1–2 ramp-up sets for first leg movement.",
        "notes": "Focus on posterior chain and machine assistance. Higher reps and more controlled tempo.",
        "exercises": [
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Hack Squat", "Goblet Squat"]
          },
          {
            "exerciseName": "Walking Lunge or Bulgarian Split Squat",
            "muscleGroup": "quads",
            "sets": 2,
            "reps": "10-12/leg",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Reverse Lunge", "Step-Up"]
          },
          {
            "exerciseName": "Hip Thrust",
            "muscleGroup": "glutes",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Barbell Glute Bridge", "Cable Pull-Through"]
          },
          {
            "exerciseName": "Lying Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Seated Leg Curl"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Seated Calf Raise", "Single-Leg Calf Raise"]
          },
          {
            "exerciseName": "Plank",
            "muscleGroup": "core",
            "sets": 2,
            "reps": "30-45s",
            "restSeconds": 45,
            "rir": 1,
            "substitutions": ["Dead Bug", "Pallof Press"]
          }
        ]
      }
    ]
  },
  {
    "id": "ppl_3_day",
    "name": "Push Pull Legs Standard",
    "splitType": "push_pull_legs",
    "daysPerWeek": 3,
    "frequencyPerMuscle": "1x/week",
    "experienceLevel": "beginner_to_intermediate",
    "goal": ["hypertrophy", "general_strength"],
    "description": "A simple 3-day PPL split for busy lifters. Each muscle is trained once per week with moderate volume and a focus on big compounds plus key accessories.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "ppl_day_1" },
      { "dayNumber": 2, "label": "Wednesday", "workoutDayId": "ppl_day_2" },
      { "dayNumber": 3, "label": "Friday", "workoutDayId": "ppl_day_3" }
    ],
    "workoutDays": [
      {
        "id": "ppl_day_1",
        "name": "Push",
        "focusArea": ["chest", "shoulders", "triceps"],
        "warmup": "5–10 min light cardio + band shoulder prep + 1–2 ramp-up sets for bench.",
        "notes": "Pressing and triceps dominant session. Leave 1–3 reps in reserve on compounds; 0–2 on isolations.",
        "exercises": [
          {
            "exerciseName": "Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Dumbbell Bench Press", "Machine Chest Press"]
          },
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 2,
            "substitutions": ["Incline Barbell Press", "Machine Incline Press"]
          },
          {
            "exerciseName": "Seated Dumbbell Shoulder Press",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Shoulder Press", "Standing Barbell Overhead Press"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Cable Chest Fly",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Pec Deck Fly", "Push-Ups"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Dip Machine", "Bench Dips"]
          },
          {
            "exerciseName": "Overhead Rope Extension",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Dumbbell Overhead Extension", "Cable French Press"]
          }
        ]
      },
      {
        "id": "ppl_day_2",
        "name": "Pull",
        "focusArea": ["back", "rear_delts", "biceps"],
        "warmup": "5–10 min light rower + scap/shoulder mobility + 1–2 ramp-up sets on row.",
        "notes": "Back thickness and width focus with direct rear delt and biceps work.",
        "exercises": [
          {
            "exerciseName": "Pull-Up or Lat Pulldown",
            "muscleGroup": "back",
            "sets": 4,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Assisted Pull-Up", "Neutral-Grip Pulldown"]
          },
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 4,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Row", "Single-Arm Dumbbell Row"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Cable Rear Delt Fly"]
          },
          {
            "exerciseName": "Barbell or Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ-Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "Hammer Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Incline Dumbbell Curl", "Preacher Curl"]
          }
        ]
      },
      {
        "id": "ppl_day_3",
        "name": "Legs",
        "focusArea": ["quads", "hamstrings", "glutes", "calves", "core"],
        "warmup": "5–10 min bike + dynamic lower body warm-up + 1–2 ramp-up sets for squats.",
        "notes": "Main lower body hypertrophy day. Focus on full range of motion on all lifts.",
        "exercises": [
          {
            "exerciseName": "Barbell Back Squat",
            "muscleGroup": "quads",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Front Squat", "Hack Squat"]
          },
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Bulgarian Split Squat", "Goblet Squat"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Stiff-Leg Deadlift", "Good Morning"]
          },
          {
            "exerciseName": "Lying or Seated Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Cable Leg Curl", "Nordic Curl (assisted)"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 4,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Seated Calf Raise", "Leg Press Calf Raise"]
          },
          {
            "exerciseName": "Hanging Leg Raise",
            "muscleGroup": "core",
            "sets": 3,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Captain’s Chair Leg Raise", "Cable Crunch"]
          }
        ]
      }
    ]
  },
  {
    "id": "bro_split_5_day",
    "name": "Bro Split Classic",
    "splitType": "bro_split",
    "daysPerWeek": 5,
    "frequencyPerMuscle": "1x/week (high local volume)",
    "experienceLevel": "intermediate_to_advanced",
    "goal": ["hypertrophy", "bodybuilding"],
    "description": "A bodypart-focused 5-day split with more isolation work and high local volume. Best for lifters who enjoy training one main muscle group per day and can recover from higher per-session volume.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday",    "workoutDayId": "bro_day_1" },
      { "dayNumber": 2, "label": "Tuesday",   "workoutDayId": "bro_day_2" },
      { "dayNumber": 3, "label": "Wednesday", "workoutDayId": "bro_day_3" },
      { "dayNumber": 4, "label": "Thursday",  "workoutDayId": "bro_day_4" },
      { "dayNumber": 5, "label": "Friday",    "workoutDayId": "bro_day_5" }
    ],
    "workoutDays": [
      {
        "id": "bro_day_1",
        "name": "Chest",
        "focusArea": ["chest"],
        "warmup": "5–10 min light cardio + band shoulder prep + 2 ramp-up sets for bench.",
        "notes": "Bodypart volume focus. Push close to failure on later isolation sets.",
        "exercises": [
          {
            "exerciseName": "Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Dumbbell Bench Press", "Machine Chest Press"]
          },
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Incline Barbell Press", "Incline Machine Press"]
          },
          {
            "exerciseName": "Cable Chest Fly",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Pec Deck Fly", "Dumbbell Fly"]
          },
          {
            "exerciseName": "Push-Up (Weighted Optional)",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "AMRAP(10-20)",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Machine Chest Press (high-rep)", "Kneeling Push-Up"]
          }
        ]
      },
      {
        "id": "bro_day_2",
        "name": "Back",
        "focusArea": ["back"],
        "warmup": "Lat activation + light pulldowns/rows + 1–2 ramp-up sets for deadlift or first row.",
        "notes": "Width and thickness work. Keep lower back tight on deadlifts and rows.",
        "exercises": [
          {
            "exerciseName": "Barbell Deadlift",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "5",
            "restSeconds": 180,
            "rir": 2,
            "substitutions": ["Trap Bar Deadlift", "Rack Pull"]
          },
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Chest Supported Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Pull-Up", "Neutral-Grip Pulldown"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Row", "Single-Arm Dumbbell Row"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Rear Delt Cable Fly"]
          }
        ]
      },
      {
        "id": "bro_day_3",
        "name": "Legs",
        "focusArea": ["quads", "hamstrings", "glutes", "calves"],
        "warmup": "Bike + dynamic lower warm-up + 2 ramp-up sets for squats.",
        "notes": "Heavy compounds first. Use full depth with control.",
        "exercises": [
          {
            "exerciseName": "Barbell Back Squat",
            "muscleGroup": "quads",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Front Squat", "Hack Squat"]
          },
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Bulgarian Split Squat", "Goblet Squat"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Stiff-Leg Deadlift", "Good Morning"]
          },
          {
            "exerciseName": "Lying or Seated Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Cable Leg Curl", "Nordic Curl (assisted)"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 4,
            "reps": "15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Seated Calf Raise", "Leg Press Calf Raise"]
          },
          {
            "exerciseName": "Hanging Leg Raise",
            "muscleGroup": "core",
            "sets": 3,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Captain’s Chair Leg Raise", "Cable Crunch"]
          }
        ]
      },
      {
        "id": "bro_day_4",
        "name": "Shoulders",
        "focusArea": ["front_delts", "side_delts", "rear_delts"],
        "warmup": "Band warm-up + light lateral raises + 1–2 ramp-up sets for overhead press.",
        "notes": "Emphasis on lateral delts and rear delts. Don’t chase PRs every week on OHP.",
        "exercises": [
          {
            "exerciseName": "Barbell Overhead Press",
            "muscleGroup": "shoulders",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Seated Dumbbell Press", "Machine Shoulder Press"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "side_delts",
            "sets": 4,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Rear Delt Cable Fly"]
          },
          {
            "exerciseName": "Front Raise (Dumbbell or Plate)",
            "muscleGroup": "front_delts",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Front Raise"]
          }
        ]
      },
      {
        "id": "bro_day_5",
        "name": "Arms",
        "focusArea": ["biceps", "triceps", "forearms"],
        "warmup": "Elbow warm-up + light curls and pushdowns.",
        "notes": "Pump and isolation heavy. Shorter rests, chase a strong contraction.",
        "exercises": [
          {
            "exerciseName": "Standing Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ-Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "EZ-Bar Preacher Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Machine Preacher Curl", "Spider Curl"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Band Pushdown", "Dip Machine"]
          },
          {
            "exerciseName": "Overhead Rope Extension",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Dumbbell Overhead Extension", "Cable French Press"]
          },
          {
            "exerciseName": "Hammer Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Curl", "Cable Rope Curl"]
          },
          {
            "exerciseName": "Wrist Curl / Reverse Wrist Curl",
            "muscleGroup": "forearms",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 45,
            "rir": 1,
            "substitutions": ["Farmer’s Carry", "Towel Grip Hang"]
          }
        ]
      }
    ]
  },
  {
    "id": "pplul_5_day",
    "name": "PPLUL Hybrid",
    "splitType": "pplul",
    "daysPerWeek": 5,
    "frequencyPerMuscle": "2x/week",
    "experienceLevel": "intermediate_to_advanced",
    "goal": ["hypertrophy", "strength", "bodybuilding"],
    "description": "A 5-day hybrid split combining Push/Pull/Legs with Upper/Lower to train each major muscle about twice per week with moderate-to-high weekly volume.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday",    "workoutDayId": "pplul_day_1" },
      { "dayNumber": 2, "label": "Tuesday",   "workoutDayId": "pplul_day_2" },
      { "dayNumber": 3, "label": "Wednesday", "workoutDayId": "pplul_day_3" },
      { "dayNumber": 4, "label": "Friday",    "workoutDayId": "pplul_day_4" },
      { "dayNumber": 5, "label": "Saturday",  "workoutDayId": "pplul_day_5" }
    ],
    "workoutDays": [
      {
        "id": "pplul_day_1",
        "name": "Push",
        "focusArea": ["chest", "shoulders", "triceps"],
        "warmup": "Push prep: 5–10 min light cardio + band shoulder work + 1–2 ramp-up sets for bench.",
        "notes": "Heavy presses first, then delts and triceps. Leave 1–3 reps in reserve on compounds.",
        "exercises": [
          {
            "exerciseName": "Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Dumbbell Bench Press", "Machine Chest Press"]
          },
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 2,
            "substitutions": ["Incline Barbell Press", "Incline Machine Press"]
          },
          {
            "exerciseName": "Seated Dumbbell Shoulder Press",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Shoulder Press", "Standing Barbell Overhead Press"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Dip Machine", "Band Pushdown"]
          },
          {
            "exerciseName": "Overhead Rope Extension",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Dumbbell Overhead Extension", "Cable French Press"]
          }
        ]
      },
      {
        "id": "pplul_day_2",
        "name": "Pull",
        "focusArea": ["back", "rear_delts", "biceps"],
        "warmup": "Pull prep: band pull-aparts, light pulldowns/rows + 1–2 ramp-up sets for row.",
        "notes": "Rows and pulldowns for thickness and width, plus rear delts and biceps.",
        "exercises": [
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Pull-Up", "Neutral-Grip Pulldown"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Row", "Single-Arm Dumbbell Row"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Cable Rear Delt Fly"]
          },
          {
            "exerciseName": "Standing Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ-Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "Hammer Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Incline Dumbbell Curl", "Preacher Curl"]
          }
        ]
      },
      {
        "id": "pplul_day_3",
        "name": "Legs",
        "focusArea": ["quads", "hamstrings", "glutes", "calves", "core"],
        "warmup": "Leg prep: 5–10 min bike + dynamic lower warm-up + 1–2 ramp-up sets for squats.",
        "notes": "Compound leg emphasis. Use full range of motion on all lifts.",
        "exercises": [
          {
            "exerciseName": "Barbell Back Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Front Squat", "Hack Squat"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Stiff-Leg Deadlift", "Good Morning"]
          },
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Bulgarian Split Squat", "Goblet Squat"]
          },
          {
            "exerciseName": "Lying or Seated Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Cable Leg Curl", "Nordic Curl (assisted)"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 4,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Seated Calf Raise", "Leg Press Calf Raise"]
          },
          {
            "exerciseName": "Hanging Leg Raise",
            "muscleGroup": "core",
            "sets": 3,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Captain’s Chair Leg Raise", "Cable Crunch"]
          }
        ]
      },
      {
        "id": "pplul_day_4",
        "name": "Upper",
        "focusArea": ["chest", "back", "delts", "arms"],
        "warmup": "Upper prep: bands, light presses/rows + 1 ramp-up set for first compound.",
        "notes": "Balanced upper volume. Slightly higher reps than the main Push/Pull days.",
        "exercises": [
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Incline Machine Press", "Incline Barbell Press"]
          },
          {
            "exerciseName": "Pull-Up or Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Assisted Pull-Up", "Neutral-Grip Pulldown"]
          },
          {
            "exerciseName": "Machine Chest Press",
            "muscleGroup": "chest",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Dumbbell Bench Press", "Push-Ups"]
          },
          {
            "exerciseName": "Chest Supported Row",
            "muscleGroup": "back",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Seated Cable Row", "Single-Arm Dumbbell Row"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Cable Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["EZ-Bar Curl", "Dumbbell Curl"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Overhead Rope Extension", "Band Pushdown"]
          }
        ]
      },
      {
        "id": "pplul_day_5",
        "name": "Lower",
        "focusArea": ["quads", "hamstrings", "glutes", "calves"],
        "warmup": "Lower prep: 5–10 min light cardio + dynamic lower body warm-up.",
        "notes": "Posterior chain and quad work with higher reps and more machine assistance.",
        "exercises": [
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Hack Squat", "Front Squat"]
          },
          {
            "exerciseName": "Lying Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Seated Leg Curl"]
          },
          {
            "exerciseName": "Bulgarian Split Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "8-12/leg",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Walking Lunge", "Reverse Lunge"]
          },
          {
            "exerciseName": "Hip Thrust",
            "muscleGroup": "glutes",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Barbell Glute Bridge", "Cable Pull-Through"]
          },
          {
            "exerciseName": "Seated Calf Raise",
            "muscleGroup": "calves",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Standing Calf Raise", "Single-Leg Calf Raise"]
          },
          {
            "exerciseName": "Plank",
            "muscleGroup": "core",
            "sets": 2,
            "reps": "30-45s",
            "restSeconds": 45,
            "rir": 1,
            "substitutions": ["Dead Bug", "Pallof Press"]
          }
        ]
      }
    ]
  },
  {
    "id": "ppl_6_day",
    "name": "Push Pull Legs Advanced",
    "splitType": "push_pull_legs",
    "daysPerWeek": 6,
    "frequencyPerMuscle": "2x/week",
    "experienceLevel": "advanced",
    "goal": ["hypertrophy", "bodybuilding", "strength"],
    "description": "A high-volume 6-day PPL split for advanced lifters with strong recovery. Muscles trained 2x/week with 16–20 sets per major group.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "ppl6_day_1" },
      { "dayNumber": 2, "label": "Tuesday", "workoutDayId": "ppl6_day_2" },
      { "dayNumber": 3, "label": "Wednesday", "workoutDayId": "ppl6_day_3" },
      { "dayNumber": 4, "label": "Thursday", "workoutDayId": "ppl6_day_4" },
      { "dayNumber": 5, "label": "Friday", "workoutDayId": "ppl6_day_5" },
      { "dayNumber": 6, "label": "Saturday", "workoutDayId": "ppl6_day_6" }
    ],
    "workoutDays": [
      {
        "id": "ppl6_day_1",
        "name": "Push A (Heavy)",
        "focusArea": ["chest", "shoulders", "triceps"],
        "warmup": "Push prep: 5–10 min light cardio + shoulder mobility + 2 ramp-up sets on bench.",
        "notes": "Heavier pressing day. Keep 1–3 reps in reserve on compounds.",
        "exercises": [
          {
            "exerciseName": "Barbell Bench Press",
            "muscleGroup": "chest",
            "sets": 4,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Dumbbell Bench Press", "Machine Chest Press"]
          },
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 90,
            "rir": 2,
            "substitutions": ["Incline Barbell Press", "Machine Incline Press"]
          },
          {
            "exerciseName": "Seated Dumbbell Shoulder Press",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Shoulder Press", "Barbell Overhead Press"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Cable Triceps Pushdown",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Dip Machine", "EZ-Bar Skullcrusher"]
          },
          {
            "exerciseName": "Overhead Rope Extension",
            "muscleGroup": "triceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Dumbbell Overhead Extension", "Cable French Press"]
          }
        ]
      },
      {
        "id": "ppl6_day_2",
        "name": "Pull A (Heavy)",
        "focusArea": ["back", "rear_delts", "biceps"],
        "warmup": "Pull prep: band pull-aparts, light pulldowns, 1–2 ramp-up sets on row.",
        "notes": "Heavier rowing and pulldown focus.",
        "exercises": [
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 4,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-10",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Pull-Up", "Single-Arm Pulldown"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Chest Supported Row", "Dumbbell Row"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Rear Delt Cable Fly"]
          },
          {
            "exerciseName": "Standing Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["EZ Bar Curl", "Cable Curl"]
          },
          {
            "exerciseName": "Incline Dumbbell Curl",
            "muscleGroup": "biceps",
            "sets": 2,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Preacher Curl", "Spider Curl"]
          }
        ]
      },
      {
        "id": "ppl6_day_3",
        "name": "Legs A (Strength)",
        "focusArea": ["quads", "hamstrings", "glutes", "calves"],
        "warmup": "Leg prep: 5–10 min bike + hip/ankle mobility + ramp-up sets on squats.",
        "notes": "Heavier leg compounds. Keep technique tight and avoid failure on squats and RDLs.",
        "exercises": [
          {
            "exerciseName": "Barbell Back Squat",
            "muscleGroup": "quads",
            "sets": 4,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Front Squat", "Hack Squat"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 1,
            "substitutions": ["Stiff-Leg Deadlift", "Good Morning"]
          },
          {
            "exerciseName": "Walking Lunge",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "8-12/leg",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Reverse Lunge", "Bulgarian Split Squat"]
          },
          {
            "exerciseName": "Lying Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Seated Leg Curl", "Nordic Curl (assisted)"]
          },
          {
            "exerciseName": "Standing Calf Raise",
            "muscleGroup": "calves",
            "sets": 4,
            "reps": "10-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Leg Press Calf Raise", "Single-Leg Calf Raise"]
          }
        ]
      },
      {
        "id": "ppl6_day_4",
        "name": "Push B (Hypertrophy)",
        "focusArea": ["upper_chest", "delts", "triceps"],
        "warmup": "Push prep: bands, light incline press, 1–2 ramp sets.",
        "notes": "Higher-rep push day with more delt and triceps focus.",
        "exercises": [
          {
            "exerciseName": "Incline Dumbbell Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Incline Machine Press", "Incline Barbell Press"]
          },
          {
            "exerciseName": "Flat Machine Chest Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Dumbbell Bench Press", "Push-Ups"]
          },
          {
            "exerciseName": "Dumbbell Lateral Raise",
            "muscleGroup": "shoulders",
            "sets": 4,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Cable Lateral Raise"]
          },
          {
            "exerciseName": "Face Pull",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Rear Delt Cable Fly"]
          },
          {
            "exerciseName": "Overhead Rope Extension",
            "muscleGroup": "triceps",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Cable French Press", "Dumbbell Overhead Extension"]
          }
        ]
      },
      {
        "id": "ppl6_day_5",
        "name": "Pull B (Hypertrophy)",
        "focusArea": ["lats", "upper_back", "biceps"],
        "warmup": "Pull prep: scap pulls, light pulldowns/rows.",
        "notes": "Higher-rep back and biceps with extra rear delt work.",
        "exercises": [
          {
            "exerciseName": "Pull-Up",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Assisted Pull-Up", "Lat Pulldown"]
          },
          {
            "exerciseName": "Single-Arm Dumbbell Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12/arm",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Cable Row", "Chest Supported Row"]
          },
          {
            "exerciseName": "Chest Supported Rear Delt Fly",
            "muscleGroup": "rear_delts",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 1,
            "substitutions": ["Reverse Pec Deck", "Cable Rear Delt Fly"]
          },
          {
            "exerciseName": "Seated Cable Row",
            "muscleGroup": "back",
            "sets": 2,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Machine Row", "T-Bar Row"]
          },
          {
            "exerciseName": "Cable Curl",
            "muscleGroup": "biceps",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["EZ-Bar Curl", "Dumbbell Curl"]
          }
        ]
      },
      {
        "id": "ppl6_day_6",
        "name": "Legs B (Hypertrophy)",
        "focusArea": ["quads", "hamstrings", "glutes", "calves"],
        "warmup": "Leg prep: light cardio + dynamic lower warm-up.",
        "notes": "Hypertrophy-focused lower session with higher reps and more machine work.",
        "exercises": [
          {
            "exerciseName": "Leg Press",
            "muscleGroup": "quads",
            "sets": 4,
            "reps": "10-15",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Hack Squat", "Front Squat"]
          },
          {
            "exerciseName": "Hip Thrust",
            "muscleGroup": "glutes",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Barbell Glute Bridge", "Cable Pull-Through"]
          },
          {
            "exerciseName": "Lying Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-15",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Seated Leg Curl"]
          },
          {
            "exerciseName": "Leg Extension",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Sissy Squat (assisted)", "Spanish Squat"]
          },
          {
            "exerciseName": "Seated Calf Raise",
            "muscleGroup": "calves",
            "sets": 3,
            "reps": "12-15",
            "restSeconds": 60,
            "rir": 0,
            "substitutions": ["Standing Calf Raise", "Single-Leg Calf Raise"]
          }
        ]
      }
    ]
  }
];
