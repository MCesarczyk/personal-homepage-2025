"use client";

import save from "save-file";

export const saveFileFromUrl = async (url: string, filename: string) => {
  const response = await fetch(url, { method: "GET" });
  const blob = await response.blob();
  return save(blob, filename);
};
