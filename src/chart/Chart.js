import React, { PureComponent } from 'react';
import axios from 'axios';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
  Sector,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#00C49F', '#e17b7b', '#FFBB28', '#FF8042', '#4ab7e3'];

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

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} SV`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Chiếm ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const data2 = [
  {
    name: '2021-2022',
    SVG: 40,
    SVXS: 15,
    SVCĐG: 5,
    'SVXS & CĐG': 2,
  },
  {
    name: '2022-2023',
    SVG: 38,
    SVXS: 21,
    SVCĐG: 4,
    'SVXS & CĐG': 3,
  },
  {
    name: '2023-2024',
    SVG: 59,
    SVXS: 30,
    SVCĐG: 5,
    'SVXS & CĐG': 1,
  },
];

export default class Chart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <div style={{ border: '2px solid #f5f5f5' }}>
          <PieChart width={400} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.data1 || []}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            >
              {this.props.data1 &&
                this.props.data1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div style={{ border: '2px solid #f5f5f5', padding: '20px' }}>
          <BarChart
            width={600}
            height={400}
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
            <Bar dataKey="SVG" fill="#00C49F" activeBar={<Rectangle fill="pink" stroke="green" />} />
            <Bar dataKey="SVXS" fill="#e17b7b" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="SVCĐG" fill="#FFBB28" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            <Bar dataKey="SVXS & CĐG" fill="#FF8042" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </div>
      </div>
    );
  }
}
