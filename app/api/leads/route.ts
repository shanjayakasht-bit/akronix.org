import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10),
  serviceType: z.any().optional(), // Using any for enum flexibility
  budget: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = leadSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validated.error.format() },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        ...validated.data,
        status: "NEW",
      },
    });

    return NextResponse.json(
      { message: "Lead captured successfully", id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("LEAD_API_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
