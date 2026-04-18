"use client";
import React from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
}

export function LineChart({ data, color = "#2563eb", height = 150 }: LineChartProps) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data.map(d => d.value)) || 1;
  const min = Math.min(...data.map(d => d.value)) || 0;
  const padding = 20;
  const chartHeight = height - padding * 2;
  const chartWidth = 400; // Arbitrary coordinate system

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((d.value - min) / (max - min)) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <svg 
        viewBox={`-10 -10 ${chartWidth + 20} ${chartHeight + 20}`} 
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className="drop-shadow-sm"
        />
        {/* Simple area under the line */}
        <polygon
          fill={color}
          fillOpacity="0.05"
          points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
        />
        
        {/* Labels */}
        {data.map((d, i) => (
           <circle 
             key={i} 
             cx={(i / (data.length - 1)) * chartWidth} 
             cy={chartHeight - ((d.value - min) / (max - min)) * chartHeight} 
             r="4" 
             fill="white" 
             stroke={color} 
             strokeWidth="2" 
           />
        ))}
      </svg>
      <div className="flex justify-between w-full mt-4">
         {data.map((d, i) => (
            <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{d.label}</span>
         ))}
      </div>
    </div>
  );
}
