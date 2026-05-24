// src/app/api/custom-plans/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET Custom Plans
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: plans, error } = await supabase
      .from('custom_plans')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return NextResponse.json(plans);
  } catch (err) {
    console.error('Next.js API plans fetch error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST Save Custom Plan
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, name, splitType, daysPerWeek, experienceLevel, goal, description, workoutDays, weeklySchedule } = await request.json();

    const { data: plan, error } = await supabase
      .from('custom_plans')
      .upsert({
        id: String(id),
        user_id: userId,
        name,
        split_type: splitType,
        days_per_week: Number(daysPerWeek) || 3,
        experience_level: experienceLevel || 'intermediate',
        goal: goal || ["hypertrophy"],
        description,
        workout_days: workoutDays || [],
        weekly_schedule: weeklySchedule || []
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(plan);
  } catch (err) {
    console.error('Next.js API plans save error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
