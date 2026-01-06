import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeBackground } from "./Logo";
import Terminal from "./Terminal";
import Logo from "./Logo";

function Loader({ onComplete }) {
  const [stage, setStage] = useState("logo");
  const [username, setUsername] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) setUsername(saved);

    const logoTimer = setTimeout(() => setStage("terminal"), 2800);
    // Keep logo visible when terminal appears
    const inputTimer = setTimeout(() => {
      if (!saved) setShowInput(true);
    }, 5300);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(inputTimer);
    };
  }, []);

  const goHome = () => {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    onComplete(username);
  };
  const handleSave = () => {
    if (!inputValue.trim()) return;
    localStorage.setItem("username", inputValue.trim());
    setUsername(inputValue.trim());
  };
  useEffect(() => {
    if (stage !== "terminal") return;
    const delay = username ? 3000 : 9000;
    const autoTimer = setTimeout(goHome, delay);
    // window.addEventListener("keydown", goHome);
    // window.addEventListener("click", goHome);
    // window.addEventListener("touchstart", goHome);

    return () => {
      clearTimeout(autoTimer);
      // window.removeEventListener("keydown", goHome);
      // window.removeEventListener("click", goHome);
      // window.removeEventListener("touchstart", goHome);
    };
  }, [stage, username]);
  const isDrawing = stage === "logo";

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-neutral-900">
      <ThreeBackground />

      <div className="bg-gradient-radial pointer-events-none absolute inset-0 z-10 from-transparent via-transparent to-black/60" />

      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <AnimatePresence>
        {(stage === "logo" || stage === "terminal") && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: stage === "terminal" ? 0.3 : 1,
              filter: stage === "terminal" ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.8 }}
          >
            <Logo isDrawing={stage === "logo"} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "terminal" && (
          <Terminal
            username={username}
            showInput={showInput}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSave={handleSave}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-4 left-4 z-20 h-8 w-8 border-t border-l border-white/5 sm:top-6 sm:left-6 sm:h-12 sm:w-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
      <motion.div
        className="absolute right-4 bottom-4 z-20 h-8 w-8 border-r border-b border-white/5 sm:right-6 sm:bottom-6 sm:h-12 sm:w-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </div>
  );
}

export default Loader;
