import React from "react";
import Button from 'react-bootstrap/Button'


const City1: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>City 1</h1>
             <p>
                Unsheltered population <br/>
                Sheltered population <br/>
                Total homeless population <br/>
                Square miles of city <br/>
                Density of total homeless population 
            </p>
            <Button name='href' href='../cities' className='card-link'>
                Back to Cities
            </Button>
        </div>
        </>
    );
};

export default City1;