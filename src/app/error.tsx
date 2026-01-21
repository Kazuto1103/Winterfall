"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-4 text-slate-500 font-mono text-sm">{error.message}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-mono uppercase text-xs tracking-wider"
            >
                Try again
            </button>
        </div>
    );
}
