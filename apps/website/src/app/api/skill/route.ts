import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";
import { skillsListSchema } from "@/app/api/skill/skillSchemas";

export async function GET() {
  const skillResponse = await fetchFromAPI("/skill-public", {
    revalidate: 60,
  });

  const validatedResponse = validateData(skillsListSchema, skillResponse);

  if (!validatedResponse.success) {
    return NextResponse.json(
      { message: validatedResponse.errors, data: [] },
      {
        status: 400,
      },
    );
  }

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
