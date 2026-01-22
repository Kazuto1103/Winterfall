"use client";

import { motion, MotionValue } from "framer-motion";
import React from "react";

interface ParallaxFrameProps {
    children: React.ReactNode;
    y?: MotionValue<number> | number;
    className?: string;
}

export default function ParallaxFrame({ children, y, className = "" }: ParallaxFrameProps) {
    return (
        <motion.div
            style={{ y }}
            className={`bg-white p-2 shadow-2xl relative z-0 ${className}`}
        >
            <div className="relative w-full h-full overflow-hidden bg-black">
                {children}
            </div>

            {/* Minimalist Frame Decor */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-slate-300 pointer-events-none"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-slate-300 pointer-events-none"></div>
        </motion.div>
    );
}
