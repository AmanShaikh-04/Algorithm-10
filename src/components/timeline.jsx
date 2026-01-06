"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

// ==================== Background Animation Component ====================
const BackgroundAnimation = ({ progress, totalSections }) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [pathD, setPathD] = useState("");
  const [logoTransform, setLogoTransform] = useState("translate(0, 0)");

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

  // REMOVED: Independent circleOpacity logic.
  // The circle will now stay visible and fade out only when the parent component fades.

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 ${viewBoxHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F36A1D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="1" />
          </linearGradient>
          <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
          </filter>
          <filter
            id="node-glow"
            x="-500%"
            y="-500%"
            width="1000%"
            height="1000%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#F36A1D"
              floodOpacity="1"
            />
          </filter>
        </defs>

        <g>
          <path
            d={pathD}
            fill="none"
            stroke="#F36A1D"
            strokeOpacity="0.2"
            strokeWidth="0.3"
            strokeDasharray="3 3"
          />
        </g>

        <g>
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.2"
            filter="url(#line-glow)"
            style={{
              strokeDasharray: pathLength,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </g>

        {pathLength > 0 && (
          <g transform={logoTransform}>
            <circle
              cx="0"
              cy="0"
              r="1.5"
              fill="#F5A623"
              filter="url(#node-glow)"
            />
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
    ? "md:ml-[15%] lg:ml-[20%] text-left items-start"
    : "md:mr-[15%] lg:mr-[20%] text-right items-end";

  const borderClass = isLeft
    ? "border-l-4 border-[#F36A1D] pl-6"
    : "border-r-4 border-[#F36A1D] pr-6";

  const gradientClass = isLeft
    ? "bg-gradient-to-r from-[#F36A1D]/10 to-transparent"
    : "bg-gradient-to-l from-[#F36A1D]/10 to-transparent";

  return (
    <div className={`absolute inset-0 flex items-center px-6 ${justifyClass}`}>
      <div
        className={`relative flex max-w-lg flex-col py-6 transition-all duration-700 ease-out ${containerClasses} ${
          isCurrent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-30"
        }`}
      >
        <div
          className={`absolute inset-0 -z-10 rounded-lg ${gradientClass} transition-opacity duration-700 ${
            isCurrent ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className={`${borderClass} flex flex-col gap-2`}>
          <div className="font-orbitron leading-none font-bold">
            <span className="block text-2xl text-[#F5A623]/80 md:text-3xl">
              {section.number.line1}
            </span>
            <span
              className={`block text-6xl text-[#F36A1D] transition-all duration-500 md:text-7xl lg:text-8xl ${
                isCurrent ? "blur-0 scale-100" : "scale-90 blur-sm"
              }`}
            >
              {section.number.line2}
            </span>
          </div>

          <h2 className="font-orbitron mt-2 text-xl font-bold tracking-wider text-white uppercase md:text-2xl">
            {section.title}
          </h2>

          <p className="max-w-xs font-sans text-sm leading-relaxed font-medium text-neutral-300 md:text-base">
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
    {
      number: { line1: "JAN", line2: "12" },
      title: "Registrations Start",
      description: "Registration opens. Gather your team and sign up.",
    },
    {
      number: { line1: "JAN", line2: "24" },
      title: "Registrations Close",
      description: "Deadline day. Ensure your team is registered.",
    },
    {
      number: { line1: "JAN", line2: "26" },
      title: "Round 1: Quiz",
      description: "Quiz round. Only team lead allowed. Timing TBA.",
    },
    {
      number: { line1: "JAN", line2: "27" },
      title: "Shortlist Announced",
      description:
        "By 9 AM. Selected teams listed on website & WhatsApp groups.",
    },
    {
      number: { line1: "JAN", line2: "30" },
      title: "Hackathon Starts",
      description: "The 32-hour offline hackathon begins.",
    },
    {
      number: { line1: "JAN", line2: "31" },
      title: "Hackathon Ends",
      description: "Competition concludes and winners declared.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Animation states
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [componentOpacity, setComponentOpacity] = useState(1);

  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, [sections.length]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // --- 1. Progress Calculation ---
      const totalSections = sections.length;
      const sectionHeight = 100;
      const startY = 50;
      const totalPathHeight = (totalSections - 1) * sectionHeight;
      const viewBoxHeight = startY + totalPathHeight + startY;

      const startFraction = startY / viewBoxHeight;
      const endFraction = (startY + totalPathHeight) / viewBoxHeight;
      const effectivePathFraction = endFraction - startFraction;

      const scrollCenterPosition = -containerTop + windowHeight * 0.5;
      const rawProgress =
        containerHeight > 0 ? scrollCenterPosition / containerHeight : 0;

      let adjustedProgress =
        (rawProgress - startFraction) / effectivePathFraction;
      if (adjustedProgress > 0.99) adjustedProgress = 1;
      adjustedProgress = Math.min(1, Math.max(0, adjustedProgress));

      setProgress(adjustedProgress);

      // --- 2. Header Fade In/Out ---
      const headerFadeStart = windowHeight * 0.2;
      const headerFadeEnd = -100;
      let newHeaderOpacity = 1;
      if (containerTop < headerFadeStart) {
        const distance = containerTop - headerFadeEnd;
        const range = headerFadeStart - headerFadeEnd;
        newHeaderOpacity = Math.min(1, Math.max(0, distance / range));
      }
      setHeaderOpacity(newHeaderOpacity);

      // --- 3. Component Exit Fade (Anchor to Last Section) ---
      // We check the position of the LAST section specifically.
      // We want opacity to remain 1 until the last section reaches the top area.

      let newComponentOpacity = 1;
      const lastSection = sectionRefs.current[sections.length - 1];

      if (lastSection) {
        const lastRect = lastSection.getBoundingClientRect();
        const elementCenter = lastRect.top + lastRect.height / 2;

        // Start fading when the center of the last element hits the top 20% of the viewport
        const fadeStartPos = windowHeight * 0.2;
        // Finish fading when it has moved up another 20% (fully off or near off screen)
        const fadeEndPos = -windowHeight * 0.1;

        if (elementCenter < fadeStartPos) {
          const range = fadeStartPos - fadeEndPos;
          const distance = elementCenter - fadeEndPos;
          newComponentOpacity = Math.min(1, Math.max(0, distance / range));
        }
      } else {
        // Fallback if ref not found (rare)
        if (containerRect.bottom < windowHeight * 0.5) {
          newComponentOpacity = Math.max(
            0,
            containerRect.bottom / (windowHeight * 0.5)
          );
        }
      }

      setComponentOpacity(newComponentOpacity);

      // --- 4. Active Section Logic ---
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex, sections.length]);

  return (
    <div ref={scrollContainerRef} className="relative w-full bg-black">
      <style jsx global>{`
        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
      `}</style>

      {/* Main Wrapper with Scroll-Driven Opacity */}
      <div style={{ opacity: componentOpacity }}>
        {/* Header Section */}
        <div
          className="relative z-10 flex flex-col items-center justify-center pt-24 pb-12 text-center md:pt-32"
          style={{ opacity: headerOpacity }}
        >
          <h2 className="font-orbitron text-4xl font-bold tracking-widest text-[#F5A623] uppercase drop-shadow-[0_0_15px_rgba(243,106,29,0.4)] md:text-6xl">
            Timeline
          </h2>
          <p className="mt-4 max-w-xl px-4 text-base font-light text-neutral-400 md:text-lg">
            Follow the journey from registration to the final showdown.
          </p>
        </div>

        <div className="relative">
          <BackgroundAnimation
            progress={progress}
            totalSections={sections.length}
          />

          {/* Small padding to keep content neat, but not create a huge gap */}
          <main className="relative z-10 pb-20">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="relative flex min-h-[50vh] w-full flex-shrink-0 items-center justify-center md:min-h-[60vh]"
              >
                <SectionContent
                  section={section}
                  isCurrent={index === currentIndex}
                  index={index}
                />
              </div>
            ))}
          </main>

          {/* Decorative Gradient at Bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-64 w-full bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
