import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const Terminal = ({ username, showInput, inputValue, setInputValue, handleSave }) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-4 z-30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-2xl">
        {/* Main Terminal Window - Style Kept As Requested */}
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 shadow-2xl relative overflow-hidden">
          
          {/* Header (Dots) - Kept As Requested */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-white/40 text-[10px] sm:text-xs font-mono">Algorithm-X-Terminal</span>
          </div>

          <div className="space-y-3 text-white">
            {/* Simplified Content */}
            <TerminalLine delay={0} className="text-white/60">
              $ system_init --verbose
            </TerminalLine>

            <TerminalLine delay={200}>
               &gt; Core modules loaded.
            </TerminalLine>

            {/* NEW HIGHLIGHTED INPUT SECTION */}
            {!username && showInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 rounded bg-white/5 border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              >
                <div className="text-green-400 mb-2 text-[10px] sm:text-xs uppercase tracking-wider font-bold">
                  User Identification Required
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-bold text-lg animate-pulse">&gt;</span>
                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="bg-transparent outline-none border-none text-white text-base sm:text-lg font-mono flex-1 placeholder-white/20"
                    placeholder="Enter Username..."
                  />
                  <button 
                    onClick={handleSave}
                    className="text-[10px] uppercase px-2 py-1 rounded border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
                  >
                    Enter
                  </button>
                </div>
              </motion.div>
            )}

            {username && (
              <>
                <TerminalLine delay={600} className="mt-4 pt-2 border-t border-white/5 text-green-400">
                  Access Granted: {username}
                </TerminalLine>

                <TerminalLine delay={username ? 800: 1000} className="text-white/80">
                  Initializing Challenge Environment...
                </TerminalLine>
              </>
            )}

            <TerminalLine delay={username ? 1200 : 1800}>
              <span className="text-green-500 animate-pulse">_</span>
            </TerminalLine>
          </div>
        </div>

        <motion.div
          className="mt-4 text-center text-white/30 text-[10px] sm:text-xs font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Terminal;