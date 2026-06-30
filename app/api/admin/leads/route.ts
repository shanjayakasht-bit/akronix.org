import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { ServiceType, LeadStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const updateLeadSchema = z.object({
  leadId: z.string().min(1, "Lead ID is required"),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  message: z.string().optional(),
  serviceType: z.nativeEnum(ServiceType).optional().nullable(),
  budget: z.string().optional().nullable(),
  status: z.nativeEnum(LeadStatus).optional(),
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
    const parsed = updateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { leadId, ...updateData } = parsed.data;

    // 4. Simulated update check for mock leads
    if (leadId.startsWith("mock-")) {
      return NextResponse.json({
        success: true,
        message: "Simulated update successful (Mock Lead).",
        leadId,
        lead: { id: leadId, ...updateData }
      });
    }

    // 5. Update real lead in database
    const updatedLead = await db.lead.update({
      where: { id: leadId },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedLead
    });
  } catch (error) {
    console.error("[PATCH /api/admin/leads] System failure:", error);
    return NextResponse.json(
      { error: "Failed to update lead status." },
      { status: 500 }
    );
  }
}
