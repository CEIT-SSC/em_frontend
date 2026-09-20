"use client";

import Image from "next/image";

export function Separator() {
  return (
    <div className="w-full flex justify-center">
      <Image
        src="/assets/images/hollow-knight/Warning_Fleur0008.png"
        alt="separator"
        width={959}
        height={80}
        className="w-auto max-w-auto h-auto"
        style={{ minWidth: "50%" }}
      />
    </div>
  );
}
