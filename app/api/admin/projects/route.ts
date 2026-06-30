import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { ServiceType, ProjectStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const updateProjectSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  progress: z.number().min(0).max(100).optional(),
  budget: z.number().optional().nullable(),
  serviceType: z.nativeEnum(ServiceType).optional(),
  clientName: z.string().optional().nullable(),
  clientEmail: z.string().email().optional().nullable(),
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
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { projectId, clientName, clientEmail, ...updateData } = parsed.data;

    // 4. Simulated update check for mock projects
    if (projectId.startsWith("proj-") || projectId.startsWith("mock-")) {
      return NextResponse.json({
        success: true,
        message: "Simulated project update successful (Mock Project).",
        projectId,
        project: { 
          id: projectId, 
          ...updateData,
          client: { name: clientName, email: clientEmail }
        }
      });
    }

    // 5. Update real project in database
    // Fetch project first to verify client user association
    const existingProject = await db.project.findUnique({
      where: { id: projectId },
      select: { clientId: true }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    // If client email or name is being modified, update the associated Client User record
    if (existingProject.clientId && (clientName || clientEmail)) {
      await db.user.update({
        where: { id: existingProject.clientId },
        data: {
          ...(clientName ? { name: clientName } : {}),
          ...(clientEmail ? { email: clientEmail } : {})
        }
      });
    }

    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: updateData,
      include: { client: { select: { name: true, email: true } } }
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject
    });
  } catch (error) {
    console.error("[PATCH /api/admin/projects] System failure:", error);
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}
