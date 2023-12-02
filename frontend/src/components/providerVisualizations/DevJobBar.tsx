
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


type jobResult = {
    job_type: string;
};

type jobBarData = {
    name: string;
    count: number;
};

const DevJobBar: React.FC = () => {
    const [jobData, setJobData] = useState<jobResult[]>([]);

    useEffect(() => {
        axios.get(`https://api.chiworks.me/jobs`)
        .then(async (response) => {
          const updatedData = await Promise.all(response.data.map(async (job: any) => {
            return job;
          }));
          setJobData(updatedData);
        });  
    }, []);
    
    
    var typeCounts: { [key: string]: number } = {};

    for(let i = 0; i < jobData.length; i++) {
        if(jobData[i].job_type !== "") {
            if(typeCounts[jobData[i].job_type]) {
                typeCounts[jobData[i].job_type]++;
            } else {
                typeCounts[jobData[i].job_type] = 1
            }
        }
      }
    
    var dataArray:jobBarData[] = Object.keys(typeCounts).map(key => ({
        name: key,
        count: typeCounts[key]
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
                <Bar dataKey="count" fill="#ffadf1" />  
            </BarChart>
        </ResponsiveContainer>
    
    );
};

export default DevJobBar;