"use client";

import { useState } from "react";
import HeroSection from "../components/Hero/HeroSection";
import type { HeroImageVariant } from "../components/Hero/HeroImages";
import "./preview.css";

const variants: { id: HeroImageVariant; label: string; description: string }[] = [
  { id: "original", label: "طرح اولیه", description: "یک تصویر اصلی و دو قاب از رویدادهای انجمن." },
  { id: "focus", label: "۱. یک لحظه", description: "یک عکس بزرگ از ACPC؛ تمرکز روی هم‌فکری و تجربه‌ی مسابقه." },
  { id: "collage", label: "۲. آلبوم انجمن", description: "قاب‌های روی‌هم از آدم‌ها، ارائه‌ها و مسابقه‌ها؛ شبیه یک آلبوم خاطرات." },
  { id: "triptych", label: "۳. سه روایت", description: "سه قاب عمودی برای ساختن، حل کردن و کنار هم بودن." },
];

export default function HeroImagePreview() {
  const [selected, setSelected] = useState<HeroImageVariant>("triptych");
  const current = variants.find(variant => variant.id === selected)!;

  return (
    <main>
      <div className="ssc-hero-preview-controls">
        <div className="ssc-container">
          <div className="ssc-hero-preview-options" role="group" aria-label="انتخاب طرح تصویر هیرو">
            {variants.map(variant => (
              <button key={variant.id} type="button" aria-pressed={selected === variant.id} onClick={() => setSelected(variant.id)}>
                {variant.label}
              </button>
            ))}
          </div>
          <p aria-live="polite">{current.description}</p>
        </div>
      </div>
      <HeroSection imageVariant={selected} />
      <div id="events" className="ssc-container ssc-hero-preview-note">
        <p>این صفحه برای مقایسه‌ی طرح‌هاست. <a href="/#events" className="ssc-inline-link">رویدادهای انجمن را در صفحه‌ی اصلی ببینید.</a></p>
      </div>
    </main>
  );
}
