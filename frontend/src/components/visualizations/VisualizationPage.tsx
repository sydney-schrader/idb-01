import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import StackedBarChart from './StackedBarChart'
import CustomPieChart from "./CustomPieChart";
import ScatterPlot from "./ScatterPlot";

type CityData = {
  csa_label: string;
  total_sheltered_pop: number;
  total_unsheltered_pop: number;
  // Add other properties if needed
};

type ProcessedCityData = {
  name: string;
  sheltered_population: number;
  unsheltered_population: number;
  // Add other properties if needed
};

const processShelterData = (data: CityData[]): ProcessedCityData[] => {
  return data
    .filter((city) => city.total_sheltered_pop > 200 && city.total_unsheltered_pop > 200)
    .map((city) => ({
      name: city.csa_label,
      sheltered_population: city.total_sheltered_pop,
      unsheltered_population: city.total_unsheltered_pop,
      // Add other properties if needed
    }));
};

const VisualizationPage: React.FC = () => {
  const [cityData, setCityData] = useState<CityData[]>([]);

  useEffect(() => {
    // Fetch or set your city data
    const fetchData = async () => {
      // Example using fetch
      const response = await fetch('https://api.lacountyhomelesshelper.me/cities');
      const data: CityData[] = await response.json();
      setCityData(data);
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  const processedData: ProcessedCityData[] = processShelterData(cityData);

  return (
    <>
    <Stack justifyContent="center" direction="column" textAlign="center"><h1> Visualizations </h1></Stack>
    <Stack justifyContent="center" direction="column" textAlign="center" height="700px">
            <h2> Sheltered and Unsheltered Homeless by City </h2>
            <StackedBarChart data={processedData} />
    </Stack>
    <Stack justifyContent="center" direction="column" textAlign="center" height="600px">
            <h2> Percentage of Unsheltered Homeless by City </h2>
            <CustomPieChart data={processedData} />
    </Stack>
    <Stack justifyContent="center" direction="column" textAlign="center" height="600px">
            <h2> Percentage of Unsheltered Homeless by City </h2>
            <ScatterPlot />
    </Stack>
        </>
  );
};

export default VisualizationPage;