"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Users, BookOpen, PlayCircle, Newspaper,
    UserCircle, Settings, ChevronRight, Menu, LogOut
} from "lucide-react";

const menuItems = [
    { name: "Beranda", icon: <Home size={20} /> },
    { name: "Capaian Pendaftaran", icon: <Users size={20} /> },
    { name: "Operator", icon: <Users size={20} /> },
    { name: "Kisah", icon: <BookOpen size={20} /> },
    { name: "Media", icon: <PlayCircle size={20} /> },
    { name: "Berita", icon: <Newspaper size={20} /> },
];

export default function SideHUD() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleSidebar = () => setIsExpanded(!isExpanded);

    return (
        <motion.div
            animate={{ width: isExpanded ? 280 : 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col z-50 overflow-hidden shadow-lg"
        >
            {/* Logo Section / Toggle */}
            <div className="h-20 flex items-center justify-center border-b border-gray-100">
                <button
                    onClick={toggleSidebar}
                    className="w-10 h-10 bg-cyan-100/50 hover:bg-cyan-100 transition-colors rounded-sm flex items-center justify-center group"
                >
                    <div className="w-4 h-4 bg-cyan-500 rotate-45 group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {menuItems.map((item, index) => (
                    <div
                        key={item.name}
                        onClick={() => {
                            setActiveIndex(index);
                            if (!isExpanded) setIsExpanded(true);
                        }}
                        className={`group relative flex items-center p-3 cursor-pointer rounded-sm transition-all duration-200 ${activeIndex === index
                            ? "bg-gray-100"
                            : "hover:bg-gray-50"
                            }`}
                    >
                        {/* Active Indicator (Left Bar) */}
                        {!isExpanded && activeIndex === index && (
                            <motion.div
                                layoutId="activeBar"
                                className="absolute left-0 top-2 bottom-2 w-1 bg-cyan-500 rounded-r-full"
                            />
                        )}

                        <div className={`flex-shrink-0 transition-colors duration-200 ${activeIndex === index ? "text-cyan-600" : "text-slate-400 group-hover:text-slate-600"
                            }`}>
                            {item.icon}
                        </div>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className={`ml-4 font-mono text-xs font-bold tracking-wider whitespace-nowrap ${activeIndex === index ? "text-black" : "text-slate-500 group-hover:text-slate-800"
                                        }`}
                                >
                                    {item.name.toUpperCase()}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50/50">
                <button className="w-full group flex items-center p-2 rounded-sm hover:bg-gray-100 transition-colors">
                    <UserCircle size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" />
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="ml-3 font-mono text-[10px] font-bold text-slate-500 group-hover:text-black tracking-widest"
                            >
                                AKUN
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
                <div className="flex items-center justify-between">
                    <button className="flex-1 group flex items-center p-2 rounded-sm hover:bg-gray-100 transition-colors">
                        <Settings size={20} className="text-slate-400 group-hover:text-cyan-600 transition-colors" />
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="ml-3 font-mono text-[10px] font-bold text-slate-500 group-hover:text-black tracking-widest"
                                >
                                    KREATOR
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                    {isExpanded && (
                        <button onClick={() => setIsExpanded(false)} className="p-2 text-slate-300 hover:text-black transition-colors">
                            <LogOut size={16} />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
