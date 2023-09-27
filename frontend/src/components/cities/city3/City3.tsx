import React from "react";
import Button from 'react-bootstrap/Button'
import arcadia from '../../../assets/arcadia.jpeg'


const City3: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>City of Arcadia</h1>
             <img
                src={arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              />
             <p>
                Unsheltered population: 68 <br/>
                Sheltered population: 0 <br/>
                Total homeless population: 68 <br/>
                Square miles of city: 10.2404110274238<br/>
                Density of total homeless population: 6.64035846001651 
            </p>
            <Button name='href' href='../cities' className='card-link'>
                Back to Cities
            </Button>
        </div>
        </>
    );
};

export default City3;