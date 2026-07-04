'use client'
import React, { useRef } from 'react'
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { usePageTransition } from '../../../lib/gsap/usePageTransition';
import SmootherContainer from './SmootherContainer';

interface TransitionLayoutProps {
  children: React.ReactNode;
}

const TransitionLayout: React.FC<TransitionLayoutProps> = ({
    children
  }) => {
    const mainContainer = useRef<HTMLDivElement>(null);
    const { pageTransitionIn } = usePageTransition();
    
    useGSAP(() => {
      // pageTransitionIn();
    }, { scope: mainContainer });

  return (
    <>
      <SmootherContainer>
        <div id='main-container' ref={mainContainer} className={`main-container relative h-full`}>
          {children}
        </div>
        {/* <div className={`transition-overlays absolute w-full h-full top-0 left-0 z-40 pointer-events-none bg-red-500`}>
          <div className={`transition-overlay absolute w-full h-full top-0 left-0 pointer-events-auto bg-red-500`}></div>
        </div> */}
      </SmootherContainer>
    </>
  )
}

export default TransitionLayout