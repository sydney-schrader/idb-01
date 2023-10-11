import React from "react";
import Button from 'react-bootstrap/Button'
import elmonte from '../../../assets/elmonta.jpeg'


const Office2: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>El Monte Office - Social Security Administration</h1>
             <img
                src={elmonte}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
             <p>
                Name: El Monte Office - Social Security Administration <br/>
                Address: 9351 Telstar Ave. El Monte, CA 91731 <br/>
                Hours: Monday through Friday, 9:00am to 3:30pm. <br/>
                Phone number  Service/Intake (866) 931-0340, National Toll Free Number Service/Intake (800) 772-1213, Not for referral Administrative (866) 643-3453<br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56600">URL for their website</a>
                </p>
            <Button name='href' href='../medical' className='card-link'>
                Back to Offices
            </Button>
        </div>
        </>
    );
};

export default Office2;