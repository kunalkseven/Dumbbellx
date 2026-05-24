// src/app/api/custom-plans/[id]/route.js

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// DELETE Custom Plan by ID
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params; // Awaiting params for Next.js 15+ standards

    const { error } = await supabase
      .from('custom_plans')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Custom plan deleted.' });
  } catch (err) {
    console.error('Next.js API plans delete error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
