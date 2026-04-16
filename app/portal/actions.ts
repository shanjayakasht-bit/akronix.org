"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function submitTestimonialAction(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You must be logged in to submit a review.");
  }

  const rating = Math.min(5, Math.max(1, Number(formData.get("rating")) || 5));
  const content = (formData.get("content") as string)?.trim();
  const authorTitle = (formData.get("authorTitle") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();

  if (!content || !authorTitle || !company) {
    throw new Error("Please fill in all required fields.");
  }

  // Use the real name from the session / user profile
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });

  const authorName = user?.name || session.user.name || "Anonymous";

  // Upsert — create or update based on userId
  const existingTestimonial = await db.testimonial.findFirst({
    where: { userId: session.user.id },
  });

  if (existingTestimonial) {
    await db.testimonial.update({
      where: { id: existingTestimonial.id },
      data: { content, rating, authorName, authorTitle, company },
    });
  } else {
    await db.testimonial.create({
      data: {
        userId: session.user.id,
        authorName,
        authorTitle,
        company,
        content,
        rating,
        isPublished: true,
      },
    });
  }

  // Revalidate all relevant pages
  revalidatePath("/portal");
  revalidatePath("/pricing/testimonials");
  revalidatePath("/");
}
