import React from "react";
import {Card, Button } from 'react-bootstrap'

const Resource: React.FC<{}> = (card: any, index:any) => {
    return(
        <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
                <Card.Title className='header-1'>
                  <b>
                    {card.name}
                  </b>
                </Card.Title>
                <img
                src={card.imageURL}
                alt={card.name}
                className='card-image-top'
                style={{ width: '100%' }}
                />
                <Card.Body>
                
                <p>
                  Name: {card.name} <br/>
                  Address: {card.addrln1} <br/>
                  Hours: {card.hours} <br/>
                  Zip Code: {card.zip}<br/>
                  <a href={card.url || "#"}>{card.url ? "URL for their website" : "Website not available"}</a>

              </p>
                  <Button name='href' href={`/resources/${card.name}`} className='card-link'>
                    View {card.name}
                  </Button>
                </Card.Body>
              </Card>
      )
}

export default Resource;