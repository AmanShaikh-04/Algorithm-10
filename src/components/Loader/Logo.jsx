import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 40;

      const t = Math.random();
      colorsArray[i] = 1;
      colorsArray[i + 1] = 0.4 + t * 0.4;
      colorsArray[i + 2] = t * 0.2;
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
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    const gridHelper = new THREE.GridHelper(50, 20, 0xff6600, 0x333333);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.08;
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    camera.position.z = 20;
    camera.position.y = 2;

    const handleMouseMove = (event) => {
      targetRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

      particlesMesh.rotation.y = elapsedTime * 0.02;
      particlesMesh.position.x = mouseRef.current.x * 2;
      particlesMesh.position.y = mouseRef.current.y * 2;

      gridHelper.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.5 }}
    />
  );
};

// Animated Line Component
const AnimatedLine = ({
  x1,
  y1,
  x2,
  y2,
  delay,
  duration,
  color,
  strokeWidth = 2.5,
}) => {
  const [pathLength, setPathLength] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        setPathLength(eased);
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={opacity}
      strokeDasharray="1000"
      strokeDashoffset={1000 * (1 - pathLength)}
      filter="url(#lineGlow)"
      style={{ transition: "opacity 0.3s ease-out" }}
    />
  );
};

// Group 4 SVG
const Group4SVG = ({ isDrawing }) => {
  const lineData = [
    {
      x1: "1.22721",
      y1: "169.92",
      x2: "87.1784",
      y2: "58.077",
      delay: 0.2,
      duration: 0.8,
    },
    {
      x1: "0.434512",
      y1: "170.405",
      x2: "97.1276",
      y2: "0.572083",
      delay: 0.35,
      duration: 1.0,
    },
    {
      x1: "86.4077",
      y1: "58.2285",
      x2: "109.408",
      y2: "95.2285",
      delay: 1.0,
      duration: 0.4,
    },
    {
      x1: "97.4182",
      y1: "0.246217",
      x2: "140.418",
      y2: "76.2462",
      delay: 1.15,
      duration: 0.5,
    },
    {
      x1: "108.728",
      y1: "95.0624",
      x2: "140.728",
      y2: "76.0624",
      delay: 1.5,
      duration: 0.35,
    },
  ];

  const [fillOpacity, setFillOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setFillOpacity(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      width="141"
      height="171"
      viewBox="0 0 141 171"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="silverRadial1" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#E8E8E8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#B0B0B0" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#808080" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#606060" stopOpacity="0.75" />
        </radialGradient>
      </defs>
      {isDrawing &&
        lineData.map((line, idx) => (
          <AnimatedLine
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            delay={line.delay}
            duration={line.duration}
            color="#FFFFFF"
            strokeWidth={2.5}
          />
        ))}
      <motion.path
        d="M1.22721 169.92L87.1784 58.077L109.408 95.2285L140.418 76.2462L97.1276 0.572083L0.434512 170.405L1.22721 169.92Z"
        fill="url(#silverRadial1)"
        initial={{ opacity: 0 }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        filter={fillOpacity > 0 ? "url(#softGlow)" : "none"}
      />
    </svg>
  );
};

// Group 1 SVG
const Group1SVG = ({ isDrawing }) => {
  const lineData = [
    {
      x1: "0.863166",
      y1: "132.228",
      x2: "70.8602",
      y2: "131.583",
      delay: 0.6,
      duration: 0.5,
    },
    {
      x1: "70.1833",
      y1: "132.737",
      x2: "205.851",
      y2: "0.357864",
      delay: 0.8,
      duration: 1.1,
    },
    {
      x1: "0.270066",
      y1: "132.479",
      x2: "205.923",
      y2: "0.490149",
      delay: 1.2,
      duration: 0.9,
    },
  ];

  const [fillOpacity, setFillOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setFillOpacity(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      width="206"
      height="133"
      viewBox="0 0 206 133"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <linearGradient
          id="orangeGradientPro"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#4A0404" stopOpacity="0.9" />
          <stop offset="15%" stopColor="#8B0000" stopOpacity="0.92" />
          <stop offset="30%" stopColor="#B22222" stopOpacity="0.94" />
          <stop offset="45%" stopColor="#FF4500" stopOpacity="0.96" />
          <stop offset="65%" stopColor="#FFA500" stopOpacity="0.98" />
          <stop offset="85%" stopColor="#FFD700" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFEB3B" stopOpacity="1" />
        </linearGradient>
      </defs>
      {isDrawing &&
        lineData.map((line, idx) => (
          <AnimatedLine
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            delay={line.delay}
            duration={line.duration}
            color="#FFB84D"
            strokeWidth={2.5}
          />
        ))}
      <motion.path
        d="M0.270066 132.479L70.1833 132.737L205.851 0.357864L205.923 0.490149L0.270066 132.479Z"
        fill="url(#orangeGradientPro)"
        initial={{ opacity: 0 }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        filter={fillOpacity > 0 ? "url(#softGlow)" : "none"}
      />
    </svg>
  );
};

// Group 6 SVG
const Group6SVG = ({ isDrawing }) => {
  const lineData = [
    {
      x1: "0.441675",
      y1: "28.4332",
      x2: "26.4417",
      y2: "77.4332",
      delay: 1.7,
      duration: 0.4,
    },
    {
      x1: "26",
      y1: "77.1676",
      x2: "66",
      y2: "77.1675",
      delay: 1.85,
      duration: 0.3,
    },
    {
      x1: "65.5552",
      y1: "76.8958",
      x2: "26.5552",
      y2: "0.895835",
      delay: 2.0,
      duration: 0.5,
    },
    {
      x1: "0.627715",
      y1: "29.3338",
      x2: "26.6277",
      y2: "0.333772",
      delay: 2.25,
      duration: 0.3,
    },
  ];

  const [fillOpacity, setFillOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setFillOpacity(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      width="66"
      height="78"
      viewBox="0 0 66 78"
      fill="none"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="silverRadial2" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#E8E8E8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#B0B0B0" stopOpacity="0.85" />
          <stop offset="75%" stopColor="#808080" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#606060" stopOpacity="0.75" />
        </radialGradient>
      </defs>
      {isDrawing &&
        lineData.map((line, idx) => (
          <AnimatedLine
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            delay={line.delay}
            duration={line.duration}
            color="#FFFFFF"
            strokeWidth={2.5}
          />
        ))}
      <motion.path
        d="M0.441675 28.4332L26.4417 77.4332L66 77.1675L65.5552 76.8958L26.5552 0.895835L26.6277 0.333772L0.627715 29.3338L0.441675 28.4332Z"
        fill="url(#silverRadial2)"
        initial={{ opacity: 0 }}
        animate={{ opacity: fillOpacity }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        filter={fillOpacity > 0 ? "url(#softGlow)" : "none"}
      />
    </svg>
  );
};

// Logo Component
const Logo = ({ isDrawing }) => {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="relative scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100"
          style={{ width: "350px", height: "400px" }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ width: "350px", height: "400px" }}
          >
            <div
              className="absolute"
              style={{
                height: "170.16px",
                left: "75px",
                top: "56px",
                width: "140.114px",
              }}
            >
              <Group4SVG isDrawing={isDrawing} />
            </div>

            <div
              className="absolute"
              style={{
                height: "132.379px",
                left: "76px",
                top: "98px",
                width: "205.66px",
              }}
            >
              <Group1SVG isDrawing={isDrawing} />
            </div>

            <div
              className="absolute"
              style={{
                height: "77px",
                left: "198px",
                top: "156px",
                width: "66px",
              }}
            >
              <Group6SVG isDrawing={isDrawing} />
            </div>

            <motion.div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 transform"
              style={{ top: "280px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 2.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="text-center text-base font-extralight tracking-[0.3em] whitespace-nowrap text-white uppercase sm:text-xl">
                Algorithm X
              </h1>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Logo;
export { ThreeBackground };
