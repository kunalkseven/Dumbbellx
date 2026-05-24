// src/app/api/logs/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET Completed Logs
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: logs, error } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json(logs);
  } catch (err) {
    console.error('Next.js API logs fetch error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST Save/Upsert Log
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, templateId, workoutDayId, name, date, durationSeconds, exercises } = await request.json();

    const { data: loggedWorkout, error } = await supabase
      .from('workout_logs')
      .upsert({
        id: String(id),
        user_id: userId,
        template_id: templateId,
        workout_day_id: workoutDayId,
        name,
        date,
        duration_seconds: Number(durationSeconds) || 0,
        exercises: exercises || []
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(loggedWorkout);
  } catch (err) {
    console.error('Next.js API logs save error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
