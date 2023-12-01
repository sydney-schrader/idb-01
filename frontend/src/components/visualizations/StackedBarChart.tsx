import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type CityData = {
  name: string;
  sheltered_population: number;
  unsheltered_population: number;
  // Add other properties if needed
};

type StackedBarChartProps = {
  data: CityData[];
};

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
  console.log(data); // Log the data to the console
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={600}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 80,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-15} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sheltered_population" stackId="a" fill="#ffa07b" />
        <Bar dataKey="unsheltered_population" stackId="a" fill="#ffadf1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;

