import React, { useState, useEffect } from "react";
import axios from "axios"; 
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Define the data type
type PieChartData = {
  name: string;
  value: number;
};

// "api_url": "https://api.chiworks.me/resources"

const DevFreePieChart: React.FC = () => {
  const [resourcesData, setResourcesData] = useState<any[]>([]);

  // Colors for each slice
  const COLORS = ['#979ab9', '#79ac4f', '#80ccfa', '#e27d8a', '#6d5c4b'];


  useEffect(() => {
      axios.get(`https://api.chiworks.me/resources`)
      .then(async (response) => {
        const updatedData = await Promise.all(response.data.map(async (resource: any) => {
          return resource;
        }));
        setResourcesData(updatedData);
      });  
  }, []);

  var freeCount = 0;
  for(let i = 0; i < resourcesData.length; i++) {
    if(resourcesData[i].price == "Free") {
        freeCount++;
    }
  }
  const data: PieChartData[] = [
    { name: 'Free Resources', value: (freeCount / resourcesData.length) * 100 },
    { name: 'Not Free', value: ((resourcesData.length - freeCount) / resourcesData.length) * 100},
  ];


  
  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={250}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onMouseEnter={() => {
                  console.log(`Hovered over ${entry.name}`);
                }}
                onMouseLeave={() => {
                  // Remove hover effect
                  console.log(`Left ${entry.name}`);
                }}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => `${props.payload.value.toFixed(2)}%`} />
        </PieChart>
      </ResponsiveContainer>

    </>
  );
};

export default DevFreePieChart;
