import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";

export async function GET() {
  const technologyResponse = await fetchFromAPI("/user-public/technology", {
    revalidate: 60,
  });

  return NextResponse.json(
    { message: "Technology data", data: technologyResponse },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
