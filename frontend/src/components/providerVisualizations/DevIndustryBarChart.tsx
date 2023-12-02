import React, { useState, useEffect } from "react";
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
import axios from "axios"; 


type employerResult = {
    industry: string;
};

type employerBarData = {
    name: string;
    count: number;
};

const DevIndustryBarChart: React.FC = () => {
    const [employerData, setEmployerData] = useState<employerResult[]>([]);

    useEffect(() => {
        axios.get(`https://api.chiworks.me/employers`)
        .then(async (response) => {
          const updatedData = await Promise.all(response.data.map(async (resource: any) => {
            return resource;
          }));
          setEmployerData(updatedData);
        });  
    }, []);
    
    
    var industryCounts: { [key: string]: number } = {};

    for(let i = 0; i < employerData.length; i++) {
        if(industryCounts[employerData[i].industry]) {
            industryCounts[employerData[i].industry]++;
        } else {
            industryCounts[employerData[i].industry] = 1
        }
      }
    
    var dataArray:employerBarData[] = Object.keys(industryCounts).map(key => ({
        name: key,
        count: industryCounts[key]
    }));
    
   
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={600}
            height={600}
            data={dataArray}
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
                <Bar dataKey="count" fill="#ffa07b" />  
            </BarChart>
        </ResponsiveContainer>
    
    );
};

export default DevIndustryBarChart;