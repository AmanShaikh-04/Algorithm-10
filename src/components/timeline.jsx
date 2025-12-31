'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

// ==================== Background Animation Component ====================
const BackgroundAnimation = ({ progress, totalSections }) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [pathD, setPathD] = useState('');
  const [logoTransform, setLogoTransform] = useState('translate(0, 0)');

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
        y: y2
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
      const point = pathRef.current.getPointAtLength(Math.min(currentLength, pathLength));
      setLogoTransform(`translate(${point.x}, ${point.y})`);
    }
  }, [progress, pathLength]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
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
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
          </filter>
          <filter id="node-glow" x="-500%" y="-500%" width="1000%" height="1000%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#F36A1D" floodOpacity="1"/>
          </filter>
        </defs>

        <g>
          <path
            d={pathD}
            fill="none"
            stroke="#F36A1D"
            strokeOpacity="0.3"
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
              fill="#F36A1D" 
              filter="url(#node-glow)"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

// ==================== Corner Bracket Component ====================
const CornerBracket = ({ isCurrent, position, delay }) => {
  const baseClasses = "absolute w-10 h-10 border-[#F36A1D]/60";
  const positionClasses = {
    'top-left': 'top-0 left-0 border-t border-l',
    'top-right': 'top-0 right-0 border-t border-r',
    'bottom-left': 'bottom-0 left-0 border-b border-l',
    'bottom-right': 'bottom-0 right-0 border-b border-r',
  };
  const transitionClasses = `transition-all duration-700 ease-out ${isCurrent ? 'opacity-100 w-10 h-10' : 'opacity-0 w-5 h-5'}`;

  return (
    <div 
      className={`${baseClasses} ${positionClasses[position]} ${transitionClasses}`} 
      style={{ transitionDelay: delay }}
    />
  );
};

// ==================== Section Content Component ====================
const SectionContent = ({ section, isCurrent, index }) => {
  const descriptionWordCount = section.description.split(' ').length;
  const dateAnimationStartDelay = 200 + descriptionWordCount * 35;
  const dateParts = ['// [', section.date, ']'];

  const isLeft = index % 2 === 0;
  const containerJustifyClass = isLeft ? 'justify-start' : 'justify-end';
  const contentContainerClasses = isLeft
    ? 'items-start text-left ml-[25%] md:ml-[30%] lg:ml-[35%]'
    : 'items-end text-right mr-[25%] md:mr-[30%] lg:mr-[35%]';

  return (
    <div className={`absolute inset-0 flex items-center ${containerJustifyClass}`}>
      <div className={`relative flex flex-col max-w-md p-6 ${contentContainerClasses}`}>
        <CornerBracket isCurrent={isCurrent} position={isLeft ? "top-left" : "top-right"} delay="500ms" />
        <CornerBracket isCurrent={isCurrent} position={isLeft ? "bottom-right" : "bottom-left"} delay="500ms" />
        
        <div className={`transition-all duration-500 ease-in-out ${isCurrent ? 'blur-0 scale-100 opacity-100' : 'blur-sm scale-95 opacity-50'}`}>
          <div className="overflow-hidden">
            <div
              className={`font-orbitron text-7xl md:text-8xl font-bold text-[#F36A1D] transition-all duration-500 ease-out delay-100 leading-none ${isCurrent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            >
              <span>{section.number.line1}</span>
              {section.number.line2 && <span className="block">{section.number.line2}</span>}
            </div>
          </div>

          <div className="mt-1">
            <h2 className="font-orbitron text-lg md:text-xl font-semibold text-[#E1E1E3] tracking-wider uppercase" aria-label={section.title}>
              {section.title.split('').map((char, charIndex) => (
                <span key={charIndex} className="inline-block overflow-hidden">
                  <span
                    className={`inline-block transition-all duration-300 ease-out ${isCurrent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    style={{ transitionDelay: `${150 + charIndex * 25}ms` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          
          <div className="mt-1 max-w-sm">
            <p className="text-base text-[#E1E1E3]/70" aria-label={section.description}>
              {section.description.split(' ').map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block overflow-hidden mr-1.5 align-bottom">
                  <span 
                    className={`inline-block transition-all duration-400 ease-out ${isCurrent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    style={{ transitionDelay: `${200 + wordIndex * 35}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-orbitron text-sm font-semibold text-[#F36A1D]/80 tracking-widest uppercase" aria-label={`Date: ${section.date}`}>
              {dateParts.map((part, partIndex) => (
                <span key={partIndex} className="inline-block overflow-hidden mr-2">
                  <span
                    className={`inline-block transition-all duration-400 ease-out ${isCurrent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: `${dateAnimationStartDelay + partIndex * 50}ms` }}
                  >
                    {part}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Timeline Component ====================
const Timeline = () => {
  const sections = [
    {
      number: { line1: "Launch" },
      title: "Registration Open",
      description: "Assemble your squad, register your team, and prepare for liftoff. The countdown has begun.",
      date: "OCT 28, 2024",
    },
    {
      number: { line1: "Day", line2: "01" },
      title: "Ideation & Build",
      description: "The clock is ticking. Brainstorm, design, and start coding. Let the innovation marathon commence.",
      date: "OCT 29, 2024",
    },
    {
      number: { line1: "Day", line2: "02" },
      title: "Midpoint Check-in",
      description: "Refine your prototypes. Mentors are on standby to help you debug, pivot, and push the boundaries.",
      date: "OCT 30, 2024",
    },
    {
      number: { line1: "Day", line2: "03" },
      title: "Final Touches",
      description: "Polish your presentation, squash the last bugs, and prepare to showcase your creation to the world.",
      date: "OCT 31, 2024",
    },
    {
      number: { line1: "Judging" },
      title: "Demo Day",
      description: "Present your project to our panel of judges. It's time to see if your code has what it takes to win.",
      date: "NOV 01, 2024",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const containerHeight = containerRect.height;
      
      // Calculate progress based on how much of the timeline is visible/scrolled
      const windowHeight = window.innerHeight;
      const scrolledPast = Math.max(0, -containerTop);
      const totalScrollable = containerHeight - windowHeight;
      const currentProgress = totalScrollable > 0 ? Math.min(1, scrolledPast / totalScrollable) : 0;
      setProgress(currentProgress);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex]);

  return (
    <div ref={scrollContainerRef} className="relative w-full">
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
      
      <div className="relative">
        <BackgroundAnimation
          progress={progress}
          totalSections={sections.length}
        />
        <main>
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => { sectionRefs.current[index] = el; }}
              className="relative flex-shrink-0 w-full h-screen"
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
  );
};

export default Timeline;