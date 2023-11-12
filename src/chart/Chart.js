import React, { PureComponent } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: 'SVG', value: 400 },
  { name: 'SVXS', value: 300 },
  { name: 'SVCĐG', value: 300 },
  { name: 'SVGXS & SVCĐG', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data2 = [
  {
    name: '2021-2022',
    SVG: 4000,
    SVXS: 2400,
    SVCĐG: 2400,
  },
  {
    name: '2022-2023',
    SVG: 3000,
    SVXS: 1398,
    SVCĐG: 2210,
  },
  {
    name: '2023-2024',
    SVG: 2000,
    SVXS: 9800,
    SVCĐG: 2290,
  },
];

export default class Chart extends PureComponent {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <div style={{ border: '2px solid #f5f5f5' }}>
          <h2>Biểu đồ</h2>
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ border: '2px solid #f5f5f5', padding: '20px' }}>
          <h2>Đồ thị</h2>
          <ResponsiveContainer width={800} height={400}>
            <BarChart
              width={500}
              height={300}
              data={data2}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="SVG" fill="#4ab7e3" activeBar={<Rectangle fill="pink" stroke="green" />} />
              <Bar dataKey="SVXS" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              <Bar dataKey="SVCĐG" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
