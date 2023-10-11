import React from "react";
import Button from 'react-bootstrap/Button'
import agourahills from '../../../assets/agoura-hills.jpeg'


const City1: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>City of Agoura Hills</h1>
             <img 
             src = {agourahills}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }} />
             <p>
                Unsheltered population: 2<br/>
                Sheltered population: 0 <br/>
                Total homeless population: 2 <br/>
                Square miles of city: 5.42772257254032 <br/>
                Density of total homeless population: 0.368478670984089
            </p>
            <Button name='href' href='../cities' className='card-link'>
                Back to Cities
            </Button>
        </div>
        </>
    );
};

export default City1;