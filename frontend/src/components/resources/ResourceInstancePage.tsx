import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import volunteer from '../../assets/volunteer.jpg'
import axios from "axios"; 
import arcadia from '../../assets/arcadia.jpg'
import ssa from '../../assets/ssa.jpg'
import { useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const GOOGLE_API_KEY_MAP = 'AIzaSyDLa1azh_pIsTMJnhcgNuqobgRfoh9wsgY';

type ResourceParams = {
    resourceName: string;
};

type cityItem = {
  csa_label: string;
  image_url?: string;
  total_unsheltered_pop: number;
  total_sheltered_pop: number;
  total_pop: number;
  square_miles: number;
  density_unsheltered: number;
  density_sheltered?: number; // This is nullable
  density_total: number;
  shelters?: string; // This is nullable
  medicares?: string; // This is nullable
  latitude: number;
  longitude: number;
};

type resourceItem = {
  image_url?: string;
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
  image_url?: string;
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

const ResourceInstancePage: React.FC<{}> = () => {

    const [resourcepageData, setResourcepageData] = useState({} as resourceItem);
    const [cityData, setCityData] = useState({} as cityItem);
    const [medicareData, setMedicareData] = useState({} as medicalItem);
    const { resourceName } = useParams<ResourceParams>();
    const mapContainerStyle = {
      width: '600px',
      height: '400px'
    };
  
    const center = {
      lat: resourcepageData.latitude,
      lng: resourcepageData.longitude
    };

    
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
        const fetchMedDetails = async (medName: string) => {
          try {
              const response = await axios.get(`https://api.lacountyhomelesshelper.me/medicare/${encodeURIComponent(medName!)}`);
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
                setResourcepageData({ ...resourceData});
                if (resourceData.city) {
                    const cityData = await fetchCityDetails(resourceData.city);
                    // Store the shelter details in the state if needed.
                    setCityData(cityData);
                }
                if (resourceData.medicare_name) {
                  const medicareData = await fetchMedDetails(resourceData.medicare_name);
                  // Store the shelter details in the state if needed.
                  setMedicareData(medicareData);
                  //medicareData.imageURL = await fetchCityImage(cityData.medicares);
              }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
		}
		handleResourceList();
	}, [ resourceName])


      
    return (
        <>
            <div className="text-center mb-3">
                <div className="m-3">
                <h1>
                    {resourcepageData.name}
                </h1>
                <img 
             src = {resourcepageData.image_url || volunteer}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = volunteer; // Set the fallback image when an error occurs
                }} />
                </div>
                <Container>
                  <Row>
                    <Col>
                <div style = {{ padding: '40px' }}>
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
            <Button name='backResources' href='../resources' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
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
                src={cityData.image_url || arcadia}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = arcadia; // Set the fallback image when an error occurs
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
                <b>{medicareData.name}</b>
              </Card.Title>
              <img
                src={medicareData.image_url || ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ssa; // Set the fallback image when an error occurs
                }}
              ></img>
              <Card.Body>
              <p>
                Name: {medicareData.name} <br/>
                Address: {medicareData.addrln1}<br/>
                Hours: {medicareData.hours} <br/>
                </p>
                <Button name='href' href={`/medical/${resourcepageData.medicare_name}`} className='card-link'>
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
export default ResourceInstancePage;
