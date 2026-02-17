import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const sectionsData = [
  { id: 1, title: "Aurora" },
  { id: 2, title: "Zenith" },
  { id: 3, title: "Nocturne" },
  { id: 4, title: "Elysian" },
];

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    // Lenis smooth scrolling setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Tell ScrollTrigger to update when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // Horizontal animation: xPercent moves from 0 to -100*(n-1)
    const sections = trackRef.current.children.length;
    const totalX = -100 * (sections - 1);

    const mainTween = gsap.to(trackRef.current, {
      xPercent: totalX,
      ease: "none",
      onComplete: () => ScrollTrigger.refresh(),
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // end should cover the full scroll depth of the container
        end: () => `+=${containerRef.current.offsetHeight - window.innerHeight}`,
        scrub: true,
        pin: wrapperRef.current,
        anticipatePin: 1,
      },
    });

    // Micro-interaction: parallax for each section's heading
    const headings = trackRef.current.querySelectorAll(".hs-heading");
    headings.forEach((h) => {
      gsap.to(h, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${containerRef.current.offsetHeight - window.innerHeight}`,
          scrub: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      // cleanup
      mainTween.scrollTrigger && mainTween.scrollTrigger.kill();
      mainTween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="hs-container relative w-full" style={{ height: "400vh" }}>
      <div ref={wrapperRef} className="hs-sticky top-0 left-0 w-full h-screen sticky overflow-hidden">
        <div
          ref={trackRef}
          className="hs-track flex h-full"
          style={{ width: `${sectionsData.length * 100}vw` }}
        >
          {sectionsData.map((s, idx) => (
            <section
              key={s.id}
              className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white"
            >
              <h1 className="hs-heading text-5xl font-semibold tracking-tight">
                {s.title}
              </h1>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
