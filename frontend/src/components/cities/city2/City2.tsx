import React from "react";
import Button from 'react-bootstrap/Button'
import alhambra from '../../../assets/alhambra.jpeg'

const City2: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>City of Alhambra</h1>
             <img
                src={alhambra}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              />
             <p>
                Unsheltered population: 32 <br/>
                Sheltered population: 14 <br/>
                Total homeless population: 46 <br/>
                Square miles of city: 7.63002893846662 <br/>
                Density of total homeless population: 6.02881068616818 
                </p>
            <Button name='href' href='../cities' className='card-link'>
                Back to Cities
            </Button>
        </div>
        </>
    );
};

export default City2;