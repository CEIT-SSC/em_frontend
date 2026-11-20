import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface TeamMemberCardProps {
  name: string;
  position: string;
  photoUrl: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function TeamMemberCard({ name, position, photoUrl, githubUrl, linkedinUrl }: TeamMemberCardProps) {
  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-surface p-5">
      <Image width={96} height={96} src={photoUrl} alt={name} className="mb-5 h-24 w-24 rounded-full object-cover" />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-muted">{position}</p>
      <div className="mt-auto flex gap-2 pt-5">
        {githubUrl && <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`گیت‌هاب ${name}`} className="ssc-action ssc-action-secondary px-3"><FaGithub size={19} aria-hidden="true" /></Link>}
        {linkedinUrl && <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`لینکدین ${name}`} className="ssc-action ssc-action-secondary px-3"><FaLinkedin size={19} aria-hidden="true" /></Link>}
      </div>
    </article>
  );
}
