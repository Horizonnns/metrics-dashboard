import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { Sparkles } from "lucide-react";

interface ToneDistributionProps {
  data: Record<string, number>;
}

const COLORS = [
  { main: "#009a5c", light: "#38e0a3" },
  { main: "#38e0a3", light: "#76eebf" },
  { main: "#0891b2", light: "#06b6d4" },
  { main: "#7c3aed", light: "#a78bfa" },
  { main: "#ea580c", light: "#fb923c" },
  { main: "#dc2626", light: "#f87171" },
];

const TONE_NAMES: Record<string, string> = {
  business: "💼 Деловой",
  friendly: "💬 Дружелюбный",
  hype: "🚀 Хайповый",
  inspire: "✨ Вдохновляющий",
  persuasive: "🧠 Убедительный",
  humorous: "😄 С юмором",
  custom: "✏️ Свой стиль",
  more: "➕ Ещё стили",
  less: "⬅️ Меньше",
};

// Custom active shape for pie chart
const renderActiveShape = (props: unknown) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props as {
    cx: number;
    cy: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: { name: string; value: number };
    percent: number;
  };

  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        dy={8}
        textAnchor="middle"
        className="fill-secondary-900 text-2xl font-black"
      >
        {payload.value}
      </text>
      <text
        x={cx}
        y={cy + 15}
        dy={8}
        textAnchor="middle"
        className="fill-secondary-500 text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={cx}
        y={cy + 35}
        dy={8}
        textAnchor="middle"
        className="fill-secondary-600 text-xs font-semibold"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.8}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

const ToneDistribution: React.FC<ToneDistributionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name: TONE_NAMES[name] || name,
    originalName: name,
    value,
  }));

  const totalCount = chartData.reduce((sum, item) => sum + item.value, 0);
  const topTone =
    chartData.length > 0
      ? chartData.reduce((prev, current) => (prev.value > current.value ? prev : current))
      : null;

  const onPieEnter = (_data: unknown, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/20 to-blue-50/20 p-6 rounded-3xl shadow-soft border border-secondary-100 h-full flex flex-col relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-black text-secondary-900 tracking-tight">
            Популярные тона
          </h3>
        </div>

        {topTone && (
          <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-secondary-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-secondary-500 font-semibold uppercase tracking-wider mb-1">
                  Самый популярный
                </p>
                <p className="text-lg font-bold text-secondary-900">{topTone.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {topTone.value}
                </p>
                <p className="text-xs text-secondary-500 font-medium">из {totalCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient
                  key={`gradient-${index}`}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color.main} stopOpacity={1} />
                  <stop offset="100%" stopColor={color.light} stopOpacity={0.8} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              {...({
                activeIndex,
                activeShape: renderActiveShape,
                data: chartData,
                cx: "50%",
                cy: "50%",
                innerRadius: 65,
                outerRadius: 85,
                paddingAngle: 3,
                dataKey: "value",
                onMouseEnter: onPieEnter,
                animationDuration: 800,
                animationEasing: "ease-out",
              } as any)}
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index % COLORS.length})`}
                  strokeWidth={2}
                  stroke="#ffffff"
                  className="cursor-pointer transition-all duration-300 hover:opacity-90"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend (Scrollable List) */}
      <div className="mt-4 pr-1 max-h-[200px] overflow-y-auto space-y-2 custom-scrollbar">
        {chartData.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              activeIndex === index
                ? "bg-white shadow-md border border-secondary-200 scale-[1.02]"
                : "bg-surface hover:bg-white border border-transparent hover:shadow-sm"
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${
                  COLORS[index % COLORS.length].main
                }, ${COLORS[index % COLORS.length].light})`,
              }}
            />
            <span
              className={`text-sm font-medium truncate flex-1 ${
                activeIndex === index ? "text-secondary-900" : "text-secondary-600"
              }`}
            >
              {entry.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-secondary-400">
                {((entry.value / totalCount) * 100).toFixed(0)}%
              </span>
              <span
                className={`text-sm font-bold min-w-[24px] text-right ${
                  activeIndex === index ? "text-secondary-900" : "text-secondary-500"
                }`}
              >
                {entry.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `,
        }}
      />
    </div>
  );
};

export default ToneDistribution;
