import React from "react";
import Button from 'react-bootstrap/Button'
import westwood from '../../../assets/westwood.jpeg'

const Office3: React.FC<{}> = () => {
    return (
        <>
        <div>
             <h1>Westwood Office - Social Security Administration</h1>
             <img
                src={westwood}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
             <p>
                Name: Westwood Office - Social Security Administration <br/>
                Address: 11500 W Olympic Blvd. Los Angeles, CA 90064 <br/>
                Hours: Monday through Friday, 9:00am to 3:30pm. <br/>
                Phone number: TDD (800) 325-0778, National Toll Free Number Service/Intake (800) 772-1213, Not for referrals Administrative (310) 575-9464, Service/Intake (866) 964-4779 <br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56601">URL for their website</a>
                </p>
            <Button name='href' href='../medical' className='card-link'>
                Back to Offices
            </Button>
        </div>
        </>
    );
};

export default Office3;