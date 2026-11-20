import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import TeamMemberCard from "~/app/components/TeamMemberCard";
import { getArchivedGenerations } from "~/content/team";
import "./members.css";

export const metadata: Metadata = {
  title: "اعضای دوره‌های پیشین | انجمن علمی مهندسی کامپیوتر امیرکبیر",
  description: "با اعضای دوره‌های قبلی انجمن علمی مهندسی کامپیوتر امیرکبیر آشنا شوید.",
};

export default function MembersArchivePage() {
  const generations = getArchivedGenerations();
  return (
    <main className="ssc-container ssc-section ssc-members-archive">
      <Link href="/#team" className="ssc-members-back"><HiArrowRight aria-hidden="true" />برگردیم به انجمن</Link>
      <header className="ssc-members-archive-intro">
        <h1>اعضای دوره‌های پیشین</h1>
        <p>قبل از ما هم بچه‌های زیادی برای انجمن وقت گذاشتن. اینجا می‌تونید اعضای هر دوره رو بشناسید.</p>
      </header>
      {generations.length > 1 && <nav aria-label="دوره‌های انجمن" className="ssc-members-generation-nav">
        {generations.map(generation => <a key={generation.number} href={`#generation-${generation.number}`} className="ssc-action ssc-action-secondary">دوره {generation.number.toLocaleString("fa-IR")}</a>)}
      </nav>}
      {generations.map(generation => (
        <section key={generation.number} id={`generation-${generation.number}`} className="ssc-members-generation" aria-labelledby={`generation-heading-${generation.number}`}>
          <div className="ssc-members-generation-heading">
            <h2 id={`generation-heading-${generation.number}`}>دوره <span>{generation.number.toLocaleString("fa-IR")}</span></h2>
            {generation.termLabel && <p>{generation.termLabel}</p>}
          </div>
          <div className="ssc-team-grid">
            {generation.members.map(member => <TeamMemberCard key={member.name} {...member} />)}
          </div>
        </section>
      ))}
      {generations.length === 0 && <p className="ssc-empty">هنوز اعضای دوره‌های قبلی رو اینجا نذاشتیم.</p>}
    </main>
  );
}
