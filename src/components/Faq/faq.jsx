"use client";

import React, { useEffect, useRef, useState } from "react";
import "./faq.css";

const FAQ_ITEMS = [
  {
    q: "What is Algorithm 10.0?",
    a: "Algorithm 10.0 is a 32-hour national-level hackathon that brings together innovators, students, and tech enthusiasts from across the country. Its main purpose is to provide a platform for participants to explore futuristic technology, collaborate in teams, solve real-world problems, and showcase creative and innovative projects to mentors and judges."
  },
  {
    q: "When and where is it held?",
    a: "The hackathon is scheduled for February 21–22, 2026, at Kalsekar Technical Campus, New Panvel. Participants can expect a fully organized event with designated workspaces, access to resources, and a supportive environment to focus on building their projects over the 32-hour duration."
  },
  {
    q: "Who is eligible to participate in Algorithm 10.0 ?",
    a: "Students from any academic background with an interest in futuristic technology, problem-solving, and innovation are welcome to participate. There are no strict prerequisites, so beginners and experienced participants alike can join and learn from the experience."
  },
  {
    q: "Is there a participation fee to join the hackathon ?",
    a: "Participation in Algorithm 10.0 is completely free of charge. The organizers provide all necessary resources including mentorship, workspace, Wi-Fi, and meals so that participants can fully focus on building their projects without any financial burden."
  },
  {
    q: "How can I register for Algorithm 10.0 ?",
    a: "Registration for the hackathon can be done through the official Algorithm 10.0 website. All details regarding eligibility, team formation, submission guidelines, and event updates are clearly outlined on the website to help participants complete their registration smoothly."
  },
  {
    q: "Are there prizes or awards for the winners ?",
    a: "Yes, winners of Algorithm 10.0 receive exciting cash prizes, certificates, and recognition at both the event and in the broader tech community. The awards are designed to encourage innovation and motivate participants to showcase their best work, while also providing opportunities to network and gain visibility."
  },
  {
    q: "What items should I bring with me to the hackathon ?",
    a: "Participants are advised to bring their laptops, chargers, and any additional tools or software they might require to build their projects. It’s also recommended to bring personal accessories like notebooks, pens, and any reference material that may help during brainstorming or coding sessions."
  },
  {
    q: "Will the hackathon provide internet connectivity and food for participants during the event?",
    a: "Yes, high-speed Wi-Fi will be provided throughout the event to support coding, research, and collaboration. Meals, snacks, and refreshments will also be provided so participants can stay energized and focus fully on their projects without worrying about logistics."
  },
  {
    q: "What type of projects or challenges can I expect to work on during Algorithm 10.0?",
    a: "Participants will work on futuristic technology challenges that encourage creativity, problem-solving, and innovation. Projects can include applications of emerging technologies, smart solutions for real-world problems, or experiments with new tools and concepts. Mentors will guide participants to help them refine their ideas."
  },
  {
    q: "Can beginners participate??",
    a: "Yes, beginners are welcome and encouraged to participate. Algorithm 10.0 provides  guidance, and learning opportunities so that students with limited experience can gain practical skills, learn from peers, and build meaningful projects while enjoying the hackathon experience."
  },
  {
    q: "How will the projects be evaluated ?",
    a: "Projects will be evaluated based on multiple criteria including innovation, technical execution, creativity, impact, and presentation quality. Judges will consider how well the project addresses a problem, the feasibility of the solution, the uniqueness of the idea, and the overall effort and teamwork demonstrated by the participants."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqSectionRef = useRef(null);
  const faqListRef = useRef(null);
  const leftRef = useRef(null);
  const cardRefs = useRef([]);
  const [visibleMap, setVisibleMap] = useState({});

  /* ================= ENTRY (ONE TIME) ================= */
  useEffect(() => {
    if (window.innerWidth < 769) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number(entry.target.dataset.idx);
          if (entry.isIntersecting) {
            entry.target.style.setProperty("--enter", "0");
            setVisibleMap(prev => ({ ...prev, [idx]: true }));
          } else {
            setVisibleMap(prev => ({ ...prev, [idx]: false }));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card, i) => {
      if (card) {
        card.dataset.idx = i;
        card.style.setProperty("--enter", "1");
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* ================= SCROLL-BASED EXIT (REVERSIBLE) ================= */
  useEffect(() => {
    const section = faqSectionRef.current;
    if (!section) return;

    // Helper to apply exit progress and toggle classes on cards/left text
    const setExitProgress = raw => {
      const EXIT_THRESHOLD = 0.02;
      const progress = raw > EXIT_THRESHOLD ? raw : 0;

      section.style.setProperty("--exit", progress.toString());

        if (progress > 0) {
          section.classList.add("faq-exiting");
          // Left text exit class
          if (leftRef.current) leftRef.current.classList.add("faq-exit-left");

          // clear visible map so React will render cards without `desktop-visible`
          setVisibleMap({});

          cardRefs.current.forEach(card => {
            if (!card) return;
            card.style.setProperty("--enter", "1");
            // add exit class via DOM so transitions still apply
            card.classList.add("faq-exit-card");
          });
        } else {
          section.classList.remove("faq-exiting");
          if (leftRef.current) leftRef.current.classList.remove("faq-exit-left");

          // restore visibility map for cards that are in view (observer will correct soon)
          const restore = {};
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            restore[i] = true;
            card.classList.remove("faq-exit-card");
          });
          setVisibleMap(restore);
        }
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = Math.min(Math.max((vh - rect.bottom) / vh, 0), 1);
      setExitProgress(raw);
    };

    // IntersectionObserver as backup to detect leaving the viewport reliably
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const rect = entry.boundingClientRect || section.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = Math.min(Math.max((vh - rect.bottom) / vh, 0), 1);
        setExitProgress(raw);
      });
    }, { threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1] });

    window.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(section);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  /* ================= LEFT TEXT COLOR SCROLL ================= */
  useEffect(() => {
    const list = faqListRef.current;
    const left = leftRef.current;
    if (!list || !left) return;

    const onScroll = () => {
      const progress =
        list.scrollTop / (list.scrollHeight - list.clientHeight || 1);
      left.style.setProperty("--slide", `${progress * 100}%`);
      // If user scrolls up (not at bottom), ensure exit state is cleared
      const section = faqSectionRef.current;
      const atBottom =
        Math.ceil(list.scrollTop + list.clientHeight) >=
        list.scrollHeight - 1;

      if (section && !atBottom) {
        section.style.setProperty("--exit", "0");
        if (leftRef.current) leftRef.current.classList.remove("faq-exit-left");
        cardRefs.current.forEach(card => {
          if (!card) return;
          card.classList.remove("faq-exit-card");
          // restore entry visibility if previously visible
          card.classList.add("desktop-visible");
        });
      }
    };

    list.addEventListener("scroll", onScroll);
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= WHEEL-AT-END TRIGGER ================= */
  useEffect(() => {
    const list = faqListRef.current;
    const section = faqSectionRef.current;
    if (!list || !section) return;

    const clearExit = () => {
      section.style.setProperty("--exit", "0");
      if (leftRef.current) leftRef.current.classList.remove("faq-exit-left");
      // restore visible state for all cards
      const restore = {};
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        restore[i] = true;
        card.classList.remove("faq-exit-card");
      });
      setVisibleMap(restore);
    };

    const onWheel = e => {
      // scrolling up -> restore
      if (e.deltaY < 0) {
        clearExit();
        return;
      }

      // only care about scrolling down when at bottom
      const atBottom =
        Math.ceil(list.scrollTop + list.clientHeight) >=
        list.scrollHeight - 1;

      if (!atBottom) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = Math.min(Math.max((vh - rect.bottom) / vh, 0), 1);

      // nudge to a small positive progress so exit animations run
      const nudged = raw > 0.02 ? raw : 0.06;

      section.style.setProperty("--exit", nudged.toString());

      if (leftRef.current) leftRef.current.classList.add("faq-exit-left");
      cardRefs.current.forEach(card => {
        if (!card) return;
        card.style.setProperty("--enter", "1");
        card.classList.remove("desktop-visible");
        card.classList.add("faq-exit-card");
      });
    };

    list.addEventListener("wheel", onWheel, { passive: true });
    return () => list.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section
      className="faq-neon-section"
      ref={faqSectionRef}
      style={{ "--total-cards": FAQ_ITEMS.length }}
    >
      <div className="faq-wrapper">
        <div className="faq-layout">

          {/* LEFT TEXT */}
          <div className="faq-left" ref={leftRef}>
            <h2 className="faq-heading">Frequently Asked Questions</h2>
            <p className="faq-intro">
              Everything you need to know about Algorithm 10.0
            </p>
          </div>

          {/* RIGHT FAQ LIST */}
          <div className="faq-right">
            <div className="faq-list" ref={faqListRef}>
              {FAQ_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  ref={el => (cardRefs.current[idx] = el)}
                  data-idx={idx}
                  className={`faq-card ${openIndex === idx ? "is-open" : ""} ${visibleMap[idx] ? "desktop-visible" : ""}`}
                  style={{ "--i": idx }}
                >
                  <button
                    className="faq-toggle"
                    onClick={() =>
                      setOpenIndex(openIndex === idx ? null : idx)
                    }
                    aria-expanded={openIndex === idx}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon">⌄</span>
                  </button>

                  <div className={`faq-answer ${openIndex === idx ? "open" : ""}`}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
