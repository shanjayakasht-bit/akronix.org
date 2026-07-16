import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

async function checkAdmin() {
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  return user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const testimonial = await db.testimonial.create({
      data: {
        authorName: body.authorName ?? "",
        authorTitle: body.authorTitle ?? "",
        company: body.company ?? "",
        content: body.content ?? "",
        rating: Number(body.rating) || 5,
        isPublished: body.isPublished ?? true,
        isFeatured: body.isFeatured ?? false,
      },
    });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
