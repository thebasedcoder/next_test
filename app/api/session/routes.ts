import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }

  return NextResponse.json({
    isAuthenticated: true,
    user: { id: session.userId }
  });
}