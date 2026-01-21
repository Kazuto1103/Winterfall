"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EndfieldLoader from "./EndfieldLoader";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    // Simulate loading time (or replace with actual resource loading logic)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 seconds initial load

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <EndfieldLoader isLoading={loading} />
            <motion.main
                className="relative z-0 min-h-screen bg-white"
                initial={{ x: "-25%", opacity: 0 }}
                animate={{
                    x: loading ? "-25%" : "0%",
                    opacity: loading ? 0 : 1
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1], // Power4.out feel
                    delay: 0.9 // Synchronized with EndfieldLoader Exits (0.2 delay + 0.8s Phase 1 scale)
                }}
            >
                {children}
            </motion.main>
        </>
    );
}
