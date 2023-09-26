import React from 'react';
import './home.css'
import Button from '../Nav/Button';
import Section from '../Nav/Button';

function Home() {
    return (
        <>
        <div className='background'>
            <h1 className='title'>
                Los Angeles <br/> Homeless Helper
            </h1>
        </div>
        <div>
           <h1 className='lower-title'>
             three main pages here
           </h1>
        </div>
    `` <Section title={"Cities"}/> <Section title={"Resources"}/> <Section title={"Medical"}/>
        </>
    );
    
   
};
 
export default Home;
