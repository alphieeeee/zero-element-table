"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "../../styles/GradientBG.module.css";
import Image from "next/image";

const GradientBG: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const infiniteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const avatar = avatarRef.current;
    const infinite = infiniteRef.current;

    if (!container || !avatar || !infinite) return;

    gsap.set(container, { perspective: 650 });

    const avatarRX = gsap.quickTo(avatar, "rotationX", { ease: "power3" });
    const avatarRY = gsap.quickTo(avatar, "rotationY", { ease: "power3" });
    const infiniteX = gsap.quickTo(infinite, "x", { ease: "power3" });
    const infiniteY = gsap.quickTo(infinite, "y", { ease: "power3" });

    const handlePointerMove = (e: PointerEvent) => {
      const xProgress = e.clientX / window.innerWidth;
      const yProgress = e.clientY / window.innerHeight;

      avatarRX(gsap.utils.interpolate(15, -15, yProgress));
      avatarRY(gsap.utils.interpolate(-15, 15, xProgress));

      infiniteX(gsap.utils.interpolate(-30, 30, xProgress));
      infiniteY(gsap.utils.interpolate(-30, 30, yProgress));
    };

    const handlePointerLeave = () => {
      avatarRX(0);
      avatarRY(0);
      infiniteX(0);
      infiniteY(0);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} fixed w-full h-screen h-[100dvh]`}
    >
      <div
        ref={avatarRef}
        className={`${styles.avatar} relative mx-auto opacity-25`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/avatar.png"
          alt="Zero Avatar"
          fill
          loading="eager"
          unoptimized
          className="object-contain object-center"
        />

        <div
          ref={infiniteRef}
          className={`${styles.infinite} absolute`}
        >
          <Image
            src="/infinite.png"
            alt="Infinite Zero"
            width={1073}
            height={346}
            loading="eager"
            unoptimized
            className="w-full h-auto object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default GradientBG;