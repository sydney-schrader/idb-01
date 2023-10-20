import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; 
import ssa from '../../assets/ssa.jpeg'
import { Button, Container, Row, Col, Card} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { useImages } from '../ImageContext';
import arcadia from '../../assets/arcadia.jpeg'
import volunteer from '../../assets/volunteer.jpg'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const GOOGLE_API_KEY_MAP = 'AIzaSyDLa1azh_pIsTMJnhcgNuqobgRfoh9wsgY';
//ZACH
const SEARCH_ENGINE_ID = '226027a2f9e54422b';
const GOOGLE_API_KEY = 'AIzaSyAiNi5igRxIAvxcuZ1TRL7ii-Eu3sWLaWE';


type MedicalParams = {
    medicalName: string;
};


type medicalItem = {
    name: string;
    imageURL?: string;
    shelterimageURL?: string;
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

const MedicalInstancePage: React.FC<{}> = () => {

    const [medicalpageData, setMedicalpageData] = useState({} as medicalItem)
    const [cityData, setCityData] = useState({} as cityItem)
    const { medicalName } = useParams<MedicalParams>();
    const { images, setImage } = useImages();
    const mapContainerStyle = {
      width: '600px',
      height: '400px'
    };
  
    const center = {
      lat: medicalpageData.latitude,
      lng: medicalpageData.longitude
    };

    const fetchCityDetails = async (cityName: string) => {
        try {
            const response = await axios.get(`https://api.lacountyhomelesshelper.me/city/${encodeURIComponent(cityName!)}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching shelter data:", error);
        }
        return null; // or some default data if needed
    }

    const fetchOfficeImage = useCallback(async (officeName: string) => {
      // First, check if the image URL is already in the context
      if (images[officeName]) {
        return images[officeName];
      }
    
      const endpoint = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(officeName)}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
      try {
          const response = await axios.get(endpoint);
          if (response.data.items && response.data.items.length > 0) {
              const imageURL = response.data.items[0].link;
              setImage(officeName, imageURL);
              return imageURL;
          }
      } catch (error) {
          console.error("Error fetching image:", error);
      }
      return ssa; // default to ssa image if no image is found or an error occurs
    }, [images, setImage]); 
    useEffect(() => {
		const handleMedicalList = async() => {
			const options = {
				method: 'GET',
				url: `https://api.lacountyhomelesshelper.me/medicare/${encodeURIComponent(medicalName!)}`,
                params: {id: medicalName},
			};
			try {
                const response = await axios.request(options);
                const medicalData: medicalItem = {
                    ...response.data,
                };
                const imageURL = await fetchOfficeImage(medicalName!);
                setMedicalpageData({ ...medicalData, imageURL }); // Merging the cityData with the imageURL
                medicalData.shelterimageURL = await fetchOfficeImage(medicalData.shelter_name!);
                if (medicalData.city) {
                    const cityData = await fetchCityDetails(medicalData.city);
                    // Store the shelter details in the state if needed.
                    setCityData(cityData);
                    cityData.imageURL = await fetchOfficeImage(medicalData.city!);
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        }
		handleMedicalList();
    }, [medicalName, fetchOfficeImage]);

    return (
        <>
            <div className="text-center mb-3">
                <div className="m-3">
                <h1>
                    {medicalpageData.name}
                </h1>
                <img 
             src = {medicalpageData.imageURL}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }} />
                </div>
                <Container>
                  <Row>
                    <Col>
                <div style = {{ padding: '0 40px' }}>
                <p className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                    <h2>Information About The {medicalpageData.name}</h2>
                Address: {medicalpageData.addrln1} <br/>
                Zip: {medicalpageData.zip}<br/>
                Hours: {medicalpageData.hours} <br/>
                Phone: {medicalpageData.phones || 'Unavailable'} <br/>
                {medicalpageData.description} <br/>
            </p>
            </div>
            </Col>
            <Col>
            <div style = {{ padding: '40px' }}>
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY_MAP}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}>
                <Marker position={center}/>
              </GoogleMap>
            </LoadScript>
            </div>
            </Col>
            </Row>
            </Container>
            <Button name='href' href='../medical' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
                Back to Medical
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
                src={cityData.imageURL || arcadia}
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
                <b>{medicalpageData.shelter_name}</b>
              </Card.Title>
              <img
                src={medicalpageData.shelterimageURL || volunteer}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
              ></img>
              <Card.Body>
              <p>
                Name: {medicalpageData.shelter_name} <br/>
                Address: {medicalpageData.shelter_addrln1}<br/>
                Hours: {medicalpageData.shelter_hours} <br/>
                </p>
                <Button name='href' href={`/resources/${medicalpageData.shelter_name}`} className='card-link'>
                  View {medicalpageData.shelter_name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        </Container>
        </>
    )
}
export default MedicalInstancePage;