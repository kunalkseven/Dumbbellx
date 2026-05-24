// src/app/api/profile/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET Profile (or Auto-Create if New User)
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: Session missing.' }, { status: 401 });
    }

    let { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // Auto-onboard new user profile
      const defaultProfile = {
        id: userId,
        name: 'Challenger',
        height: 175,
        weight: 75,
        level: 'beginner',
        units: 'metric',
        sound_enabled: true,
        streak: 0,
        last_workout_date: null
      };

      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([defaultProfile])
        .select()
        .single();

      if (createError) throw createError;
      profile = newProfile;
    } else if (error) {
      throw error;
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error('Next.js API profile error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT Update Profile
export async function PUT(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, height, weight, level, units, sound_enabled, streak, last_workout_date } = await request.json();

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update({
        name,
        height: height ? Number(height) : null,
        weight: weight ? Number(weight) : null,
        level,
        units,
        sound_enabled,
        streak: streak ? Number(streak) : 0,
        last_workout_date,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(updatedProfile);
  } catch (err) {
    console.error('Next.js API profile update error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
