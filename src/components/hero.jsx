"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

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
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      style={{ opacity: 0.25 }}
    />
  );
};

const AnimatedLogo = ({ className = "" }) => {
  const [drawComplete, setDrawComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDrawComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.svg
      viewBox="0 0 350 400"
      fill="none"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="heroSilverRadial" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E8E8E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.85" />
        </radialGradient>
        <linearGradient
          id="heroOrangeGradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="1" />
        </linearGradient>
      </defs>

      <motion.g
        transform="translate(75, 56)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.path
          d="M1.22721 169.92L87.1784 58.077L109.408 95.2285L140.418 76.2462L97.1276 0.572083L0.434512 170.405L1.22721 169.92Z"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M1.22721 169.92L87.1784 58.077L109.408 95.2285L140.418 76.2462L97.1276 0.572083L0.434512 170.405L1.22721 169.92Z"
          fill="url(#heroSilverRadial)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </motion.g>

      <motion.g
        transform="translate(76, 98)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.path
          d="M0.270066 132.479L70.1833 132.737L205.851 0.357864L205.923 0.490149L0.270066 132.479Z"
          stroke="#FFA500"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M0.270066 132.479L70.1833 132.737L205.851 0.357864L205.923 0.490149L0.270066 132.479Z"
          fill="url(#heroOrangeGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      </motion.g>

      <motion.g
        transform="translate(198, 156)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.path
          d="M0.441675 28.4332L26.4417 77.4332L66 77.1675L65.5552 76.8958L26.5552 0.895835L26.6277 0.333772L0.627715 29.3338L0.441675 28.4332Z"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.path
          d="M0.441675 28.4332L26.4417 77.4332L66 77.1675L65.5552 76.8958L26.5552 0.895835L26.6277 0.333772L0.627715 29.3338L0.441675 28.4332Z"
          fill="url(#heroSilverRadial)"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.g>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.8 + index * 0.1,
        ease: "easeOut",
      }}
    >
      <div className="group relative">
        <div className="relative flex min-w-16 items-center justify-center rounded-lg border border-orange-500/20 bg-neutral-900/80 px-3 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/40 sm:min-w-24 sm:rounded-xl sm:px-6 sm:py-5 md:min-w-28">
          <motion.span
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative text-center font-mono text-2xl font-bold text-white tabular-nums sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
      <span className="mt-2 text-xs font-light tracking-wider text-white/50 uppercase sm:mt-3 sm:text-sm">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
      <TimeBox value={timeLeft.days} label="Days" index={0} />
      <TimeBox value={timeLeft.hours} label="Hours" index={1} />
      <TimeBox value={timeLeft.minutes} label="Minutes" index={2} />
      <TimeBox value={timeLeft.seconds} label="Seconds" index={3} />
    </div>
  );
};

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
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

  const hackathonDate = "2026-02-15T00:00:00";

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950 pt-20 sm:pt-0"
    >
      <ThreeBackground />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-orange-950/10 via-neutral-950/50 to-neutral-950" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex min-h-screen w-full items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Logo, Name and Username */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 flex flex-col items-center lg:items-start"
            >
              <div className="relative sm:mt-10">
                <AnimatedLogo className="relative h-36 w-32 sm:h-52 sm:w-48 md:h-60 md:w-56 lg:h-72 lg:w-64" />
              </div>

              <div className="-mt-4 text-center sm:-mt-8 lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-3 text-4xl font-black tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                >
                  <span className="block text-white">Algorithm</span>
                  <span className="block bg-linear-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                    X
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mx-auto mb-4 h-0.5 w-9 bg-orange-500 sm:mb-6 sm:w-19 lg:mx-0"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-md px-4 text-sm font-light text-white/60 sm:px-0 sm:text-base md:text-lg lg:text-xl"
                >
                  Where <span className="text-orange-400">Innovation</span>{" "}
                  Meets <span className="text-orange-400">Excellence</span>
                </motion.p>

                {/* Username Display */}
                {username && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-8 w-full max-w-md self-start px-4 text-left sm:mt-10 sm:px-0"
                  >
                    <div className="group relative cursor-default">
                      {/* Main container */}
                      <div className="relative overflow-hidden rounded-xl border border-orange-500/10 bg-neutral-900/40 px-5 py-3 backdrop-blur-md">
                        {/* Animated gradient overlay */}
                        <motion.div
                          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.03), transparent)",
                          }}
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1,
                          }}
                        />

                        {/* Content */}
                        <div className="relative flex items-center gap-3">
                          {/* Minimalist icon */}
                          <motion.div
                            className="h-8 w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-orange-500 to-orange-600"
                            animate={{
                              scaleY: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Text content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-medium tracking-[0.2em] text-orange-500/60 uppercase">
                                Welcome
                              </span>
                              <motion.div
                                className="h-1 w-1 rounded-full bg-green-500"
                                animate={{
                                  opacity: [1, 0.3, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </div>
                            <div className="mt-0.5 truncate text-lg font-light tracking-wide text-white sm:text-xl">
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

            {/* Right Column - Timer and Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-2 flex flex-col items-center space-y-6 sm:space-y-8 lg:items-end"
            >
              <div className="w-full max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-6 text-center sm:mb-8"
                >
                  <h2 className="mb-2 text-xl font-bold text-white sm:mb-3 sm:text-2xl md:text-3xl">
                    Event Starts In
                  </h2>
                  <div className="mx-auto h-0.5 w-20 bg-orange-500 sm:w-24" />
                </motion.div>

                <CountdownTimer targetDate={hackathonDate} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex w-full max-w-xl flex-col gap-3 px-4 sm:flex-row sm:gap-4 sm:px-0"
              >
                <motion.a
                  href="https://unstop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex-1 overflow-hidden rounded-lg px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 sm:px-8 sm:py-5 md:px-10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500" />
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-base sm:gap-3 sm:text-lg">
                    Register Now
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5"
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
                  className="group relative flex-1 overflow-hidden rounded-lg border border-orange-500/30 px-6 py-4 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 sm:px-8 sm:py-5 md:px-10"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-base sm:gap-3 sm:text-lg">
                    Learn More
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-y-1 sm:h-5 sm:w-5"
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
    </section>
  );
}
