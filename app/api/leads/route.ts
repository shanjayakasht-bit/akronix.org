import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  sendLeadNotificationEmail,
  sendLeadConfirmationEmail,
} from "@/lib/email";
 
const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  budget: z.string().optional(),
  source: z.string().optional(),
});
 
export async function POST(req: NextRequest) {
  try {
    // 1. Parse body — if body isn't valid JSON, catch it cleanly
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body — expected JSON." },
        { status: 400 }
      );
    }
 
    // 2. Validate input
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }
 
    const data = parsed.data;
 
    // 3. Save lead to database
    // const lead = await db.lead.create({
    //   data: {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     phone: data.phone ?? null,
    //     company: data.company ?? null,
    //     message: data.message,
    //     budget: data.budget ?? null,
    //     source: data.source ?? "contact-page",
    //     status: "NEW",
    //   },
    // });
 
    const lead = { id: "test-123" };

    // 4. Send emails (non-blocking — don't fail the request if email fails)
    const emailPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      source: data.source,
    };
 
    await Promise.allSettled([
      sendLeadNotificationEmail(emailPayload),
      sendLeadConfirmationEmail({ firstName: data.firstName, email: data.email }),
    ]);
 
    return NextResponse.json(
      { success: true, leadId: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/leads] Unhandled error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
