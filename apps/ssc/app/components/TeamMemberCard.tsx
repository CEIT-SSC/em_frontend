import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./team-member.css";
import type { TeamMember } from "~/content/team";

export default function TeamMemberCard({ name, position, photoUrl, githubUrl, linkedinUrl }: TeamMember) {
  return (
    <article className="ssc-member">
      <Image width={128} height={128} src={photoUrl} alt={name} className="ssc-member-portrait" />
      <h3>{name}</h3>
      <p className="ssc-member-role">{position}</p>
      {(githubUrl || linkedinUrl) && <div className="ssc-member-socials">
        {githubUrl && <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`گیت‌هاب ${name}`} className="ssc-member-social"><FaGithub size={20} aria-hidden="true" /></Link>}
        {linkedinUrl && <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`لینکدین ${name}`} className="ssc-member-social"><FaLinkedin size={20} aria-hidden="true" /></Link>}
      </div>}
    </article>
  );
}
