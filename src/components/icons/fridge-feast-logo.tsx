import type { ImgHTMLAttributes } from "react";

export function FridgeFeastLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img src="/logo.svg" alt="Fridge Feast" {...props} />;
}
