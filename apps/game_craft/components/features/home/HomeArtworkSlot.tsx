"use client";
interface HomeVaultSeparatorProps {
  flip?: boolean;
}

export function HomeVaultSeparator({ flip = false }: HomeVaultSeparatorProps) {
  return (
    <div
      className={`gc-vault-separator${flip ? " gc-vault-separator--flip" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 176" preserveAspectRatio="none" focusable="false">
        <path d="M0 176V105c151-12 220-87 383-87 174 0 229 92 375 92 157 0 230-87 365-87 126 0 198 64 317 82v71H0Z" />
        <path
          className="gc-vault-separator__line"
          d="M0 105c151-12 220-87 383-87 174 0 229 92 375 92 157 0 230-87 365-87 126 0 198 64 317 82"
        />
      </svg>
    </div>
  );
}
