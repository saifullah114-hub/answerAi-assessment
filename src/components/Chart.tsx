import type { DataPoint } from "../types";
import React, { useEffect, useRef, useState } from "react";

const Chart: React.FC<{
    data: DataPoint[];
    onDataPointHover: (point: DataPoint | null, event?: React.MouseEvent) => void;
    hoveredPoint: DataPoint | null;
}> = ({ data, onDataPointHover, hoveredPoint }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(600);
    const chartHeight = 300;
    const padding = 60;

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setChartWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const maxValue = Math.max(...data.map((d) => d.value));

    const getX = (index: number) =>
        padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    const getY = (value: number) =>
        chartHeight - padding - (value / maxValue) * (chartHeight - 2 * padding);
    const createSmoothPath = (points: { x: number; y: number }[]) => {
        if (points.length < 2) return "";
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const midX = (prev.x + curr.x) / 2;
            d += ` Q ${prev.x} ${prev.y}, ${midX} ${(prev.y + curr.y) / 2}`;
            d += ` T ${curr.x} ${curr.y}`;
        }
        return d;
    };

    const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

    return (
        <div ref={containerRef} className="w-full h-full">
            <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                {[0, 20000, 40000, 60000, 80000, 100000].map((value) => (
                    <g key={value}>
                        <line
                            x1={padding}
                            y1={getY(value)}
                            x2={chartWidth - padding}
                            y2={getY(value)}
                            stroke="#374151"
                            strokeWidth="1"
                        />
                        <text
                            x={padding - 10}
                            y={getY(value)}
                            fill="#9CA3AF"
                            fontSize="12"
                            textAnchor="end"
                            dominantBaseline="middle"
                        >
                            ${value / 1000}K
                        </text>
                    </g>
                ))}

                <path d={createSmoothPath(points)} stroke="#A3E635" strokeWidth="3" fill="none" />

                {points.map((pt, index) => (
                    <circle
                        key={index}
                        cx={pt.x}
                        cy={pt.y}
                        r="5"
                        fill="#A3E635"
                        stroke="#1F2937"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-7 transition-all"
                        onMouseEnter={(e) => onDataPointHover(data[index], e)}
                        onMouseLeave={() => onDataPointHover(null)}
                    />
                ))}

                {data.map((point, index) => {
                    const x = getX(index);
                    const y = getY(point.value);
                    const bars = [
                        <rect
                            key={`main-${index}`}
                            x={x - 1}
                            y={y}
                            width="2"
                            height={chartHeight - padding - y}
                            fill="#8AA14F33"
                        />
                    ];

                    if (index < data.length - 1) {
                        const next = data[index + 1];
                        const xNext = getX(index + 1);
                        const yNext = getY(next.value);
                        const steps = 2;
                        for (let i = 1; i <= steps; i++) {
                            const t = i / (steps + 1);
                            const xi = x + (xNext - x) * t;
                            const yi = y + (yNext - y) * t;
                            bars.push(
                                <rect
                                    key={`interp-${index}-${i}`}
                                    x={xi - 1}
                                    y={yi}
                                    width="2"
                                    height={chartHeight - padding - yi}
                                    fill="#8AA14F1A"
                                />
                            );
                        }
                    }

                    return bars;
                })}

                {hoveredPoint && (
                    <line
                        x1={getX(data.findIndex((d) => d.month === hoveredPoint.month))}
                        y1={padding}
                        x2={getX(data.findIndex((d) => d.month === hoveredPoint.month))}
                        y2={chartHeight - padding}
                        stroke="#A3E635"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                )}

                {data.map((point, index) => (
                    <text
                        key={index}
                        x={getX(index)}
                        y={chartHeight - padding + 20}
                        fill="#9CA3AF"
                        fontSize="12"
                        textAnchor="middle"
                    >
                        {point.month}
                    </text>
                ))}
            </svg>
        </div>
    );
};

export default Chart;