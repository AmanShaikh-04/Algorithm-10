import React, { useState, useMemo } from 'react';

// =============== ICONS ===============
const EducationIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
    <path d="m15 13-3 5 4 4 3-5-4-4Z"/>
    <path d="M6 12h4"/>
    <path d="M6 16h4"/>
    <path d="M10 8h1"/>
  </svg>
);

const CybersecurityIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9.5 14.5 1.5 1.5 3.5-3.5"/>
  </svg>
);

const InnovationIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a10 10 0 1 0 10 10"/>
    <path d="M12 12a10 10 0 0 1 10-10"/>
    <path d="M12 12a10 10 0 0 0-10 10"/>
    <path d="M12 12a10 10 0 1 1 0 20"/>
    <path d="M12 12a10 10 0 1 0 0-20"/>
  </svg>
);

const HealthcareIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    <path d="M3.4 15H15"/>
  </svg>
);

// =============== GLITCH TEXT ===============
const GlitchText = ({ text, className }) => {
  return (
    <div className={`glitch ${className || ''}`} data-text={text}>
      {text}
    </div>
  );
};

// =============== TRACKS DATA ===============
const TRACKS_DATA = [
  {
    id: '01',
    title: 'Project: Synapse',
    category: 'Education',
    problemStatement: 'Develop AI-driven systems for personalized learning.',
    challenge: 'Create an AI-driven system that customizes learning based on individual preferences and progress.',
    impact: 'Enhances education accessibility and effectiveness through adaptive learning.',
    icon: EducationIcon,
    backgroundImage: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=800&q=80',
    themeColor: '59, 130, 246',
    backgroundColor: '#3B82F6',
  },
  {
    id: '02',
    title: 'Project: Aegis',
    category: 'Cybersecurity',
    problemStatement: 'Create AI models for real-time threat detection.',
    challenge: 'Develop an AI model to detect cybersecurity threats in real time using behavioral analysis.',
    impact: 'Strengthens security by preventing cyberattacks proactively.',
    icon: CybersecurityIcon,
    backgroundImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1550751827-4138d04d475d?w=800&q=80',
    themeColor: '239, 68, 68',
    backgroundColor: '#EF4444',
  },
  {
    id: '03',
    title: 'Project: Nexus',
    category: 'Innovation',
    problemStatement: 'Build a platform for AI-powered collaboration.',
    challenge: 'Develop an AI-driven platform to connect researchers, developers, and organizations for open-source AI innovation.',
    impact: 'Accelerates knowledge sharing and global AI advancements.',
    icon: InnovationIcon,
    backgroundImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    themeColor: '168, 85, 247',
    backgroundColor: '#A855F7',
  },
  {
    id: '04',
    title: 'Project: Caduceus',
    category: 'Healthcare',
    problemStatement: 'Utilize AI for early disease detection and prevention.',
    challenge: 'Develop an AI model that utilizes patient data, imaging, or biosignals to detect diseases early.',
    impact: 'Improves early diagnosis, reduces healthcare costs, and enhances patient care.',
    icon: HealthcareIcon,
    backgroundImage: 'data:image/jpeg;base64,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',
    hoverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba9996a?w=800&q=80',
    themeColor: '34, 197, 94',
    backgroundColor: '#22C55E',
  },
];

// =============== BACKGROUND ===============
const Background = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      backgroundColor: '#0A061A',
      overflow: 'hidden'
    }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: '-50px',
            backgroundImage: `radial-gradient(${i}px ${i}px at center, white, transparent)`,
            backgroundSize: `${100 * i * 4}px ${100 * i * 4}px`,
            opacity: i === 1 ? 0.4 : i === 2 ? 0.2 : 0.1,
            animation: `starPan ${300 / i}s linear infinite`,
            transform: `translate(${mousePos.x * (50 / i)}px, ${mousePos.y * (50 / i)}px)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
      ))}
    </div>
  );
};

// =============== CRYO POD ===============
const CryoPod = ({ track, onExplore, animationDelay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '288px',
        height: '360px',
        padding: '8px',
        borderRadius: '24px',
        // background: 'rgba(160, 168, 183, 0.2)',
        opacity: 0,
        animation: 'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        animationDelay: `${animationDelay}ms`,
        transform: isHovered ? 'scale(1.02) translateY(-8px)' : 'scale(1)',
        transition: 'transform 0.5s',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: '8px',
          borderRadius: '16px',
          border: '1px solid rgba(160, 168, 183, 0.3)',
          overflow: 'hidden',
          backgroundImage: `radial-gradient(circle, rgba(${track.themeColor}, 0.15), #1a1d2a)`,
        }}
      >
        {/* Frame Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            boxShadow: `0 0 20px rgba(${track.themeColor}, 0.3)`,
            animation: isHovered ? 'pulseGlow 2.5s ease-in-out infinite' : 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            background: 'rgba(160, 168, 183, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${isHovered ? track.hoverImage : track.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isHovered ? 0.1 : 0.2,
              transition: 'opacity 0.7s',
            }}
          />

          {/* Grid Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(${track.themeColor}, ${isHovered ? 0.15 : 1}) 1px, transparent 1px),
                linear-gradient(to right, rgba(${track.themeColor}, ${isHovered ? 0.15 : 1}) 1px, transparent 1px)
              `,
              backgroundSize: isHovered ? '30px 30px' : '20px 20px',
              opacity: isHovered ? 0.25 : 0.07,
              transition: 'all 0.5s',
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Status Light */}
            <div
              style={{
                width: isHovered ? '66.67%' : '33.33%',
                height: '4px',
                borderRadius: '9999px',
                backgroundColor: `rgba(${track.themeColor}, ${isHovered ? 0.5 : 0.5})`,
                boxShadow: `0 0 ${isHovered ? 8 : 8}px rgb(${track.themeColor})`,
                animation: isHovered ? 'none' : 'breathingLight 3s ease-in-out infinite',
                transition: 'all 0.5s',
              }}
            />

            {/* Icon & Title */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.5s' }}>
                <track.icon
                  style={{
                    width: '80px',
                    height: '80px',
                    color: `rgb(${track.themeColor})`,
                    filter: `drop-shadow(0 0 ${isHovered ? 20 : 10}px rgb(${track.themeColor}))`,
                    transition: 'filter 0.5s',
                  }}
                />
              </div>
              <GlitchText
                text={track.category.toUpperCase()}
                className={`${isHovered ? 'glitch-active' : ''}`}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 'bold',
                  color: '#E6EDF3',
                  marginTop: '12px',
                  letterSpacing: '0.1em',
                  fontSize: track.category === 'Cybersecurity' ? '20px' : '24px',
                  textShadow: '0 0 8px rgba(250, 204, 21, 0.5)',
                }}
              />
              <p
                style={{
                  color: '#8B949E',
                  fontSize: '14px',
                  height: '40px',
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.5s 100ms',
                }}
              >
                {track.problemStatement}
              </p>
            </div>

            {/* Action Button */}
            <div
              style={{
                width: '100%',
                height: '48px',
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.5s 200ms',
              }}
            >
              <button
                onClick={onExplore}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  border: `2px solid rgba(${track.themeColor}, 0.7)`,
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '14px',
                  color: `rgba(${track.themeColor}, 0.9)`,
                  background: 'transparent',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(${track.themeColor}, 0.2)`;
                  e.currentTarget.style.boxShadow = `0 0 15px rgba(${track.themeColor}, 0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Awaken Project
              </button>
            </div>
          </div>
        </div>

        {/* Corner Brackets */}
        {[
          { top: '4px', left: '4px', borderTop: true, borderLeft: true, borderRadius: '12px 0 0 0' },
          { top: '4px', right: '4px', borderTop: true, borderRight: true, borderRadius: '0 12px 0 0' },
          { bottom: '4px', left: '4px', borderBottom: true, borderLeft: true, borderRadius: '0 0 0 12px' },
          { bottom: '4px', right: '4px', borderBottom: true, borderRight: true, borderRadius: '0 0 12px 0' },
        ].map((style, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              borderColor: 'rgba(160, 168, 183, 0.5)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderTop: style.borderTop ? undefined : 'none',
              borderRight: style.borderRight ? undefined : 'none',
              borderBottom: style.borderBottom ? undefined : 'none',
              borderLeft: style.borderLeft ? undefined : 'none',
              borderRadius: style.borderRadius,
              ...style,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// =============== TRACK DETAILS PANEL ===============
const TrackDetailsPanel = ({ track, onClose }) => {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.3s ease-out forwards',
        }}
      />

      {/* Modal Content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '672px',
          maxHeight: '90vh',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '32px',
          overflowY: 'auto',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${track.backgroundImage})`,
          backgroundColor: track.backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'fadeInScaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Glassmorphism Overlay */}
        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(48px)', background: 'rgba(0, 0, 0, 0.2)', zIndex: -10 }} />

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10, color: '#E6EDF3' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <track.icon style={{ width: '64px', height: '64px', color: `rgb(${track.themeColor})`, margin: '0 auto' }} />
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '16px', fontFamily: 'Orbitron, sans-serif' }}>{track.title}</h2>
            <p style={{ color: `rgb(${track.themeColor})`, fontSize: '18px', marginTop: '8px', letterSpacing: '0.1em' }}>{track.category}</p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: `rgb(${track.themeColor})`, marginBottom: '8px' }}>Challenge</h3>
            <p style={{ color: '#8B949E', lineHeight: '1.6' }}>{track.challenge}</p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: `rgb(${track.themeColor})`, marginBottom: '8px' }}>Impact</h3>
            <p style={{ color: '#8B949E', lineHeight: '1.6' }}>{track.impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============== MAIN TRACKS COMPONENT ===============
const TracksSection = () => {
  const [selectedId, setSelectedId] = useState(null);

  const selectedTrack = useMemo(() => {
    return TRACKS_DATA.find(track => track.id === selectedId) || null;
  }, [selectedId]);

  return (
    <div>
      
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        
        @keyframes starPan {
          from { background-position: 0% 0%; }
          to { background-position: 0% -10000%; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: perspective(1000px) rotateX(-10deg) translateY(20px); }
          to { opacity: 1; transform: perspective(1000px) rotateX(0deg) translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInScaleUp {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.4); }
          50% { box-shadow: 0 0 40px rgba(var(--theme-color-rgb), 0.7); }
        }
        
        @keyframes breathingLight {
          0%, 100% { 
            background-color: rgba(var(--theme-color-rgb), 0.5);
            box-shadow: 0 0 8px rgba(var(--theme-color-rgb), 0.5);
          }
          50% { 
            background-color: rgba(var(--theme-color-rgb), 0.8);
            box-shadow: 0 0 14px rgba(var(--theme-color-rgb), 0.7);
          }
        }
        
        .glitch {
          position: relative;
        }
        
        .glitch-active::before,
        .glitch-active::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #1a1d2a;
          overflow: hidden;
        }
        
        .glitch-active::before {
          left: 2px;
          text-shadow: -2px 0 #ef4444;
          animation: glitchAnim1 2s linear infinite alternate-reverse;
        }
        
        .glitch-active::after {
          left: -2px;
          text-shadow: -2px 0 #3b82f6;
          animation: glitchAnim2 1.5s linear infinite alternate-reverse;
        }
        
        @keyframes glitchAnim1 {
          0% { clip-path: inset(15% 0 85% 0); }
          5% { clip-path: inset(45% 0 50% 0); }
          10% { clip-path: inset(20% 0 70% 0); }
          100% { clip-path: inset(48% 0 48% 0); }
        }
        
        @keyframes glitchAnim2 {
          0% { clip-path: inset(80% 0 10% 0); }
          5% { clip-path: inset(40% 0 45% 0); }
          10% { clip-path: inset(5% 0 92% 0); }
          100% { clip-path: inset(42% 0 52% 0); }
        }
      `}</style>

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            filter: selectedId ? 'blur(4px) brightness(0.75)' : 'none',
            transform: selectedId ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.5s',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '48px', opacity: 0, animation: 'fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '36px', fontWeight: 'bold', letterSpacing: '0.1em', color: '#ff990a' }}>
              
              <GlitchText text="CHOOSE YOUR MISSION" />

            </h2>
            <p style={{ color: '#8B949E', letterSpacing: '0.1em', marginTop: '8px' }}>// SELECT A TRACK TO BEGIN</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px' }}>
            {TRACKS_DATA.map((track, index) => (
              <CryoPod
                key={track.id}
                track={track}
                onExplore={() => setSelectedId(track.id)}
                animationDelay={(index * 150) + 200}
              />
            ))}
          </div>
        </div>

        {selectedTrack && (
          <TrackDetailsPanel track={selectedTrack} onClose={() => setSelectedId(null)} />
        )}
      </div>
    </div>
  );
};

export default TracksSection;