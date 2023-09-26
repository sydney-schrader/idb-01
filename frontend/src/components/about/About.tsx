import React from "react";
import { Container } from '@mui/material';
import { render } from "@testing-library/react";
  
const About: React.FC<{}> = () => {
    
    return (
        <Container className="page-container" sx={{ textAlign: "center" }}>
            {/* <Typography sx={{ margin: "16px" }} variant="h3">
                About LAHomlessHelper
            </Typography> */}
            <div>
                <h1>
                    About LAHomlessHelper
                </h1>
                The county of Los Angeles has the largest homeless population in the United States. 
                We created a website that is a tool for both people wanting to help the homeless people around them 
                and also a tool for homeless people to see what resources are available for them.
            </div>

        </Container>
    );
    
   
};
 
export default About;