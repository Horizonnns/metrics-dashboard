import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface UsageChartProps {
  data: Record<string, number>;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

// Custom tooltip component
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-secondary-100">
        <p className="text-xs text-secondary-500 font-medium mb-1">{label}</p>
        <p className="text-lg font-bold text-secondary-900">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-secondary-500">запросов</span>
        </p>
      </div>
    );
  }
  return null;
};

const UsageChart: React.FC<UsageChartProps> = ({ data }) => {
  const chartData = Object.entries(data || {})
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      }),
      count,
      originalDate: new Date(date), // for sorting
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .slice(-7); // Last 7 days

  return (
    <div className="bg-surface p-6 rounded-3xl shadow-soft border border-secondary-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-secondary-900 tracking-tight">
          История использования
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#009a5c] to-[#38e0a3]"></div>
          <span className="text-xs text-secondary-500 font-medium">Последние 7 дней</span>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009a5c" stopOpacity={1} />
                <stop offset="100%" stopColor="#38e0a3" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#f9fafb", opacity: 0.5 }}
            />
            <Bar
              dataKey="count"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;
