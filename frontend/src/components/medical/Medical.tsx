import React from "react";
import { Card, Button } from 'react-bootstrap'
import ssa from '../../assets/ssa.jpg'
import Highlighter from "react-highlight-words";

interface MedicalProps {
  card: any;  // Replace 'any' with a more specific type if possible
  index: number;
  highlight: string;
}

const Medical: React.FC<MedicalProps> = ({ card, index, highlight = null }) => {
  const highlightStyle = {
    padding: 0, 
  };

  return(
    <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
            <Card.Title className='header-1'>
              <b>
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.name}
                />
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