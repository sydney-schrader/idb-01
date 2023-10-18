import React, { useState, useEffect } from "react";
import { Container, Col, Card, Button } from 'react-bootstrap'
import arcadia from '../../assets/arcadia.jpeg'
import axios from "axios"; 

const City: React.FC<{}> = (card: any, index:any) => {
    return(
        <Card style={{ alignItems: 'center', width: '18rem'}} key={index} className="box">
                <Card.Title className='header-1'>
                  <b>
                    {card.CSA_Label}
                  </b>
                </Card.Title>
                <img
                src={card.imageURL}
                alt={card.CSA_Label}
                className='card-image-top'
                style={{ width: '100%' }}
                />
                <Card.Body>
                
                <p>
                  Unsheltered population: {card.Total_Unsheltered_Pop} <br/>
                  Sheltered population: {card.Total_Sheltered_Pop} <br/>
                  Total homeless population: {card.Total_Pop} <br/>
                  Square miles of city: {card.Square_Miles}<br/>
                  Density of total homeless population: {card.Density_Total} 
              </p>
                  <Button name='href' href={`/cities/${card.CSA_Label}`} className='card-link'>
                    View {card.CSA_Label} *pages not implemented
                  </Button>
                </Card.Body>
              </Card>
      )
}

export default City;