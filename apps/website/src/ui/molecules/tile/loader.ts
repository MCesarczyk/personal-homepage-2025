"use client";

interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export const imageLoader = ({ src, width, quality }: LoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};
