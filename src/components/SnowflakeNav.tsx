"use client";

import React, { useState, useEffect } from "react";
import {
    motion,
    useSpring,
    useMotionValue,
    useTransform,
    MotionValue,
    animate,
    useMotionValueEvent
} from "framer-motion";

interface ProjectItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

const ITEMS: ProjectItem[] = [
    { id: 1, title: "PROJECT ALPHA", description: "Cyber-Security Module. Firewall status: Active.", image: "/decoration/gif1.gif" },
    { id: 2, title: "PROJECT BETA", description: "Neural Interface. Synaptic link verified.", image: "/decoration/gif2.gif" },
    { id: 3, title: "PROJECT GAMMA", description: "Quantum Uplink. Entanglement stable.", image: "/decoration/gif3.gif" },
    { id: 4, title: "PROJECT DELTA", description: "Void Propellant. Fuel cells charged.", image: "/decoration/gif4.gif" },
    { id: 5, title: "PROJECT EPSILON", description: "Synthetic Cortex. AI logic online.", image: "/decoration/gif5.gif" },
    { id: 6, title: "PROJECT ZETA", description: "Stellar Cartography. Mapping sector 7.", image: "/decoration/gif6.gif" },
];

export default function SnowflakeNav() {
    // Rotation State
    // Initial: We want Item 0 to be at 9 o'clock (-90 deg).
    // Item 0 starts at 0 deg (12 o'clock) in SVG space.
    // So distinct rotation need to be -90.
    const rotation = useMotionValue(-90);
    const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 15 });

    // Snap Logic
    const [isDragging, setIsDragging] = useState(false);

    const snapToNearest = () => {
        const current = rotation.get();
        // Snap to nearest 60
        const snapped = Math.round(current / 60) * 60;
        animate(rotation, snapped, { type: "spring", stiffness: 50, damping: 15 });
    };

    // Wheel Handler with Debounced Snap
    let wheelTimeout: NodeJS.Timeout;
    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
        rotation.stop(); // Stop potential snap animation

        const delta = e.deltaY * 0.5;
        rotation.set(rotation.get() - delta);

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(snapToNearest, 150);
    };

    // GEOMETRY
    const primaryPath = "M 0 -100 L 110 -280 L 0 -460 L -110 -280 Z";
    const secondaryPath = "M 0 -260 L 50 -340 L 0 -420 L -50 -340 Z";

    return (
        <div
            className="fixed top-1/2 right-0 -translate-y-1/2 z-[50] pointer-events-auto flex items-center justify-center translate-x-1/2"
            style={{ width: '80vh', height: '80vh' }}
            onWheel={handleWheel}
        >
            {/* The Rotating Hub */}
            <motion.div
                style={{ rotate: smoothRotation }}
                className="relative w-full h-full flex items-center justify-center"
            >
                {/* 1. THE GEOMETRY LAYER (SVG) */}
                <svg
                    viewBox="-500 -500 1000 1000"
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                    style={{ zIndex: 10 }}
                >
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="10" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Central Core */}
                    <circle cx="0" cy="0" r="40" fill="#22d3ee" className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    <circle cx="0" cy="0" r="15" fill="#0f172a" />

                    {ITEMS.map((item, i) => (
                        <g key={i} transform={`rotate(${i * 60})`}>
                            {/* Primary Petal */}
                            <path
                                d={primaryPath}
                                fill="rgba(15, 23, 42, 0.95)"
                                stroke="#06b6d4"
                                strokeWidth="8"
                                className="hover:fill-slate-800 transition-colors duration-300"
                            />

                            {/* Secondary Petal (Offset 30deg) */}
                            <g transform="rotate(30)">
                                <path
                                    d={secondaryPath}
                                    fill="#22d3ee"
                                    className="drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                />
                            </g>
                        </g>
                    ))}
                </svg>

                {/* 2. THE CONTENT LAYER (Cards) */}
                {ITEMS.map((item, i) => (
                    <CarouselCard
                        key={item.id}
                        item={item}
                        index={i}
                        rotation={smoothRotation}
                    />
                ))}

            </motion.div>
        </div>
    );
}

// ------------------------------------------------------------------
// Internal Component for Individual Cards (Allows hooks)
// ------------------------------------------------------------------
function CarouselCard({ item, index, rotation }: { item: ProjectItem, index: number, rotation: MotionValue<number> }) {
    // 1. Counter Rotation (Keep upright)
    const counterRotation = useTransform(rotation, (r: number) => {
        const offset = index * 60;
        return -(r + offset);
    });

    // 2. Focus Effect Logic
    // We want to know the angle relative to the "Focus Point" (-90 deg / 9 o'clock)
    // Normalized Angle diff
    const activeScale = useTransform(rotation, (r: number) => {
        // Current absolute angle of this item
        const currentAngle = (r + index * 60);
        // We want -90 to be the "Center". 
        // Normalize to -180..180 distance from -90
        // (Angle + 90) should be 0 when active.
        let diff = (currentAngle + 90) % 360;
        // Fix modulo for negative numbers logic to be symmetrical
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360; // Normalize closer

        // If distance is near 0, scale 1.5. If > 60, scale 0.8
        const absDiff = Math.abs(diff);
        if (absDiff < 40) return 1 + (1 - absDiff / 40) * 0.8; // Max 1.8
        return 0.7; // Base scale
    });

    // Z-Index boost for active
    const activeZ = useTransform(rotation, (r: number) => {
        const currentAngle = (r + index * 60);
        let diff = Math.abs((currentAngle + 90) % 360);
        if (diff > 180) diff = 360 - diff;
        return diff < 30 ? 100 : 50;
    });

    // 3. Dynamic Connecting Line Height
    // Card is at 45vw from center.
    // Petal Tip is at ~37vh from center.
    // We render line from 37vh to 45vw.
    // calc(45vw - 37vh)

    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{
                transform: `rotate(${index * 60}deg) translateY(-45vw)` // Push to 45vw radius (Screen Center-ish)
            }}
        >
            {/* The Touching Line (DOM based) */}
            {/* It starts at the card center (0,0 local) and needs to point INWARDS to the petal */}
            {/* Length: 45vw (Card) - 37vh (Petal). Pointing 'Down' (towards center) because we translated Y-negative */}
            <div
                className="absolute top-1/2 left-1/2 w-[2px] bg-cyan-400 origin-top -translate-x-1/2"
                style={{
                    height: 'calc(45vw - 37vh)',
                    transform: 'rotate(180deg) translateY(0)', // Rotate to point back to center?
                    // Actually, translateY(-45vw) moved us OUT.
                    // (0,0) is Card Center.
                    // Center of Hub is (0, 45vw) relative to here (down).
                    // Petal Tip is at (0, 45vw - 37vh).
                    // So we want a line from (0,0) to (0, 45vw - 37vh).
                    // Just Height: calc ... Top: 0?
                    top: '50%', // Start at card center
                    // No, line needs to connect Frame edge? 
                    // Let's just create a line pointing towards center
                    // transform: rotate(0) points UP (away from center).
                    // We want DOWN (towards center).
                }}
            >
                <div className="w-full h-full bg-cyan-400/50 dashed-line relative">
                    {/* Dotted effect if needed via CSS or SVG */}
                </div>
            </div>

            {/* The Card Itself - Counter Rotated & Scaled */}
            <motion.div
                style={{
                    rotate: counterRotation,
                    scale: activeScale,
                    zIndex: activeZ
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vh] h-[25vh] origin-center"
            >
                {/* THE FRAME */}
                <div className="absolute inset-0 bg-white p-2 shadow-2xl ring-4 ring-white/10">
                    {/* Image Container */}
                    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700"
                            onError={(e) => {
                                e.currentTarget.src = "/decoration/snowflake.png";
                            }}
                        />

                        {/* Description */}
                        <div className="absolute bottom-4 left-4 max-w-[80%] z-20">
                            <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 p-3 shadow-lg">
                                <p className="font-mono text-[1.2vh] text-white leading-tight">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="absolute -top-6 -right-4 z-50 text-right mix-blend-difference pointer-events-none w-full">
                    <h3 className="text-[4vh] font-black tracking-tighter text-slate-900 leading-none uppercase bg-white/0">
                        {item.title.replace("PROJECT ", "")}
                    </h3>
                    <p className="text-[1vh] tracking-[0.3em] font-mono text-slate-500 uppercase mr-1">
                        Project {item.id.toString().padStart(2, '0')}
                    </p>
                </div>

                {/* Visual Anchor Node */}
                {/* Where the line meets the card - Top Center? Or center? */}
                {/* If line comes from center (bottom of card visually), anchor is bottom */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[12.5vh] w-3 h-3 bg-cyan-400 border-2 border-white rounded-full z-50 shadow-md"></div>

            </motion.div>
        </div>
    );
}
