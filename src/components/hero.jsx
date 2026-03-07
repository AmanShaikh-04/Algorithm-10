"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

const VideoBackground = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-neutral-950">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-40"
      >
        <source
          src="https://res.cloudinary.com/dptv6jzs8/video/upload/q_auto,f_auto/v1772641795/watermark_removed_d2664e2c-0b9d-4591-b8bc-afcf50619a71_mln33l.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const clockRef = useRef(null);
  const particlesMeshRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    if (rendererRef.current) return;
    mountRef.current.dataset.threeInited = "1";

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;
    camera.position.y = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";

    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = window.innerWidth < 768 ? 400 : 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 80;
      posArray[i + 1] = (Math.random() - 0.5) * 80;
      posArray[i + 2] = (Math.random() - 0.5) * 60;

      const t = Math.random();
      colorsArray[i] = 1;
      colorsArray[i + 1] = 0.5 + t * 0.4;
      colorsArray[i + 2] = t * 0.3;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    particlesMeshRef.current = particlesMesh;
    scene.add(particlesMesh);

    const clock = new THREE.Clock();
    clockRef.current = clock;

    const handleMouseMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const w = mountRef.current?.clientWidth || window.innerWidth;
      const h = mountRef.current?.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };
    window.addEventListener("resize", handleResize);

    renderer.setAnimationLoop(() => {
      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

      particlesMesh.rotation.y = elapsedTime * 0.015;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.03;
      particlesMesh.position.x = mouseRef.current.x * 1.5;
      particlesMesh.position.y = mouseRef.current.y * 1.5;

      renderer.render(scene, camera);
    });

    return () => {
      try {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);

        if (rendererRef.current) {
          rendererRef.current.setAnimationLoop(null);
          rendererRef.current.dispose();
          rendererRef.current = null;
        }

        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }

        particlesGeometry.dispose();
        particlesMaterial.dispose();

        if (renderer) {
          renderer.dispose();
        }

        if (mountRef.current && mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }

        if (mountRef.current) {
          delete mountRef.current.dataset.threeInited;
        }
      } catch (err) {
        // cleanup errors
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      style={{ opacity: 0.25 }}
    />
  );
};

const AnimatedLogo = ({ className = "" }) => {
  const [drawComplete, setDrawComplete] = useState(false);

  useEffect(() => {
    // Triggers the fill fade-in after the stroke draws
    const timer = setTimeout(() => setDrawComplete(true), 1600);
    return () => clearTimeout(timer);
  }, []);

  const drawTransition = { duration: 1.5, ease: "easeInOut" };
  const fadeTransition = { duration: 0.8, ease: "easeOut" };

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 1011 892"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <defs>
        <filter id="filter0_dddddd_266_3" x="0.000156403" y="0.00210953" width="696.088" height="839.215" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="0.367441"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="0.734883"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_266_3" result="effect2_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2.57209"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect2_dropShadow_266_3" result="effect3_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="5.14418"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect3_dropShadow_266_3" result="effect4_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="8.81859"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect4_dropShadow_266_3" result="effect5_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="15.4325"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect5_dropShadow_266_3" result="effect6_dropShadow_266_3"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_266_3" result="shape"/>
        </filter>
        <filter id="filter1_dd_266_3" x="11.3832" y="219.992" width="998.629" height="656.502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4"/>
          <feGaussianBlur stdDeviation="11.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.454902 0 0 0 0 0.0627451 0 0 0 0.67 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-4" dy="4"/>
          <feGaussianBlur stdDeviation="10.7"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.486275 0 0 0 0 0.0431373 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_266_3" result="effect2_dropShadow_266_3"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_266_3" result="shape"/>
        </filter>
        <filter id="filter2_dd_266_3" x="11.3832" y="219.992" width="998.629" height="656.502" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4"/>
          <feGaussianBlur stdDeviation="11.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.454902 0 0 0 0 0.0627451 0 0 0 0.67 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_266_3"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-4" dy="4"/>
          <feGaussianBlur stdDeviation="10.7"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.992157 0 0 0 0 0.486275 0 0 0 0 0.0431373 0 0 0 1 0"/>
          <feBlend mode="normal" in2="effect1_dropShadow_266_3" result="effect2_dropShadow_266_3"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_266_3" result="shape"/>
        </filter>
        <filter id="filter3_d_266_3" x="628.956" y="508.144" width="328.931" height="383.65" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="5"/>
          <feGaussianBlur stdDeviation="6.85"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.760784 0 0 0 0 0.764706 0 0 0 0 0.74902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_266_3"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_266_3" result="shape"/>
        </filter>
        <filter id="filter4_d_266_3" x="16.9699" y="26.3078" width="671.045" height="809.345" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="4" dy="5"/>
          <feGaussianBlur stdDeviation="6.85"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.760784 0 0 0 0 0.764706 0 0 0 0 0.74902 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_266_3"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_266_3" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_266_3" x1="258.273" y1="892.094" x2="626.273" y2="417.594" gradientUnits="userSpaceOnUse">
          <stop offset="0.281977" stopColor="#F95320"/>
          <stop offset="0.463709" stopColor="#FF8A05"/>
          <stop offset="0.673711" stopColor="#FFD06B"/>
          <stop offset="0.899868" stopColor="#F7E23D"/>
        </linearGradient>
        <linearGradient id="paint1_linear_266_3" x1="258.273" y1="892.094" x2="626.273" y2="417.594" gradientUnits="userSpaceOnUse">
          <stop offset="0.281977" stopColor="#F95320"/>
          <stop offset="0.463709" stopColor="#FF8A05"/>
          <stop offset="0.673711" stopColor="#FFD06B"/>
          <stop offset="0.899868" stopColor="#F7E23D"/>
        </linearGradient>
        <linearGradient id="paint2_linear_266_3" x1="0.273426" y1="879.094" x2="429.274" y2="348.094" gradientUnits="userSpaceOnUse">
          <stop offset="0.264423" stopColor="#F95320" stopOpacity="0.5"/>
          <stop offset="0.5" stopColor="#FF8A05"/>
          <stop offset="0.855769" stopColor="#FFD06B"/>
          <stop offset="1" stopColor="#F7E23D"/>
        </linearGradient>
        <linearGradient id="paint3_linear_266_3" x1="499.074" y1="83.5483" x2="849.282" y2="1002.66" gradientUnits="userSpaceOnUse">
          <stop offset="0.730769" stopColor="#C3B1A3"/>
          <stop offset="1" stopColor="#E2D9C7"/>
        </linearGradient>
        <linearGradient id="paint4_linear_266_3" x1="645.773" y1="641.094" x2="474.45" y2="158.643" gradientUnits="userSpaceOnUse">
          <stop offset="0.461538" stopColor="#D0C0B0"/>
          <stop offset="1" stopColor="#F5F0EA"/>
        </linearGradient>
        <linearGradient id="paint5_linear_266_3" x1="526.931" y1="107.603" x2="1108.72" y2="1138.01" gradientUnits="userSpaceOnUse">
          <stop offset="0.403846" stopColor="#F7F8F2"/>
          <stop offset="0.576923" stopColor="#EAE4D6"/>
          <stop offset="0.6875" stopColor="#C4B4A4"/>
        </linearGradient>
        <linearGradient id="paint6_linear_266_3" x1="507.424" y1="6.42974" x2="213.247" y2="530.251" gradientUnits="userSpaceOnUse">
          <stop offset="0.254808" stopColor="#F7F3EA"/>
          <stop offset="0.889423" stopColor="#BCAA9C"/>
        </linearGradient>
      </defs>

      <motion.g opacity={0.55} filter="url(#filter0_dddddd_266_3)">
        <motion.path
          d="M471.273 40.0938L34.7734 805.594L425.773 302.094L523.273 472.094L659.273 383.594L471.273 40.0938Z"
          stroke="#9F9F9F"
          strokeWidth="9"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
      </motion.g>

      <g filter="url(#filter1_dd_266_3)">
        <motion.path
          d="M357.773 848.594H45.2734L981.273 245.094L357.773 848.594Z"
          fill="url(#paint0_linear_266_3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={fadeTransition}
        />
        <motion.path
          d="M357.773 848.594H45.2734L981.273 245.094L357.773 848.594Z"
          stroke="#FAED32"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
      </g>

      <g filter="url(#filter2_dd_266_3)">
        <motion.path
          d="M357.773 848.594H45.2734L981.273 245.094L357.773 848.594Z"
          fill="url(#paint1_linear_266_3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={fadeTransition}
        />
        <motion.path
          d="M357.773 848.594H45.2734L981.273 245.094L357.773 848.594Z"
          stroke="#FAED32"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
      </g>

      <motion.path
        d="M228.773 846.594H60.2734L979.273 249.094L228.773 846.594Z"
        fill="url(#paint2_linear_266_3)"
        initial={{ opacity: 0 }}
        animate={{ opacity: drawComplete ? 1 : 0 }}
        transition={fadeTransition}
      />

      <g filter="url(#filter3_d_266_3)">
        <motion.path
          d="M756.528 522.094L642.273 649.73L756.528 870.094H935.273L756.528 522.094Z"
          fill="url(#paint3_linear_266_3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={fadeTransition}
        />
        <motion.path
          d="M756.528 522.094L642.273 649.73L756.528 870.094H935.273L756.528 522.094Z"
          stroke="#EAE4CF"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
      </g>

      <g opacity="0.98" filter="url(#filter4_d_266_3)">
        <motion.path
          d="M472.729 41.0938L29.2734 815.094L431.327 306.324L526.602 469.998L666.273 386.189L472.729 41.0938Z"
          fill="url(#paint4_linear_266_3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={fadeTransition}
        />
        <motion.path
          d="M472.729 41.0938L29.2734 815.094L431.327 306.324L526.602 469.998L666.273 386.189L472.729 41.0938Z"
          stroke="#E5E0CD"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition}
        />
      </g>

      <motion.path
        d="M699.273 591.656L756.381 528.094L931.273 867.094H842.553L699.273 591.656Z"
        fill="url(#paint5_linear_266_3)"
        stroke="#A5A5A5"
        strokeWidth="0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: drawComplete ? 0.7 : 0 }}
        transition={fadeTransition}
      />

      <motion.path
        d="M48.7734 788.594L449.773 173.594V256.594L429.773 303.594L48.7734 788.594Z"
        fill="url(#paint6_linear_266_3)"
        initial={{ opacity: 0 }}
        animate={{ opacity: drawComplete ? 0.7 : 0 }}
        transition={fadeTransition}
      />
    </motion.svg>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  const TimeBox = ({ value, label, index }) => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.8 + index * 0.1,
        ease: "easeOut",
      }}
    >
      <div className="group relative">
        <div className="relative flex min-w-14 items-center justify-center rounded-lg border border-orange-500/20 bg-neutral-900/80 px-2 py-2 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/40 sm:min-w-20 sm:rounded-xl sm:px-4 sm:py-4 md:min-w-24">
          <motion.span
            key={value}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative text-center font-mono text-xl font-bold text-white tabular-nums sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
      <span className="mt-1 text-[10px] font-light tracking-wider text-white/50 uppercase sm:mt-2 sm:text-xs">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
      <TimeBox value={timeLeft.days} label="Days" index={0} />
      <TimeBox value={timeLeft.hours} label="Hours" index={1} />
      <TimeBox value={timeLeft.minutes} label="Minutes" index={2} />
      <TimeBox value={timeLeft.seconds} label="Seconds" index={3} />
    </div>
  );
};

export default function Hero() {
  const spacerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0]),
    springConfig
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [1, 0.95]),
    springConfig
  );

  const hackathonDate = "2026-04-03T00:00:00";

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <>
      <div className="sticky top-0 z-0 flex h-[100dvh] w-full items-center overflow-hidden bg-neutral-950">
        <VideoBackground />
        <ThreeBackground />
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-orange-950/20 via-neutral-950/60 to-neutral-950/90" />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-20 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto mt-8 w-full max-w-7xl md:mt-10">
            <div className="grid items-center gap-4 sm:gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="order-1 flex flex-col items-center lg:items-start"
              >
                <div className="relative">
  <AnimatedLogo className="relative h-16 w-20 md:h-20 md:w-24 lg:h-28 lg:w-32 xl:h-32 xl:w-36" />
</div>

                <div className="mt-0 text-center sm:mt-1 lg:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-2 text-4xl font-black tracking-tight sm:mb-3 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    <span className="block text-white">Algorithm</span>
                    <span className="block bg-linear-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                      10
                    </span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mx-auto mb-3 h-0.5 w-12 bg-orange-500 sm:mb-4 sm:w-16 lg:mx-0"
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-md px-4 text-xs font-light text-white/60 sm:px-0 sm:text-base md:text-lg lg:text-xl"
                  >
                    Innovation <span className="text-orange-400">For a</span>{" "}
                    Sustainable <span className="text-orange-400">Future</span>
                  </motion.p>

                  {username && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="mt-4 w-full max-w-md self-start px-4 text-left sm:mt-6 sm:px-0"
                    >
                      <div className="group relative cursor-default">
                        <div className="relative overflow-hidden rounded-xl border border-orange-500/10 bg-neutral-900/40 px-4 py-2 backdrop-blur-md">
                          <motion.div
                            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.03), transparent)",
                            }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                              repeatDelay: 1,
                            }}
                          />
                          <div className="relative flex items-center gap-3">
                            <motion.div
                              className="h-6 w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-orange-500 to-orange-600"
                              animate={{ scaleY: [1, 1.2, 1] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-medium tracking-[0.2em] text-orange-500/60 uppercase">
                                  Welcome
                                </span>
                                <motion.div
                                  className="h-1 w-1 rounded-full bg-green-500"
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                              </div>
                              <div className="mt-0.5 truncate text-base font-light tracking-wide text-white sm:text-lg">
                                {username}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="order-2 flex flex-col items-center space-y-4 sm:space-y-6 lg:items-end"
              >
                <div className="w-full max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mb-4 text-center sm:mb-6"
                  >
                    <h2 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl md:text-2xl">
                      Event Starts In
                    </h2>
                    <div className="mx-auto h-0.5 w-16 bg-orange-500 sm:w-20" />
                  </motion.div>

                  <CountdownTimer targetDate={hackathonDate} />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-2 flex w-full max-w-xl flex-col gap-2 px-4 sm:mt-4 sm:flex-row sm:gap-4 sm:px-0"
                >
                  <motion.a
                    href="https://unstop.com/o/en0CQj3?lb=CFaCJlmw&utm_medium=Share&utm_source=progrclu63495&utm_campaign=Online_coding_challenge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex-1 overflow-hidden rounded-lg px-4 py-3 font-bold text-white shadow-lg transition-all duration-300 sm:px-6 sm:py-4"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500" />
                    <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:gap-3 sm:text-base">
                      Register Now
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </motion.a>

                  <motion.a
                    href="#about"
                    className="group relative flex-1 overflow-hidden rounded-lg border border-orange-500/30 px-4 py-3 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 sm:px-6 sm:py-4"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:gap-3 sm:text-base">
                      Learn More
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div
        ref={spacerRef}
        className="pointer-events-none relative z-0 h-[100dvh] w-full"
      />
    </>
  );
}