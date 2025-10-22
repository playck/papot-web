import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/images/papot-logo.png"
          alt="Papot"
          width={32}
          height={32}
        />
      </Link>
    </div>
  );
}
