import React from "react";
import {Card, Button } from 'react-bootstrap'
import volunteer from '../../assets/volunteer.jpg'
import Highlighter from "react-highlight-words";

interface ResourceProps {
  card: any;  // Replace 'any' with a more specific type if possible
  index: number;
  highlight: string;
}

const Resource: React.FC<ResourceProps> = ({ card, index, highlight = null }) => {
  const highlightStyle = {
    padding: 0, 
  };  
  
  return(
        <Card style={{ alignItems: 'center', width: '18rem', height: '50rem'}} key={index} className="box">
                <Card.Title className='header-1' style={{ width: '100%', height: '10%'}}>
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
                src={card.image_url || volunteer}
                alt={card.name}
                className='card-image-top'
                style={{ width: '100%', height: '40%'}}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = volunteer; // Set the fallback image when an error occurs
                }}
                />
                <Card.Body>
                
                <p>
                  {/* Name: {card.name} <br/>
                  Address: {card.addrln1} <br/>
                  Hours: {card.hours} <br/>
                  Zip Code: {card.zip}<br/>
                  <a href={`https://${card.url}`}>{card.url ? "URL for their website" : "Website not available"}</a> */}
                  <div className="card-text"> Name:</div>
                
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.name}
                />
              <br/>
              
              <div className="card-text"> Address:</div> 
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.addrln1}
                />
              <br/>
              
              <div className="card-text"> Hours:</div>
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.hours || "Not Found"}
                />
              <br/>
                <div className="card-text"> Phone Number:</div>
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.phones || "Not Found"}
                />
              <br/>
                <div className="card-text"> City:</div>
                <Highlighter
                  highlightClassName="highlighter"
                  highlightStyle={highlightStyle}
                  searchWords={highlight?.split(" ") ?? []}
                  autoEscape={true}
                  textToHighlight={card.city}
                />
              <br/>
              </p>
                  <Button name={card.name} href={`/resources/${card.name}`} className='card-link'>
                    View {card.name}
                  </Button>
                </Card.Body>
              </Card>
      )
}

export default Resource;