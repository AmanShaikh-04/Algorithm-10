"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("User");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (name.trim().length > 0) {
      setDisplayName(name);
      setStep(1);
    }
  }, [name]);

  return (
    <section className="min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl bg-[#151515] rounded-2xl shadow-2xl border border-[#222] overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-[#222]">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-xs text-[#9CA3AF] font-mono">algorithmx@terminal</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 font-mono text-[#EAEAEA] text-sm leading-relaxed">
          {step === 0 && (
            <div>
              <p className="text-[#9CA3AF]">$ enter_user --name</p>
              <input
                autoFocus
                type="text"
                placeholder="Type your full name and press Enter"
                className="mt-2 w-full bg-transparent border border-[#333] rounded px-3 py-2 outline-none text-[#EAEAEA]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") setName(e.currentTarget.value);
                }}
              />
            </div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-green-400">✔ Authentication successful</p>
              <p className="mt-2">Hey <span className="text-[#FF8A00]">{displayName}</span> !!</p>

              <div className="mt-4 text-[#9CA3AF]">
                initializing Algorithm X...
                <br />
                loading modules ██████████ 100%
                <br />
                environment ready
              </div>

              {/* ASCII Title */}
              <pre className="mt-6 text-[#FF8A00] text-xs sm:text-sm">
{`
 █████╗ ██╗      ██████╗  ██████╗ ██████╗ ██╗████████╗██╗  ██╗███╗   ███╗
██╔══██╗██║     ██╔════╝ ██╔═══██╗██╔══██╗██║╚══██╔══╝██║  ██║████╗ ████║
███████║██║     ██║  ███╗██║   ██║██████╔╝██║   ██║   ███████║██╔████╔██║
██╔══██║██║     ██║   ██║██║   ██║██╔══██╗██║   ██║   ██╔══██║██║╚██╔╝██║
██║  ██║███████╗╚██████╔╝╚██████╔╝██║  ██║██║   ██║   ██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
`}
              </pre>

              <p className="mt-4">
                Welcome to <span className="text-[#FF8A00]">Algorithm X</span>
              </p>
              <p className="text-[#9CA3AF] max-w-2xl mt-2">
                A 32 Hour long Hackathon organized by the Department of Computer Engineering at
                Anjuman-I-Islam’s Kalsekar Technical Campus.
              </p>

              <p className="mt-4 text-green-400">Ready to Design, Develop and Deploy.</p>

              {/* CTA */}
              <div className="mt-6 flex gap-4 flex-wrap">
                <button className="px-6 py-2 rounded-lg bg-[#FF8A00] text-black font-bold hover:bg-[#FFD84D] transition">
                  Register
                </button>
                <button className="px-6 py-2 rounded-lg border border-[#333] text-[#EAEAEA] hover:border-[#FF8A00] transition">
                  Learn More
                </button>
              </div>

              {/* Countdown Placeholder */}
              <div className="mt-8 text-xs text-[#9CA3AF]">
                Countdown for the Showdown → 00:12:45:32
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}


// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Hero() {
//   const [userFullName, setUserFullName] = useState("Guest");
//   const [timeLeft, setTimeLeft] = useState({ minutes: 59, seconds: 59 });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { minutes, seconds } = prev;
//         if (seconds > 0) seconds--;
//         else if (minutes > 0) {
//           minutes--;
//           seconds = 59;
//         }
//         return { minutes, seconds };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section className="relative min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center px-4">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF8A00]/20 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#FFD84D]/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#FF8A00]/10 rounded-full blur-3xl animate-pulse" />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="relative z-10 w-full max-w-6xl bg-[#151515] rounded-2xl shadow-[0_0_60px_rgba(255,138,0,0.15)] border border-[#222] p-8 md:p-12"
//       >
//         {/* Greeting */}
//         <div className="flex flex-col items-center text-center">
//         <motion.h1
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-3xl md:text-4xl font-bold text-[#EAEAEA]"
//         >
//           Hey <span className="text-[#FF8A00]">{userFullName}</span> !!
//         </motion.h1>

//         {/* Title */}
//         <motion.h2
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.35 }}
//           className="mt-4 text-4xl md:text-5xl font-extrabold text-[#FF8A00]"
//         >
//           Welcome to Algorithm X
//         </motion.h2>

//         {/* Description */}
//         <motion.p
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-6 max-w-3xl text-[#9CA3AF] text-lg leading-relaxed"
//         >
//           A <span className="text-[#EAEAEA] font-semibold">32 Hour</span> long Hackathon organized by the
//           Department of Computer Engineering at Anjuman-I-Islam’s Kalsekar Technical Campus.
//         </motion.p>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.65 }}
//           className="mt-4 text-[#EAEAEA] text-xl font-semibold"
//         >
//           Ready to Design, Develop and Deploy
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="mt-8 flex flex-wrap gap-4"
//         >
//           <button className="px-8 py-3 rounded-xl bg-[#FF8A00] text-black font-bold hover:bg-[#FFD84D] transition-all duration-300 shadow-lg">
//             Register
//           </button>
//           <button className="px-8 py-3 rounded-xl border border-[#333] text-[#EAEAEA] hover:border-[#FF8A00] transition-all duration-300">
//             Learn More
//           </button>
//         </motion.div>

//         {/* Countdown */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1 }}
//           className="mt-12"
//         >
//           <p className="text-sm text-[#9CA3AF] uppercase tracking-wider">Countdown for the Showdown</p>
//           <div className="mt-4 flex gap-4">
//             <FlipUnit label="Minutes" value={timeLeft.minutes} />
//             <FlipUnit label="Seconds" value={timeLeft.seconds} />
//           </div>
//         </motion.div>
//       </motion.div>
//         </div>
//     </section>
//   );
// }

// function FlipUnit({ label, value }) {
//   return (
//     <div className="flex flex-col items-center">
//       <motion.div
//         key={value}
//         initial={{ rotateX: 90, opacity: 0 }}
//         animate={{ rotateX: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//         className="w-24 h-24 bg-black text-[#FF8A00] text-4xl font-bold flex items-center justify-center rounded-xl border border-[#333] shadow-inner"
//       >
//         {String(value).padStart(2, "0")}
//       </motion.div>
//       <span className="mt-2 text-xs text-[#9CA3AF]">{label}</span>
//     </div>
//   );
// }
