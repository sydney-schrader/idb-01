import React from "react";
import Button from 'react-bootstrap/Button'
import santaanita from '../../../assets/santaanita.jpeg'


const Shelter3: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>Santa Anita Family Service</h1>
             <img
                src={santaanita}
                alt=""
                className='card-image-top'
                style={{
                  width: '90%',
                }}
              ></img>
             <p>
              Name: Santa Anita Family Service <br/>
                    City: Monrovia<br/>
                    Hours: None<br/>
                    Zip code: 91016<br/>
                    Phone Number: Service/Intake and Administration (626) 359-9358, FAX (626) 358-7647
                </p>
            <Button name='href' href='../resources' className='card-link'>
                Back to Resources
            </Button>
        </div>
        </>
    );
};

export default Shelter3;