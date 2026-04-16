"use client";

import { useState } from "react";
import { submitTestimonialAction } from "@/app/portal/actions";
import { Star, MessageSquareQuote, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface TestimonialFormProps {
  existingTestimonial?: {
    id: string;
    content: string;
    rating: number;
    authorTitle: string;
    company: string;
    authorName: string;
  } | null;
}

export default function TestimonialForm({ existingTestimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(existingTestimonial?.rating ?? 5);
  const [hovered, setHovered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSuccess(false);
    setError(null);
    try {
      formData.append("rating", rating.toString());
      await submitTestimonialAction(formData);
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 5000);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isExisting = !!existingTestimonial;

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-fuchsia-900/10 to-cyan-900/5 relative overflow-hidden group">
      {/* Background icon */}
      <div className="absolute -top-6 -right-6 opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-500 pointer-events-none">
        <MessageSquareQuote size={140} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`w-2 h-2 rounded-full animate-pulse ${isExisting ? "bg-cyan-500" : "bg-fuchsia-500"}`} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isExisting ? "text-cyan-500" : "text-fuchsia-400"}`}>
          {isExisting ? "Update Your Review" : "Leave a Review"}
        </span>
        {isExisting && (
          <span className="ml-auto text-[10px] text-white/30">
            Your review is live on the testimonials page
          </span>
        )}
      </div>

      <form action={handleSubmit} className="relative z-10 space-y-4">
        {/* Star Rating */}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-white/50 font-bold block mb-2">Rating</label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="focus:outline-none transition-transform hover:scale-125 active:scale-110"
              >
                <Star
                  size={26}
                  className={
                    star <= (hovered || rating)
                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                      : "fill-transparent text-white/15"
                  }
                />
              </button>
            ))}
            <span className="ml-2 text-xs text-white/30">
              {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
            </span>
          </div>
        </div>

        {/* Name & Role row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Your Role / Title</label>
            <input
              name="authorTitle"
              defaultValue={existingTestimonial?.authorTitle ?? ""}
              className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-fuchsia-500/40 focus:bg-black/40 transition-all"
              placeholder="e.g. CEO, CTO, Founder"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Company</label>
            <input
              name="company"
              defaultValue={existingTestimonial?.company ?? ""}
              className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-fuchsia-500/40 focus:bg-black/40 transition-all"
              placeholder="Company name"
              required
            />
          </div>
        </div>

        {/* Review text */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Your Review</label>
          <textarea
            name="content"
            defaultValue={existingTestimonial?.content ?? ""}
            className="w-full bg-black/30 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-fuchsia-500/40 focus:bg-black/40 transition-all resize-none h-28 leading-relaxed"
            placeholder="Share your experience working with Akronix — what stood out, what was delivered, and how it impacted your business..."
            required
          />
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || success}
          className={`w-full py-3 px-6 text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-all duration-300 ${
            success
              ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
              : "btn-primary"
          } disabled:opacity-70`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving…
            </>
          ) : success ? (
            <>
              <CheckCircle2 size={16} />
              {isExisting ? "Review Updated!" : "Review Submitted!"}
            </>
          ) : (
            isExisting ? "Update Review" : "Submit Review"
          )}
        </button>

        <p className="text-[10px] text-white/20 text-center">
          Your review will appear publicly on our{" "}
          <a href="/pricing/testimonials" className="text-white/40 hover:text-white underline transition-colors">
            testimonials page
          </a>
        </p>
      </form>
    </div>
  );
}
