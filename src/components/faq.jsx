"use client";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "What is Algorithm 10.0?",
    a: "Algorithm 10.0 is a 32-hour national-level hackathon that brings together innovators, students, and tech enthusiasts from across the country to explore futuristic technologies and solve real-world problems.",
  },
  {
    q: "When and where is it held?",
    a: "The hackathon will take place on February 21–22, 2026 at Kalsekar Technical Campus, New Panvel, with a fully equipped and collaborative environment.",
  },
  {
    q: "Who is eligible to participate?",
    a: "Students from any academic background who are interested in innovation, technology, and problem-solving are welcome to participate.",
  },
  {
    q: "Is there a participation fee?",
    a: "No, Algorithm 10.0 is completely free to participate in, with meals, internet, and resources provided.",
  },
  {
    q: "How can I register?",
    a: "Participants can register through the official Algorithm 10.0 website where all guidelines and updates are available.",
  },
  {
    q: "Are prizes awarded?",
    a: "Yes, winners receive exciting cash prizes, certificates, and recognition from industry experts.",
  },
  {
    q: "What should I bring?",
    a: "Participants should bring their laptops, chargers, and any tools or software required for their project.",
  },
  {
    q: "Is food and internet provided?",
    a: "Yes, high-speed Wi-Fi, meals, snacks, and refreshments will be provided throughout the hackathon.",
  },
  {
    q: "Can beginners participate?",
    a: "Absolutely. Beginners are encouraged to participate and learn through mentorship and collaboration.",
  },
  {
    q: "How are projects evaluated?",
    a: "Projects are judged based on innovation, technical execution, impact, creativity, and presentation quality.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const listRef = useRef(null);

  /* Scroll-based gradient animation */
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  const gradientPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 50%", "100% 50%"]
  );

  const gradientColors =
    "linear-gradient(90deg, #8B0000, #FF4500, #FF7E00, #FFA500, #FFD580, #FF7E00, #5C1A00)";

  return (
    <main>
      <section className="relative bg-neutral-950 py-16 text-white md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:gap-16">

          {/* LEFT */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
            <motion.div
              className="w-full text-center lg:text-left"
              style={{ fontFamily: "Orbitron" }}
            >
              <div className="relative mx-auto inline-block lg:mx-0">
                <div className="glow-pulse absolute -inset-6 rounded-full bg-orange-500/25 blur-3xl" />

                <motion.h2
                  className="relative text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    backgroundImage: gradientColors,
                    backgroundSize: "300% 100%",
                    backgroundPosition: gradientPosition,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Frequently Asked Questions
                </motion.h2>
              </div>

              <p className="mt-4 text-lg text-gray-400 md:text-xl">
                Everything you need to know about Algorithm 10.0
              </p>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div ref={listRef} className="w-full lg:w-1/2 lg:py-24">
            <AnimatePresence initial={false}>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openIndex === i;

                return (
                  <motion.div
                    key={i}
                    className="group relative mb-5 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    {/* Gradient border */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: isOpen ? 1 : 0
                      }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      style={{
                        background: gradientColors,
                        padding: "3px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />

                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="relative z-10 flex w-full items-center justify-between px-6 py-5 text-left text-lg md:px-8 md:py-6"
                    >
                      <span className="pr-4">{item.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="text-2xl"
                      >
                        ⌄
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ 
                            height: 0, 
                            opacity: 0,
                            marginTop: 0
                          }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            marginTop: 0
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            marginTop: 0
                          }}
                          transition={{ 
                            height: {
                              duration: 0.4,
                              ease: [0.4, 0, 0.2, 1]
                            },
                            opacity: {
                              duration: 0.3,
                              ease: "easeInOut"
                            }
                          }}
                          className="relative z-10 overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="px-6 pb-6 md:px-8"
                          >
                            <p className="text-gray-300">{item.a}</p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Glow animation */}
        <style jsx global>{`
          @keyframes orangePulse {
            0% {
              box-shadow:
                0 0 18px rgba(255, 126, 0, 0.25),
                0 0 40px rgba(255, 126, 0, 0.15);
            }
            50% {
              box-shadow:
                0 0 30px rgba(255, 126, 0, 0.45),
                0 0 70px rgba(255, 126, 0, 0.25);
            }
            100% {
              box-shadow:
                0 0 18px rgba(255, 126, 0, 0.25),
                0 0 40px rgba(255, 126, 0, 0.15);
            }
          }

          .glow-pulse {
            animation: orangePulse 3s ease-in-out infinite;
          }
        `}</style>
      </section>
    </main>
  );
}