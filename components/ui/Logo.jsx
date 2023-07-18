import React from "react";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        src="/images/space-burger-logo.webp"
        alt="space-burger-logo"
        width={85}
        height={85}
        className="mt-2 "
      />
    </Link>
  );
};
export default Logo;
