import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

const updateUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.nativeEnum(UserRole).optional(),
  company: z.string().optional().nullable(),
});

export async function PATCH(req: NextRequest) {
  try {
    // 1. Session verification
    const session = await auth();
    const currentUser = session?.user as { role: string; name?: string | null; email?: string | null } | undefined;

    if (!currentUser || (currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "ADMIN")) {
      return NextResponse.json(
        { error: "Unauthorized access — administrator privilege required." },
        { status: 403 }
      );
    }

    // 2. Parse request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }

    // 3. Validate request schema
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { userId, ...updateData } = parsed.data;

    // 4. Simulated update check for mock users
    if (userId.startsWith("user-") || userId.startsWith("mock-")) {
      return NextResponse.json({
        success: true,
        message: "Simulated user update successful (Mock User).",
        userId,
        user: { id: userId, ...updateData }
      });
    }

    // 5. Update real user in database
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, company: true, createdAt: true }
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    console.error("[PATCH /api/admin/users] System failure:", error);
    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 }
    );
  }
}
