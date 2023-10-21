import React from "react";
import {  Card, Button } from 'react-bootstrap'


const City: React.FC<{}> = (card: any, index:any) => {
    return(
        <Card style={{ alignItems: 'center', width: '18rem', padding: "0 20px"}} key={index} className="box">
                <Card.Title className='header-1'>
                  <b>
                    {card.csa_label}
                  </b>
                </Card.Title>
                <img
                src={card.imageURL}
                alt={card.csa_label}
                className='card-image-top'
                style={{ width: '100%' }}
                />
                <Card.Body className="text-center">
                
                <p >
                  Unsheltered population: {card.total_unsheltered_pop} <br/>
                  Sheltered population: {card.total_sheltered_pop} <br/>
                  Total homeless population: {card.total_pop} <br/>
                  Square miles of city: {card.square_miles}<br/>
                  Density of total homeless population: {card.density_total} 
              </p>
                  <Button name={card.csa_label} href={`/cities/${card.csa_label}`} className='card-link '>
                    View {card.csa_label}
                  </Button>
                </Card.Body>
              </Card>
      )
}

export default City;