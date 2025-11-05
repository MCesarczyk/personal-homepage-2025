import { NextResponse } from "next/server";

import { fetchFromAPI } from "@/lib/api-client";
import { validateData } from "@/lib/validation/utils";
import { projectsListSchema } from "@/app/api/project/projectSchemas";

export async function GET() {
  const projectResponse = await fetchFromAPI("/project-public", {
    revalidate: 60,
  });

  const validatedResponse = validateData(projectsListSchema, projectResponse);

  if (!validatedResponse.success) {
    return NextResponse.json(
      { message: validatedResponse.errors, data: [] },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    { message: "Project data", data: validatedResponse.success ? validatedResponse.data : [] },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
