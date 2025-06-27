"use client";

import { saveFileFromUrl } from "./saveFileFromUrlHelper";
import { DownloadIcon } from "../../../assets";
import { Button } from "../../atoms/button";

interface DownloadButtonProps {
  fileLocation: string;
  fileName: string;
  buttonText: string;
}

export const DownloadButton = ({ fileLocation, fileName, buttonText }: DownloadButtonProps) => {
  const handleClick = () => saveFileFromUrl(fileLocation, fileName);

  return (
    <Button variant="PRIMARY" onClick={handleClick}>
      <div className="h-5 w-4 mr-2">
        <DownloadIcon />
      </div>
      {buttonText || "Download"}
    </Button>
  );
};
