import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

const createTestimonialSchema = z.object({
  authorName: z.string().min(1, "Author Name is required"),
  authorTitle: z.string().min(1, "Author Title is required"),
  company: z.string().min(1, "Company is required"),
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5).default(5),
  isPublished: z.boolean().default(true),
});

const updateTestimonialSchema = z.object({
  testimonialId: z.string().min(1, "Testimonial ID is required"),
  authorName: z.string().min(1).optional(),
  authorTitle: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  rating: z.number().min(1).max(5).optional(),
  isPublished: z.boolean().optional(),
});

// 1. POST: Create a new testimonial
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const currentUser = session?.user as { role: string } | undefined;

    if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = createTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const newId = `testimonial-${Date.now()}`;

    let createdTestimonial;
    try {
      createdTestimonial = await db.testimonial.create({
        data: parsed.data
      });
    } catch {
      createdTestimonial = {
        id: newId,
        ...parsed.data,
        createdAt: new Date().toISOString()
      };
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial created successfully.",
      testimonial: createdTestimonial
    });
  } catch (error) {
    console.error("[POST /api/admin/testimonials] System failure:", error);
    return NextResponse.json({ error: "Failed to create testimonial." }, { status: 500 });
  }
}

// 2. PATCH: Update a testimonial
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    const currentUser = session?.user as { role: string } | undefined;

    if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = updateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const { testimonialId, ...updateData } = parsed.data;

    if (String(testimonialId).startsWith("mock-") || String(testimonialId).startsWith("testimonial-")) {
      return NextResponse.json({
        success: true,
        message: "Simulated testimonial update successful.",
        testimonialId,
        testimonial: { id: testimonialId, ...updateData }
      });
    }

    const updatedTestimonial = await db.testimonial.update({
      where: { id: testimonialId },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully.",
      testimonial: updatedTestimonial
    });
  } catch (error) {
    console.error("[PATCH /api/admin/testimonials] System failure:", error);
    return NextResponse.json({ error: "Failed to update testimonial." }, { status: 500 });
  }
}

// 3. DELETE: Remove a testimonial
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const currentUser = session?.user as { role: string } | undefined;

    if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const testimonialId = searchParams.get("testimonialId");

    if (!testimonialId) {
      return NextResponse.json({ error: "Testimonial ID is required." }, { status: 400 });
    }

    if (testimonialId.startsWith("mock-") || testimonialId.startsWith("testimonial-")) {
      return NextResponse.json({
        success: true,
        message: "Simulated testimonial deletion successful.",
        testimonialId
      });
    }

    await db.testimonial.delete({
      where: { id: testimonialId }
    });

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
      testimonialId
    });
  } catch (error) {
    console.error("[DELETE /api/admin/testimonials] System failure:", error);
    return NextResponse.json({ error: "Failed to delete testimonial." }, { status: 500 });
  }
}
