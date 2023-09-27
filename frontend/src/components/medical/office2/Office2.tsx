import React from "react";
import Button from 'react-bootstrap/Button'


const Office2: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>Office 2</h1>
             <p>
             Name <br/>
                Address <br/>
                Hours <br/>
                Phone number <br/>
                URL for their website
            </p>
            <Button name='href' href='../medical' className='card-link'>
                Back to Offices
            </Button>
        </div>
        </>
    );
};

export default Office2;