import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";

export async function GET() {
  const projectResponse = await fetchFromAPI("/project-public", {
    revalidate: 60,
  });

  return NextResponse.json(
    { message: "Project data", data: projectResponse },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
