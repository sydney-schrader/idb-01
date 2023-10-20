import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Card} from 'react-bootstrap'
import axios from "axios"; 
import { useParams } from "react-router-dom";
import { useImages } from "../ImageContext";
import arcadia from '../../assets/arcadia.jpeg'
//jamie
const SEARCH_ENGINE_ID = '129c571c4e1a84a03';
const GOOGLE_API_KEY = 'AIzaSyAwozhLVzasZOIiW387q1P0NMtJTrhvD20';

type CityParams = {
    cityName: string;
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

type medicalItem = {
    name: string;
    imageURL?: string;
    addrln1: string;
    addrln2?: string;
    city?: string;
    hours?: string;
    phones?: string;
    post_id: number;
    description: string;
    zip: string;
    latitude: number;
    longitude: number;
    date_updated: string;
    shelter_name?: string;
    shelter_addrln1?: string;
    shelter_addrln2?: string;
    shelter_hours?: string;
};

const CityInstancePage: React.FC<{}> = () => {

    const [citypageData, setCitypageData] = useState({} as cityItem);
    const [shelterData, setShelterData] = useState({} as resourceItem);
    const [medicareData, setMedicareData] = useState({} as medicalItem);
    const { cityName } = useParams<CityParams>();
    const { images, setImage } = useImages();

    const fetchCityImage = useCallback(async (cityName: string) => {
        if (images[cityName]) {
            return images[cityName];
        }
    
        const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(cityName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
        try {
            const response = await axios.get(endpoint);
            if (response.data.items && response.data.items.length > 0) {
                setImage(cityName, response.data.items[0].link);
                return response.data.items[0].link;
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
        return arcadia;
    }, [images, setImage]);

    useEffect(() => {
        const fetchShelterDetails = async (shelterId: string) => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/shelter/${encodeURIComponent(shelterId!)}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching shelter data:", error);
            }
            return null; // or some default data if needed
        }
        const fetchMedicalDetails = async (medicalID: string) => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/medicare/${encodeURIComponent(medicalID!)}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching shelter data:", error);
            }
            return null; // or some default data if needed
        }
        const handleCityList = async () => {
            const options = {
                method: 'GET',
                url: `http://127.0.0.1:5000/api/city/${encodeURIComponent(cityName!)}`,
                params: { id: cityName },
            };
            
            try {
                const response = await axios.request(options);
                const cityData: cityItem = {
                    ...response.data,
                };
                const imageURL = await fetchCityImage(cityName!);
                setCitypageData({ ...cityData, imageURL }); // Merging the cityData with the imageURL

                // Fetch shelter details if shelter_id is present in the city data
                if (cityData.shelter) {
                    const shelterData = await fetchShelterDetails(cityData.shelter);
                    // Store the shelter details in the state if needed.
                    setShelterData(shelterData);
                }
                // Fetch medicare details if medicare is present in the city data
                if (cityData.medicare) {
                    const medicareData = await fetchMedicalDetails(cityData.medicare);
                    // Store the shelter details in the state if needed.
                    setMedicareData(medicareData);
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        }
    
        handleCityList();
    }, [cityName, fetchCityImage]); 

    return (
        <>
            <div className="text-center mb-3">
                <div className="m-3">
                <h1>
                    {citypageData.csa_label}
                </h1>
                <img 
             src = {citypageData.imageURL}
                alt=""
                className='card-image-top'
                style={{
                  width: '70%',
                }} />
                </div>
                <div style = {{ padding: '0 400px' }}>
                <p className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                    <h2>Information About The {citypageData.csa_label}</h2>
                Unsheltered population: {citypageData.total_unsheltered_pop}<br/>
                Sheltered population: {citypageData.total_sheltered_pop} <br/>
                Total homeless population: {citypageData.total_pop} <br/>
                Square miles of city: {citypageData.square_miles} <br/>
                Density of unsheltered population: {citypageData.density_unsheltered} <br/>
                Density of sheltered population: {citypageData.density_sheltered} <br/>
                Density of total homeless population: {citypageData.density_total} <br/>
            </p>
            </div>
            <Button name='href' href='../cities' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
                Back to Cities
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
                <b>{shelterData.name}</b>
              </Card.Title>
              <img
                src={arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
              Name: {shelterData.name} <br/>
                    City: {shelterData.city}<br/>
                    Hours: {shelterData.hours}<br/>
                    Zip code: {shelterData.zip}<br/>
                    Phone Number: {shelterData.phones}
                </p>
                <Button name='href' href={`/resources/${shelterData.name}`} className='card-link'>
                  View {shelterData.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ alignItems: 'center' }}>
              <Card.Title className='header-1'>
                <b>{medicareData.name}</b>
              </Card.Title>
              <img
                src={arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: {medicareData.name} <br/>
                Address: {medicareData.addrln1}<br/>
                Hours: {medicareData.hours} <br/>
                </p>
                <Button name='href' href={`/medical/${medicareData.name}`} className='card-link'>
                  View {medicareData.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        </>
    )
}
export default CityInstancePage;