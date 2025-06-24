import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "./mongoose";
import User from "@/models/User";

export async function getUserFromSession() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.userId).lean();
    return user || null;
  } catch (err) {
    console.error("Invalid JWT token:", err);
    return null;
  }
}
