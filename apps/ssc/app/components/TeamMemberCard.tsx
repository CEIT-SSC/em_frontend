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

const TeamMemberCard = ({
  name,
  position,
  photoUrl,
  githubUrl,
  linkedinUrl,
}: TeamMemberCardProps) => {
  return (
    <div className="w-78 border rounded-3xl overflow-hidden">
      <div className="relative h-1/2 min-h-44">
        <div className="h-3/4 default-gradient flex justify-center items-end" />
        <Image
          width={200}
          height={200}
          src={photoUrl}
          alt="member photo"
          className="absolute top-1/2 left-1/2 translate-[-50%] w-36 h-36 rounded-full object-cover border-2 border-mainWhite"
        />
      </div>
      <div className="flex flex-col gap-2.5 py-4 px-4">
        <div className="flex flex-col justify-between items-center gap-4">
          <h4 className="text-4xl font-semibold text-mainWhite">{name}</h4>
          <p className="text-whiteText font-semibold">{position}</p>
        </div>
        <div className="relative flex justify-center gap-4 text-2xl py-4">
          <div className="absolute w-full h-0.5 bg-whiteText opacity-20 top-1/2 -translate-y-1/2 -z-1"></div>
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              className="bg-background p-2 border-1 border-white rounded-full flex"
            >
              <FaGithub />
            </Link>
          )}
          {linkedinUrl && (
            <Link
              href={linkedinUrl}
              target="_blank"
              className="bg-background p-2 border-1 border-white rounded-full flex"
            >
              <FaLinkedin />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
