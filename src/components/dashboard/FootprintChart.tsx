import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FootprintBreakdown {
  transport: number;
  commute: number;
  diet: number;
  ac: number;
  electricity: number;
  consumption: number;
}

interface FootprintChartProps {
  breakdown: FootprintBreakdown;
}

const COLORS = ['#2a8559', '#60c292', '#95dbb7', '#c3ecd4', '#e1f6e8', '#f2fbf5'];

export function FootprintChart({ breakdown }: FootprintChartProps) {
  const data = [
    { name: 'Transport & Commute', value: breakdown.transport + breakdown.commute },
    { name: 'Diet', value: breakdown.diet },
    { name: 'Air Conditioning', value: breakdown.ac },
    { name: 'Electricity', value: breakdown.electricity },
    { name: 'Consumption', value: breakdown.consumption },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-400">No footprint data available</div>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="99%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => [`${value} kg CO₂`, '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
