import { getUserFromSession } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    await connectDB();

    const user = await getUserFromSession();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const orders = await Order.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .populate("products.productId", "name price");

    return Response.json(orders);
  } catch (err) {
    console.error(" Failed to GET orders:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const user = await getUserFromSession();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { products, totalAmount } = await req.json();

    // Validate input
    if (!products || !Array.isArray(products) || !totalAmount) {
      return new Response("Invalid input", { status: 400 });
    }

    const order = await Order.create({
      userId: user._id,
      products,
      totalAmount,
      status: "pending",
    });

    return Response.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Failed to POST order:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
