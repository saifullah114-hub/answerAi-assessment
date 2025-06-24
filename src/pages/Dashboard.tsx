import React, { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import KPICard from '../components/KPICard';
import VariableEditSlideOver from '../components/VariableEditSlideOver';
import DataPointDetail from '../components/DataPointDetail';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { mockVariables, mockDataPoints, mockKPIs } from '../mockData';
import type { Variable, DataPoint } from '../types';
import { auth } from '../firebaseConfig';
import { SettingsIcon, Share, ChevronUp, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const getSectionTitle = (pathname: string): string => {
    if (pathname.startsWith('/charging-station')) return 'Charging Station';
    if (pathname.startsWith('/fleet-sizing')) return 'Fleet Sizing';
    if (pathname.startsWith('/parking')) return 'Parking';
    return '';
};

const Dashboard: React.FC = () => {
    const location = useLocation();

    const [variables, setVariables] = useState<Variable[]>(mockVariables);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [hoveredDataPoint, setHoveredDataPoint] = useState<DataPoint | null>(null);
    const [dataPointPosition, setDataPointPosition] = useState({ x: 0, y: 0 });
    const [selectedVariable, setSelectedVariable] = useState<Variable | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [expanded, setExpanded] = useState(true);

    const handleVariableToggle = (id: string) =>
        setVariables(vs => vs.map(v => v.id === id ? { ...v, active: !v.active } : v));

    const handleDataPointHover = (point: DataPoint | null, evt?: React.MouseEvent) => {
        setHoveredDataPoint(point);
        if (evt && point) setDataPointPosition({ x: evt.clientX, y: evt.clientY });
    };


    const sectionTitle = getSectionTitle(location.pathname);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
console.log(user)
    return (
        <>
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-lime-500 rounded flex items-center justify-center text-black font-bold">⚡</div>
                    <h1 className="text-2xl font-bold">{sectionTitle}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                        <SettingsIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsEditOpen(true)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white">Edit Variables</button>
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg">
                        <Share className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="rounded-lg p-4 space-y-3 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lime-400">
                        <span className="text-xl">✨</span>
                        <h2 className="text-xl font-semibold">Best Scenario Results</h2>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="border border-lime-400 text-lime-300 p-1.5 rounded-full hover:bg-lime-600/10 transition"
                    >
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </div>

                {expanded && (
                    <>
                        {[
                            'The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.',
                            'The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.'
                        ].map((text, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center bg-[#0E0D0D] text-lime-400 border border-lime-500/30 rounded px-4 py-3"
                            >
                                <p className="text-sm">{text}</p>
                                <MoreHorizontal className="text-lime-400 w-4 h-4" />
                            </div>
                        ))}
                    </>
                )}
            </div>


            <div className="grid lg:grid-cols-3 gap-6 items-stretch">
                <div className="rounded-lg p-6 lg:col-span-2 flex flex-col">
                    <h3 className="text-white font-medium text-lg mb-4">Graphs</h3>

                    <div className="bg-[#222324] border border-[#525252] p-4 rounded-lg flex-1 flex flex-col">
                        <div className="flex justify-end mb-4">
                            <select className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 text-sm">
                                <option>Unsatisfied Demand %</option>
                            </select>
                        </div>

                        <div className="h-[300px] w-full">
                            <Chart
                                data={mockDataPoints}
                                onDataPointHover={handleDataPointHover}
                                hoveredPoint={hoveredDataPoint}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-lg py-6 flex flex-col bg-transparent">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Key Performance Indicators</h3>
                        <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg flex gap-1">
                            Variable <Plus />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {mockKPIs.map((k, i) => <KPICard key={i} kpi={k} />)}
                    </div>
                </div>
            </div>



            <VariableEditSlideOver
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                variables={variables}
                onVariableToggle={handleVariableToggle}
                selectedVariable={selectedVariable}
                onVariableSelect={setSelectedVariable}
            />

            {hoveredDataPoint && (
                <DataPointDetail point={hoveredDataPoint} position={dataPointPosition} onClose={() => setHoveredDataPoint(null)} />
            )}
        </>
    );
};

export default Dashboard;
