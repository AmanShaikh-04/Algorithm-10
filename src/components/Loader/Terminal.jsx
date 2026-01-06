import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TerminalLine = ({ children, delay, className = "" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`font-mono text-xs sm:text-sm ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Terminal = ({
  username,
  showInput,
  inputValue,
  setInputValue,
  handleSave,
}) => {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-2xl">
        {/* Main Terminal Window - Style Kept As Requested */}
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
          {/* Header (Dots) - Kept As Requested */}
          <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
            <div className="h-2 w-2 rounded-full bg-red-500/80 sm:h-3 sm:w-3" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/80 sm:h-3 sm:w-3" />
            <div className="h-2 w-2 rounded-full bg-green-500/80 sm:h-3 sm:w-3" />
            <span className="ml-2 font-mono text-[10px] text-white/40 sm:text-xs">
              Algorithm-X-Terminal
            </span>
          </div>

          <div className="space-y-3 text-white">
            {/* Simplified Content */}
            <TerminalLine delay={0} className="text-white/60">
              $ system_init --verbose
            </TerminalLine>

            <TerminalLine delay={200}>&gt; Core modules loaded.</TerminalLine>

            {/* NEW HIGHLIGHTED INPUT SECTION */}
            {!username && showInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded border border-green-500/40 bg-white/5 p-4 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              >
                <div className="mb-2 text-[10px] font-bold tracking-wider text-green-400 uppercase sm:text-xs">
                  User Identification Required
                </div>
                <div className="flex items-center gap-3">
                  <span className="animate-pulse text-lg font-bold text-green-500">
                    &gt;
                  </span>
                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="flex-1 border-none bg-transparent font-mono text-base text-white placeholder-white/20 outline-none sm:text-lg"
                    placeholder="Enter Username..."
                  />
                  <button
                    onClick={handleSave}
                    className="rounded border border-green-500/30 px-2 py-1 text-[10px] text-green-400 uppercase transition-colors hover:bg-green-500/10"
                  >
                    Enter
                  </button>
                </div>
              </motion.div>
            )}

            {username && (
              <>
                <TerminalLine
                  delay={600}
                  className="mt-4 border-t border-white/5 pt-2 text-green-400"
                >
                  Access Granted: {username}
                </TerminalLine>

                <TerminalLine
                  delay={username ? 800 : 1000}
                  className="text-white/80"
                >
                  Initializing Challenge Environment...
                </TerminalLine>
              </>
            )}

            <TerminalLine delay={username ? 1200 : 1800}>
              <span className="animate-pulse text-green-500">_</span>
            </TerminalLine>
          </div>
        </div>

        <motion.div
          className="mt-4 text-center font-mono text-[10px] tracking-wider text-white/30 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Terminal;
