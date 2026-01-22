"use client";

import SideHUD from "../components/SideHUD";
import { motion, useScroll, useTransform } from "framer-motion"; // Added hooks
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
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

    // Parallax for the video frame
    const videoY = useTransform(scrollY, [0, 1000], [0, 100]);
    // Opposing movement for the title to create depth
    const titleY = useTransform(scrollY, [0, 1000], [0, -50]);

    return (
        <div className="min-h-screen bg-[#F5F2F2] text-slate-900 selection:bg-gray-200">
            <SideHUD />

            <main className="pl-28 pr-12 py-16 min-h-screen transition-all duration-300">
                {/* Hero Section */}
                <div className="relative mb-32 pt-12">
                    <div className="flex flex-col lg:flex-row items-center relative justify-center">
                        {/* Video Frame - Left Side (Widened) */}
                        <ParallaxFrame
                            y={videoY}
                            className="w-full lg:w-[90%] max-w-[90rem] aspect-[21/9]"
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-cover object-[center_40%] w-full h-full opacity-90"
                            >
                                <source src="/decoration/Home.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                        </ParallaxFrame>

                        {/* Title - Right Side Overlapping (Dipping Toe) */}
                        <motion.div
                            style={{ y: titleY }}
                            className="z-10 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:top-[-5.5rem] text-right mix-blend-difference pointer-events-none"
                        >
                            <p className="font-mono text-sm text-white tracking-[0.5em] uppercase mb-2 opacity-80 mr-2">
                                Winter is Coming
                            </p>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none -ml-20">
                                WINTERFALL
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* Dashboard Grid with Parallax Stagger */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Column 1 - Fast Parallax */}
                    <motion.div style={{ y: y1 }} className="space-y-6">
                        {/* REMOVED: Latest Update Card */}

                        <Card title="System Status" tag="02">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-mono text-xs text-slate-500">ALL SYSTEMS OPERATIONAL</span>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Column 2 - Static / Normal Flow */}
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

                    {/* Column 3 - Reverse/Slow Parallax */}
                    <motion.div style={{ y: y2 }} className="space-y-6 pt-24">
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
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
