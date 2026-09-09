"use client";

export const homeArtwork = {
  "GC-ART-01": {
    alt: "Abstract blue-lit vaulted workshop behind the GameCraft introduction.",
    label: "Deep atrium hero",
    sources: { desktop: null, mobile: null },
  },
  "GC-ART-02": {
    alt: "An abstract illuminated route marking the GameCraft event journey.",
    label: "Processional map",
    sources: { desktop: null, mobile: null },
  },
  "GC-ART-03": {
    alt: "An abstract illuminated gateway marking the GameCraft competition.",
    label: "Forge threshold",
    sources: { desktop: null, mobile: null },
  },
  "GC-ART-04": {
    alt: "An abstract blue-lit learning chamber for GameCraft workshops.",
    label: "Study grotto",
    sources: { desktop: null, mobile: null },
  },
  "GC-ART-05": {
    alt: "An abstract gathering of student makers beneath a blue-lit atrium.",
    label: "Collegium lightwell",
    sources: { desktop: null, mobile: null },
  },
  "GC-ART-07": {
    alt: "An abstract vaulted lightwell preparing the visitor for GameCraft event photographs.",
    label: "Gallery lightwell",
    sources: { desktop: null, mobile: null },
  },
} as const;

export type HomeArtworkId = keyof typeof homeArtwork;

interface HomeArtworkSlotProps {
  assetId: HomeArtworkId;
  variant: "hero" | "map" | "gateway" | "study" | "community" | "gallery";
  className?: string;
}

export function HomeArtworkSlot({
  assetId,
  variant,
  className = "",
}: HomeArtworkSlotProps) {
  const artwork = homeArtwork[assetId];

  return (
    <figure
      className={`gc-artwork-slot gc-artwork-slot--${variant} ${className}`}
      data-artwork-id={assetId}
      role="img"
      aria-label={`${artwork.alt} Artwork planned.`}
    >
      <svg viewBox="0 0 1200 600" aria-hidden="true" focusable="false">
        <path className="gc-artwork-slot__arch" d="M120 600V320C120 118 306 48 480 48s360 70 360 272v280" />
        <path className="gc-artwork-slot__arch gc-artwork-slot__arch--far" d="M285 600V360c0-112 88-168 195-168s195 56 195 168v240" />
        <path className="gc-artwork-slot__route" d="M70 492C254 418 310 520 474 438s238-46 350-132 186-76 322-24" />
        <circle className="gc-artwork-slot__node" cx="186" cy="459" r="10" />
        <circle className="gc-artwork-slot__node" cx="474" cy="438" r="10" />
        <circle className="gc-artwork-slot__node" cx="824" cy="306" r="10" />
        <path className="gc-artwork-slot__sigil" d="M600 212c-37 30-56 66-56 108 0 54 23 98 56 126 33-28 56-72 56-126 0-42-19-78-56-108Z" />
      </svg>
      <figcaption>
        <span>Artwork planned</span>
        <strong>{assetId}</strong>
        <small>{artwork.label}</small>
      </figcaption>
    </figure>
  );
}

interface HomeVaultSeparatorProps {
  flip?: boolean;
}

export function HomeVaultSeparator({ flip = false }: HomeVaultSeparatorProps) {
  return (
    <div className={`gc-vault-separator${flip ? " gc-vault-separator--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 176" preserveAspectRatio="none" focusable="false">
        <path d="M0 176V105c151-12 220-87 383-87 174 0 229 92 375 92 157 0 230-87 365-87 126 0 198 64 317 82v71H0Z" />
        <path className="gc-vault-separator__line" d="M0 105c151-12 220-87 383-87 174 0 229 92 375 92 157 0 230-87 365-87 126 0 198 64 317 82" />
      </svg>
    </div>
  );
}
