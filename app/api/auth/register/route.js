import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const user = new User({ email, password });
  await user.save();

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
