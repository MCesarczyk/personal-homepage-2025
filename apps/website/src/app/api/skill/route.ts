import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";

export async function GET() {
  const skillResponse = await fetchFromAPI("/skill-public", {
    revalidate: 60,
  });

  return NextResponse.json(
    { message: "Skill data", data: skillResponse },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
