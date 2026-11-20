import { HiCodeBracket, HiCommandLine, HiCpuChip, HiPuzzlePiece, HiTrophy, HiUsers } from "react-icons/hi2";
import type { PlannedEvent } from "./homepage-content";

type Visual = NonNullable<PlannedEvent["visual"]>;

function visualFor(title: string): Visual {
  if (/linux|لینوکس/i.test(title)) return "terminal";
  if (/game|بازی|گیم/i.test(title)) return "game";
  if (/aaiss|هوش/i.test(title)) return "ai";
  if (/acpc|arena|مسابقه/i.test(title)) return "competition";
  if (/level/i.test(title)) return "levels";
  return "community";
}

// Themed artwork, not event branding or a preview of a promised activity.
export default function EventArtwork({ title, visual }: Pick<PlannedEvent, "title" | "visual">) {
  const theme = visual ?? visualFor(title);
  return (
    <div className="ssc-event-art" data-theme={theme} aria-hidden="true">
      {theme === "terminal" && <div className="ssc-art-terminal" dir="ltr">
        <div className="ssc-art-terminal-bar"><i /><i /><i /><HiCommandLine /></div>
        <div className="ssc-art-terminal-code"><span><b>$</b> ./linuxfest</span><span className="ssc-art-code-line" /><span className="ssc-art-code-line" /><span><b>$</b><i className="ssc-art-cursor" /></span></div>
        <HiCommandLine className="ssc-art-terminal-symbol" />
      </div>}
      {theme === "game" && <>
        <div className="ssc-art-game-board">{Array.from({ length: 32 }, (_, index) => <i key={index} data-filled={[2, 3, 10, 17, 18, 21, 25, 26, 27, 29, 30, 31].includes(index)} />)}</div>
        <HiPuzzlePiece className="ssc-art-game-piece" />
        <span className="ssc-art-game-cross" />
      </>}
      {theme === "ai" && <>
        <svg className="ssc-art-network" viewBox="0 0 320 140" preserveAspectRatio="xMidYMid slice"><g><path d="M28 28L110 40L160 70L228 26L296 42M28 112L110 100L160 70L228 114L296 98M28 28L110 100M28 112L110 40M228 26L296 98M228 114L296 42" />{[[28,28],[28,112],[110,40],[110,100],[228,26],[228,114],[296,42],[296,98]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)}</g></svg>
        <HiCpuChip className="ssc-art-chip" />
      </>}
      {theme === "competition" && <>
        <svg className="ssc-art-bracket" viewBox="0 0 320 140"><path d="M24 26H66V50H110V70H144M24 74H66V50M24 114H92V92H110V70M296 26H254V50H210V70H176M296 74H254V50M296 114H228V92H210V70" /><g>{[26,74,114].map(y => <g key={y}><rect x="18" y={y-5} width="22" height="10" rx="3" /><rect x="280" y={y-5} width="22" height="10" rx="3" /></g>)}</g></svg>
        <HiTrophy className="ssc-art-trophy" />
      </>}
      {theme === "levels" && <>
        <div className="ssc-art-levels">{[0,1,2,3,4].map(level => <i key={level} style={{ height: `${24 + level * 17}%` }} />)}</div>
        <HiCodeBracket className="ssc-art-level-symbol" />
      </>}
      {theme === "community" && <>
        <div className="ssc-art-community-orbit" /><div className="ssc-art-community-orbit" />
        <HiUsers className="ssc-art-community-symbol" />
      </>}
    </div>
  );
}
