import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import { useImages } from "../ImageContext";
import volunteer from '../../assets/volunteer.jpg'
import axios from "axios"; 
import { useParams } from "react-router-dom";
//pavan
const SEARCH_ENGINE_ID = '553cf4cb73ceb44f9';
const GOOGLE_API_KEY = 'AIzaSyBKgsK1qxLNrUTRUmjmEUCWlQxxEgH__j8';

type ResourceParams = {
    resourceName: string;
};


type resourceItem = {
    imageURL?: string;
    name: string;
    addrln1?: string;
    addrln2?: string;
    city?:string;
    hours?: string;
    phones?: string;
    url?: string;
    post_id: number;
    description: string;
    zip:string;
    link: string;
    latitude: number;
    longitude: number;
    date_updated: string;
    medicare_name?: string;
    medicare_addrln1?: string;
    medicare_addrln2?: string;
    medicare_hours?: string;
};

type cityItem = {
    csa_label: string;
    imageURL?: string;
    total_unsheltered_pop: number;
    total_sheltered_pop: number;
    total_pop: number;
    square_miles: number;
    density_unsheltered: number;
    density_sheltered?: number; // This is nullable
    density_total: number;
    shelter?: string; // This is nullable
    medicare?: string; // This is nullable
};

const ResourceInstancePage: React.FC<{}> = () => {

    const [resourcepageData, setResourcepageData] = useState({} as resourceItem);
    const [cityData, setCityData] = useState({} as cityItem);
    const { images, setImage } = useImages();
    const { resourceName } = useParams<ResourceParams>();

    const fetchShelterImage = useCallback(async (shelterName: string) => {
        if (images[shelterName]) {
            return images[shelterName];
        }
    
        const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(shelterName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
        try {
            const response = await axios.get(endpoint);
            if (response.data.items && response.data.items.length > 0) {
                setImage(shelterName, response.data.items[0].link);
                return response.data.items[0].link;
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
        return volunteer;
    }, [images, setImage]);

    
    useEffect(() => {
        const fetchCityDetails = async (cityName: string) => {
            try {
                const response = await axios.get(`https://api.lacountyhomelesshelper.me/city/${encodeURIComponent(cityName!)}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching shelter data:", error);
            }
            return null; // or some default data if needed
        }
		const handleResourceList = async() => {
			const options = {
				method: 'GET',
				url: `https://api.lacountyhomelesshelper.me/shelter/${encodeURIComponent(resourceName!)}`,
                params: {id: resourceName},
			};
			try {
                const response = await axios.request(options);
                const resourceData: resourceItem = {
                    ...response.data,
                };
                const imageURL = await fetchShelterImage(resourceName!);
                setResourcepageData({ ...resourceData, imageURL }); // Merging the cityData with the imageURL
                if (resourceData.city) {
                    const cityData = await fetchCityDetails(resourceData.city);
                    // Store the shelter details in the state if needed.
                    setCityData(cityData);
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
		}
		handleResourceList();
	}, [ resourceName, fetchShelterImage])


      
    return (
        <>
            <div className="text-center mb-3">
                <div className="m-3">
                <h1>
                    {resourcepageData.name}
                </h1>
                <img 
             src = {resourcepageData.imageURL}
                alt=""
                className='card-image-top'
                style={{
                  width: '70%',
                }} />
                </div>
                <div style = {{ padding: '0 400px' }}>
                <p className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                    <h2>Information About The {resourcepageData.name}</h2>
                Address: {resourcepageData.addrln1} <br/>
                Zip: {resourcepageData.zip}<br/>
                Hours: {resourcepageData.hours} <br/>
                Phone: {resourcepageData.phones || 'Unavailable'} <br/>
                <a href={resourcepageData.url || "#"}>{resourcepageData.url ? "URL for their website" : "Website not available"}</a><br/>
                {resourcepageData.description} <br/>
            </p>
            </div>
            <Button name='href' href='../resources' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
                Back to Resources
            </Button>
            </div>
            <Container>
        <Col>
            <h1 className="text-center">Other Resources</h1>
        </Col>
        <Row>
        <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>{cityData.csa_label}</b>
              </Card.Title>
              <img
                src={volunteer}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
              Unsheltered population: {cityData.total_unsheltered_pop} <br/>
                  Sheltered population: {cityData.total_sheltered_pop} <br/>
                  Total homeless population: {cityData.total_pop} <br/>
                  Square miles of city: {cityData.square_miles}<br/>
                  Density of total homeless population: {cityData.density_total} 
                </p>
                <Button name='href' href={`/cities/${cityData.csa_label}`} className='card-link'>
                  View {cityData.csa_label}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>{resourcepageData.medicare_name}</b>
              </Card.Title>
              <img
                src={volunteer}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: {resourcepageData.medicare_name} <br/>
                Address: {resourcepageData.medicare_addrln1}<br/>
                Hours: {resourcepageData.medicare_hours} <br/>
                </p>
                <Button name='href' href={`/medical/${resourcepageData.medicare_name}`} className='card-link'>
                  View {resourcepageData.medicare_name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        </>
    )
}
export default ResourceInstancePage;