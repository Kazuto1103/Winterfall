"use client";

import React from "react";
import SideHUD from "../components/SideHUD";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // Added hooks
import ParallaxFrame from "../components/ParallaxFrame"; // Import Component

const Card = ({ children, title, tag }: { children: React.ReactNode, title: string, tag?: string }) => (
    <div className="relative bg-gray-50 p-6 lg:p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
        <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-lg lg:text-xl tracking-tight uppercase">{title}</h3>
            {tag && <span className="font-mono text-xs text-slate-300">{tag}</span>}
        </div>
        {children}
    </div>
);

export default function Home() {
    // 1. Configure the Scroll Container
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. Animation Values
    // The "Curtain Reveal" happens during the first part of the scroll
    const curtainProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    // Smooth out the progress for fluid motion
    // Visual Vibe: Softer, more "minimalist" easing
    const smoothProgress = useSpring(curtainProgress, { stiffness: 200, damping: 40, mass: 0.8 });

    // Curtain Movements (Diagonal Pull)
    // The gap is created by starting with a small offset
    const gapSize = "1%";

    // Top-Left Triangle (Moves Up & Left)
    const cover1X = useTransform(smoothProgress, [0, 1], [`-${gapSize}`, "-100%"]);
    const cover1Y = useTransform(smoothProgress, [0, 1], [`-${gapSize}`, "-100%"]);

    // Bottom-Right Triangle (Moves Down & Right)
    const cover2X = useTransform(smoothProgress, [0, 1], [gapSize, "100%"]);
    const cover2Y = useTransform(smoothProgress, [0, 1], [gapSize, "100%"]);

    // Parallax for content *after* the reveal
    // The dashboard slides up as we finish the scroll sequence
    const dashboardY = useTransform(scrollYProgress, [0.4, 0.9], ["100vh", "0vh"]);
    const dashboardOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

    // Title Parallax (Micro-movement)
    // Title Parallax (Micro-movement)
    // Reduced significantly to "stay in place"
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);

    return (
        <div ref={containerRef} className="relative bg-[#F5F2F2] selection:bg-gray-200">
            {/* 
              SCROLL SPACER 
              This defines how "tall" the scroll page is. 
              The user scrolls through this, driving the animation.
            */}
            <div className="h-[300vh]"></div>

            {/* 
              STICKY VIEWPORT
              This stays fixed while we scroll through the spacer.
            */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Background Layer */}
                <div className="absolute inset-0 bg-[#F5F2F2]"></div>

                {/* Main Content Content Wrapper */}
                <main className="relative w-full h-full flex flex-col pointer-events-auto">

                    <SideHUD />

                    {/* HERO SECTION - Centered & Pinned */}
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="relative w-full lg:w-[80%] max-w-[80rem] aspect-[21/9] pointer-events-auto mt-16">

                            {/* 1. FRAME & VIDEO */}
                            <ParallaxFrame className="w-full h-full relative z-0">
                                <img
                                    src="/decoration/home.gif"
                                    alt="Winterfall Hero Background"
                                    className="object-cover object-[center_40%] w-full h-full opacity-90"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>

                                {/* 2. THE CURTAINS (Diagonal Split) */}
                                {/* Top-Left Triangle */}
                                <motion.div
                                    style={{ x: cover1X, y: cover1Y }}
                                    className="absolute inset-0 bg-[#F5F2F2] z-20 [clip-path:polygon(0_0,100%_0,0_100%)]"
                                >
                                    <div className="absolute bottom-1/2 right-1/2 translate-x-0 translate-y-0 opacity-30 whitespace-nowrap -rotate-[23.2deg] origin-bottom-right z-30">
                                        <p className="font-mono text-xs uppercase tracking-[0.5em] font-bold relative">
                                            Love For Game, Game For Love
                                            <span className="absolute left-full top-1/2 -translate-y-1/2 w-96 h-[1px] bg-black ml-4" />
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Bottom-Right Triangle */}
                                <motion.div
                                    style={{ x: cover2X, y: cover2Y }}
                                    className="absolute inset-0 bg-[#F5F2F2] z-20 [clip-path:polygon(100%_100%,100%_0,0_100%)]"
                                >
                                    <div className="absolute top-1/2 left-1/2 translate-x-0 translate-y-0 opacity-30 whitespace-nowrap -rotate-[23.2deg] origin-top-left z-30">
                                        <p className="font-mono text-xs uppercase tracking-[0.5em] font-bold relative">
                                            <span className="absolute right-full top-1/2 -translate-y-1/2 w-96 h-[1px] bg-black mr-4" />
                                            Game Developer
                                        </p>
                                    </div>
                                </motion.div>
                            </ParallaxFrame>

                            {/* 3. TITLE (Outside Frame, Top Layer) */}
                            {/* "Dipping Toe" styling - overlaps top right */}
                            <motion.div
                                style={{ y: titleY }}
                                className="absolute right-[-2%] top-[-10%] lg:right-[-2rem] lg:top-[-4rem] z-30 text-right mix-blend-difference pointer-events-none"
                            >
                                <p className="font-mono text-xs md:text-sm text-white tracking-[0.5em] uppercase mb-2 opacity-80 mr-2">
                                    Winter is Coming
                                </p>
                                <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter text-white leading-none -ml-20">
                                    WINTERFALL
                                </h1>
                            </motion.div>
                        </div>
                    </div>


                    {/* DASHBOARD CONTENT - Slides Up */}
                    <motion.div
                        style={{ y: dashboardY, opacity: dashboardOpacity }}
                        className="absolute top-[100vh] left-0 w-full pl-28 pr-12 pb-12 pt-24 min-h-screen bg-[#F5F2F2]"
                    >
                        {/* Dashboard Grid moved here */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[90rem] mx-auto">
                            {/* Column 1 */}
                            <div className="space-y-6">
                                <Card title="System Status" tag="02">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="font-mono text-xs text-slate-500">ALL SYSTEMS OPERATIONAL</span>
                                    </div>
                                </Card>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-6 pt-12">
                                <Card title="Active Users" tag="03">
                                    <div className="font-mono text-4xl font-light text-slate-900 mb-2">8,492</div>
                                    <p className="text-xs text-slate-400">Current concurrent sessions</p>
                                </Card>
                                <Card title="Deployment" tag="04">
                                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[70%] bg-cyan-500"></div>
                                    </div>
                                    <div className="flex justify-between mt-2 font-mono text-xs text-slate-400">
                                        <span>PROGRESS</span>
                                        <span>70%</span>
                                    </div>
                                </Card>
                                <Card title="Notifications" tag="05">
                                    <p className="text-sm text-slate-500">3 new alerts from security module.</p>
                                </Card>
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-6 pt-24">
                                <Card title="Project Alpha" tag="06">
                                    <div className="h-32 bg-slate-900 rounded-sm mb-4 flex items-center justify-center">
                                        <span className="font-mono text-white/50 text-xs">ENCRYPTED</span>
                                    </div>
                                </Card>
                                <Card title="Resource Usage" tag="07">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-2 bg-gray-50 rounded-sm">
                                            <div className="text-xs text-slate-400 mb-1">CPU</div>
                                            <div className="font-mono text-lg">42%</div>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-sm">
                                            <div className="text-xs text-slate-400 mb-1">MEM</div>
                                            <div className="font-mono text-lg">64%</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
