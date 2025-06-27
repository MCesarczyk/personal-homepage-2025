import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { type SkillDto } from "@/app/admin/skills/types";

export const handleCreateNewSkill = async (content: string) => {
  "use server";

  const accessToken = cookies().get("accessToken")?.value;
  const currentUserId = (jwt.decode(accessToken as string) as jwt.JwtPayload)?.id;

  const newSkill: Partial<SkillDto> = {
    content: content,
    state: "PLANNED",
    userId: currentUserId,
  };

  console.log(newSkill, "New skill data");

  const response = await fetch(`${process.env.API_URL}${process.env.API_PREFIX}/skill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(newSkill),
  });

  if (!response.ok) {
    console.log("Error creating new skill");
  }

  const newSkillResponse = await response.json();
  revalidatePath("/admin/skills");
  console.log(newSkillResponse, "New skill created");
};

export const handleEditSkill = async (id: string, payload: Partial<SkillDto>) => {
  "use server";

  const accessToken = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}${process.env.API_PREFIX}/skill/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.log("Error updating skill data");
  }

  const skillUpdateResponse = await response.json();
  revalidatePath("/admin/skills");
  console.log(skillUpdateResponse, "Skill updated");
};

export const handleDeleteSkill = async (id: string) => {
  "use server";

  const accessToken = cookies().get("accessToken")?.value;

  const response = await fetch(`${process.env.API_URL}${process.env.API_PREFIX}/skill/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.log("Error deleting skill");
  }

  const skillDeleteResponse = await response.json();
  revalidatePath("/admin/skills");
  console.log(skillDeleteResponse, "Skill deleted");
};
