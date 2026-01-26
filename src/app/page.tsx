"use client";

import React from "react";
import SideHUD from "../components/SideHUD";
import { motion, useScroll, useTransform, useSpring, useAnimation, AnimatePresence } from "framer-motion";
import ParallaxFrame from "../components/ParallaxFrame";
import SnowflakeNav from "../components/SnowflakeNav";
import { useLoading } from "../components/ClientLayout";

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
    // 1. Entry Animation Logic
    const controls = useAnimation();
    const titleControls = useAnimation();
    const { isLoading } = useLoading();
    const [wasLoadingInitially] = React.useState(isLoading);

    // Navigation State
    const [activePage, setActivePage] = React.useState(0);

    React.useEffect(() => {
        if (!isLoading) {
            const delay = wasLoadingInitially ? 1.2 : 0;
            // Frame Animation
            controls.start({ opacity: 1, scale: 1, transition: { duration: 1.5, ease: "easeOut", delay } });
            // Title Animation
            titleControls.start({ opacity: 1, transition: { duration: 1.2, ease: "easeOut", delay: delay + 0.3 } });
        } else {
            controls.set({ opacity: 0, scale: 0.95 });
            titleControls.set({ opacity: 0 });
        }
    }, [isLoading, controls, titleControls, wasLoadingInitially]);

    // 2. Configure the Scroll Container
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 2. Animation Values
    const curtainProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
    const smoothProgress = useSpring(curtainProgress, { stiffness: 200, damping: 40, mass: 0.8 });
    const gapSize = "1%";

    // Triangle Movements
    const cover1X = useTransform(smoothProgress, [0, 1], [`-${gapSize}`, "-100%"]);
    const cover1Y = useTransform(smoothProgress, [0, 1], [`-${gapSize}`, "-100%"]);
    const cover2X = useTransform(smoothProgress, [0, 1], [gapSize, "100%"]);
    const cover2Y = useTransform(smoothProgress, [0, 1], [gapSize, "100%"]);

    // Dashboard Parallax
    const dashboardY = useTransform(scrollYProgress, [0.4, 0.9], ["100vh", "0vh"]);
    const dashboardOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -20]);

    return (
        <div ref={containerRef} className="relative bg-[#F5F2F2] selection:bg-gray-200">
            {/* SCROLL SPACER */}
            <div className="h-[300vh]"></div>

            {/* STICKY VIEWPORT */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Background Layer */}
                <div className="absolute inset-0 bg-[#F5F2F2]"></div>

                {/* Main Content */}
                <main className="relative w-full h-full flex flex-col pointer-events-auto">

                    <SideHUD activeIndex={activePage} onNavigate={setActivePage} />

                    {/* === VIEW: HOME (0) === */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activePage === 0 ? 1 : 0, pointerEvents: activePage === 0 ? 'auto' : 'none' }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        {/* HERO SECTION */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative w-full lg:w-[80%] max-w-[80rem] aspect-[21/9] pointer-events-auto mt-16">
                                {/* 1. FRAME & VIDEO */}
                                <motion.div
                                    className="w-full h-full relative z-0"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={controls}
                                >
                                    <ParallaxFrame className="w-full h-full relative z-0">
                                        <img
                                            src="/decoration/home.gif"
                                            alt="Winterfall Hero Background"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>

                                        {/* CURTAINS */}
                                        <motion.div style={{ x: cover1X, y: cover1Y }} className="absolute inset-0 bg-[#F5F2F2] z-20 [clip-path:polygon(0_0,100%_0,0_100%)]">
                                            <div className="absolute bottom-1/2 right-1/2 opacity-30 whitespace-nowrap -rotate-[23.2deg] origin-bottom-right z-30">
                                                <p className="font-mono text-xs uppercase tracking-[0.5em] font-bold relative">
                                                    Love For Game, Game For Love
                                                    <span className="absolute left-full top-1/2 -translate-y-1/2 w-96 h-[1px] bg-black ml-4" />
                                                </p>
                                            </div>
                                        </motion.div>
                                        <motion.div style={{ x: cover2X, y: cover2Y }} className="absolute inset-0 bg-[#F5F2F2] z-20 [clip-path:polygon(100%_100%,100%_0,0_100%)]">
                                            <div className="absolute top-1/2 left-1/2 opacity-30 whitespace-nowrap -rotate-[23.2deg] origin-top-left z-30">
                                                <p className="font-mono text-xs uppercase tracking-[0.5em] font-bold relative">
                                                    <span className="absolute right-full top-1/2 -translate-y-1/2 w-96 h-[1px] bg-black mr-4" />
                                                    Game Developer
                                                </p>
                                            </div>
                                        </motion.div>
                                    </ParallaxFrame>
                                </motion.div>

                                {/* TITLE */}
                                <motion.div
                                    style={{ y: titleY }}
                                    initial={{ opacity: 0 }}
                                    animate={titleControls}
                                    className="absolute right-[-2%] top-[-10%] lg:right-[-2rem] lg:top-[-4rem] z-30 text-right mix-blend-difference pointer-events-none"
                                >
                                    <p className="font-mono text-xs md:text-sm text-white tracking-[0.5em] uppercase mb-2 opacity-80 mr-2">Winter is Coming</p>
                                    <h1 className="text-5xl md:text-7xl lg:text-7xl font-black tracking-tighter text-white leading-none -ml-20">WINTERFALL</h1>
                                </motion.div>
                            </div>
                        </div>

                        {/* DASHBOARD CONTENT */}
                        <motion.div
                            style={{ y: dashboardY, opacity: dashboardOpacity }}
                            className="absolute top-[100vh] left-0 w-full pl-28 pr-12 pb-12 pt-24 min-h-screen bg-[#F5F2F2]"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[90rem] mx-auto">
                                <div className="space-y-6">
                                    <Card title="System Status" tag="02">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="font-mono text-xs text-slate-500">ALL SYSTEMS OPERATIONAL</span>
                                        </div>
                                    </Card>
                                </div>
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
                    </motion.div>

                    {/* === VIEW: PROJECTS (1) === */}
                    <AnimatePresence>
                        {activePage === 1 && (
                            <motion.div
                                key="projects-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 z-40 bg-[#F5F2F2] flex items-center justify-center overflow-hidden"
                            >
                                <SnowflakeNav />
                                <div className="absolute top-1/2 left-32 transform -translate-y-1/2 z-30 pointer-events-none">
                                    <h2 className="text-[12vw] font-black text-slate-900/5 tracking-tighter leading-none">PROJECTS</h2>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </main>
            </div>
        </div>
    );
}
