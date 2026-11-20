import { notFound } from "next/navigation";
import HeroImagePreview from "./HeroImagePreview";

export default function HeroPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <HeroImagePreview />;
}
