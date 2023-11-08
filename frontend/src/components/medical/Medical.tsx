import React from "react";
import { Card, Button } from 'react-bootstrap'
import ssa from '../../assets/ssa.jpg'


const Medical: React.FC<{}> = (card: any, index:any) => {
  return(
    <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
            <Card.Title className='header-1'>
              <b>
                {card.name}
              </b>
            </Card.Title>
            <img
            src={card.image_url || ssa}
            alt={card.csa_label}
            className='card-image-top'
            style={{ width: '100%' }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.src = ssa; // Set the fallback image when an error occurs
            }}
            />
            <Card.Body>
            
            <p>
              Name: {card.name} <br/>
              Address: {card.addrln1} <br/>
              Hours: {card.hours} <br/>
              Phone number: {card.phones}<br/>
              City: {card.city}
            </p> 
              <Button name={card.name} href={`/medical/${card.name}`} className='card-link'>
                View {card.name}
              </Button>
            </Card.Body>
          </Card>
  )
}

export default Medical;