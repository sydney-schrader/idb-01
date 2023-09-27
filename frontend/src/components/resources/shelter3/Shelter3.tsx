import React from "react";
import Button from 'react-bootstrap/Button'


const Shelter3: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>Shelter 3</h1>
             <p>
             Name <br/>
                    City<br/>
                    Hours<br/>
                    Zip code<br/>
                    Phone Number
            </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
        </div>
        </>
    );
};

export default Shelter3;