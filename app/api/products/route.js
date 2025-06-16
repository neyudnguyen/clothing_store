import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const products = await Product.find().lean();

  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();

  const data = await req.json();

  const product = await Product.create(data);

  const productObj = product.toObject();

  return NextResponse.json(productObj, { status: 201 });
}
