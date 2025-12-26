import React, { useState, useEffect } from 'react';
import { motion,} from 'framer-motion';



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
        <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-white/40 text-[10px] sm:text-xs font-mono">Algorithm-X-Terminal</span>
          </div>

          <div className="space-y-2 text-white">
            <TerminalLine delay={0}>
              $ boot --algorithm-x
            </TerminalLine>

            <TerminalLine delay={200} className="text-white/80">
              Initializing Algorithm X Hackathon Environment...
            </TerminalLine>

            <TerminalLine delay={400}>
                Systems online. Constraints loaded.
            </TerminalLine>

            {!username && showInput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div className="text-white mb-2 text-xs sm:text-sm">$ Enter --username</div>
                <div className="flex items-center gap-2">
                  <span className="text-white">&gt;</span>
                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="bg-transparent outline-none border-none text-white placeholder-white/30 font-mono flex-1 text-xs sm:text-sm"
                    placeholder="your_name"
                  />
                </div>
              </motion.div>
            )}

            {username && (
              <TerminalLine delay={600} className="text-white/80">
                Welcome back, {username}.
              </TerminalLine>
            )}

            <TerminalLine delay={username ? 800: 1000}>
              $ start --challenge
            </TerminalLine>

            <TerminalLine delay={username ? 1200 : 1400} className="text-white/80">
              Hackathon live. Time complexity matters.
            </TerminalLine>

            <TerminalLine delay={username ? 1600 : 1800}>
              <span className="text-white animate-pulse">█</span>
            </TerminalLine>
          </div>
        </div>

        <motion.div
          className="mt-4 text-center text-white/30 text-[10px] sm:text-xs font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {/* Press any key to continue... */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Terminal;