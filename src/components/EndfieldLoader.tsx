"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface EndfieldLoaderProps {
    isLoading: boolean;
    onComplete?: () => void;
}

const EndfieldLoader: React.FC<EndfieldLoaderProps> = ({ isLoading, onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLHeadingElement>(null);
    const numRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const snowflakeRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState("LAT: 00.000 / LONG: 00.000");

    // Random coordinates effect
    useEffect(() => {
        const interval = setInterval(() => {
            const lat = (Math.random() * 180 - 90).toFixed(3);
            const long = (Math.random() * 360 - 180).toFixed(3);
            setCoords(`LAT: ${lat} / LONG: ${long}`);
        }, 150);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline();
        const progressObj = { value: 0 };

        // Intro Animation
        tl.set(containerRef.current, { display: "flex" })
            .set(overlayRef.current, { scaleX: 0 }) // Init overlay
            // Bar and Number Animation
            .fromTo(
                barRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 2.5, ease: "expo.inOut", delay: 0.2 }
            )
            .fromTo(
                numRef.current,
                { top: "0%" },
                { top: "95%", duration: 2.5, ease: "expo.inOut" }, // 95% to avoid hitting absolute bottom edge
                "<"
            )
            .to(progressObj, {
                value: 100,
                duration: 2.5,
                ease: "expo.inOut",
                onUpdate: () => {
                    if (numRef.current) {
                        numRef.current.innerText = Math.round(progressObj.value).toString().padStart(2, "0") + "%";
                    }
                }
            }, "<")
            // Logo & Snowflake Fade In
            .fromTo(
                [logoRef.current, snowflakeRef.current],
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: "power2.out" },
                "-=1.5"
            )
            // Subtext Fade In
            .fromTo(
                textRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                "-=1.0"
            );

    }, []);

    // Exit Animation
    useEffect(() => {
        if (!isLoading) {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                    if (containerRef.current) {
                        gsap.set(containerRef.current, { display: "none" });
                    }
                }
            });

            // Phase 1: Expand Yellow Line (Overlay) Left -> Right
            tl.set(overlayRef.current, { transformOrigin: "left center" })
                .to(overlayRef.current, {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power4.inOut"
                })
                // Hide visuals under the curtain
                .set([logoRef.current, textRef.current, numRef.current, barRef.current, snowflakeRef.current], { opacity: 0 })

                // Phase 2: Vanish Left -> Right (Reveal Content)
                .set(overlayRef.current, { transformOrigin: "right center" })
                .to(overlayRef.current, {
                    scaleX: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                    delay: 0.1
                });
        }
    }, [isLoading, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden text-white"
        >
            {/* Transition Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-[#77BEF0] z-50 pointer-events-none"
                style={{ transform: "scaleX(0)" }}
            />

            {/* Background Image (Foggy Glass Effect) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                    src="/decoration/loadbackground.jpeg"
                    alt="Background"
                    className="w-full h-full object-cover blur-md brightness-[0.4] scale-110"
                />
                <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay for readability */}
            </div>

            {/* Background Texture (Grain) */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E")' }}>
            </div>

            {/* Topographic Lines (Subtle Background) */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-[0.1]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 50 Q 25 25 50 50 T 100 50" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M0 70 Q 25 45 50 70 T 100 70" stroke="white" strokeWidth="0.5" fill="none" />
                <path d="M0 30 Q 25 55 50 30 T 100 30" stroke="white" strokeWidth="0.5" fill="none" />
            </svg>

            {/* Left Loading Bar Container */}
            <div className="absolute left-0 top-0 h-full w-20 pointer-events-none z-20">
                {/* Visual Bar */}
                <div
                    ref={barRef}
                    className="absolute left-0 top-0 bottom-0 w-1 md:w-[4px] bg-[#77BEF0] origin-top shadow-[0_0_20px_rgba(119,190,240,0.6)]"
                />
                {/* Following Number */}
                <div
                    ref={numRef}
                    className="absolute left-6 md:left-8 font-mono text-2xl md:text-3xl font-light text-[#77BEF0] -translate-y-full"
                >
                    00%
                </div>
            </div>

            {/* Main Content - Right Side */}
            <div className="absolute right-[10%] bottom-[35%] z-20 flex flex-col items-end text-right">

                {/* Logo Wrapper for relative positioning of snowflake */}
                <div className="relative">
                    {/* Snowflake Decoration - Centered on 'W' */}
                    <div
                        ref={snowflakeRef}
                        className="absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -z-10 pointer-events-none"
                    >
                        <img
                            src="/decoration/snowflake.png"
                            alt="Snowflake"
                            className="w-full h-full object-contain rotate-[15deg] brightness-150 opacity-20"
                        />
                    </div>

                    <h1
                        ref={logoRef}
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-2 select-none text-white/90 relative z-10"
                        style={{ textShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                    >
                        WINTERFALL
                    </h1>
                </div>

                <div ref={textRef} className="overflow-hidden relative z-10">
                    <p className="font-mono text-[10px] md:text-xs text-[#77BEF0] tracking-[0.4em] uppercase opacity-80 border-t border-[#77BEF0]/30 pt-2 pl-12">
                        Over the frontier / Into the front
                    </p>
                </div>
            </div>

            {/* Footer Coordinates */}
            <div className="absolute bottom-10 right-10 font-mono text-xs text-[#77BEF0]/40 tracking-widest z-20">
                {coords}
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-white/10 z-10" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-t border-l border-[#77BEF0]/20 z-10" />

        </div>
    );
};

export default EndfieldLoader;
