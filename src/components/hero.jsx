"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const FlipCard = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2">
        <div className="relative w-20 h-24 sm:w-24 sm:h-28 mb-2">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-950"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-10 rounded-lg pointer-events-none"></div>
        </div>
        <span className="text-sm sm:text-base text-gray-400 uppercase tracking-wide">{label}</span>
    </div>
);

export default function Hero() {
    const [userFullName] = useState("Abdul Rehman");
    const [displayedName, setDisplayedName] = useState("");
    const [nameIndex, setNameIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    const [wordIndex, setWordIndex] = useState(0);
    const words = ["SIGN", "CODE", "VELOP", "PLOY"];

    // Tech words for rotation
    const [techIndex, setTechIndex] = useState(0);
    const techWords = ["AI", "ML", "CyberSecurity", "Blockchain"];

    // Countdown state - 3 days from now
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Typing animation for name
    useEffect(() => {
        if (nameIndex < userFullName.length) {
            const timeout = setTimeout(() => {
                setDisplayedName(prev => prev + userFullName[nameIndex]);
                setNameIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [nameIndex, userFullName]);

    // Cursor blink
    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //       setShowCursor(prev => !prev);
    //     }, 500);
    //     return () => clearInterval(interval);
    //   }, []);

    // Word rotation for DE-words
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex(prev => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Countdown timer
    useEffect(() => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    // Tech words rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setTechIndex(prev => (prev + 1) % techWords.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="text-gray-100 body-font bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
            <div className="container mx-auto flex px-5 py-16 sm:py-24 items-center justify-center flex-col">

                {/* Logo/Image */}
                <div className="relative lg:w-2/6 md:w-3/6 w-5/6 mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur-xl opacity-30">

                    </div>
                    <Image
                        className="relative w-full object-cover object-center rounded-lg shadow-2xl"
                        alt="Algorithm X Logo"
                        src="/assets/algo_word.jpg"
                        width={600}
                        height={400}
                    />
                </div>

                <div className="text-center lg:w-2/3 w-full">

                    {/* Greeting with typing animation */}
                    <h1 className="title-font sm:text-5xl text-3xl mb-6 font-bold text-white">
                        Hey  $
                        {/* <span className="text-green-500"> .\</span> */}
                        <span className="text-orange-500">
                            {displayedName}
                            {/* {showCursor && <span className="w-0.5 h-8 sm:h-12 bg-orange-500 ml-1 align-middle">_</span>} */}
                            {showCursor && <span className="inline-block w-3 h-0.5 bg-orange-500 ml-1 animate-pulse align-bottom"></span>}
                        </span> !!
                    </h1>

                    {/* Welcome message */}
                    <div className="flex flex-col sm:flex-col items-center justify-center gap-4 mb-8">

                        {/* <h2 className="text-2xl sm:text-3xl mb-4 font-semibold text-white">
                            Welcome to <span className="text-orange-500">Algorithm X</span>
                        </h2> */}
                        <h2>
                            <p className="mb-6 leading-relaxed text-gray-300 text-base sm:text-lg px-4">
                            Welcome to a <span className="text-orange-500 font-bold">32 Hour</span> long Hackathon Organized by
                                <span className="font-semibold"> Department of Computer Engineering</span>, at
                                <span className="font-semibold"> Anjuman-I-Islam’s Kalsekar Technical Campus</span>.
                            </p>
                        </h2>
                    </div>



                    {/* Animated DE-words */}
                    <div className="mb-8 text-3xl sm:text-4xl font-bold">
                        <span className="text-white">Ready to </span>
                        <span className="inline-block min-w-[200px] text-left">
                            <span className="text-orange-500">DE</span>
                            <span
                                className="text-orange-500 inline-block transition-all duration-500 ease-in-out"
                                key={wordIndex}
                                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
                            >
                                {words[wordIndex]}
                            </span>
                        </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <button className="inline-flex items-center justify-center text-white bg-orange-500 border-0 py-3 px-8 focus:outline-none hover:bg-orange-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
                            Register
                        </button>
                        <button className="inline-flex items-center justify-center text-gray-900 bg-white border-0 py-3 px-8 focus:outline-none hover:bg-gray-100 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105">
                            View Themes
                        </button>
                    </div>

                    {/* Countdown Section */}
                    <div className="mt-12">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-white">
                            Countdown for the <span className="text-orange-500">Showdown</span>
                        </h3>

                        <div className="flex justify-center items-center flex-wrap">
                            <FlipCard value={timeLeft.days} label="Days" />
                            <span className="text-3xl text-orange-500 mx-1">:</span>
                            <FlipCard value={timeLeft.hours} label="Hours" />
                            <span className="text-3xl text-orange-500 mx-1">:</span>
                            <FlipCard value={timeLeft.minutes} label="Minutes" />
                            <span className="text-3xl text-orange-500 mx-1">:</span>
                            <FlipCard value={timeLeft.seconds} label="Seconds" />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </section>
    );
}