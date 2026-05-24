export const exerciseDatabase = [
  // CHEST
  { id: "db_bench_press", name: "Barbell Bench Press", muscle: "chest", type: "compound", rest: 120, notes: "Retract scapula, touch mid-chest, drive feet." },
  { id: "db_inc_db_press", name: "Incline Dumbbell Press", muscle: "chest", type: "compound", rest: 90, notes: "30-degree incline, control eccentric, stretch at bottom." },
  { id: "db_flat_db_press", name: "Dumbbell Bench Press", muscle: "chest", type: "compound", rest: 90, notes: "Keep dumbbells neutral-ish, full extension at top." },
  { id: "db_chest_fly", name: "Cable Chest Fly", muscle: "chest", type: "isolation", rest: 60, notes: "Squeeze chest, slight bend in elbows, don't overstretch shoulders." },
  { id: "db_push_up", name: "Push-Up", muscle: "chest", type: "compound", rest: 60, notes: "Keep core tight, elbows tucked at 45 degrees." },

  // BACK
  { id: "db_barbell_row", name: "Barbell Row", muscle: "back", type: "compound", rest: 120, notes: "Hinge at hips, pull bar to lower stomach, keep spine neutral." },
  { id: "db_lat_pulldown", name: "Lat Pulldown", muscle: "back", type: "compound", rest: 90, notes: "Pull with elbows, lean back slightly, touch upper chest." },
  { id: "db_pull_up", name: "Pull-Up", muscle: "back", type: "compound", rest: 120, notes: "Dead hang to chest over bar, control down." },
  { id: "db_cable_row", name: "Seated Cable Row", muscle: "back", type: "compound", rest: 90, notes: "Squeeze shoulder blades, pull to torso, stretch lats fully." },
  { id: "db_deadlift", name: "Barbell Deadlift", muscle: "back", type: "compound", rest: 180, notes: "Keep bar close, drive through heels, lock hips." },
  { id: "db_db_row", name: "Dumbbell Row", muscle: "back", type: "compound", rest: 75, notes: "Keep chest parallel to ground, pull dumbbell to hip." },

  // SHOULDERS
  { id: "db_ohp", name: "Barbell Overhead Press", muscle: "shoulders", type: "compound", rest: 120, notes: "Squeeze glutes, press straight up, lock out at top." },
  { id: "db_db_press", name: "Seated Dumbbell Press", muscle: "shoulders", type: "compound", rest: 90, notes: "Keep elbows slightly forward, press dumbbells together at top." },
  { id: "db_lat_raise", name: "Dumbbell Lateral Raise", muscle: "shoulders", type: "isolation", rest: 60, notes: "Lead with elbows, tilt dumbbells slightly, control down." },
  { id: "db_face_pull", name: "Face Pull", muscle: "shoulders", type: "isolation", rest: 60, notes: "Pull rope to forehead, pull elbows back, hold peak." },
  { id: "db_cable_lat", name: "Cable Lateral Raise", muscle: "shoulders", type: "isolation", rest: 60, notes: "Smooth continuous tension, keep torso upright." },

  // QUADS
  { id: "db_back_squat", name: "Barbell Back Squat", muscle: "quads", type: "compound", rest: 120, notes: "Bar on traps, squat past parallel, drive up from heels." },
  { id: "db_leg_press", name: "Leg Press", muscle: "quads", type: "compound", rest: 90, notes: "Lower slowly, do not let lower back round off pad." },
  { id: "db_hack_squat", name: "Hack Squat", muscle: "quads", type: "compound", rest: 90, notes: "Deep knee flexion, push back into pad, control the bottom." },
  { id: "db_leg_ext", name: "Leg Extension", muscle: "quads", type: "isolation", rest: 60, notes: "Squeeze quads at top, pause, lower slowly." },
  { id: "db_goblet", name: "Dumbbell Goblet Squat", muscle: "quads", type: "compound", rest: 75, notes: "Hold dumbbell high at chest, brace core, stay upright." },

  // HAMSTRINGS & GLUTES
  { id: "db_rdl", name: "Romanian Deadlift", muscle: "hamstrings", type: "compound", rest: 120, notes: "Push hips back, feel stretch in hamstrings, flat back." },
  { id: "db_lying_curl", name: "Lying Leg Curl", muscle: "hamstrings", type: "isolation", rest: 75, notes: "Keep hips flat on pad, pull heels to glutes." },
  { id: "db_seated_curl", name: "Seated Leg Curl", muscle: "hamstrings", type: "isolation", rest: 75, notes: "Secure lap pad, flex hamstrings fully, slow return." },
  { id: "db_hip_thrust", name: "Barbell Hip Thrust", muscle: "glutes", type: "compound", rest: 120, notes: "Shoulders on bench, tuck chin, drive hips up, squeeze glutes." },
  { id: "db_bulgarian", name: "Bulgarian Split Squat", muscle: "glutes", type: "compound", rest: 90, notes: "Rear foot elevated, drop hips down and back, drive front leg." },
  { id: "db_kickback", name: "Cable Kickback", muscle: "glutes", type: "isolation", rest: 60, notes: "Lean forward, kick leg back and up, squeeze glutes." },

  // BICEPS
  { id: "db_db_curl", name: "Standing Dumbbell Curl", muscle: "biceps", type: "isolation", rest: 60, notes: "Supinate wrist at top, lock shoulder/elbow in place." },
  { id: "db_hammer_curl", name: "Dumbbell Hammer Curl", muscle: "biceps", type: "isolation", rest: 60, notes: "Neutral grip, target brachialis, do not swing." },
  { id: "db_preacher_curl", name: "EZ-Bar Preacher Curl", muscle: "biceps", type: "isolation", rest: 60, notes: "Full stretch on bench, pull up without lifting shoulders." },
  { id: "db_cable_curl", name: "Cable Curl", muscle: "biceps", type: "isolation", rest: 60, notes: "Constant tension, squeeze hard at top." },

  // TRICEPS
  { id: "db_pushdown", name: "Cable Triceps Pushdown", muscle: "triceps", type: "isolation", rest: 60, notes: "Lock elbows to side, flare hands at bottom." },
  { id: "db_rope_ext", name: "Overhead Rope Extension", muscle: "triceps", type: "isolation", rest: 60, notes: "Elbows up, press up and out, slow stretch." },
  { id: "db_skull_crusher", name: "EZ-Bar Skull Crusher", muscle: "triceps", type: "isolation", rest: 75, notes: "Lower bar to forehead or behind head, press back up." },
  { id: "db_dips", name: "Triceps Dips", muscle: "triceps", type: "compound", rest: 90, notes: "Stay upright, tuck elbows, drop to 90 degrees." },

  // CALVES
  { id: "db_calf_raise", name: "Standing Calf Raise", muscle: "calves", type: "isolation", rest: 60, notes: "Squeeze calves at top, deep stretch at bottom, pause." },

  // CORE
  { id: "db_plank", name: "Plank", muscle: "core", type: "isometric", rest: 60, notes: "Keep body straight, squeeze glutes, brace abs." },
  { id: "db_leg_raise", name: "Hanging Leg Raise", muscle: "core", type: "isolation", rest: 60, notes: "Do not swing, lift legs to parallel or chest." },
  { id: "db_cable_crunch", name: "Cable Crunch", muscle: "core", type: "isolation", rest: 60, notes: "Kneel, crunch with abs not hips, pull forehead to floor." }
];

export const getExercisesByMuscle = (muscleGroup) => {
  return exerciseDatabase.filter(ex => ex.muscle === muscleGroup);
};

export const getExerciseById = (id) => {
  return exerciseDatabase.find(ex => ex.id === id);
};
