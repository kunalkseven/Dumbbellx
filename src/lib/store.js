// store.js - State Management & LocalStorage Handler with Express API Sync

const STORAGE_KEYS = {
  LOGS: "dumbbellx_logs",
  ACTIVE_PLAN_ID: "dumbbellx_active_plan_id",
  CUSTOM_PLANS: "dumbbellx_custom_plans",
  BODY_WEIGHTS: "dumbbellx_body_weights",
  USER_PROFILE: "dumbbellx_user_profile",
  ACTIVE_WORKOUT: "dumbbellx_active_workout"
};

// Global authentication state for backend syncing
let clerkToken = null;

const getLocalStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  try {
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error parsing LocalStorage key: ${key}`, e);
    return defaultValue;
  }
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// API Fetch Helper
const apiFetch = async (url, options = {}) => {
  if (!clerkToken) return null;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${clerkToken}`,
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error(`Backend API error on ${url}:`, e.message);
    return null;
  }
};

export const store = {
  // --- Auth Configuration ---
  setClerkToken(token) {
    clerkToken = token;
  },

  hasClerkToken() {
    return !!clerkToken;
  },

  // --- Hybrid Synchronization ---
  async syncFromBackend(onSyncCompleteCallback) {
    if (!clerkToken) return;

    console.log("Dumbbellx: Synchronizing database from fullstack backend...");

    // 1. Fetch Profile
    const profile = await apiFetch('/api/profile');
    if (profile) {
      // Map database camelcase/snakecase properties
      const mappedProfile = {
        name: profile.name,
        height: profile.height,
        weight: profile.weight,
        level: profile.level,
        units: profile.units,
        soundEnabled: profile.sound_enabled,
        streak: profile.streak,
        lastWorkoutDate: profile.last_workout_date
      };
      setLocalStorageItem(STORAGE_KEYS.USER_PROFILE, mappedProfile);
    }

    // 2. Fetch Custom Plans
    const plans = await apiFetch('/api/custom-plans');
    if (plans) {
      const mappedPlans = plans.map(p => ({
        id: p.id,
        name: p.name,
        splitType: p.split_type,
        daysPerWeek: p.days_per_week,
        experienceLevel: p.experience_level,
        goal: p.goal,
        description: p.description,
        workoutDays: p.workout_days,
        weeklySchedule: p.weekly_schedule
      }));
      setLocalStorageItem(STORAGE_KEYS.CUSTOM_PLANS, mappedPlans);
    }

    // 3. Fetch Workout Logs
    const logs = await apiFetch('/api/logs');
    if (logs) {
      const mappedLogs = logs.map(l => ({
        id: l.id,
        templateId: l.template_id,
        workoutDayId: l.workout_day_id,
        name: l.name,
        date: l.date,
        durationSeconds: l.duration_seconds,
        exercises: l.exercises
      }));
      setLocalStorageItem(STORAGE_KEYS.LOGS, mappedLogs);
    }

    // 4. Fetch Bodyweights
    const weights = await apiFetch('/api/bodyweights');
    if (weights) {
      const mappedWeights = weights.map(w => ({
        date: w.date,
        weight: Number(w.weight)
      }));
      setLocalStorageItem(STORAGE_KEYS.BODY_WEIGHTS, mappedWeights);
    }

    // Update streak locally
    this.updateStreak();

    if (onSyncCompleteCallback) {
      onSyncCompleteCallback();
    }
  },

  // --- Logs ---
  getLogs() {
    return getLocalStorageItem(STORAGE_KEYS.LOGS, []);
  },
  
  addLog(workoutLog) {
    const logs = this.getLogs();
    
    // Check for duplicates before pushing
    const existingIndex = logs.findIndex(l => String(l.id) === String(workoutLog.id));
    if (existingIndex > -1) {
      logs[existingIndex] = workoutLog;
    } else {
      logs.push(workoutLog);
    }
    
    setLocalStorageItem(STORAGE_KEYS.LOGS, logs);
    
    // Background sync to server
    if (clerkToken) {
      apiFetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify(workoutLog)
      });
    }

    this.updateStreak();
    return logs;
  },

  deleteLog(id) {
    let logs = this.getLogs();
    logs = logs.filter(log => String(log.id) !== String(id));
    setLocalStorageItem(STORAGE_KEYS.LOGS, logs);
    
    // Background delete on server
    if (clerkToken) {
      apiFetch(`/api/logs/${id}`, {
        method: 'DELETE'
      });
    }

    this.updateStreak();
    return logs;
  },

  // --- Active Plan ID ---
  getActivePlanId() {
    return getLocalStorageItem(STORAGE_KEYS.ACTIVE_PLAN_ID, "full_body_3_day");
  },

  setActivePlanId(id) {
    setLocalStorageItem(STORAGE_KEYS.ACTIVE_PLAN_ID, id);
    
    // Sync active plan choice via profile setting updates
    if (clerkToken) {
      this.syncProfileToBackend();
    }
  },

  // --- Custom Plans ---
  getCustomPlans() {
    return getLocalStorageItem(STORAGE_KEYS.CUSTOM_PLANS, []);
  },

  addCustomPlan(plan) {
    const plans = this.getCustomPlans();
    plans.push(plan);
    setLocalStorageItem(STORAGE_KEYS.CUSTOM_PLANS, plans);
    
    // Background sync to server
    if (clerkToken) {
      apiFetch('/api/custom-plans', {
        method: 'POST',
        body: JSON.stringify(plan)
      });
    }

    return plans;
  },

  deleteCustomPlan(id) {
    let plans = this.getCustomPlans();
    plans = plans.filter(p => p.id !== id);
    setLocalStorageItem(STORAGE_KEYS.CUSTOM_PLANS, plans);
    
    // Background delete on server
    if (clerkToken) {
      apiFetch(`/api/custom-plans/${id}`, {
        method: 'DELETE'
      });
    }

    return plans;
  },

  // --- Body Weights ---
  getBodyWeights() {
    const weights = getLocalStorageItem(STORAGE_KEYS.BODY_WEIGHTS, []);
    if (weights.length === 0) {
      const profile = this.getUserProfile();
      const defaultWeight = { date: new Date().toISOString().split("T")[0], weight: profile.weight };
      weights.push(defaultWeight);
      setLocalStorageItem(STORAGE_KEYS.BODY_WEIGHTS, weights);
    }
    return weights;
  },

  addBodyWeight(weight) {
    const weights = this.getBodyWeights();
    const dateStr = new Date().toISOString().split("T")[0];
    
    const existingIndex = weights.findIndex(w => w.date === dateStr);
    if (existingIndex > -1) {
      weights[existingIndex].weight = Number(weight);
    } else {
      weights.push({ date: dateStr, weight: Number(weight) });
    }
    
    weights.sort((a, b) => new Date(a.date) - new Date(b.date));
    setLocalStorageItem(STORAGE_KEYS.BODY_WEIGHTS, weights);
    
    // Also update in profile weight property
    const profile = this.getUserProfile();
    profile.weight = Number(weight);
    this.updateUserProfile(profile);

    // Background sync weight to server
    if (clerkToken) {
      apiFetch('/api/bodyweights', {
        method: 'POST',
        body: JSON.stringify({ weight: Number(weight), date: dateStr })
      });
    }
    
    return weights;
  },

  // --- User Profile ---
  getUserProfile() {
    const defaultProfile = {
      name: "Challenger",
      height: 175,
      weight: 75,
      level: "beginner",
      units: "metric",
      soundEnabled: true,
      streak: 0,
      lastWorkoutDate: null
    };
    return getLocalStorageItem(STORAGE_KEYS.USER_PROFILE, defaultProfile);
  },

  updateUserProfile(updatedFields) {
    const current = this.getUserProfile();
    const merged = { ...current, ...updatedFields };
    setLocalStorageItem(STORAGE_KEYS.USER_PROFILE, merged);
    
    if (clerkToken) {
      this.syncProfileToBackend(merged);
    }

    return merged;
  },

  // Sync profile metadata to the backend Express server
  syncProfileToBackend(mergedProfile) {
    const profile = mergedProfile || this.getUserProfile();
    
    apiFetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify({
        name: profile.name,
        height: profile.height,
        weight: profile.weight,
        level: profile.level,
        units: profile.units,
        sound_enabled: profile.soundEnabled,
        streak: profile.streak,
        last_workout_date: profile.lastWorkoutDate
      })
    });
  },

  // --- Active In-Progress Workout ---
  getActiveWorkout() {
    return getLocalStorageItem(STORAGE_KEYS.ACTIVE_WORKOUT, null);
  },

  setActiveWorkout(workout) {
    setLocalStorageItem(STORAGE_KEYS.ACTIVE_WORKOUT, workout);
  },

  clearActiveWorkout() {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
  },

  // --- Calculations & Analytics ---
  getPRs() {
    const logs = this.getLogs();
    const prMap = {};

    logs.forEach(log => {
      log.exercises.forEach(ex => {
        const name = ex.exerciseName;
        if (!prMap[name]) {
          prMap[name] = { maxWeight: 0, max1RM: 0, date: null, repsForMax: 0 };
        }

        ex.sets.forEach(set => {
          const weight = Number(set.weight) || 0;
          const reps = Number(set.reps) || 0;
          
          if (weight === 0 || reps === 0) return;

          const est1RM = reps === 1 ? weight : weight / (1.0278 - 0.0278 * reps);

          let isNewMaxWeight = weight > prMap[name].maxWeight;
          let isNewMax1RM = est1RM > prMap[name].max1RM;

          if (isNewMaxWeight) {
            prMap[name].maxWeight = weight;
            prMap[name].repsForMax = reps;
            prMap[name].date = log.date;
          }
          if (isNewMax1RM) {
            prMap[name].max1RM = Math.round(est1RM * 10) / 10;
          }
        });
      });
    });

    return prMap;
  },

  getPreviousExerciseStats(exerciseName) {
    const logs = this.getLogs();
    for (let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const matchedEx = log.exercises.find(ex => ex.exerciseName.toLowerCase() === exerciseName.toLowerCase());
      if (matchedEx) {
        const completedSets = matchedEx.sets;
        if (completedSets.length > 0) {
          return completedSets.map(s => ({ weight: s.weight, reps: s.reps }));
        }
      }
    }
    return null;
  },

  updateStreak() {
    const logs = this.getLogs();
    if (logs.length === 0) {
      const current = this.getUserProfile();
      setLocalStorageItem(STORAGE_KEYS.USER_PROFILE, { ...current, streak: 0, lastWorkoutDate: null });
      return 0;
    }

    const datesSet = new Set(logs.map(log => log.date.split("T")[0]));
    const sortedDates = Array.from(datesSet).sort((a, b) => new Date(b) - new Date(a));

    const todayStr = new Date().toISOString().split("T")[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    const lastWorkoutDateStr = sortedDates[0];
    if (lastWorkoutDateStr !== todayStr && lastWorkoutDateStr !== yesterdayStr) {
      const current = this.getUserProfile();
      setLocalStorageItem(STORAGE_KEYS.USER_PROFILE, { ...current, streak: 0, lastWorkoutDate: lastWorkoutDateStr });
      return 0;
    }

    let streakCount = 0;
    let currentCheckDate = new Date(lastWorkoutDateStr);

    while (true) {
      const checkStr = currentCheckDate.toISOString().split("T")[0];
      if (datesSet.has(checkStr)) {
        streakCount++;
        currentCheckDate.setDate(currentCheckDate.getDate() - 1);
      } else {
        break;
      }
    }

    const current = this.getUserProfile();
    const updated = { ...current, streak: streakCount, lastWorkoutDate: lastWorkoutDateStr };
    setLocalStorageItem(STORAGE_KEYS.USER_PROFILE, updated);
    
    return streakCount;
  },

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAN_ID);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_PLANS);
    localStorage.removeItem(STORAGE_KEYS.BODY_WEIGHTS);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WORKOUT);
  }
};
