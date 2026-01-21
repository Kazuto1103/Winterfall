import SideHUD from "../components/SideHUD";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-gray-200">
            <SideHUD />

            <main className="pl-28 pr-12 py-16 min-h-screen transition-all duration-300">
                <div className="max-w-6xl mx-auto space-y-16">

                    {/* Header Section */}
                    <header className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center space-x-3 text-slate-500 mb-2">
                            <span className="h-px w-8 bg-black"></span>
                            <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold text-black">Talos II // Unit 01</span>
                        </div>
                        {/* Fluid typography: scales nicely from tablet to desktop */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black mb-2 uppercase leading-[0.9]">
                            Winterfall<br />Initiative
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-mono">
                            Advanced tactical operations and monitoring dashboard.
                            Integrated neural telemetry networks.
                        </p>
                    </header>

                    {/* Grid Layout for Content */}
                    {/* Forcing 3 columns earlier (at md/768px) to maintain the "clean" look on zoomed laptops */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                        {/* Card 1 */}
                        <div className="group relative bg-gray-50 p-6 lg:p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-lg lg:text-xl tracking-tight uppercase">Mission Status</h3>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            </div>

                            <div className="h-0.5 w-12 bg-black mb-6" />

                            <p className="text-xs lg:text-sm text-slate-500 mb-6 font-mono leading-relaxed">
                                All systems nominal. Neural link established. Waiting for command input.
                                SYNC: 98.4% | PING: 12ms
                            </p>

                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-bold tracking-wider uppercase">Active</span>
                                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold tracking-wider uppercase">Priority 1</span>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative bg-gray-50 p-6 lg:p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-lg lg:text-xl tracking-tight uppercase">Personnel</h3>
                                <div className="text-slate-300 font-mono text-xs">03/12</div>
                            </div>

                            <div className="h-0.5 w-12 bg-gray-300 mb-6 group-hover:bg-black transition-colors" />

                            <div className="space-y-3 font-mono text-xs lg:text-sm">
                                {['Operator 7', 'Unit Alpha', 'Recon B'].map((unit, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                                        <span className="text-slate-600 font-bold">{unit}</span>
                                        <span className="text-green-600 text-xs">ONLINE</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative bg-gray-50 p-6 lg:p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-lg lg:text-xl tracking-tight uppercase">System Logs</h3>
                                <div className="text-slate-300 font-mono text-xs">V.2.0.4</div>
                            </div>

                            <div className="h-0.5 w-12 bg-gray-300 mb-6 group-hover:bg-orange-500 transition-colors" />

                            <ul className="space-y-3 text-xs font-mono text-slate-500">
                                <li className="flex gap-2">
                                    <span className="text-gray-300">10:42</span>
                                    <span>Sector 7 interference detected</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-gray-300">10:38</span>
                                    <span>Grid power stabilised</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-gray-300">09:15</span>
                                    <span className="text-orange-600 font-bold">Unauthorized access attempt</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
