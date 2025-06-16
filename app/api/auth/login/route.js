import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  const res = NextResponse.json({ message: 'Login successful' });

  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true khi deploy
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, 
  });

  return res;
}
