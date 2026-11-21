import Image from "next/image";
import Link from "next/link";
import { HiCodeBracket, HiCommandLine, HiCpuChip, HiPuzzlePiece } from "react-icons/hi2";

export default function AuthIdentity() {
  return (
    <aside className="ssc-auth-identity" aria-label="انجمن علمی مهندسی کامپیوتر امیرکبیر">
      <div className="ssc-auth-emblem">
        <div className="ssc-auth-connections" aria-hidden="true">
          <svg viewBox="0 0 520 400" fill="none" focusable="false">
            <g className="ssc-auth-traces">
              <path d="M205 150H156V90H92M315 150H364V90H428M205 250H156V310H92M315 250H364V310H428" />
              <path d="M156 90V60M364 310V340" />
            </g>
            <g className="ssc-auth-junctions">
              <circle cx="156" cy="150" r="4" /><circle cx="364" cy="150" r="4" />
              <circle cx="156" cy="250" r="4" /><circle cx="364" cy="250" r="4" />
              <circle cx="156" cy="60" r="3" /><circle cx="364" cy="340" r="3" />
            </g>
          </svg>
          <div className="ssc-auth-node ssc-auth-node-linux"><HiCommandLine /><span lang="en" dir="ltr">LinuxFest</span></div>
          <div className="ssc-auth-node ssc-auth-node-ai"><HiCpuChip /><span lang="en" dir="ltr">AAISS</span></div>
          <div className="ssc-auth-node ssc-auth-node-code"><HiCodeBracket /><span lang="en" dir="ltr">ACPC</span></div>
          <div className="ssc-auth-node ssc-auth-node-game"><HiPuzzlePiece /><span lang="en" dir="ltr">GameCraft</span></div>
        </div>
        <Link href="/" className="ssc-auth-logo" aria-label="صفحه اصلی انجمن علمی">
          <Image src="/logo.png" alt="" width={708} height={869} sizes="(min-width: 1024px) 144px, 48px" />
        </Link>
      </div>
      <div className="ssc-auth-identity-copy">
        <p className="ssc-auth-name">انجمن علمی مهندسی کامپیوتر<span>دانشگاه صنعتی امیرکبیر</span></p>
        <p className="ssc-auth-welcome">از یک آشنایی شروع می‌شه</p>
      </div>
    </aside>
  );
}
