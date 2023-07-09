import React from "react";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        src="/images/space-buger-logo.webp"
        alt="space-buger-logo"
        width={80}
        height={80}
        className="mt-2"
        
      />
    </Link>
  );
};
export default Logo;
