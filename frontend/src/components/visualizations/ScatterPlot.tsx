import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ScatterChart,
  Scatter,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type ResourceData = {
  addrln1: string;
  addrln2: string | null;
  city: string;
  date_updated: string;
  description: string;
  hours: string | null;
  image_url: string;
  latitude: number;
  link: string;
  longitude: number;
  medicare_addrln1: string;
  medicare_addrln2: string | null;
  medicare_hours: string | null;
  medicare_name: string;
  name: string;
  phones: string[] | null;
  post_id: number;
  url: string | null;
  zip: string;
};

const ScatterPlot: React.FC = () => {
  const [resourceData, setResourceData] = useState<ResourceData[]>([]);

  useEffect(() => {
    // Fetch or set your resource data
    const fetchData = async () => {
      // Example using axios
      const response = await axios.get('https://api.lacountyhomelesshelper.me/shelters');
      setResourceData(response.data);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  // Count the number of resources by city
  const cityResourceCounts: { [key: string]: number } = {};
  resourceData.forEach(resource => {
    const city = resource.city;
    cityResourceCounts[city] = (cityResourceCounts[city] || 0) + 1;
  });

  // Convert data to an array for scatter plot and sort by count
  const scatterData = Object.keys(cityResourceCounts)
    .map(city => ({ city, count: cityResourceCounts[city], jitter: Math.random() - 0.5 })) // Add jitter


  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <YAxis type="number" dataKey="count" name="Number of Resources" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={(props) => {
          const { payload } = props;
          if (payload && payload.length > 0) {
            const city = payload[0].payload.city;
            const count = payload[0].payload.count;
            return (
              <div style={{ background: '#fff', padding: '10px', border: '1px solid #ccc' }}>
                <div>{`City: ${city}`}</div>
                <div>{`Number of Resources: ${count}`}</div>
              </div>
            );
          }
          return null;
        }} />
        <Legend />
        {/* Scatter is self-closing, no need for a closing tag */}
        <Scatter name="Number of Resources" data={scatterData} fill="#8884d8">
          {scatterData.map((entry, index) => (
            <Scatter key={`point-${index}`} cx={entry.city} cy={entry.count + entry.jitter * 5} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterPlot;
