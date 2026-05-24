// src/app/api/bodyweights/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET Body Weights
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: weights, error } = await supabase
      .from('body_weights')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });

    if (error) throw error;
    return NextResponse.json(weights);
  } catch (err) {
    console.error('Next.js API bodyweight fetch error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST Add/Update Body Weight
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { weight, date } = await request.json();
    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data: entry, error } = await supabase
      .from('body_weights')
      .upsert({
        user_id: userId,
        date: targetDate,
        weight: Number(weight)
      }, { onConflict: 'user_id, date' })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(entry);
  } catch (err) {
    console.error('Next.js API bodyweight save error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
