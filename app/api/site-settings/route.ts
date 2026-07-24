import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Public, read-only settings lookup by key prefix — used by client components
// to render admin-editable CMS content (academy, partners, leadership, etc.)
// for anonymous visitors. Do not add non-public data to site_settings.
export async function GET(req: NextRequest) {
  const prefix = req.nextUrl.searchParams.get("prefix") ?? "";

  try {
    const settings = await db.siteSettings.findMany({
      where: { key: { startsWith: prefix } },
    });
    return NextResponse.json(Object.fromEntries(settings.map((s) => [s.key, s.value])), {
      headers: { "Cache-Control": "no-store, must-revalidate" },
    });
  } catch {
    return NextResponse.json({}, { headers: { "Cache-Control": "no-store, must-revalidate" } });
  }
}
