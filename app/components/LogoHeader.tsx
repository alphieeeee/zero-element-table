"use client";

import Image from "next/image";

export default function LogoHeader() {
  return (
    <header className="w-full p-3">
      <div className="opacity-75 max-w-[64px]">
        <Image
          src="/header-logo.png"
          alt="Header logo"
          width={64}
          height={40}
          priority
        />
      </div>
    </header>
  );
}
