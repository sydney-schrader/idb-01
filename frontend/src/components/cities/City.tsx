import React from "react";
import {  Card, Button } from 'react-bootstrap'
import arcadia from '../../assets/arcadia.jpg'
import Highlighter from "react-highlight-words";

interface CityProps {
  card: any;  // Replace 'any' with a more specific type if possible
  index: number;
  highlight: string;
}


const City: React.FC<CityProps> = ({ card, index, highlight = null }) => {
  const highlightStyle = {
    padding: 0, 
  };
  
    return(
        <Card style={{ alignItems: 'center', width: '18rem', padding: "0 10px"}} key={index} className="box">
                <Card.Title className='header-1'>
                  <b>
                      <Highlighter
                        highlightClassName="highlighter"
                        highlightStyle={highlightStyle}
                        searchWords={highlight?.split(" ") ?? []}
                        autoEscape={true}
                        textToHighlight={card.csa_label}
                      />
                  </b>
                </Card.Title>
                <img
                src={card.image_url || arcadia}
                alt={card.csa_label}
                className='card-image-top'
                style={{ width: '100%' }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = arcadia; // Set the fallback image when an error occurs
                }}
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