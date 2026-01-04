// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import * as THREE from 'three';

// const ThreeBackground = () => {
//   const mountRef = useRef(null);
//   const mouseRef = useRef({ x: 0, y: 0 });
//   const targetRef = useRef({ x: 0, y: 0 });
//   const rendererRef = useRef(null);
//   const sceneRef = useRef(null);
//   const cameraRef = useRef(null);
//   const clockRef = useRef(null);
//   const shapesRef = useRef([]);
//   const particlesMeshRef = useRef(null);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     if (rendererRef.current) return;
//     mountRef.current.dataset.threeInited = "1";

//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       mountRef.current.clientWidth / mountRef.current.clientHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 25;
//     camera.position.y = 3;
//     cameraRef.current = camera;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     rendererRef.current = renderer;
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
//     renderer.domElement.style.display = "block";
//     renderer.domElement.style.width = "100%";
//     renderer.domElement.style.height = "100%";
//     renderer.domElement.style.position = "absolute";
//     renderer.domElement.style.top = "0";
//     renderer.domElement.style.left = "0";

//     mountRef.current.appendChild(renderer.domElement);

//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = window.innerWidth < 768 ? 600 : 1000;
//     const posArray = new Float32Array(particlesCount * 3);
//     const colorsArray = new Float32Array(particlesCount * 3);

//     for (let i = 0; i < particlesCount * 3; i += 3) {
//       posArray[i] = (Math.random() - 0.5) * 80;
//       posArray[i + 1] = (Math.random() - 0.5) * 80;
//       posArray[i + 2] = (Math.random() - 0.5) * 60;

//       const t = Math.random();
//       colorsArray[i] = 1;
//       colorsArray[i + 1] = 0.5 + t * 0.4;
//       colorsArray[i + 2] = t * 0.3;
//     }

//     particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
//     particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

//     const particlesMaterial = new THREE.PointsMaterial({
//       size: 0.15,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.6,
//       blending: THREE.AdditiveBlending,
//     });

//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     particlesMeshRef.current = particlesMesh;
//     scene.add(particlesMesh);

//     const gridHelper1 = new THREE.GridHelper(70, 30, 0xff6600, 0x444444);
//     gridHelper1.material.transparent = true;
//     gridHelper1.material.opacity = 0.12;
//     gridHelper1.position.y = -15;
//     scene.add(gridHelper1);

//     const gridHelper2 = new THREE.GridHelper(50, 20, 0xffaa00, 0x333333);
//     gridHelper2.material.transparent = true;
//     gridHelper2.material.opacity = 0.08;
//     gridHelper2.position.y = -12;
//     scene.add(gridHelper2);

//     const geometry = new THREE.OctahedronGeometry(2, 0);
//     const material = new THREE.MeshBasicMaterial({
//       color: 0xff6600,
//       wireframe: true,
//       transparent: true,
//       opacity: 0.25,
//     });

//     const shapes = [];
//     const shapeCount = window.innerWidth < 768 ? 4 : 7;
//     for (let i = 0; i < shapeCount; i++) {
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set(
//         (Math.random() - 0.5) * 40,
//         (Math.random() - 0.5) * 40,
//         (Math.random() - 0.5) * 30
//       );
//       scene.add(mesh);
//       shapes.push(mesh);
//     }
//     shapesRef.current = shapes;

//     const clock = new THREE.Clock();
//     clockRef.current = clock;

//     const handleMouseMove = (e) => {
//       targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
//       targetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const handleResize = () => {
//       const w = mountRef.current?.clientWidth || window.innerWidth;
//       const h = mountRef.current?.clientHeight || window.innerHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//       renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
//     };
//     window.addEventListener("resize", handleResize);

//     renderer.setAnimationLoop(() => {
//       const elapsedTime = clock.getElapsedTime();

//       mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.05;
//       mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.05;

//       particlesMesh.rotation.y = elapsedTime * 0.02;
//       particlesMesh.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;
//       particlesMesh.position.x = mouseRef.current.x * 2;
//       particlesMesh.position.y = mouseRef.current.y * 2;

//       gridHelper1.rotation.y = elapsedTime * 0.02;
//       gridHelper2.rotation.y = -elapsedTime * 0.015;

//       shapes.forEach((shape, idx) => {
//         shape.rotation.x = elapsedTime * (0.15 + idx * 0.03);
//         shape.rotation.y = elapsedTime * (0.1 + idx * 0.02);
//       });

//       renderer.render(scene, camera);
//     });

//     return () => {
//       try {
//         window.removeEventListener("mousemove", handleMouseMove);
//         window.removeEventListener("resize", handleResize);

//         if (rendererRef.current) {
//           rendererRef.current.setAnimationLoop(null);
//           rendererRef.current.dispose();
//           rendererRef.current = null;
//         }

//         if (mountRef.current && renderer.domElement) {
//           mountRef.current.removeChild(renderer.domElement);
//         }

//         particlesGeometry.dispose();
//         particlesMaterial.dispose();
//         geometry.dispose();
//         material.dispose();

//         if (renderer) {
//           renderer.dispose();
//         }

//         if (mountRef.current && mountRef.current.firstChild) {
//           mountRef.current.removeChild(mountRef.current.firstChild);
//         }

//         if (mountRef.current) {
//           delete mountRef.current.dataset.threeInited;
//         }
//       } catch (err) {
//         // cleanup errors
//       }
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: 0.45 }} />;
// };

// const AnimatedLogo = ({ className = "" }) => {
//   const [drawComplete, setDrawComplete] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setDrawComplete(true), 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <motion.svg 
//       viewBox="0 0 350 400" 
//       fill="none" 
//       className={className}
//       initial={{ scale: 0.8, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//     >
//       <defs>
//         <filter id="heroLineGlow" x="-30%" y="-30%" width="160%" height="160%">
//           <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
//           <feMerge>
//             <feMergeNode in="coloredBlur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//         <radialGradient id="heroSilverRadial" cx="50%" cy="50%" r="65%">
//           <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
//           <stop offset="50%" stopColor="#E8E8E8" stopOpacity="0.9"/>
//           <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.85"/>
//         </radialGradient>
//         <linearGradient id="heroOrangeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="#FF6B35" stopOpacity="1"/>
//           <stop offset="50%" stopColor="#FFA500" stopOpacity="1"/>
//           <stop offset="100%" stopColor="#FFB347" stopOpacity="1"/>
//         </linearGradient>
//       </defs>
      
//       <motion.g 
//         transform="translate(75, 56)"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3, duration: 0.8 }}
//       >
//         <motion.path
//           d="M1.22721 169.92L87.1784 58.077L109.408 95.2285L140.418 76.2462L97.1276 0.572083L0.434512 170.405L1.22721 169.92Z"
//           stroke="#FFFFFF"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//           filter="url(#heroLineGlow)"
//         />
//         <motion.path
//           d="M1.22721 169.92L87.1784 58.077L109.408 95.2285L140.418 76.2462L97.1276 0.572083L0.434512 170.405L1.22721 169.92Z"
//           fill="url(#heroSilverRadial)"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: drawComplete ? 1 : 0 }}
//           transition={{ duration: 0.8 }}
//         />
//       </motion.g>
      
//       <motion.g 
//         transform="translate(76, 98)"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5, duration: 0.8 }}
//       >
//         <motion.path
//           d="M0.270066 132.479L70.1833 132.737L205.851 0.357864L205.923 0.490149L0.270066 132.479Z"
//           stroke="#FFA500"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
//           filter="url(#heroLineGlow)"
//         />
//         <motion.path
//           d="M0.270066 132.479L70.1833 132.737L205.851 0.357864L205.923 0.490149L0.270066 132.479Z"
//           fill="url(#heroOrangeGradient)"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: drawComplete ? 1 : 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         />
//       </motion.g>
      
//       <motion.g 
//         transform="translate(198, 156)"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7, duration: 0.8 }}
//       >
//         <motion.path
//           d="M0.441675 28.4332L26.4417 77.4332L66 77.1675L65.5552 76.8958L26.5552 0.895835L26.6277 0.333772L0.627715 29.3338L0.441675 28.4332Z"
//           stroke="#FFFFFF"
//           strokeWidth="2"
//           fill="none"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
//           filter="url(#heroLineGlow)"
//         />
//         <motion.path
//           d="M0.441675 28.4332L26.4417 77.4332L66 77.1675L65.5552 76.8958L26.5552 0.895835L26.6277 0.333772L0.627715 29.3338L0.441675 28.4332Z"
//           fill="url(#heroSilverRadial)"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: drawComplete ? 1 : 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//         />
//       </motion.g>
//     </motion.svg>
//   );
// };

// const FloatingElement = ({ delay = 0, children, duration = 3 }) => {
//   return (
//     <motion.div
//       animate={{
//         y: [0, -15, 0],
//         rotate: [0, 3, 0, -3, 0],
//       }}
//       transition={{
//         duration,
//         repeat: Infinity,
//         delay,
//         ease: "easeInOut"
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const CountdownTimer = ({ targetDate }) => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const calculateTimeLeft = () => {
//       const difference = new Date(targetDate) - new Date();
      
//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         });
//       }
//     };

//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   if (!mounted) return null;

//   const TimeBox = ({ value, label, index }) => (
//     <motion.div
//       className="flex flex-col items-center"
//       initial={{ opacity: 0, scale: 0.5, y: 50 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ 
//         duration: 0.8, 
//         delay: 1.4 + index * 0.1,
//         type: "spring",
//         stiffness: 200
//       }}
//     >
//       <div className="relative group">
//         <div className="relative flex items-center justify-center bg-linear-to-br from-neutral-900/80 via-neutral-800/90 to-neutral-900/80 backdrop-blur-xl border border-orange-500/20 rounded-lg px-4 py-3 min-w-17.5 sm:min-w-22.5 md:min-w-27.5 shadow-lg group-hover:border-orange-400/30 transition-all duration-300">
//           <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-lg" />
//           <motion.span 
//             key={value}
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="relative text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-mono tabular-nums block"
//           >
//             {String(value).padStart(2, '0')}
//           </motion.span>
//         </div>
//       </div>
//       <span className="text-xs sm:text-sm md:text-base text-white/60 mt-2 uppercase tracking-widest font-light">
//         {label}
//       </span>
//     </motion.div>
//   );

//   return (
//     <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 justify-center flex-wrap px-4">
//       <TimeBox value={timeLeft.days} label="Days" index={0} />
//       <TimeBox value={timeLeft.hours} label="Hours" index={1} />
//       <TimeBox value={timeLeft.minutes} label="Mins" index={2} />
//       <TimeBox value={timeLeft.seconds} label="Secs" index={3} />
//     </div>
//   );
// };

// export default function Hero() {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"]
//   });

//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//   const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
//   const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), springConfig);
//   const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);

//   const hackathonDate = "2026-02-15T00:00:00";

//   return (
//     <section ref={heroRef} className="relative h-screen w-full bg-neutral-950 overflow-hidden pt-6">
//       <ThreeBackground />
      
//       <motion.div 
//         className="absolute inset-0 bg-linear-to-b from-orange-500/3 via-transparent to-black/60 pointer-events-none"
//         animate={{
//           opacity: [0.5, 0.7, 0.5]
//         }}
//         transition={{
//           duration: 4,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
      
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent pointer-events-none" />

//       <svg width="0" height="0" className="absolute">
//         <defs>
//           <filter id="textGlow" x="-30%" y="-30%" width="160%" height="160%">
//             <feGaussianBlur stdDeviation="2" result="blur" />
//             <feColorMatrix
//               in="blur"
//               type="matrix"
//               values="
//                 1 0 0 0 0
//                 0 1 0 0 0
//                 0 0 1 0 0
//                 0 0 0 0.3 0
//               "
//               result="softGlow"
//             />
//             <feMerge>
//               <feMergeNode in="softGlow" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>
//       </svg>

//       <motion.div 
//         style={{ opacity, scale, y }}
//         className="relative z-10 h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-4 gap-4 sm:gap-2"
//       >
//         <div className="flex flex-col items-center max-w-7xl mx-auto w-full">
          
//           <FloatingElement delay={0} duration={4}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
//               animate={{ opacity: 1, scale: 1, rotateY: 0 }}
//               transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//               className="sm:mt-10 mt-3 relative"
//             >
//               <motion.div
//                 className="absolute inset-0 blur-xl sm:blur-2xl bg-linear-to-r from-orange-500 to-yellow-500 opacity-10"
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.1, 0.2, 0.1]
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               />
//               <AnimatedLogo className="relative w-36 h-40 sm:w-36 sm:h-40 md:w-44 md:h-48 lg:w-56 lg:h-60 drop-shadow-[0_0_15px_rgba(255,165,0,0.2)] sm:drop-shadow-[0_0_20px_rgba(255,165,0,0.25)]" />
//             </motion.div>
//           </FloatingElement>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.8 }}
//             className="mb-3 sm:mb-4 -mt-8 sm:-mt-12 relative"
//           >
//             <motion.h1
//               className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center tracking-wider sm:tracking-[0.2em] uppercase relative"
//               style={{ 
//                 filter: 'url(#textGlow)',
//               }}
//             >
//               <motion.span
//                 className="block text-white"
//               >
//                 Algorithm
//               </motion.span>
//               <motion.span
//                 className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-300 to-orange-400 mt-1 sm:mt-2"
//               >
//                 X
//               </motion.span>
//             </motion.h1>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.2 }}
//             className="mb-4 -mt-2 sm:mb-2 md:mb-4 px-4"
//           >
//             <motion.p
//               className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center max-w-4xl font-light tracking-wide"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.3 }}
//             >
//               Where{' '}
//               <span className="text-orange-400/90 font-medium">
//                 Innovation
//               </span>
//               {' '}Meets{' '}
//               <span className="text-orange-300/90 font-medium">
//                 Excellence
//               </span>
//             </motion.p>
//           </motion.div>

//           <motion.div
//             className="mb-4 sm:mb-2 md:mb-4 w-full"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 1.4 }}
//           >
//             <CountdownTimer targetDate={hackathonDate} />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.8 }}
//             className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 w-full max-w-2xl px-4"
//           >
//             <motion.a
//               href="https://unstop.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative px-6 sm:px-8 py-3 text-sm sm:text-base font-bold text-white overflow-hidden rounded-lg transition-all duration-300 flex-1"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500" />
//               <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wider">
//                 Register Now
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//             </motion.a>

//             <motion.a
//               href="#about"
//               className="group relative px-6 sm:px-8 py-3 text-sm sm:text-base font-bold text-white overflow-hidden rounded-lg border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 backdrop-blur-sm flex-1"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wider">
//                 Learn More
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </span>
//             </motion.a>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Decorative corner elements */}
//       <motion.div
//         className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 2.5, duration: 1 }}
//       >
//         <div className="w-full h-full border-l border-t border-orange-500/20 relative">
//           <motion.div
//             className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500/60 rounded-full"
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 0.9, 0.6]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity
//             }}
//           />
//         </div>
//       </motion.div>

//       <motion.div
//         className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 2.6, duration: 1 }}
//       >
//         <div className="w-full h-full border-r border-t border-orange-500/20 relative">
//           <motion.div
//             className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500/60 rounded-full"
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.6, 0.9, 0.6]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: 0.3
//             }}
//           />
//         </div>
//       </motion.div>

//       <motion.div
//         className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-10 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 2.7, duration: 1 }}
//       >
//         <div className="w-full h-full border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-orange-500/30 relative">
//           <motion.div
//             className="absolute -bottom-0.5 sm:-bottom-1 -left-0.5 sm:-left-1 w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [1, 0.5, 1]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: 0.6
//             }}
//           />
//         </div>
//       </motion.div>

//       <motion.div
//         className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 2.8, duration: 1 }}
//       >
//         <div className="w-full h-full border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-orange-500/30 relative">
//           <motion.div
//             className="absolute -bottom-0.5 sm:-bottom-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"
//             animate={{
//               scale: [1, 1.5, 1],
//               opacity: [1, 0.5, 1]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               delay: 0.9
//             }}
//           />
//         </div>
//       </motion.div>

//       {/* Scroll indicator - hidden on mobile */}
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.5, duration: 1 }}
//         className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2"
//       >
//         <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
//         <motion.div
//           animate={{
//             y: [0, 10, 0]
//           }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         >
//           <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//           </svg>
//         </motion.div>
//       </motion.div> */}
//     </section>
//   );
// }
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

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
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
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

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: 0.25 }} />;
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
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/>
          <stop offset="50%" stopColor="#E8E8E8" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#A0A0A0" stopOpacity="0.85"/>
        </radialGradient>
        <linearGradient id="heroOrangeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="1"/>
          <stop offset="50%" stopColor="#FFA500" stopOpacity="1"/>
          <stop offset="100%" stopColor="#FFB347" stopOpacity="1"/>
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
    seconds: 0
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
          seconds: Math.floor((difference / 1000) % 60)
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
        ease: "easeOut"
      }}
    >
      <div className="relative group">
        <div className="relative flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm border border-orange-500/20 group-hover:border-orange-500/40 rounded-lg sm:rounded-xl px-3 py-3 sm:px-6 sm:py-5 min-w-16 sm:min-w-24 md:min-w-28 shadow-lg transition-all duration-300">
          <motion.span 
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-mono tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="text-xs sm:text-sm text-white/50 mt-2 sm:mt-3 uppercase tracking-wider font-light">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="flex gap-2 sm:gap-4 md:gap-6 justify-center flex-wrap">
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
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.95]), springConfig);

  const hackathonDate = "2026-02-15T00:00:00";
  
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen w-full bg-neutral-950 overflow-hidden pt-20 sm:pt-0">
      <ThreeBackground />
      
      <div className="absolute inset-0 bg-linear-to-br from-orange-950/10 via-neutral-950/50 to-neutral-950 pointer-events-none" />

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 min-h-screen w-full flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left Column - Logo, Name and Username */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start order-1"
            >
              <div className="relative sm:mt-10">
                <AnimatedLogo className="relative w-32 h-36 sm:w-48 sm:h-52 md:w-56 md:h-60 lg:w-64 lg:h-72" />
              </div>

              <div className="text-center lg:text-left -mt-4 sm:-mt-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-3 sm:mb-4"
                >
                  <span className="block text-white">Algorithm</span>
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-orange-400">
                    X
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-0.5 w-9 sm:w-19 bg-orange-500 mb-4 sm:mb-6 mx-auto lg:mx-0"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-light max-w-md px-4 sm:px-0"
                >
                  Where <span className="text-orange-400">Innovation</span> Meets <span className="text-orange-400">Excellence</span>
                </motion.p>

                {/* Username Display */}
                {username && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="mt-8 sm:mt-10 w-full max-w-md px-4 sm:px-0 self-start text-left"
                  >
                    <div className="relative group cursor-default">
                      
                      {/* Main container */}
                      <div className="relative bg-neutral-900/40 backdrop-blur-md border border-orange-500/10 rounded-xl px-5 py-3 overflow-hidden">
                        {/* Animated gradient overlay */}
                        <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.03), transparent)'
                          }}
                          animate={{
                            x: ['-100%', '200%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            repeatDelay: 1
                          }}
                        />
                        
                        {/* Content */}
                        <div className="relative flex items-center gap-3">
                          {/* Minimalist icon */}
                          <motion.div 
                            className="flex-shrink-0 w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"
                            animate={{
                              scaleY: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          
                          {/* Text content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-orange-500/60 text-[9px] uppercase tracking-[0.2em] font-medium">
                                Welcome
                              </span>
                              <motion.div 
                                className="w-1 h-1 rounded-full bg-green-500"
                                animate={{
                                  opacity: [1, 0.3, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                            </div>
                            <div className="text-white text-lg sm:text-xl font-light tracking-wide mt-0.5 truncate">
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
              className="flex flex-col items-center lg:items-end space-y-6 sm:space-y-8 order-2"
            >
              <div className="w-full max-w-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-6 sm:mb-8 text-center"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Event Starts In
                  </h2>
                  <div className="h-0.5 w-20 sm:w-24 bg-orange-500 mx-auto" />
                </motion.div>

                <CountdownTimer targetDate={hackathonDate} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl px-4 sm:px-0"
              >
                <motion.a
                  href="https://unstop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 font-bold text-white overflow-hidden rounded-lg transition-all duration-300 flex-1 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-500" />
                  <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                    Register Now
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.a>

                <motion.a
                  href="#about"
                  className="group relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 font-bold text-white overflow-hidden rounded-lg border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm flex-1"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
                    Learn More
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
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