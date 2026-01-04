"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const FAQ_ITEMS = [
  {
    q: "What is Algorithm 10.0?",
    a: "Algorithm 10.0 is a 32-hour national-level hackathon that brings together innovators, students, and tech enthusiasts from across the country to explore futuristic technologies and solve real-world problems."
  },
  {
    q: "When and where is it held?",
    a: "The hackathon will take place on February 21–22, 2026 at Kalsekar Technical Campus, New Panvel, with a fully equipped and collaborative environment."
  },
  {
    q: "Who is eligible to participate?",
    a: "Students from any academic background who are interested in innovation, technology, and problem-solving are welcome to participate."
  },
  {
    q: "Is there a participation fee?",
    a: "No, Algorithm 10.0 is completely free to participate in, with meals, internet, and resources provided."
  },
  {
    q: "How can I register?",
    a: "Participants can register through the official Algorithm 10.0 website where all guidelines and updates are available."
  },
  {
    q: "Are prizes awarded?",
    a: "Yes, winners receive exciting cash prizes, certificates, and recognition from industry experts."
  },
  {
    q: "What should I bring?",
    a: "Participants should bring their laptops, chargers, and any tools or software required for their project."
  },
  {
    q: "Is food and internet provided?",
    a: "Yes, high-speed Wi-Fi, meals, snacks, and refreshments will be provided throughout the hackathon."
  },
  {
    q: "Can beginners participate?",
    a: "Absolutely. Beginners are encouraged to participate and learn through mentorship and collaboration."
  },
  {
    q: "How are projects evaluated?",
    a: "Projects are judged based on innovation, technical execution, impact, creativity, and presentation quality."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [exitFooter, setExitFooter] = useState(false);
  const listRef = useRef(null);
  const exitTimeout = useRef(null);

  const scrollProgress = useMotionValue(0);
  const gradientPosition = useTransform(
    scrollProgress,
    [0, 1],
    ["0% 50%", "100% 50%"]
  );

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (!list) return;

      const progress =
        list.scrollTop / (list.scrollHeight - list.clientHeight);
      scrollProgress.set(Math.min(Math.max(progress, 0), 1));

      const atEnd =
        list.scrollTop + list.clientHeight >= list.scrollHeight - 8;

      if (atEnd && openIndex === null) {
        clearTimeout(exitTimeout.current);
        exitTimeout.current = setTimeout(() => setExitFooter(true), 700);
      } else {
        clearTimeout(exitTimeout.current);
        setExitFooter(false);
      }
    };

    handleScroll();
    listRef.current?.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      clearTimeout(exitTimeout.current);
      listRef.current?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [openIndex, scrollProgress]);

  const leftVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { y: -80, opacity: 0, transition: { duration: 1.4, ease: "easeInOut", delay: 0.6 } }
  };

  const cardVariants = {
    visible: { y: 0, opacity: 1 },
    exit: (i) => ({
      y: -40,
      opacity: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeInOut" }
    })
  };

  return (
    <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12">

        {/* LEFT TEXT */}
        <motion.div
          variants={leftVariants}
          initial="visible"
          animate={exitFooter ? "exit" : "visible"}
          className="w-full lg:w-1/3 flex flex-col justify-center text-center lg:text-left lg:sticky lg:top-24"
          style={{ fontFamily: "Orbitron" }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold"
            style={{
              backgroundImage:
                "linear-gradient(90deg,#5e0f06,#dc3a6b,#8e44e7,#cf792d,#5e0f06)",
              backgroundSize: "300% 100%",
              backgroundPosition: gradientPosition,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Frequently Asked Questions
          </motion.h2>

          <p className="mt-4 text-lg opacity-70">
            Everything you need to know about Algorithm 10.0
          </p>
        </motion.div>

        {/* FAQ LIST */}
        <motion.div
          ref={listRef}
          className="w-full lg:w-2/3 max-h-[80vh] overflow-y-auto no-scrollbar pt-6 pb-24"
        >
          <AnimatePresence>
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="visible"
                  animate={exitFooter ? "exit" : "visible"}
                  exit="exit"
                  layout
                  className="group relative rounded-3xl bg-white/5 backdrop-blur border border-white/10 mb-6 transition-all duration-700 ease-in-out lg:hover:-translate-y-1"
                >
                  {/* NEON BORDER */}
                  <div
                    className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500
                    ${isOpen ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"}`}
                    style={{
                      background: "linear-gradient(90deg,#00fff0,#00aaff,#9b5cff)",
                      padding: "2px",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      boxShadow:
                        "0 0 6px rgba(0,255,240,.18), 0 0 12px rgba(155,92,255,.12)"
                    }}
                  />

                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="relative z-10 w-full px-6 md:px-8 py-5 md:py-6 flex justify-between text-left"
                    layout
                  >
                    <span>{item.q}</span>
                    <span className={`transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}>
                      ⌄
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="relative z-10 px-6 md:px-8 pb-6 overflow-hidden"
                        layout
                      >
                        <p className="text-gray-300">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        /* Hide scrollbar */
        .no-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; display: none; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
