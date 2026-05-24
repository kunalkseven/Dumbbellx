export const defaultTemplates = [
  {
    "id": "full_body_3_day",
    "name": "Full Body Starter",
    "splitType": "full_body",
    "daysPerWeek": 3,
    "frequencyPerMuscle": "2-3x/week",
    "experienceLevel": "beginner",
    "goal": ["hypertrophy", "general_strength", "body_recomposition"],
    "description": "A 3-day full body program for beginners focused on learning movement patterns and building balanced muscle.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "fb_day_1" },
      { "dayNumber": 2, "label": "Wednesday", "workoutDayId": "fb_day_2" },
      { "dayNumber": 3, "label": "Friday", "workoutDayId": "fb_day_3" }
    ],
    "workoutDays": [
      {
        "id": "fb_day_1",
        "name": "Full Body A",
        "focusArea": ["quads", "chest", "back", "shoulders", "arms", "core"],
        "warmup": "5-10 min brisk walk + 1-2 ramp-up sets for first compound lift",
        "notes": "Leave 1-3 reps in reserve on most sets.",
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
          }
        ]
      }
    ]
  },
  {
    "id": "db_only_3_day",
    "name": "Dumbbell Only Home",
    "splitType": "full_body",
    "daysPerWeek": 3,
    "frequencyPerMuscle": "2x/week",
    "experienceLevel": "beginner",
    "goal": ["hypertrophy", "body_recomposition"],
    "description": "Perfect for home training. A 3-day split using only dumbbells to build a solid foundation.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Day 1", "workoutDayId": "db_day_1" },
      { "dayNumber": 2, "label": "Day 2", "workoutDayId": "db_day_2" },
      { "dayNumber": 3, "label": "Day 3", "workoutDayId": "db_day_3" }
    ],
    "workoutDays": [
      {
        "id": "db_day_1",
        "name": "Full Body Home",
        "focusArea": ["legs", "chest", "back", "shoulders"],
        "exercises": [
          {
            "exerciseName": "DB Goblet Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 2
          },
          {
            "exerciseName": "DB Floor Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 90,
            "rir": 2
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
    "description": "A balanced 4-day split with strong recovery and solid weekly muscle frequency.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "ul_day_1" },
      { "dayNumber": 2, "label": "Tuesday", "workoutDayId": "ul_day_2" },
      { "dayNumber": 3, "label": "Thursday", "workoutDayId": "ul_day_3" },
      { "dayNumber": 4, "label": "Friday", "workoutDayId": "ul_day_4" }
    ],
    "workoutDays": [
      {
        "id": "ul_day_1",
        "name": "Upper A",
        "focusArea": ["chest", "back", "shoulders", "biceps", "triceps"],
        "warmup": "5 min rower + shoulder mobility",
        "notes": "Prioritize controlled compounds first.",
        "exercises": [
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
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "Cable Row"]
          }
        ]
      },
      {
        "id": "ul_day_2",
        "name": "Lower A",
        "focusArea": ["quads", "glutes", "hamstrings", "calves", "core"],
        "warmup": "5-8 min bike + lower body mobility",
        "notes": "Use full range where possible.",
        "exercises": [
          {
            "exerciseName": "Back Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Hack Squat", "Leg Press"]
          },
          {
            "exerciseName": "Romanian Deadlift",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Good Morning", "Seated Leg Curl"]
          }
        ]
      },
      {
        "id": "ul_day_3",
        "name": "Upper B",
        "focusArea": ["chest", "back", "delts", "arms"],
        "warmup": "Band warm-up + 1 ramp-up set",
        "notes": "Slightly higher reps than Upper A.",
        "exercises": [
          {
            "exerciseName": "Flat Machine Chest Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Flat Dumbbell Press", "Push-Ups"]
          },
          {
            "exerciseName": "Lat Pulldown",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "8-12",
            "restSeconds": 90,
            "rir": 1,
            "substitutions": ["Pull-Ups", "Single Arm Pulldown"]
          }
        ]
      },
      {
        "id": "ul_day_4",
        "name": "Lower B",
        "focusArea": ["glutes", "hamstrings", "quads", "calves"],
        "warmup": "Bike + hinge pattern warm-up",
        "notes": "Focus on posterior chain and machine assistance.",
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
            "exerciseName": "Lying Leg Curl",
            "muscleGroup": "hamstrings",
            "sets": 3,
            "reps": "10-12",
            "restSeconds": 75,
            "rir": 1,
            "substitutions": ["Seated Leg Curl", "Romanian Deadlift"]
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
    "description": "A simple 3-day PPL split for busy lifters who still want structure.",
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
        "warmup": "Band shoulder prep + light presses",
        "notes": "Pressing and triceps dominant session.",
        "exercises": [
          {
            "exerciseName": "Bench Press",
            "muscleGroup": "chest",
            "sets": 3,
            "reps": "5-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Dumbbell Press", "Machine Press"]
          }
        ]
      },
      {
        "id": "ppl_day_2",
        "name": "Pull",
        "focusArea": ["back", "rear_delts", "biceps"],
        "warmup": "Scap pull + row warm-up",
        "notes": "Back thickness and width focus.",
        "exercises": [
          {
            "exerciseName": "Barbell Row",
            "muscleGroup": "back",
            "sets": 3,
            "reps": "6-10",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Chest Supported Row", "Cable Row"]
          }
        ]
      },
      {
        "id": "ppl_day_3",
        "name": "Legs",
        "focusArea": ["quads", "hamstrings", "glutes", "calves"],
        "warmup": "Bike + squat mobility",
        "notes": "Main lower body hypertrophy day.",
        "exercises": [
          {
            "exerciseName": "Back Squat",
            "muscleGroup": "quads",
            "sets": 3,
            "reps": "6-8",
            "restSeconds": 120,
            "rir": 2,
            "substitutions": ["Hack Squat", "Leg Press"]
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
    "frequencyPerMuscle": "1x/week",
    "experienceLevel": "intermediate_to_advanced",
    "goal": ["hypertrophy", "bodybuilding"],
    "description": "A bodypart-focused split with more isolation work and high local volume.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "bro_day_1" },
      { "dayNumber": 2, "label": "Tuesday", "workoutDayId": "bro_day_2" },
      { "dayNumber": 3, "label": "Wednesday", "workoutDayId": "bro_day_3" },
      { "dayNumber": 4, "label": "Thursday", "workoutDayId": "bro_day_4" },
      { "dayNumber": 5, "label": "Friday", "workoutDayId": "bro_day_5" }
    ],
    "workoutDays": [
      { "id": "bro_day_1", "name": "Chest", "focusArea": ["chest"], "warmup": "5 min row + chest activation", "notes": "Bodypart volume focus.", "exercises": [] },
      { "id": "bro_day_2", "name": "Back", "focusArea": ["back"], "warmup": "Lat activation + pulldown warm-up", "notes": "Width and thickness work.", "exercises": [] },
      { "id": "bro_day_3", "name": "Legs", "focusArea": ["quads", "hamstrings", "glutes", "calves"], "warmup": "Bike + dynamic lower warm-up", "notes": "Heavy compounds first.", "exercises": [] },
      { "id": "bro_day_4", "name": "Shoulders", "focusArea": ["front_delts", "side_delts", "rear_delts"], "warmup": "Band warm-up", "notes": "Emphasis on lateral delts.", "exercises": [] },
      { "id": "bro_day_5", "name": "Arms", "focusArea": ["biceps", "triceps", "forearms"], "warmup": "Elbow warm-up", "notes": "Pump and isolation heavy.", "exercises": [] }
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
    "description": "A 5-day hybrid split combining PPL with upper/lower frequency for more weekly stimulus.",
    "isDefault": true,
    "weeklySchedule": [
      { "dayNumber": 1, "label": "Monday", "workoutDayId": "pplul_day_1" },
      { "dayNumber": 2, "label": "Tuesday", "workoutDayId": "pplul_day_2" },
      { "dayNumber": 3, "label": "Wednesday", "workoutDayId": "pplul_day_3" },
      { "dayNumber": 4, "label": "Friday", "workoutDayId": "pplul_day_4" },
      { "dayNumber": 5, "label": "Saturday", "workoutDayId": "pplul_day_5" }
    ],
    "workoutDays": [
      { "id": "pplul_day_1", "name": "Push", "focusArea": ["chest", "shoulders", "triceps"], "warmup": "Push prep", "notes": "Heavy presses first.", "exercises": [] },
      { "id": "pplul_day_2", "name": "Pull", "focusArea": ["back", "rear_delts", "biceps"], "warmup": "Pull prep", "notes": "Rows and pulldowns.", "exercises": [] },
      { "id": "pplul_day_3", "name": "Legs", "focusArea": ["quads", "hamstrings", "glutes", "calves"], "warmup": "Leg prep", "notes": "Compound leg emphasis.", "exercises": [] },
      { "id": "pplul_day_4", "name": "Upper", "focusArea": ["chest", "back", "delts", "arms"], "warmup": "Upper prep", "notes": "Balanced upper volume.", "exercises": [] },
      { "id": "pplul_day_5", "name": "Lower", "focusArea": ["quads", "hamstrings", "glutes", "calves"], "warmup": "Lower prep", "notes": "Posterior chain and quad work.", "exercises": [] }
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
    "description": "A high-volume 6-day PPL split for advanced lifters with strong recovery capacity.",
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
      { "id": "ppl6_day_1", "name": "Push A", "focusArea": ["chest", "shoulders", "triceps"], "warmup": "Push prep", "notes": "Heavier push session.", "exercises": [] },
      { "id": "ppl6_day_2", "name": "Pull A", "focusArea": ["back", "rear_delts", "biceps"], "warmup": "Pull prep", "notes": "Heavier pull session.", "exercises": [] },
      { "id": "ppl6_day_3", "name": "Legs A", "focusArea": ["quads", "hamstrings", "glutes", "calves"], "warmup": "Leg prep", "notes": "Heavier legs session.", "exercises": [] },
      { "id": "ppl6_day_4", "name": "Push B", "focusArea": ["upper_chest", "delts", "triceps"], "warmup": "Push prep", "notes": "Higher rep emphasis.", "exercises": [] },
      { "id": "ppl6_day_5", "name": "Pull B", "focusArea": ["lats", "upper_back", "biceps"], "warmup": "Pull prep", "notes": "Higher rep emphasis.", "exercises": [] },
      { "id": "ppl6_day_6", "name": "Legs B", "focusArea": ["quads", "hamstrings", "glutes", "calves"], "warmup": "Leg prep", "notes": "Hypertrophy-focused lower session.", "exercises": [] }
    ]
  }
];
