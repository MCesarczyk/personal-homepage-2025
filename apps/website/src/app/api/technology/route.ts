import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";
import { userTechnologiesListSchema } from "@/app/api/technology/technologySchemas";

export async function GET() {
  const technologyResponse = await fetchFromAPI("/user-public/technology", {
    revalidate: 60,
  });

  const validatedResponse = validateData(userTechnologiesListSchema, technologyResponse);

  if (!validatedResponse.success) {
    return NextResponse.json(
      { message: validatedResponse.errors, data: [] },
      {
        status: 400,
      },
    );
  }

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
