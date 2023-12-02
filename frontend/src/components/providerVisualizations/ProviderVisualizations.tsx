import {
    CardContent,
    Typography,
    Divider,
    Stack,
    Box,
    Container,
    Tooltip,
    Skeleton,
  } from "@mui/material";

import DevFreePieChart from "./DevFreePieChart";
import DevIndustryBarChart from "./DevIndustryBarChart";


function ProviderVisualizationPage(props: any) {
    // pie chart
    // resources by percentage that are free

    // resources dialect

    // bar chart industries hiring


    // job postings last update over time
    // job posting salary range
    

    return (
        <Container>
        <Stack justifyContent="center" direction="column" textAlign="center">
            <h1>Chiworks Visualizations</h1>
        </Stack>
        <Stack justifyContent="center" direction="column" textAlign="center">
            <h3>Percentage of Free Resources</h3>
        </Stack>
       <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ padding: "30px" }}
       >
        <DevFreePieChart />
       </Stack>
       <Stack justifyContent="center" direction="column" textAlign="center">
            <h3>Employer Industries</h3>
        </Stack>
        <Stack justifyContent="center" direction="column" textAlign="center" height="700px">
            <DevIndustryBarChart />
    </Stack>
        
        </Container>
    );
}

export default ProviderVisualizationPage;