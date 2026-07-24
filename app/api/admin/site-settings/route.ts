import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getHomepageSettings, setSettings, getAllSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

async function checkAdmin() {
  const session = await auth();
  const user = session?.user as { role?: string } | undefined;
  return user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
}

export async function GET(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prefix = req.nextUrl.searchParams.get("prefix");

  if (prefix === "homepage.") {
    const settings = await getHomepageSettings();
    return NextResponse.json(settings);
  }

  const all = await getAllSettings();
  return NextResponse.json(Object.fromEntries(all.map((s) => [s.key, s.value])));
}

export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Record<string, string> = await req.json();

    if (typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await setSettings(body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("site-settings POST error:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
