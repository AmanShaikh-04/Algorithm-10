"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

// ==================== Background Animation Component ====================
const BackgroundAnimation = ({ progress, totalSections }) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [pathD, setPathD] = useState("");
  const [logoTransform, setLogoTransform] = useState("translate(0, 0)");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to disable heavy SVG filters
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // SVG Constants
  const sectionHeight = 100;
  const startY = 50;
  const xPositions = [65, 35];

  const totalPathHeight = (totalSections - 1) * sectionHeight;
  const viewBoxHeight = startY + totalPathHeight + startY;

  const basePoints = useMemo(() => {
    const points = [{ x: xPositions[0], y: startY }];

    for (let i = 0; i < totalSections - 1; i++) {
      const y1 = startY + i * sectionHeight;
      const y2 = startY + (i + 1) * sectionHeight;

      const currentX = xPositions[i % 2];
      const nextX = xPositions[(i + 1) % 2];

      points.push({
        cx1: currentX,
        cy1: y1 + sectionHeight * 0.5,
        cx2: nextX,
        cy2: y2 - sectionHeight * 0.5,
        x: nextX,
        y: y2,
      });
    }
    return points;
  }, [totalSections]);

  const generatePathD = (points) => {
    const start = points[0];
    let d = `M ${start.x},${start.y}`;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      d += ` C ${p.cx1},${p.cy1} ${p.cx2},${p.cy2} ${p.x},${p.y}`;
    }
    return d;
  };

  useEffect(() => {
    setPathD(generatePathD(basePoints));
  }, [basePoints]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [pathD]);

  const strokeDashoffset = pathLength * (1 - progress);

  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const currentLength = progress * pathLength;
      const point = pathRef.current.getPointAtLength(
        Math.min(currentLength, pathLength)
      );
      setLogoTransform(`translate(${point.x}, ${point.y})`);
    }
  }, [progress, pathLength]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        className="will-change-transform"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F36A1D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="1" />
          </linearGradient>
          {/* Filters are kept in defs but only applied on desktop to save mobile performance */}
          <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
          </filter>
          <filter id="node-glow" x="-500%" y="-500%" width="1000%" height="1000%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#F36A1D" floodOpacity="1" />
          </filter>
        </defs>

        <g>
          <path d={pathD} fill="none" stroke="#F36A1D" strokeOpacity="0.2" strokeWidth="0.3" strokeDasharray="3 3" />
        </g>

        <g>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.2"
            filter={isMobile ? undefined : "url(#line-glow)"}
            style={{ strokeDasharray: pathLength, strokeDashoffset: strokeDashoffset }}
          />
        </g>

        {pathLength > 0 && (
          <g transform={logoTransform}>
            <circle cx="0" cy="0" r="1.5" fill="#F5A623" filter={isMobile ? undefined : "url(#node-glow)"} />
            <circle cx="0" cy="0" r="0.5" fill="#FFF" />
          </g>
        )}
      </svg>
    </div>
  );
};

// ==================== Section Content Component ====================
const SectionContent = ({ section, isCurrent, index }) => {
  const isLeft = index % 2 === 0;

  const justifyClass = isLeft
    ? "justify-center md:justify-start"
    : "justify-center md:justify-end";

  const containerClasses = isLeft
    ? "md:ml-[15%] lg:ml-[20%] text-center md:text-left items-center md:items-start"
    : "md:mr-[15%] lg:mr-[20%] text-center md:text-right items-center md:items-end";

  const borderClass = isLeft
    ? "md:border-l-4 border-[#F36A1D] md:pl-6"
    : "md:border-r-4 border-[#F36A1D] md:pr-6";

  const gradientClass = isLeft
    ? "bg-gradient-to-b md:bg-gradient-to-r from-[#F36A1D]/10 to-transparent"
    : "bg-gradient-to-b md:bg-gradient-to-l from-[#F36A1D]/10 to-transparent";

  return (
    <div className={`absolute inset-0 flex items-center px-6 ${justifyClass} transform-gpu`}>
      <div
        className={`relative flex max-w-lg flex-col py-6 transition-all duration-700 ease-out will-change-transform ${containerClasses} ${
          isCurrent ? "translate-y-0 opacity-100 scale-105" : "translate-y-8 opacity-20 scale-95"
        }`}
      >
        <div
          className={`absolute inset-0 -z-10 rounded-lg ${gradientClass} transition-opacity duration-700 ${
            isCurrent ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className={`${borderClass} flex flex-col gap-1 md:gap-2`}>
          <div className="font-orbitron leading-none font-bold">
            <span className="block text-xl text-[#F5A623]/80 md:text-3xl">
              {section.number.line1}
            </span>
            <span
              className={`block text-5xl text-[#F36A1D] transition-all duration-500 md:text-7xl lg:text-8xl ${
                isCurrent ? "opacity-100 scale-100 md:blur-0" : "opacity-60 scale-95 md:blur-sm"
              }`}
            >
              {section.number.line2}
            </span>
          </div>

          <h2 className="font-orbitron mt-1 text-lg font-bold tracking-wider text-white uppercase md:text-2xl">
            {section.title}
          </h2>

          <p className="max-w-[280px] md:max-w-xs font-sans text-xs leading-relaxed font-medium text-neutral-300 md:text-base">
            {section.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Timeline Component ====================
const Timeline = () => {
  const sections = [
    { number: { line1: "MAR", line2: "05" }, title: "Registrations Start", description: "Registration opens. Gather your team and sign up." },
    { number: { line1: "MAR", line2: "28" }, title: "Registrations Close", description: "Deadline day. Ensure your team is registered." },
    { number: { line1: "MAR", line2: "28" }, title: "Problem Statement Live", description: "Challenges revealed.Choose your domain and plan your solution." },
    { number: { line1: "MAR", line2: "29" }, title: "Round 1: Quiz", description: "Quiz round. Only team lead allowed. Timing TBA." },
    { number: { line1: "APR", line2: "03" }, title: "Hackathon Starts", description: "The 32-hour offline hackathon begins." },
    { number: { line1: "APR", line2: "04" }, title: "Hackathon Ends", description: "Competition concludes and winners declared." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [componentOpacity, setComponentOpacity] = useState(1);

  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, [sections.length]);

  useEffect(() => {
    let ticking = false; // Add throttle flag

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // Progress Calculation
      const totalSections = sections.length;
      const sectionHeight = 100;
      const startY = 50;
      const totalPathHeight = (totalSections - 1) * sectionHeight;
      const viewBoxHeight = startY + totalPathHeight + startY;

      const startFraction = startY / viewBoxHeight;
      const endFraction = (startY + totalPathHeight) / viewBoxHeight;
      const effectivePathFraction = endFraction - startFraction;

      const scrollCenterPosition = -containerTop + windowHeight * 0.5;
      const rawProgress = containerHeight > 0 ? scrollCenterPosition / containerHeight : 0;

      let adjustedProgress = (rawProgress - startFraction) / effectivePathFraction;
      if (adjustedProgress > 0.99) adjustedProgress = 1;
      adjustedProgress = Math.min(1, Math.max(0, adjustedProgress));

      setProgress(adjustedProgress);

      // Header Fade
      const headerFadeStart = windowHeight * 0.2;
      const headerFadeEnd = -100;
      let newHeaderOpacity = 1;
      if (containerTop < headerFadeStart) {
        const distance = containerTop - headerFadeEnd;
        const range = headerFadeStart - headerFadeEnd;
        newHeaderOpacity = Math.min(1, Math.max(0, distance / range));
      }
      setHeaderOpacity(newHeaderOpacity);

      // Component Exit Fade
      let newComponentOpacity = 1;
      const lastSection = sectionRefs.current[sections.length - 1];

      if (lastSection) {
        const lastRect = lastSection.getBoundingClientRect();
        const elementCenter = lastRect.top + lastRect.height / 2;
        const fadeStartPos = windowHeight * 0.2;
        const fadeEndPos = -windowHeight * 0.1;

        if (elementCenter < fadeStartPos) {
          const range = fadeStartPos - fadeEndPos;
          const distance = elementCenter - fadeEndPos;
          newComponentOpacity = Math.min(1, Math.max(0, distance / range));
        }
      } 
      setComponentOpacity(newComponentOpacity);

      // Active Section Logic
      const viewportCenter = windowHeight / 2;
      let newCurrentIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((el, i) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          if (distance < minDistance) {
            minDistance = distance;
            newCurrentIndex = i;
          }
        }
      });

      if (currentIndex !== newCurrentIndex) {
        setCurrentIndex(newCurrentIndex);
      }
    };

    // Optimization: Wrap scroll logic in requestAnimationFrame to prevent layout thrashing
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    scrollListener(); // Initialize once
    return () => window.removeEventListener("scroll", scrollListener);
  }, [currentIndex, sections.length]);

  return (
    <div ref={scrollContainerRef} className="relative w-full bg-transparent overflow-hidden">
      <style jsx global>{`
        .font-orbitron { font-family: "Orbitron", sans-serif; }
      `}</style>

      <div style={{ opacity: componentOpacity }} className="transform-gpu">
        {/* Header Section*/}
        <div
          className="relative z-10 flex flex-col items-center justify-center pt-20 pb-8 text-center md:pt-32 md:pb-12 will-change-opacity"
          style={{ opacity: headerOpacity }}
        >
          <h2 className="font-orbitron text-4xl font-bold tracking-widest text-[#F5A623] uppercase drop-shadow-[0_0_15px_rgba(243,106,29,0.4)] md:text-6xl">
            Timeline
          </h2>
          <p className="mt-2 md:mt-4 max-w-xl px-4 text-sm md:text-lg font-light text-neutral-400">
            Follow the journey from registration to the final showdown.
          </p>
        </div>

        <div className="relative">
          <BackgroundAnimation progress={progress} totalSections={sections.length} />

          <main className="relative z-10 pb-4">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="relative flex min-h-[35vh] md:min-h-[60vh] w-full flex-shrink-0 items-center justify-center"
              >
                <SectionContent
                  section={section}
                  isCurrent={index === currentIndex}
                  index={index}
                />
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Timeline;