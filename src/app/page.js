// src/app/page.js
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth, useUser, SignInButton, SignUpButton } from '@clerk/nextjs';
import { store } from '@/lib/store';
import { exerciseDatabase } from '@/lib/exercises';
import { defaultTemplates } from '@/lib/default_workout_plane';
import confetti from 'canvas-confetti';
import Chart from 'chart.js/auto';
import {
  Dumbbell,
  LayoutDashboard,
  ClipboardList,
  PlayCircle,
  LineChart as ChartIcon,
  Settings as SettingsIcon,
  Flame,
  Award,
  Activity,
  Timer,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Trophy,
  Calendar as CalendarIcon,
  History,
  TrendingUp,
  PieChart,
  User as UserIcon,
  Sliders,
  Database,
  Download,
  Upload,
  Hourglass,
  X,
  Sparkles,
  LogIn,
  LogOut,
  RefreshCw
} from 'lucide-react';

export default function Home() {
  const { isSignedIn, getToken, signOut } = useAuth();
  const { user } = useUser();

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dashboard & Profile Local States
  const [profile, setProfile] = useState({
    name: "Challenger",
    height: 175,
    weight: 75,
    level: "beginner",
    units: "metric",
    soundEnabled: true,
    streak: 0,
    lastWorkoutDate: null
  });
  const [logs, setLogs] = useState([]);
  const [prs, setPrs] = useState({});
  const [bodyWeights, setBodyWeights] = useState([]);
  const [activePlanId, setActivePlanId] = useState("full_body_3_day");

  // Modals & Builders
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [customPlans, setCustomPlans] = useState([]);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(1);
  const [planTab, setPlanTab] = useState('preset');

  // Custom Routine Builder state
  const [builderName, setBuilderName] = useState('');
  const [builderSplit, setBuilderSplit] = useState('push_pull_legs');
  const [builderLevel, setBuilderLevel] = useState('intermediate');
  const [builderDaysCount, setBuilderDaysCount] = useState(3);
  const [builderDesc, setBuilderDesc] = useState('');
  const [builderDays, setBuilderDays] = useState([]); // Array of { name, focusArea, exercises: [{ exerciseName, sets, reps }] }

  // Active Tracker State
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryStats, setSummaryStats] = useState({ duration: 0, sets: 0, volume: 0, shatteredPrs: [] });
  const [isExercisePickerOpen, setIsExercisePickerOpen] = useState(false);
  const [exSearchQuery, setExSearchQuery] = useState('');

  // Floating Rest Timer State
  const [restTimer, setRestTimer] = useState({ active: false, secondsLeft: 0, totalSeconds: 0 });

  // Settings view local states
  const [settingsName, setSettingsName] = useState('');
  const [settingsLevel, setSettingsLevel] = useState('intermediate');
  const [settingsHeight, setSettingsHeight] = useState('');
  const [settingsWeight, setSettingsWeight] = useState('');
  const [settingsUnits, setSettingsUnits] = useState('metric');
  const [settingsSound, setSettingsSound] = useState(true);

  // Charts references & instances
  const volumeChartRef = useRef(null);
  const muscleChartRef = useRef(null);
  const prChartRef = useRef(null);
  const volumeChartInstance = useRef(null);
  const muscleChartInstance = useRef(null);
  const prChartInstance = useRef(null);
  const [chartExSelected, setChartExSelected] = useState('');
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const workoutTimerRef = useRef(null);
  const restTimerIntervalRef = useRef(null);

  // --- Clerk JWT Token Sync on Auth state changes ---
  useEffect(() => {
    const syncToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          store.setClerkToken(token);
          // Sync full database logs & routines from Express
          await store.syncFromBackend(() => {
            loadStoreData();
          });
        } catch (e) {
          console.error("Clerk Token Retrieval error:", e);
        }
      } else {
        store.setClerkToken(null);
        loadStoreData();
      }
    };
    syncToken();
  }, [isSignedIn, getToken]);

  // Load all synced store datasets into React state
  const loadStoreData = () => {
    setProfile(store.getUserProfile());
    setLogs(store.getLogs());
    setPrs(store.getPRs());
    setBodyWeights(store.getBodyWeights());
    setActivePlanId(store.getActivePlanId());
    setCustomPlans(store.getCustomPlans());

    const cachedWorkout = store.getActiveWorkout();
    if (cachedWorkout) {
      setActiveWorkout(cachedWorkout);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  // --- Active Workout Timer Hooks ---
  useEffect(() => {
    if (activeWorkout && !activeWorkout.isCompleted) {
      const startMs = new Date(activeWorkout.startTime).getTime();
      const tick = () => {
        const elapsed = Math.floor((Date.now() - startMs) / 1000);
        setElapsedSeconds(elapsed);

        // Cache elapsed time
        const updated = { ...activeWorkout, durationSeconds: elapsed };
        store.setActiveWorkout(updated);
      };

      tick();
      workoutTimerRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(workoutTimerRef.current);
    }
    return () => clearInterval(workoutTimerRef.current);
  }, [activeWorkout]);

  // --- Floating Rest Timer countdown Hook ---
  useEffect(() => {
    if (restTimer.active) {
      const tickRest = () => {
        if (restTimer.secondsLeft <= 0) {
          clearInterval(restTimerIntervalRef.current);
          setRestTimer(prev => ({ ...prev, active: false }));

          // Sound chime
          if (profile.soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.log("Audio play blocked."));
          }
          return;
        }

        setRestTimer(prev => ({ ...prev, secondsLeft: prev.secondsLeft - 1 }));
      };

      restTimerIntervalRef.current = setInterval(tickRest, 1000);
    } else {
      clearInterval(restTimerIntervalRef.current);
    }
    return () => clearInterval(restTimerIntervalRef.current);
  }, [restTimer.active, restTimer.secondsLeft, profile.soundEnabled]);

  // --- Chart.js Render Hooks ---
  useEffect(() => {
    if (activeTab === 'analytics') {
      renderVolumeChart();
      renderMuscleChart();

      const loggedExs = Object.keys(prs);
      if (loggedExs.length > 0) {
        const defaultEx = chartExSelected || loggedExs[0];
        setChartExSelected(defaultEx);
        renderPrProgressionChart(defaultEx);
      }
    }
  }, [activeTab, logs, prs, chartExSelected, profile.units]);

  // --- Formatting Helpers ---
  const formatWeight = (kgVal) => {
    if (profile.units === "imperial") {
      return `${Math.round(kgVal * 2.20462)} lbs`;
    }
    return `${kgVal} kg`;
  };

  const convertKgToDisplayWeight = (kgVal) => {
    if (profile.units === "imperial") {
      return Math.round(kgVal * 2.20462);
    }
    return kgVal;
  };

  const convertInputWeightToKg = (val) => {
    const num = Number(val) || 0;
    if (profile.units === "imperial") {
      return Math.round((num / 2.20462) * 10) / 10;
    }
    return num;
  };

  const getDurationText = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // --- Active Workout Controllers ---
  const handleStartQuickWorkout = () => {
    const session = {
      id: Date.now(),
      startTime: new Date().toISOString(),
      name: "Quick Routine Session",
      durationSeconds: 0,
      exercises: []
    };
    store.setActiveWorkout(session);
    setActiveWorkout(session);
    setIsSummaryOpen(false);
  };

  const handleStartWorkoutFromPlan = (plan) => {
    const days = plan.workoutDays;
    if (days.length === 0) {
      handleStartQuickWorkout();
      return;
    }

    // Match past logs to see which day to schedule next
    const activePlanLogs = logs.filter(l => l.templateId === plan.id);
    let dayIdx = 0;
    if (activePlanLogs.length > 0) {
      const last = activePlanLogs[activePlanLogs.length - 1];
      const lastDayIdx = days.findIndex(d => d.id === last.workoutDayId);
      if (lastDayIdx > -1) {
        dayIdx = (lastDayIdx + 1) % days.length;
      }
    }

    const selectedDay = days[dayIdx];
    const exercises = selectedDay.exercises ? selectedDay.exercises.map(ex => {
      const sets = [];
      const setQty = Number(ex.sets) || 3;

      let targetRep = 10;
      if (typeof ex.reps === "string" && ex.reps.includes("-")) {
        targetRep = Number(ex.reps.split("-")[1]) || 10;
      } else {
        targetRep = Number(ex.reps) || 10;
      }

      // Populate weights based on previous history
      const prevStats = store.getPreviousExerciseStats(ex.exerciseName);

      for (let s = 1; s <= setQty; s++) {
        let wt = 20; // default seed kg
        let rp = targetRep;
        if (prevStats && prevStats[s - 1]) {
          wt = prevStats[s - 1].weight;
          rp = prevStats[s - 1].reps;
        } else if (prevStats && prevStats.length > 0) {
          wt = prevStats[0].weight;
          rp = prevStats[0].reps;
        }

        sets.push({ weight: wt, reps: rp, completed: false });
      }

      return {
        exerciseName: ex.exerciseName,
        muscleGroup: ex.muscleGroup,
        notes: ex.notes || '',
        sets
      };
    }) : [];

    const session = {
      id: Date.now(),
      templateId: plan.id,
      workoutDayId: selectedDay.id,
      startTime: new Date().toISOString(),
      name: `${plan.name} - ${selectedDay.name}`,
      durationSeconds: 0,
      exercises
    };

    store.setActiveWorkout(session);
    setActiveWorkout(session);
    setIsSummaryOpen(false);
  };

  const handleToggleSet = (exIdx, setIdx, weightDisplay, repsVal) => {
    if (!activeWorkout) return;

    const updated = { ...activeWorkout };
    const set = updated.exercises[exIdx].sets[setIdx];

    set.completed = !set.completed;
    set.weight = convertInputWeightToKg(weightDisplay);
    set.reps = Number(repsVal) || 0;

    store.setActiveWorkout(updated);
    setActiveWorkout(updated);

    if (set.completed) {
      // Trigger floating rest countdown
      const exName = updated.exercises[exIdx].exerciseName;
      const matched = exerciseDatabase.find(e => e.name.toLowerCase() === exName.toLowerCase());
      const restSec = matched ? matched.rest : 90;

      setRestTimer({ active: true, secondsLeft: restSec, totalSeconds: restSec });
    }
  };

  const handleAddSetToExercise = (exIdx) => {
    if (!activeWorkout) return;
    const updated = { ...activeWorkout };
    const sets = updated.exercises[exIdx].sets;
    const last = sets[sets.length - 1] || { weight: 20, reps: 10 };

    sets.push({ weight: last.weight, reps: last.reps, completed: false });
    store.setActiveWorkout(updated);
    setActiveWorkout(updated);
  };

  const handleRemoveSetFromExercise = (exIdx) => {
    if (!activeWorkout) return;
    const updated = { ...activeWorkout };
    const sets = updated.exercises[exIdx].sets;
    if (sets.length > 1) {
      sets.pop();
      store.setActiveWorkout(updated);
      setActiveWorkout(updated);
    }
  };

  const handleAddExerciseToWorkout = (ex) => {
    if (!activeWorkout) return;
    const updated = { ...activeWorkout };
    updated.exercises.push({
      exerciseName: ex.name,
      muscleGroup: ex.muscle,
      notes: ex.notes || '',
      sets: [{ weight: 20, reps: 10, completed: false }]
    });

    store.setActiveWorkout(updated);
    setActiveWorkout(updated);
    setIsExercisePickerOpen(false);
  };

  const handleDiscardWorkout = () => {
    if (confirm("Are you sure you want to discard this session? All changes will be lost.")) {
      clearInterval(workoutTimerRef.current);
      store.clearActiveWorkout();
      setActiveWorkout(null);
      setElapsedSeconds(0);
      setRestTimer({ active: false, secondsLeft: 0, totalSeconds: 0 });
    }
  };

  const handleFinishWorkout = () => {
    if (!activeWorkout) return;

    let loggedSets = 0;
    activeWorkout.exercises.forEach(ex => {
      ex.sets.forEach(s => { if (s.completed) loggedSets++; });
    });

    if (loggedSets === 0) {
      alert("Complete at least 1 set before completing the session!");
      return;
    }

    clearInterval(workoutTimerRef.current);
    setRestTimer({ active: false, secondsLeft: 0, totalSeconds: 0 });

    const finalizedExs = activeWorkout.exercises.map(ex => ({
      exerciseName: ex.exerciseName,
      muscleGroup: ex.muscleGroup,
      sets: ex.sets.filter(s => s.completed)
    })).filter(ex => ex.sets.length > 0);

    const completed = {
      id: activeWorkout.id,
      templateId: activeWorkout.templateId || "quick_workout",
      workoutDayId: activeWorkout.workoutDayId || "quick_day",
      name: activeWorkout.name,
      date: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      exercises: finalizedExs
    };

    // Calculate volume & inspect PRs
    let volKg = 0;
    finalizedExs.forEach(ex => {
      ex.sets.forEach(s => { volKg += s.weight * s.reps; });
    });

    const currentPrs = store.getPRs();
    const shattered = [];
    finalizedExs.forEach(ex => {
      const name = ex.exerciseName;
      const oldMax = currentPrs[name] ? currentPrs[name].maxWeight : 0;

      ex.sets.forEach(s => {
        if (s.weight > oldMax && oldMax > 0) {
          const match = shattered.find(p => p.name === name);
          if (match) {
            if (s.weight > match.newPr) match.newPr = s.weight;
          } else {
            shattered.push({ name, oldPr: oldMax, newPr: s.weight });
          }
        }
      });
    });

    store.addLog(completed);
    store.clearActiveWorkout();

    // Celebrations
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

    setSummaryStats({
      duration: Math.max(1, Math.round(elapsedSeconds / 60)),
      sets: loggedSets,
      volume: volKg,
      shatteredPrs: shattered
    });

    setActiveWorkout(null);
    setElapsedSeconds(0);
    setIsSummaryOpen(true);

    loadStoreData();
  };

  // --- Custom Split Builder Wizards ---
  const handleOpenBuilder = () => {
    setBuilderName('');
    setBuilderDesc('');
    setBuilderSplit('push_pull_legs');
    setBuilderLevel('intermediate');
    setBuilderDaysCount(3);
    setBuilderStep(1);
    setIsBuilderOpen(true);
  };

  const handleNextBuilderStep = () => {
    if (!builderName.trim()) {
      alert("Enter a routine name.");
      return;
    }

    const daysArr = [];
    for (let d = 1; d <= builderDaysCount; d++) {
      daysArr.push({
        name: `Day ${d}`,
        focusArea: '',
        exercises: [{ exerciseName: '', sets: 3, reps: '8-12' }]
      });
    }

    setBuilderDays(daysArr);
    setBuilderStep(2);
  };

  const handleBuilderAddExToDay = (dayIdx) => {
    const updated = [...builderDays];
    updated[dayIdx].exercises.push({ exerciseName: '', sets: 3, reps: '8-12' });
    setBuilderDays(updated);
  };

  const handleBuilderRemoveExFromDay = (dayIdx, exIdx) => {
    const updated = [...builderDays];
    updated[dayIdx].exercises.splice(exIdx, 1);
    setBuilderDays(updated);
  };

  const handleBuilderExChange = (dayIdx, exIdx, field, value) => {
    const updated = [...builderDays];
    updated[dayIdx].exercises[exIdx][field] = value;
    setBuilderDays(updated);
  };

  const handleBuilderDayLabelChange = (dayIdx, field, value) => {
    const updated = [...builderDays];
    updated[dayIdx][field] = value;
    setBuilderDays(updated);
  };

  const handleSaveCustomPlan = () => {
    const workoutDays = builderDays.map((d, dIdx) => {
      const focusArea = d.focusArea ? d.focusArea.split(',').map(s => s.trim()) : ["custom"];
      const exercises = d.exercises.map(ex => {
        const matched = exerciseDatabase.find(e => e.name === ex.exerciseName);
        const muscleGroup = matched ? matched.muscle : "custom";
        return {
          exerciseName: ex.exerciseName,
          muscleGroup,
          sets: Number(ex.sets) || 3,
          reps: ex.reps || "8-12"
        };
      }).filter(ex => ex.exerciseName);

      return {
        id: `custom_day_${Date.now()}_${dIdx + 1}`,
        name: d.name || `Day ${dIdx + 1}`,
        focusArea,
        exercises
      };
    });

    const weeklySchedule = workoutDays.map((w, wIdx) => ({
      dayNumber: wIdx + 1,
      label: w.name,
      workoutDayId: w.id
    }));

    const newPlan = {
      id: `custom_plan_${Date.now()}`,
      name: builderName,
      splitType: builderSplit,
      daysPerWeek: builderDaysCount,
      experienceLevel: builderLevel,
      goal: ["hypertrophy"],
      description: builderDesc || "Custom structured Routine",
      workoutDays,
      weeklySchedule
    };

    store.addCustomPlan(newPlan);
    store.setActivePlanId(newPlan.id);

    setIsBuilderOpen(false);
    loadStoreData();
  };

  // --- Settings Controller methods ---
  useEffect(() => {
    if (activeTab === 'settings' && profile) {
      // Guard every field against undefined — controlled inputs must never receive undefined
      setSettingsName(profile.name ?? '');
      setSettingsLevel(profile.level ?? 'beginner');
      setSettingsHeight(profile.height != null ? String(profile.height) : '');
      setSettingsWeight(profile.weight ? String(convertKgToDisplayWeight(profile.weight)) : '');
      setSettingsUnits(profile.units ?? 'metric');
      // soundEnabled may arrive as boolean or undefined; default true
      setSettingsSound(profile.soundEnabled ?? true);
    }
  }, [activeTab, profile]);

  const handleSaveProfile = () => {
    let weightVal = Number(settingsWeight);
    if (settingsUnits === "imperial" && weightVal) {
      weightVal = Math.round((weightVal / 2.20462) * 10) / 10;
    }

    store.updateUserProfile({
      name: settingsName || "Challenger",
      level: settingsLevel,
      height: Number(settingsHeight) || null,
      weight: weightVal
    });

    store.addBodyWeight(weightVal);
    alert("Profile configurations saved.");
    loadStoreData();
  };

  const handleUnitsChange = (nextUnits) => {
    store.updateUserProfile({ units: nextUnits });
    setSettingsUnits(nextUnits);
    loadStoreData();
  };

  const handleSoundToggle = (val) => {
    store.updateUserProfile({ soundEnabled: val === "true" });
    setSettingsSound(val === "true");
  };

  const handleExportData = () => {
    const fullBackup = {
      logs: store.getLogs(),
      activePlanId: store.getActivePlanId(),
      customPlans: store.getCustomPlans(),
      bodyWeights: store.getBodyWeights(),
      userProfile: store.getUserProfile()
    };

    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dumbbellx_backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTrigger = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.logs) localStorage.setItem("dumbbellx_logs", JSON.stringify(data.logs));
        if (data.activePlanId) localStorage.setItem("dumbbellx_active_plan_id", JSON.stringify(data.activePlanId));
        if (data.customPlans) localStorage.setItem("dumbbellx_custom_plans", JSON.stringify(data.customPlans));
        if (data.bodyWeights) localStorage.setItem("dumbbellx_body_weights", JSON.stringify(data.bodyWeights));
        if (data.userProfile) localStorage.setItem("dumbbellx_user_profile", JSON.stringify(data.userProfile));

        alert("Data successfully restored from backup! Reloading.");
        window.location.reload();
      } catch (err) {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (confirm("CRITICAL WARNING: This will completely wipe all of your logged history. This action cannot be undone. Proceed?")) {
      store.resetAllData();
      alert("App data reset. Reloading.");
      window.location.reload();
    }
  };

  // --- Rendering Chart.js charts ---
  const renderVolumeChart = () => {
    if (!volumeChartRef.current) return;
    const lastLogs = logs.slice(-7);
    const labels = lastLogs.map(l => new Date(l.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
    const datasetVolume = lastLogs.map(l => {
      let v = 0;
      l.exercises.forEach(ex => { ex.sets.forEach(s => { v += s.weight * s.reps; }); });
      return convertKgToDisplayWeight(v);
    });

    if (volumeChartInstance.current) volumeChartInstance.current.destroy();

    if (lastLogs.length === 0) return;

    volumeChartInstance.current = new Chart(volumeChartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: `Total Session Volume (${profile.units === 'imperial' ? 'lbs' : 'kg'})`,
          data: datasetVolume,
          backgroundColor: "rgba(6, 182, 212, 0.4)",
          borderColor: "#06b6d4",
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#94a3b8" } },
          x: { grid: { display: false }, ticks: { color: "#94a3b8" } }
        },
        plugins: { legend: { display: false } }
      }
    });
  };

  const renderMuscleChart = () => {
    if (!muscleChartRef.current) return;

    const tally = {};
    logs.forEach(l => {
      l.exercises.forEach(ex => {
        const m = ex.muscleGroup || "custom";
        if (!tally[m]) tally[m] = 0;
        ex.sets.forEach(() => { tally[m]++; });
      });
    });

    const labels = Object.keys(tally);
    const values = Object.values(tally);

    if (muscleChartInstance.current) muscleChartInstance.current.destroy();

    if (labels.length === 0) return;

    muscleChartInstance.current = new Chart(muscleChartRef.current, {
      type: "radar",
      data: {
        labels: labels.map(l => l.toUpperCase()),
        datasets: [{
          label: "Sets Logged",
          data: values,
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          borderColor: "#8b5cf6",
          pointBackgroundColor: "#8b5cf6",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            angleLines: { color: "rgba(255, 255, 255, 0.08)" },
            ticks: { backdropColor: "transparent", color: "#94a3b8", display: false },
            pointLabels: { color: "#94a3b8", font: { family: "Outfit", size: 10 } }
          }
        },
        plugins: { legend: { display: false } }
      }
    });
  };

  const renderPrProgressionChart = (exerciseName) => {
    if (!prChartRef.current || !exerciseName) return;

    const history = [];
    logs.forEach(log => {
      const matched = log.exercises.find(ex => ex.exerciseName.toLowerCase() === exerciseName.toLowerCase());
      if (matched) {
        let maxWt = 0;
        let maxRm = 0;
        matched.sets.forEach(s => {
          const wt = Number(s.weight) || 0;
          const reps = Number(s.reps) || 0;
          if (wt > maxWt) maxWt = wt;
          const rm = reps === 1 ? wt : wt / (1.0278 - 0.0278 * reps);
          if (rm > maxRm) maxRm = rm;
        });

        if (maxWt > 0) {
          history.push({
            date: new Date(log.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
            maxWeight: convertKgToDisplayWeight(maxWt),
            max1RM: Math.round(convertKgToDisplayWeight(maxRm) * 10) / 10
          });
        }
      }
    });

    if (prChartInstance.current) prChartInstance.current.destroy();

    if (history.length === 0) return;

    prChartInstance.current = new Chart(prChartRef.current, {
      type: "line",
      data: {
        labels: history.map(h => h.date),
        datasets: [
          {
            label: "Max Weight",
            data: history.map(h => h.maxWeight),
            borderColor: "#06b6d4",
            backgroundColor: "rgba(6, 182, 212, 0.05)",
            borderWidth: 3,
            tension: 0.3,
            fill: true
          },
          {
            label: "Estimated 1RM",
            data: history.map(h => h.max1RM),
            borderColor: "#8b5cf6",
            borderDash: [5, 5],
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#94a3b8" } },
          x: { grid: { display: false }, ticks: { color: "#94a3b8" } }
        },
        plugins: { legend: { labels: { color: "#f8fafc", font: { family: "Outfit" } } } }
      }
    });
  };

  // --- Calendar Generator ---
  const renderCalendarDays = () => {
    const cells = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDayIdx = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    const loggedDatesMap = {};
    logs.forEach(l => {
      const dStr = l.date.split("T")[0];
      if (!loggedDatesMap[dStr]) loggedDatesMap[dStr] = [];
      loggedDatesMap[dStr].push(l);
    });

    // Render preceding padding cells
    for (let i = firstDayIdx - 1; i >= 0; i--) {
      cells.push(
        <div key={`prev-${i}`} className="calendar-day-cell inactive">
          {prevMonthLastDate - i}
        </div>
      );
    }

    // Render active cells
    const todayStr = now.toISOString().split("T")[0];
    for (let d = 1; d <= lastDate; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const matchedLogs = loggedDatesMap[dateStr] || [];

      cells.push(
        <div
          key={`day-${d}`}
          className={`calendar-day-cell ${isToday ? 'today' : ''}`}
          onClick={() => {
            if (matchedLogs.length === 1) {
              setSelectedPlanModal(matchedLogs[0]);
            } else if (matchedLogs.length > 1) {
              alert(`Completed ${matchedLogs.length} sessions: \n` + matchedLogs.map(m => `- ${m.name}`).join("\n"));
            }
          }}
        >
          {d}
          {matchedLogs.length > 0 && <div className="calendar-day-dot"></div>}
        </div>
      );
    }

    return cells;
  };

  // Filter exercises based on query
  const filteredExercises = exerciseDatabase.filter(ex =>
    ex.name.toLowerCase().includes(exSearchQuery.toLowerCase()) ||
    ex.muscle.toLowerCase().includes(exSearchQuery.toLowerCase())
  );
  
  // ── Premium landing page when not signed in ────────────────────

  if (!isSignedIn) {
    const features = [
      { icon: <Trophy style={{width:'14px',height:'14px',color:'#fbbf24'}}/>, label:'PR Tracking' },
      { icon: <ChartIcon style={{width:'14px',height:'14px',color:'#22d3ee'}}/>, label:'Analytics' },
      { icon: <RefreshCw style={{width:'14px',height:'14px',color:'#34d399'}}/>, label:'Cloud Sync' },
      { icon: <ClipboardList style={{width:'14px',height:'14px',color:'#a78bfa'}}/>, label:'Workout Plans' },
      { icon: <Activity style={{width:'14px',height:'14px',color:'#f472b6'}}/>, label:'Live Tracker' },
      { icon: <Flame style={{width:'14px',height:'14px',color:'#fb923c'}}/>, label:'Streak System' },
    ];
    return (
      <>
        {/* ── Responsive CSS ── */}
        <style>{`
          #lp-root {
            min-height: 100vh;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: #070913;
            background-image:
              radial-gradient(at 20% 30%, rgba(139,92,246,0.15) 0, transparent 55%),
              radial-gradient(at 80% 70%, rgba(6,182,212,0.12) 0, transparent 55%);
            position: relative;
            overflow: hidden;
          }
          #lp-blob1 { position:absolute; top:5%; left:5%; width:380px; height:380px; border-radius:50%; background:rgba(139,92,246,0.07); filter:blur(100px); pointer-events:none; }
          #lp-blob2 { position:absolute; bottom:5%; right:5%; width:320px; height:320px; border-radius:50%; background:rgba(6,182,212,0.07); filter:blur(100px); pointer-events:none; }
          #lp-left  { flex:1 1 380px; display:flex; flex-direction:column; justify-content:center; padding:clamp(2.5rem,6vw,5.5rem); z-index:1; }
          #lp-right { flex:0 0 auto; width:min(100%,400px); padding:clamp(1.25rem,4vw,3.5rem); z-index:1; }
          #lp-card  { background:rgba(18,22,41,0.78); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.08); border-radius:22px; padding:clamp(1.5rem,4vw,2.25rem); box-shadow:0 24px 64px rgba(0,0,0,0.5); }
          #lp-features { display:grid; grid-template-columns:1fr 1fr; gap:0.65rem; }
          #lp-cta { display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:2rem; }
          @media (max-width: 700px) {
            #lp-root  { flex-direction:column; align-items:stretch; }
            #lp-left  { order:2; padding:2rem 1.25rem 3rem; }
            #lp-right { display:none; }
            #lp-left h1 { font-size:1.8rem !important; }
            #lp-features { grid-template-columns:1fr 1fr; }
          }
        `}</style>

        <div id="lp-root">
          <div id="lp-blob1" />
          <div id="lp-blob2" />

          {/* LEFT — branding */}
          <div id="lp-left">
            {/* Logo */}
            <div style={{display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'2.25rem'}}>
              <div style={{background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',borderRadius:'14px',padding:'0.65rem',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 30px rgba(139,92,246,0.45)'}}>
                <Dumbbell style={{width:'26px',height:'26px',color:'white'}} />
              </div>
              <span style={{fontFamily:'var(--font-display)',fontSize:'1.6rem',fontWeight:800,background:'linear-gradient(135deg,#fff 40%,#8b5cf6)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:'-0.02em'}}>
                DUMBBELLX
              </span>
            </div>

            {/* Headline */}
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.9rem,4.5vw,3.2rem)',fontWeight:800,lineHeight:1.1,marginBottom:'1rem'}}>
              <span style={{background:'linear-gradient(135deg,#fff 50%,rgba(255,255,255,0.55))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                Train Smarter.<br />Break Every&nbsp;
              </span>
              <span style={{background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Record.</span>
            </h1>
            <p style={{fontSize:'0.95rem',color:'var(--text-secondary)',lineHeight:1.8,marginBottom:'1.75rem',maxWidth:'400px'}}>
              Log workouts, track PRs, visualise your gains — all in one premium fitness tracker.
            </p>

            {/* CTA buttons */}
            <div id="lp-cta">
              <SignInButton mode="modal">
                <button style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',color:'white',border:'none',cursor:'pointer',padding:'0.8rem 1.75rem',borderRadius:'50px',fontSize:'0.95rem',fontFamily:'var(--font-display)',fontWeight:700,boxShadow:'0 8px 28px rgba(139,92,246,0.4)'}}>
                  <LogIn style={{width:'16px',height:'16px'}} /> Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(255,255,255,0.05)',color:'var(--text-primary)',border:'1px solid rgba(255,255,255,0.12)',cursor:'pointer',padding:'0.8rem 1.75rem',borderRadius:'50px',fontSize:'0.95rem',fontFamily:'var(--font-display)',fontWeight:600}}>
                  <Sparkles style={{width:'16px',height:'16px'}} /> Sign Up Free
                </button>
              </SignUpButton>
            </div>

            {/* Feature grid */}
            <div id="lp-features">
              {features.map(({icon, label}) => (
                <div key={label} style={{display:'flex',alignItems:'center',gap:'0.5rem',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px',padding:'0.55rem 0.85rem',fontSize:'0.8rem',color:'var(--text-secondary)',fontFamily:'var(--font-display)',fontWeight:500}}>
                  {icon} {label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — auth card */}
          <div id="lp-right">
            <div id="lp-card">
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',fontWeight:700,marginBottom:'0.3rem',color:'#f8fafc',textAlign:'center'}}>Welcome Back</h2>
              <p style={{fontSize:'0.82rem',color:'var(--text-secondary)',marginBottom:'1.5rem',textAlign:'center'}}>Sign in to continue to Dumbbellx</p>

              {/* Google */}
              <SignInButton mode="modal">
                <button style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.7rem',width:'100%',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'0.8rem',color:'var(--text-primary)',cursor:'pointer',fontFamily:'var(--font-display)',fontWeight:600,fontSize:'0.875rem',marginBottom:'1rem',boxSizing:'border-box'}}>
                  <svg width="17" height="17" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"/></svg>
                  Continue with Google
                </button>
              </SignInButton>

              <div style={{display:'flex',alignItems:'center',gap:'0.6rem',marginBottom:'1rem'}}>
                <div style={{flex:1,height:'1px',background:'rgba(255,255,255,0.07)'}} />
                <span style={{fontSize:'0.72rem',color:'var(--text-muted)'}}>or</span>
                <div style={{flex:1,height:'1px',background:'rgba(255,255,255,0.07)'}} />
              </div>

              <label style={{display:'block',fontSize:'0.78rem',color:'var(--text-secondary)',marginBottom:'0.35rem',fontFamily:'var(--font-display)',fontWeight:500}}>Email address</label>
              <SignInButton mode="modal">
                <div style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',borderRadius:'10px',padding:'0.75rem 1rem',color:'rgba(148,163,184,0.5)',fontSize:'0.875rem',cursor:'pointer',marginBottom:'1rem',boxSizing:'border-box'}}>
                  Enter your email address
                </div>
              </SignInButton>

              <SignInButton mode="modal">
                <button style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',color:'white',border:'none',cursor:'pointer',padding:'0.85rem',borderRadius:'12px',fontFamily:'var(--font-display)',fontWeight:700,fontSize:'0.9rem',boxShadow:'0 4px 20px rgba(139,92,246,0.35)',marginBottom:'1.25rem',boxSizing:'border-box'}}>
                  Continue ▶
                </button>
              </SignInButton>

              <p style={{textAlign:'center',fontSize:'0.8rem',color:'var(--text-muted)',margin:0}}>
                No account?&nbsp;
                <SignUpButton mode="modal">
                  <button style={{color:'#a78bfa',fontWeight:600,background:'none',border:'none',cursor:'pointer',padding:0,fontFamily:'var(--font-display)',fontSize:'0.8rem'}}>Sign up free</button>
                </SignUpButton>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div id="app">

      {/* DESKTOP SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <Dumbbell className="brand-logo-glow" />
          <span>DUMBBELLX</span>
        </div>
        <nav>
          <ul className="nav-menu">
            <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('dashboard')}><LayoutDashboard />Dashboard</button>
            </li>
            <li className={`nav-item ${activeTab === 'plans' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('plans')}><ClipboardList />Workout Plans</button>
            </li>
            <li className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('tracker')}><PlayCircle />Active Workout</button>
            </li>
            <li className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('analytics')}><ChartIcon />Analytics & History</button>
            </li>
            <li className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('settings')}><SettingsIcon />Settings</button>
            </li>
          </ul>
        </nav>

        {/* Dynamic Clerk Sidebar Section */}
        <div id="sidebar-auth-section" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {isSignedIn && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src={user.imageUrl} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--color-primary)' }} alt="Profile" />
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.firstName || 'User'}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  Cloud Synced <RefreshCw className="spin-slow" style={{ width: '10px', height: '10px' }} />
                </span>
              </div>
              <button className="remove-btn" onClick={() => signOut()} style={{ width: '28px', height: '28px', borderRadius: '6px', marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)' }} title="Sign Out">
                <LogOut style={{ width: '12px', height: '12px' }} />
              </button>
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="action-btn btn-primary btn-small">
                <LogIn style={{ width: '14px', height: '14px', marginRight: '0.5rem' }} /> Sign In to Sync
              </button>
            </SignInButton>
          )}
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-nav">
        <button className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <LayoutDashboard />
          <span>Dashboard</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>
          <ClipboardList />
          <span>Plans</span>
        </button>
        <button className={`mobile-nav-item center-btn ${activeWorkout ? 'active-workout-running' : ''}`} onClick={() => setActiveTab('tracker')}>
          {activeWorkout ? <Activity className="spin-slow" /> : <PlayCircle />}
        </button>
        <button className={`mobile-nav-item ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
          <ChartIcon />
          <span>History</span>
        </button>
        <button className={`mobile-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <SettingsIcon />
          <span>Settings</span>
        </button>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <main className="main-content">

        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <section id="view-dashboard" className="view-section active">
            <div className="header-bar">
              <div className="user-welcome">
                <h1>Welcome back, {isSignedIn && user ? user.firstName : profile.name}</h1>
                <p>Ready to push your limits today?</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {isSignedIn && user ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '0.35rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', color: '#a7f3d0' }}>
                      <img src={user.imageUrl} style={{ width: '18px', height: '18px', borderRadius: '50%' }} alt="Avatar" />
                      <span style={{ fontWeight: 500 }}>Synced</span>
                    </div>
                    <button
                      onClick={() => signOut()}
                      title="Sign out"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 500, transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                    >
                      <LogOut style={{ width: '12px', height: '12px' }} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <SignInButton mode="modal">
                    <button className="action-btn btn-secondary btn-small" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '20px', width: 'auto' }}>
                      <LogIn style={{ width: '12px', height: '12px', marginRight: '0.35rem' }} /> Sign In
                    </button>
                  </SignInButton>
                )}
                <div className="streak-indicator">
                  <Flame />
                  <span>{profile.streak} Day Streak</span>
                </div>
              </div>
            </div>

            {/* Active Plan Banner */}
            <div className="glass-card accent-purple">
              <h3 style={{ marginBottom: '0.25rem' }}>Active Routine</h3>
              {(() => {
                const activePlan = [...defaultTemplates, ...customPlans].find(p => p.id === activePlanId);
                if (activePlan) {
                  return (
                    <>
                      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>{activePlan.name}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{activePlan.description || "Custom active training program."}</p>
                      <button className="action-btn btn-primary btn-small" onClick={() => { setActiveTab('tracker'); handleStartWorkoutFromPlan(activePlan); }} style={{ width: 'auto', marginTop: '1rem' }}>
                        <PlayCircle style={{ marginRight: '0.5rem' }} /> Start Today's Workout
                      </button>
                    </>
                  );
                } else {
                  return (
                    <>
                      <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>No active routine chosen</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Head to Workout Plans to select or create a training program.</p>
                    </>
                  );
                }
              })()}
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-grid">
              <div className="glass-card stat-item">
                <span className="stat-label">Workouts</span>
                <span className="stat-value">{logs.length}</span>
              </div>
              <div className="glass-card stat-item">
                <span className="stat-label">PRs Set</span>
                <span className="stat-value" style={{ color: 'var(--color-secondary)' }}>{Object.keys(prs).length}</span>
              </div>
              <div className="glass-card stat-item">
                <span className="stat-label">Total Volume</span>
                <span className="stat-value">
                  {Math.round(convertKgToDisplayWeight(
                    logs.reduce((tot, l) => tot + l.exercises.reduce((exTot, ex) => exTot + ex.sets.reduce((sTot, s) => sTot + (s.weight * s.reps), 0), 0), 0)
                  ))} <span className="stat-unit">{profile.units === "imperial" ? "lbs" : "kg"}</span>
                </span>
              </div>
              <div className="glass-card stat-item">
                <span className="stat-label">Body Weight</span>
                <span className="stat-value">
                  {profile.weight ? convertKgToDisplayWeight(profile.weight) : '--'} <span className="stat-unit">{profile.units === "imperial" ? "lbs" : "kg"}</span>
                </span>
              </div>
            </div>

            {/* PR Showcase */}
            <div className="pr-spotlight-section">
              <h2 className="section-title"><Award /> Personal Records Spotlight</h2>
              <div className="pr-grid">
                {(() => {
                  const targetCompounds = [
                    { name: "Barbell Bench Press", defaultName: "Bench Press" },
                    { name: "Barbell Back Squat", defaultName: "Back Squat" },
                    { name: "Barbell Deadlift", defaultName: "Deadlift" },
                    { name: "Barbell Overhead Press", defaultName: "Overhead Press" }
                  ];

                  const renderedPrs = [];
                  targetCompounds.forEach(t => {
                    const prKey = Object.keys(prs).find(k => k.toLowerCase() === t.name.toLowerCase() || k.toLowerCase() === t.defaultName.toLowerCase());
                    if (prKey && prs[prKey] && prs[prKey].maxWeight > 0) {
                      const data = prs[prKey];
                      renderedPrs.push(
                        <div className="glass-card pr-card" key={t.name}>
                          <div className="pr-exercise" title={prKey}>{t.defaultName}</div>
                          <div className="pr-weight">{convertKgToDisplayWeight(data.maxWeight)} <span style={{ fontSize: '0.75rem' }}>{profile.units === "imperial" ? "lbs" : "kg"}</span></div>
                          <div className="pr-details">{data.repsForMax} Reps • 1RM: {convertKgToDisplayWeight(data.max1RM)}</div>
                        </div>
                      );
                    }
                  });

                  if (renderedPrs.length > 0) return renderedPrs;

                  // Fallback to top weights
                  const sortedTop = Object.entries(prs)
                    .filter(([_, d]) => d.maxWeight > 0)
                    .sort((a, b) => b[1].maxWeight - a[1].maxWeight)
                    .slice(0, 4);

                  if (sortedTop.length > 0) {
                    return sortedTop.map(([name, data]) => (
                      <div className="glass-card pr-card" key={name}>
                        <div className="pr-exercise" title={name}>{name}</div>
                        <div className="pr-weight">{convertKgToDisplayWeight(data.maxWeight)} <span style={{ fontSize: '0.75rem' }}>{profile.units === "imperial" ? "lbs" : "kg"}</span></div>
                        <div className="pr-details">{data.repsForMax} Reps • 1RM: {convertKgToDisplayWeight(data.max1RM)}</div>
                      </div>
                    ));
                  }

                  return (
                    <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                      No compound PRs logged yet. Records will populate here automatically.
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        {/* 2. PLANS TAB */}
        {activeTab === 'plans' && (
          <section id="view-plans" className="view-section active">
            <div className="header-bar">
              <div className="user-welcome">
                <h1>Training Routines</h1>
                <p>Pick a structured program or customize your own split.</p>
              </div>
            </div>

            {!isBuilderOpen ? (
              <>
                <div className="plan-tabs">
                  <button className={`plan-tab-btn ${planTab === 'preset' ? 'active' : ''}`} onClick={() => setPlanTab('preset')}>Default Splits</button>
                  <button className={`plan-tab-btn ${planTab === 'custom' ? 'active' : ''}`} onClick={() => setPlanTab('custom')}>Custom Splits</button>
                </div>

                {/* Default Preset list */}
                {planTab === 'preset' && (
                  <div className="plan-list">
                    {defaultTemplates.map(plan => (
                      <div className={`plan-card ${plan.id === activePlanId ? 'accent-purple' : ''}`} key={plan.id} onClick={() => setSelectedPlanModal(plan)}>
                        <div className="plan-card-header">
                          <div className="plan-name">{plan.name} {plan.id === activePlanId && <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', marginLeft: '0.5rem' }}>Active</span>}</div>
                          <div className="badge badge-cyan">{plan.splitType.replace("_", " ")}</div>
                        </div>
                        <div className="plan-meta">
                          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{plan.experienceLevel}</span>
                          <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{plan.daysPerWeek} days/week</span>
                        </div>
                        <div className="plan-desc">{plan.description}</div>
                        <div className="plan-stats-row">
                          <span><CalendarIcon style={{ width: '14px', height: '14px', marginRight: '0.25rem', display: 'inline' }} /> {plan.workoutDays.length} Days Structured</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom User list */}
                {planTab === 'custom' && (
                  <div>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                      <button className="action-btn btn-primary btn-small" onClick={handleOpenBuilder} style={{ width: 'auto' }}>
                        <Plus style={{ marginRight: '0.25rem' }} /> Build Custom Routine
                      </button>
                    </div>
                    <div className="plan-list">
                      {customPlans.length > 0 ? (
                        customPlans.map(plan => (
                          <div className={`plan-card ${plan.id === activePlanId ? 'accent-purple' : ''}`} key={plan.id} onClick={() => setSelectedPlanModal(plan)}>
                            <div className="plan-card-header">
                              <div className="plan-name">{plan.name} {plan.id === activePlanId && <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem', marginLeft: '0.5rem' }}>Active</span>}</div>
                              <div className="badge badge-amber">{plan.splitType.replace("_", " ")}</div>
                            </div>
                            <div className="plan-meta">
                              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{plan.experienceLevel}</span>
                              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>{plan.daysPerWeek} days/week</span>
                            </div>
                            <div className="plan-desc">{plan.description}</div>
                            <div className="plan-stats-row">
                              <span><CalendarIcon style={{ width: '14px', height: '14px', marginRight: '0.25rem', display: 'inline' }} /> {plan.workoutDays.length} Days Structured</span>
                              <button
                                className="remove-btn"
                                style={{ width: '28px', height: '28px', borderRadius: '6px', marginLeft: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm("Delete this routine?")) {
                                    store.deleteCustomPlan(plan.id);
                                    if (activePlanId === plan.id) store.setActivePlanId("full_body_3_day");
                                    loadStoreData();
                                  }
                                }}
                              >
                                <Trash2 style={{ width: '14px', height: '14px', color: '#f87171' }} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}>
                          No custom routines created yet. Click "Build Custom Routine" to start split configurations!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Plan Builder Wizard Panel
              <div className="glass-card" style={{ marginTop: '1rem' }}>
                {builderStep === 1 ? (
                  <div className="builder-step active">
                    <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Create Training Routine</h2>
                    <div className="builder-form-grid">
                      <div className="form-group">
                        <label>Routine Name</label>
                        <input type="text" className="form-control" placeholder="e.g. Strength Power Split" value={builderName} onChange={(e) => setBuilderName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Split Type</label>
                        <select className="form-control" value={builderSplit} onChange={(e) => setBuilderSplit(e.target.value)}>
                          <option value="push_pull_legs">Push Pull Legs</option>
                          <option value="upper_lower">Upper / Lower</option>
                          <option value="full_body">Full Body</option>
                          <option value="bro_split">Bro Split</option>
                          <option value="other">Custom Split</option>
                        </select>
                      </div>
                    </div>
                    <div className="builder-form-grid">
                      <div className="form-group">
                        <label>Experience Level</label>
                        <select className="form-control" value={builderLevel} onChange={(e) => setBuilderLevel(e.target.value)}>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Workout Days Per Week</label>
                        <select className="form-control" value={builderDaysCount} onChange={(e) => setBuilderDaysCount(Number(e.target.value))}>
                          {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Day' : 'Days'}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Routine Description</label>
                      <textarea className="form-control" placeholder="Describe the goal of this program..." rows="2" value={builderDesc} onChange={(e) => setBuilderDesc(e.target.value)}></textarea>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                      <button className="action-btn btn-secondary btn-small" onClick={() => setIsBuilderOpen(false)} style={{ width: 'auto' }}>Cancel</button>
                      <button className="action-btn btn-primary btn-small" onClick={handleNextBuilderStep} style={{ width: 'auto' }}>Next: Edit Days</button>
                    </div>
                  </div>
                ) : (
                  <div className="builder-step active">
                    <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>Configure Workout Days</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Define day labels and add exercises from the seeded catalog.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {builderDays.map((day, dayIdx) => (
                        <div className="builder-day-block" key={dayIdx}>
                          <div className="builder-day-title">
                            <span>Workout Day #{dayIdx + 1}</span>
                          </div>
                          <div className="builder-form-grid">
                            <div className="form-group">
                              <label>Day Label (e.g. Push, Day 1)</label>
                              <input type="text" className="form-control" value={day.name} onChange={(e) => handleBuilderDayLabelChange(dayIdx, 'name', e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label>Focus Areas (Comma separated)</label>
                              <input type="text" className="form-control" placeholder="e.g. chest, shoulders" value={day.focusArea} onChange={(e) => handleBuilderDayLabelChange(dayIdx, 'focusArea', e.target.value)} />
                            </div>
                          </div>

                          <div style={{ marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Exercises List</label>
                          </div>
                          <div className="builder-exercise-list">
                            {day.exercises.map((ex, exIdx) => (
                              <div className="builder-exercise-row" key={exIdx}>
                                <select
                                  className="form-control"
                                  style={{ padding: '0.5rem 0.75rem', flex: 3 }}
                                  value={ex.exerciseName}
                                  onChange={(e) => handleBuilderExChange(dayIdx, exIdx, 'exerciseName', e.target.value)}
                                >
                                  <option value="" disabled>Select Exercise...</option>
                                  {[...exerciseDatabase].sort((a, b) => a.name.localeCompare(b.name)).map(e => (
                                    <option key={e.id} value={e.name}>{e.name} ({e.muscle})</option>
                                  ))}
                                </select>
                                <input type="number" className="form-control" placeholder="Sets" style={{ padding: '0.5rem 0.25rem', flex: 1, textAlign: 'center' }} value={ex.sets} onChange={(e) => handleBuilderExChange(dayIdx, exIdx, 'sets', e.target.value)} min="1" max="10" />
                                <input type="text" className="form-control" placeholder="Reps" style={{ padding: '0.5rem 0.25rem', flex: 1, textAlign: 'center' }} value={ex.reps} onChange={(e) => handleBuilderExChange(dayIdx, exIdx, 'reps', e.target.value)} />
                                <button className="remove-btn" style={{ width: '34px', height: '34px' }} onClick={() => handleBuilderRemoveExFromDay(dayIdx, exIdx)}>
                                  <X style={{ width: '14px', height: '14px' }} />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button className="action-btn btn-secondary btn-small" onClick={() => handleBuilderAddExToDay(dayIdx)} style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                            <Plus style={{ marginRight: '0.25rem' }} /> Add Exercise
                          </button>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                      <button className="action-btn btn-secondary btn-small" onClick={() => setBuilderStep(1)} style={{ width: 'auto' }}>Back</button>
                      <button className="action-btn btn-success btn-small" onClick={handleSaveCustomPlan} style={{ width: 'auto' }}>Save & Create Plan</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* 3. TRACKER TAB */}
        {activeTab === 'tracker' && (
          <section id="view-tracker" className="view-section active">

            {/* Idle State */}
            {!activeWorkout && !isSummaryOpen && (
              <div id="tracker-idle-state" className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <PlayCircle style={{ fontSize: '4rem', color: 'var(--color-primary)', width: '60px', height: '60px', margin: '0 auto 1rem' }} />
                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No Active Session</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>Select your routine split day or start an empty quick workout to begin tracking.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '280px', margin: '0 auto' }}>
                  <button className="action-btn btn-primary" onClick={() => {
                    const activePlan = [...defaultTemplates, ...customPlans].find(p => p.id === activePlanId);
                    if (activePlan) handleStartWorkoutFromPlan(activePlan);
                    else alert("Select a routine split first.");
                  }}>
                    <PlayCircle /> Start Scheduled Day
                  </button>
                  <button className="action-btn btn-secondary" onClick={handleStartQuickWorkout}>
                    <Plus /> Start Empty Workout
                  </button>
                </div>
              </div>
            )}

            {/* Active Session Trackers */}
            {activeWorkout && (
              <div id="tracker-active-state">
                <div className="workout-meta-bar">
                  <div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{activeWorkout.name}</h1>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Track your reps and weights below</p>
                  </div>
                  <div className="workout-timer-box">
                    <Timer className="animate-pulse" />
                    <span>{getDurationText(elapsedSeconds)}</span>
                  </div>
                </div>

                <div id="active-exercises-list">
                  {activeWorkout.exercises.map((ex, exIdx) => {
                    const prevStats = store.getPreviousExerciseStats(ex.exerciseName);

                    return (
                      <div className="exercise-track-card" key={exIdx}>
                        <div className="exercise-track-header">
                          <div className="exercise-track-title">
                            <Award style={{ color: 'var(--color-primary)' }} />
                            <span>{ex.exerciseName}</span>
                          </div>
                          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{ex.muscleGroup}</span>
                        </div>
                        <div className="exercise-track-body">
                          <div className="set-row-header">
                            <span>Set</span>
                            <span>Previous</span>
                            <span>Weight</span>
                            <span>Reps</span>
                            <span>Log</span>
                          </div>
                          <div>
                            {ex.sets.map((set, setIdx) => {
                              let prevText = "--";
                              if (prevStats && prevStats[setIdx]) {
                                prevText = `${convertKgToDisplayWeight(prevStats[setIdx].weight)}×${prevStats[setIdx].reps}`;
                              }

                              return (
                                <div className={`set-row ${set.completed ? 'completed' : ''}`} key={setIdx}>
                                  <span className="set-num">{setIdx + 1}</span>
                                  <span className="set-prev">{prevText}</span>
                                  <div className="set-input-box">
                                    <input
                                      type="number"
                                      className="set-input weight-input"
                                      defaultValue={convertKgToDisplayWeight(set.weight)}
                                      step="any"
                                      min="0"
                                      disabled={set.completed}
                                      onChange={(e) => {
                                        activeWorkout.exercises[exIdx].sets[setIdx].weight = convertInputWeightToKg(e.target.value);
                                        store.setActiveWorkout(activeWorkout);
                                      }}
                                    />
                                  </div>
                                  <div className="set-input-box">
                                    <input
                                      type="number"
                                      className="set-input reps-input"
                                      defaultValue={set.reps}
                                      min="0"
                                      disabled={set.completed}
                                      onChange={(e) => {
                                        activeWorkout.exercises[exIdx].sets[setIdx].reps = Number(e.target.value) || 0;
                                        store.setActiveWorkout(activeWorkout);
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <button
                                      className="checkmark-btn"
                                      onClick={(e) => {
                                        const weightInputVal = e.target.closest(".set-row").querySelector(".weight-input").value;
                                        const repsInputVal = e.target.closest(".set-row").querySelector(".reps-input").value;
                                        handleToggleSet(exIdx, setIdx, weightInputVal, repsInputVal);
                                      }}
                                    >
                                      <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                            <button className="action-btn btn-secondary btn-small" onClick={() => handleAddSetToExercise(exIdx)} style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                              <Plus /> Add Set
                            </button>
                            <button className="action-btn btn-secondary btn-small" onClick={() => handleRemoveSetFromExercise(exIdx)} style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.75rem', color: '#f87171', borderColor: 'rgba(239,68,68,0.15)' }}>
                              <Minus /> Remove Set
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button className="action-btn btn-secondary" onClick={() => setIsExercisePickerOpen(true)} style={{ borderStyle: 'dashed', background: 'transparent' }}>
                    <Plus /> Add Custom Exercise
                  </button>
                </div>

                <div className="workout-actions-footer">
                  <button className="action-btn btn-danger" onClick={handleDiscardWorkout} style={{ flex: 1 }}>
                    <Trash2 /> Discard
                  </button>
                  <button className="action-btn btn-success" onClick={handleFinishWorkout} style={{ flex: 2 }}>
                    <CheckCircle2 /> Finish Workout
                  </button>
                </div>
              </div>
            )}

            {/* Completion Summary View */}
            {isSummaryOpen && (
              <div className="glass-card finish-summary-card">
                <div className="trophy-badge">
                  <Trophy />
                </div>
                <h1 className="finish-title">Session Complete!</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Outstanding effort. Session persisted to Cloud.</p>

                <div className="finish-grid">
                  <div className="finish-stat-box">
                    <div className="finish-stat-value">{summaryStats.duration}m</div>
                    <div className="finish-stat-label">Duration</div>
                  </div>
                  <div className="finish-stat-box">
                    <div className="finish-stat-value">{summaryStats.sets}</div>
                    <div className="finish-stat-label">Total Sets</div>
                  </div>
                  <div className="finish-stat-box">
                    <div className="finish-stat-value">{formatWeight(summaryStats.volume)}</div>
                    <div className="finish-stat-label">Volume Moved</div>
                  </div>
                </div>

                {summaryStats.shatteredPrs.length > 0 && (
                  <div className="prs-shattered-box">
                    <div className="prs-shattered-title"><Award /> Personal Records Smashed!</div>
                    <div>
                      {summaryStats.shatteredPrs.map(pr => (
                        <div className="pr-shattered-item" key={pr.name}>
                          <span style={{ fontWeight: 600, color: 'white' }}>{pr.name}</span>
                          <span>{convertKgToDisplayWeight(pr.oldPr)} → <strong style={{ color: 'var(--color-success)' }}>{convertKgToDisplayWeight(pr.newPr)} {profile.units === 'imperial' ? 'lbs' : 'kg'}</strong> 🔥</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="action-btn btn-primary" onClick={() => { setIsSummaryOpen(false); setActiveTab('dashboard'); }} style={{ maxWidth: '250px' }}>
                  Done & Return Home
                </button>
              </div>
            )}
          </section>
        )}

        {/* 4. ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <section id="view-analytics" className="view-section active">
            <div className="header-bar">
              <div className="user-welcome">
                <h1>Analytics & History</h1>
                <p>Track your PR progress, volume levels, and workout logs.</p>
              </div>
            </div>

            <div className="glass-card">
              <h2 className="section-title"><CalendarIcon /> Workout Log Calendar</h2>
              <div className="history-calendar">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Exercise PR lines Progression chart */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 className="section-title" style={{ marginBottom: 0 }}><ChartIcon /> Exercise PR History</h2>
                {Object.keys(prs).length > 0 && (
                  <select
                    className="form-control"
                    style={{ width: 'auto', padding: '0.4rem 1rem', borderRadius: '20px' }}
                    value={chartExSelected}
                    onChange={(e) => {
                      setChartExSelected(e.target.value);
                      renderPrProgressionChart(e.target.value);
                    }}
                  >
                    {Object.keys(prs).sort().map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="chart-wrapper">
                <canvas ref={prChartRef}></canvas>
              </div>
            </div>

            <div className="builder-form-grid">
              <div className="glass-card">
                <h2 className="section-title"><TrendingUp /> Volume Progress (Last 7 Workouts)</h2>
                <div className="chart-wrapper">
                  <canvas ref={volumeChartRef}></canvas>
                </div>
              </div>
              <div className="glass-card">
                <h2 className="section-title"><PieChart /> Muscle Group Balance (Logged Sets)</h2>
                <div className="chart-wrapper">
                  <canvas ref={muscleChartRef}></canvas>
                </div>
              </div>
            </div>

            {/* Logs List history */}
            <div className="glass-card" style={{ marginTop: '1rem' }}>
              <h2 className="section-title"><History /> Past Workouts List</h2>
              <div className="history-list">
                {logs.length > 0 ? (
                  [...logs].reverse().map(log => {
                    const mins = Math.max(1, Math.round(log.durationSeconds / 60));
                    const setsCount = log.exercises.reduce((tot, ex) => tot + ex.sets.length, 0);
                    const volSum = log.exercises.reduce((tot, ex) => tot + ex.sets.reduce((sTot, s) => sTot + (s.weight * s.reps), 0), 0);
                    const dText = new Date(log.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

                    return (
                      <div className="history-card" key={log.id} onClick={() => setSelectedPlanModal(log)}>
                        <div className="history-info">
                          <div className="history-name">{log.name}</div>
                          <div className="history-date">{dText} • {mins} mins</div>
                        </div>
                        <div className="history-stats">
                          <span><strong>{setsCount}</strong> Sets</span>
                          <span><strong>{convertKgToDisplayWeight(volSum)}</strong> {profile.units === "imperial" ? 'lbs' : 'kg'}</span>
                          <button
                            className="remove-btn"
                            style={{ width: '24px', height: '24px', borderRadius: '4px', padding: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Delete completed log?")) {
                                store.deleteLog(log.id);
                                loadStoreData();
                              }
                            }}
                          >
                            <Trash2 style={{ width: '12px', height: '12px' }} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>No logged workouts yet.</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 5. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <section id="view-settings" className="view-section active">
            <div className="header-bar">
              <div className="user-welcome">
                <h1>App Settings</h1>
                <p>Personalize your experience, manage database entries, and backup data.</p>
              </div>
            </div>

            {/* Profile editing card */}
            <div className="glass-card">
              <h2 className="section-title"><UserIcon /> Personal Profile</h2>
              <div className="builder-form-grid">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" placeholder="Challenger" value={settingsName} onChange={(e) => setSettingsName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Training Experience</label>
                  <select className="form-control" value={settingsLevel} onChange={(e) => setSettingsLevel(e.target.value)}>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="builder-form-grid">
                <div className="form-group">
                  <label>Height ({settingsUnits === 'imperial' ? 'inches' : 'cm'})</label>
                  <input type="number" className="form-control" placeholder="175" value={settingsHeight} onChange={(e) => setSettingsHeight(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Current Weight ({settingsUnits === 'imperial' ? 'lbs' : 'kg'})</label>
                  <input type="number" className="form-control" placeholder="75" value={settingsWeight} onChange={(e) => setSettingsWeight(e.target.value)} />
                </div>
              </div>
              <button className="action-btn btn-primary btn-small" onClick={handleSaveProfile} style={{ width: 'auto', marginTop: '0.5rem' }}>
                Save Profile Info
              </button>
            </div>

            {/* Preferences configurations card */}
            <div className="glass-card">
              <h2 className="section-title"><Sliders /> Preferences</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>Unit Measurement System</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Toggle between Metric (kilograms/cm) and Imperial (pounds/inches)</p>
                  </div>
                  <div>
                    <select className="form-control" style={{ width: '120px' }} value={settingsUnits} onChange={(e) => handleUnitsChange(e.target.value)}>
                      <option value="metric">Metric (kg)</option>
                      <option value="imperial">Imperial (lbs)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>Sound Notifications</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enable rest timer chime sound effects</p>
                  </div>
                  <div>
                    <select className="form-control" style={{ width: '120px' }} value={String(settingsSound)} onChange={(e) => handleSoundToggle(e.target.value)}>
                      <option value="true">Enabled</option>
                      <option value="false">Muted</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Data Admin commands card */}
            <div className="glass-card">
              <h2 className="section-title" style={{ color: 'var(--color-danger)' }}><Database /> Data Administration</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Download, upload or reset your workout database.</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button className="action-btn btn-secondary btn-small" onClick={handleExportData} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Download /> Backup Data (Export JSON)
                </button>

                <button className="action-btn btn-secondary btn-small" onClick={handleImportTrigger} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Upload /> Restore Data (Import JSON)
                </button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".json" onChange={handleImportFile} />

                <button className="action-btn btn-danger btn-small" onClick={handleResetData} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                  <Trash2 /> Wipe All Data
                </button>
              </div>
            </div>

            {/* Sign Out card — only shown when signed in */}
            {isSignedIn && (
              <div className="glass-card" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
                <h2 className="section-title" style={{ color: '#f87171' }}><LogOut /> Account</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Signed in as <strong style={{ color: 'var(--text-primary)' }}>{user?.emailAddresses?.[0]?.emailAddress}</strong>
                </p>
                <button
                  onClick={() => signOut()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', padding: '0.6rem 1.25rem', borderRadius: '10px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                >
                  <LogOut style={{ width: '16px', height: '16px' }} /> Sign Out
                </button>
              </div>
            )}
          </section>
        )}

      </main>

      {/* FLOATING CONIC-GRADIENT REST TIMER OVERLAY */}
      {restTimer.active && (
        <div className="rest-timer-bar active" style={{ display: 'flex' }}>
          <div className="rest-timer-info">
            <div
              className="rest-radial-loader"
              style={{
                background: `conic-gradient(var(--color-primary) ${((restTimer.totalSeconds - restTimer.secondsLeft) / restTimer.totalSeconds) * 100}%, rgba(255, 255, 255, 0.1) 0%)`
              }}
            >
              <Hourglass style={{ zIndex: 1, fontSize: '0.8rem', color: 'var(--color-primary)', width: '12px', height: '12px' }} />
            </div>
            <div className="rest-timer-text">
              <span className="rest-timer-label">Rest Active</span>
              <span className="rest-timer-time">{restTimer.secondsLeft}s</span>
            </div>
          </div>
          <div className="rest-timer-controls">
            <button className="rest-ctrl-btn" onClick={() => setRestTimer(prev => ({ ...prev, secondsLeft: Math.max(5, prev.secondsLeft - 30) }))}>-30s</button>
            <button className="rest-ctrl-btn" onClick={() => setRestTimer(prev => ({ ...prev, secondsLeft: prev.secondsLeft + 30, totalSeconds: prev.totalSeconds + 30 }))}>+30s</button>
            <button className="rest-ctrl-btn skip" onClick={() => setRestTimer(prev => ({ ...prev, secondsLeft: 0 }))}>Skip</button>
          </div>
        </div>
      )}

      {/* GENERAL DETAIL VIEW / SCHEDULE DETAIL WIDGET OVERLAY MODAL */}
      {selectedPlanModal && (
        <div className="modal-overlay active" style={{ display: 'flex' }}>
          <div className="modal-content">
            <button className="close-modal" onClick={() => setSelectedPlanModal(null)}><X /></button>
            <h2 className="modal-title">{selectedPlanModal.name}</h2>
            <p className="modal-desc">{selectedPlanModal.description || "Session details."}</p>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
              {selectedPlanModal.exercises ? 'Logged Sets Details' : 'Program Schedule'}
            </h3>

            <div className="modal-days-list">
              {selectedPlanModal.workoutDays ? (
                // Program presets details
                selectedPlanModal.workoutDays.map(day => (
                  <div className="modal-day-card" key={day.id}>
                    <div className="modal-day-header">
                      <span>{day.name}</span>
                      <span className="modal-day-label">{day.focusArea ? day.focusArea.join(", ") : "Various muscles"}</span>
                    </div>
                    <div>
                      {day.exercises && day.exercises.length > 0 ? (
                        day.exercises.map((ex, exIdx) => (
                          <div className="modal-exercise-item" key={exIdx}>
                            <span className="modal-exercise-name">{ex.exerciseName}</span>
                            <span className="modal-exercise-sets">{ex.sets} Sets × {ex.reps} Reps</span>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0.5rem 0' }}>No exercises. Custom exercises can be added when tracking.</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                // Historic log details
                <div className="modal-day-card">
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Logged Exercises</div>
                  <div>
                    {selectedPlanModal.exercises.map((ex, exIdx) => (
                      <div style={{ marginBottom: '0.75rem' }} key={exIdx}>
                        <div style={{ fontWeight: 600, fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--color-secondary)', marginBottom: '0.15rem' }}>{ex.exerciseName}</div>
                        {ex.sets.map((s, sIdx) => (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '1rem' }} key={sIdx}>
                            Set {sIdx + 1}: <strong>{convertKgToDisplayWeight(s.weight)} {profile.units === 'imperial' ? 'lbs' : 'kg'}</strong> × {s.reps} reps
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!selectedPlanModal.exercises && (
              <button className="action-btn btn-primary" onClick={() => { store.setActivePlanId(selectedPlanModal.id); setActivePlanId(selectedPlanModal.id); setSelectedPlanModal(null); renderDashboard(); }}>
                <Sparkles style={{ marginRight: '0.5rem' }} /> Set as Active Routine
              </button>
            )}
          </div>
        </div>
      )}

      {/* EXERCISE PICKER OVERLAY MODAL FOR ACTIVE SESSION */}
      {isExercisePickerOpen && (
        <div className="modal-overlay active" style={{ display: 'flex' }}>
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <button className="close-modal" onClick={() => setIsExercisePickerOpen(false)}><X /></button>
            <h2 className="modal-title" style={{ marginBottom: '1rem' }}><Activity style={{ width: '18px', height: '18px', display: 'inline', marginRight: '0.5rem' }} /> Add Exercise</h2>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search 50+ exercises..." value={exSearchQuery} onChange={(e) => setExSearchQuery(e.target.value)} />
            </div>

            <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {filteredExercises.map(ex => (
                <div
                  className="modal-exercise-item"
                  key={ex.id}
                  style={{ cursor: 'pointer', padding: '0.6rem 0.5rem', borderRadius: '6px' }}
                  onClick={() => handleAddExerciseToWorkout(ex)}
                >
                  <span className="modal-exercise-name" style={{ fontWeight: 600 }}>{ex.name}</span>
                  <span className="badge badge-purple">{ex.muscle}</span>
                </div>
              ))}
              {filteredExercises.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>No exercises found.</div>
              )}
            </div>

            <button className="action-btn btn-secondary" onClick={() => setIsExercisePickerOpen(false)}>
              Close Search
            </button>
          </div>
        </div>
      )}

      {/* Audio Rest Timer sound emitter */}
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav" preload="auto"></audio>

    </div>
  );
}
