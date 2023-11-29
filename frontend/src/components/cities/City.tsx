import React from "react";
import {  Card, Button } from 'react-bootstrap'
import arcadia from '../../assets/arcadia.jpg'
import Highlighter from "react-highlight-words";
import "../medical/medicalCard.css"


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
        <Card style={{ alignItems: 'center', width: '18rem', height: "50rem", padding: "0 10px"}} key={index} className="box">
                <div className='card-title'>
                  <b>
                      <Highlighter
                        highlightClassName="highlighter"
                        highlightStyle={highlightStyle}
                        searchWords={highlight?.split(" ") ?? []}
                        autoEscape={true}
                        textToHighlight={card.csa_label}
                      />
                  </b>
                </div>
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
                <Card.Body >
                
                <p >
                  {/* Unsheltered population: {card.total_unsheltered_pop} <br/>
                  Sheltered population: {card.total_sheltered_pop} <br/>
                  Total homeless population: {card.total_pop} <br/>
                  Square miles of city: {card.square_miles}<br/>
                  Density of total homeless population: {card.density_total}  */}
                  <div className="card-text"> Unsheltered Population:</div>
                  {card.total_unsheltered_pop}<br/>
              
              <div className="card-text"> Sheltered Population:</div> 
                {card.total_sheltered_pop} <br/>
              
              <div className="card-text"> Total Homeless Population:</div>
                {card.total_pop || "Not Found"} <br/>
                
              <div className="card-text"> Square Miles of City:</div>
                {card.square_miles || "Not Found"} <br/>
                
              <div className="card-text"> Density of Total Homeless Population:</div>
                {card.density_total}<br/>
              </p>
                  <Button name={card.csa_label} href={`/cities/${card.csa_label}`} className='card-link '>
                    View {card.csa_label}
                  </Button>
                </Card.Body>
              </Card>
      )
}

export default City;