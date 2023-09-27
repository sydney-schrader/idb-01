import React from "react";
import Button from 'react-bootstrap/Button'
import family from '../../../assets/familycrisiscenter.png'


const Shelter2: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>1736 Family Crisis Center</h1>
             <img
                src={family}
                alt=""
                className='card-image-top'
                style={{
                  width: '25%',
                }}
              ></img>
             <p>
              Name: 1736 Family Crisis Center<br/>
                    City: Los Angeles<br/>
                    Hours: Monday through Friday, 8:30am to 5:30pm. Evenings and Saturdays by appointment<br/>
                    Zip code: 90018<br/>
                    Phone Number: 24 Hrs-Crisis Hotline Service/Intake and Hotline (213) 222-1237, 24 Hrs-Youth Crisis/Shelter Hotline Service/Intake and Hotline (310) 379-3620, 24 Hrs-DV Shelter Hotline Service/Intake and Hotline (310) 370-5902, Community Service Center Service/Intake an
                </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
        </div>
        </>
    );
};

export default Shelter2;