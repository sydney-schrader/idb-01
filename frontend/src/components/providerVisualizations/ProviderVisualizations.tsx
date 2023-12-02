import {
    Stack,
    Container,
  } from "@mui/material";

import DevFreePieChart from "./DevFreePieChart";
import DevIndustryBarChart from "./DevIndustryBarChart";

import DevJobBar from "./DevJobBar";


function ProviderVisualizationPage(props: any) {

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
        <Stack justifyContent="center" direction="column" textAlign="center">
            <h3>Jobs by Type</h3>
        </Stack>
        <Stack justifyContent="center" direction="column" textAlign="center" height="700px">
            <DevJobBar />
        </Stack>
        
        </Container>
    );
}

export default ProviderVisualizationPage;