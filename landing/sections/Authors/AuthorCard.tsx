import Link from "next/link";
import Image from "next/image";
import { MdAlternateEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

type AuthorCardProps = {
  emailAddress: string;
  linkedinProfileUrl: string;
  githubProfileUrl: string;
  profileImageSrc: string;
  profileImageAlt: string;
  authorName: string;
  className?: string;
};

function AuthorCard({
  emailAddress,
  linkedinProfileUrl,
  githubProfileUrl,
  profileImageSrc,
  profileImageAlt,
  authorName,
  className = "",
}: AuthorCardProps) {
  return (
    <div className={"relative flex flex-col w-full max-w-[240px] " + className}>
      <div className="absolute top-0 left-0 flex justify-end w-full h-24 gap-3 px-4 pt-4 text-white align-bottom rounded-t-lg bg-gradient-to-b from-black/90 to-black/0">
        <Link
          href={`mailto:${emailAddress}`}
          aria-label={`Write Email to ${emailAddress}`}
        >
          <MdAlternateEmail className="w-6 h-6" />
        </Link>
        <Link
          href={linkedinProfileUrl}
          target="_blank"
          aria-label={`Visit Linkedin Profile of ${authorName}`}
        >
          <FaLinkedin className="w-6 h-6" />
        </Link>
        <Link
          href={githubProfileUrl}
          target="_blank"
          aria-label={`Visit GitHub Profile of ${authorName}`}
        >
          <FaGithub className="w-6 h-6" />
        </Link>
      </div>
      <Image
        src={profileImageSrc}
        alt={profileImageAlt}
        width={512}
        height={512}
        className="object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 flex flex-col items-center justify-end w-full h-24 align-bottom rounded-b-lg bg-gradient-to-t from-black/90 to-black/0">
        <p className="px-2 mb-3 text-lg font-medium text-center text-white md:text-xl font-avenir">
          {authorName}
        </p>
      </div>
    </div>
  );
}

export default AuthorCard;
