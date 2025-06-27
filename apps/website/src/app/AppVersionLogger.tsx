"use client";

import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("../../package.json");

export default function AppVersionLogger() {
  useEffect(() => {
    console.log("app version:", version);
  }, []);

  return null;
}
