import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

type CityData = {
  name: string;
  sheltered_population: number;
  unsheltered_population: number;
};

type PieChartProps = {
  data: CityData[];
};

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
  // Assuming data is already processed into ProcessedCityData format
  const processedData = data.map(city => ({
    name: city.name,
    value: city.unsheltered_population,
    percentage: (city.unsheltered_population / (city.unsheltered_population + city.sheltered_population)) * 100,
  }));

  // Colors for pie chart segments
  const COLORS = ['#979ab9', '#79ac4f', '#80ccfa', '#e27d8a', '#6d5c4b'];

  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          
          <Pie
            dataKey="value"
            data={processedData}
            cx="50%"
            cy="50%"
            outerRadius={250}
            fill="#8884d8"
            //label={(entry) => `(${entry.payload.percentage.toFixed(2)}%)`} // Display city name and value as label
          >
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onMouseEnter={() => {
                  // Add hover effect, e.g., change color
                  // You can customize this behavior based on your needs
                  console.log(`Hovered over ${entry.name}`);
                }}
                onMouseLeave={() => {
                  // Remove hover effect
                  console.log(`Left ${entry.name}`);
                }}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => `${props.payload.percentage.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>

      {/* Additional content */}
      <div>
        {/* You can add other information or components here */}
      </div>
    </>
  );
};

export default CustomPieChart;
