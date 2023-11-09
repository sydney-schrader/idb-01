import React from "react";
import {Card, Button } from 'react-bootstrap'
import volunteer from '../../assets/volunteer.jpg'




const Search: React.FC<{}> = (card: any, page:any) => {
    return(
        <Card style={{ alignItems: 'center', width: '18rem'}} className="box">
                <Card.Title className='header-1'>
                  <b>
                    {card.name}
                  </b>
                </Card.Title>
                <img
                src={card.image_url || volunteer}
                alt={card.name}
                className='card-image-top'
                style={{ width: '100%' }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = volunteer; // Set the fallback image when an error occurs
                }}
                />
                <Card.Body>
                <div>
                <p>
                    Name: {card.name || card.csa_label} <br />
                    Address: {card.addrln1} <br />
                    Hours: {card.hours} <br />
                    Zip Code: {card.zip} <br />
                    <a href={card.url || '#'}>{card.url ? 'URL for their website' : 'Website not available'}</a>
                </p>
                <Button name={card.name} href={`/resources/${card.name}`} className='card-link'>
                    View {card.name}
                </Button>
                </div>
                </Card.Body>
              </Card>
      )
}

export default Search;