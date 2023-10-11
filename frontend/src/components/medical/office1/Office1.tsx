import React from "react";
import Button from 'react-bootstrap/Button'
import ssa from '../../../assets/ssa.jpeg'


const Office1: React.FC<{}> = () => {
    return (
        <>
        <div className = "text-center">
             <h1>Watts Office - Social Security Administration</h1>
             <img
                src={ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
             <p>
                Name: Watts Office - Social Security Administration <br/>
                Address: 12429 S. Avalon Blvd. Los Angeles, CA 90061<br/>
                Hours: Monday, Tuesday, Thursday, Friday, 9:00am to 3:00pm; Wednesday, 9:00am to 12:00pm. <br/>
                Phone number: TDD (800) 325-0778, National Toll Free Number Service/Intake (800) 772-1213, Not for Referrals Administrative (323) 754-1404, General Information Service/Intake (877) 836-1558 <br/>
                <a href = "http://egis3.lacounty.gov/lms/?p=56598">URL for their website</a>
                </p>
            <Button name='href' href='../medical' className='card-link'>
                Back to Offices
            </Button>
        </div>
        </>
    );
};

export default Office1;