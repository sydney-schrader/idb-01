import React from "react";
import Button from 'react-bootstrap/Button'
import ssg from '../../../assets/ssg.jpeg'


const Shelter1: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>Special Service For Groups - Project 180</h1>
             <img
                src={ssg}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
             <p>
                    Name: Special Service For Groups - Project 180<br/>
                    City: Los Angeles<br/>
                    Hours: SITE HOURS: Monday through Friday, 8:30am to 4:30pm.<br/>
                    Zip code: 90013<br/>
                    Phone Number: FAX (213) 621-4155, Service/Intake (213) 620-5712
                </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
        </div>
        </>
    );
};

export default Shelter1;