import React from "react";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        src="/images/space-burger-logo.webp"
        alt="space-burger-logo"
        width={83}
        height={83}
        className="mt-2 w-26 h-26 "
      />
    </Link>
  );
};
export default Logo;
