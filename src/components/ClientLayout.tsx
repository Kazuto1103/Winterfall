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
            <main className="relative z-0 min-h-screen bg-white">
                {children}
            </main>
        </>
    );
}
