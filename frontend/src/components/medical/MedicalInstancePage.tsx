import React, { useState, useEffect} from "react";
import axios from "axios"; 
import ssa from '../../assets/ssa.jpg'
import { Button, Container, Row, Col, Card} from 'react-bootstrap'
import { useParams } from "react-router-dom";
import arcadia from '../../assets/arcadia.jpg'
import volunteer from '../../assets/volunteer.jpg'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const GOOGLE_API_KEY_MAP = 'AIzaSyDLa1azh_pIsTMJnhcgNuqobgRfoh9wsgY';



type MedicalParams = {
    medicalName: string;
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

const MedicalInstancePage: React.FC<{}> = () => {

    const [medicalpageData, setMedicalpageData] = useState({} as medicalItem)
    const [cityData, setCityData] = useState({} as cityItem)
    const [shelterData, setShelterData] = useState({} as resourceItem);
    const { medicalName } = useParams<MedicalParams>();
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
    const fetchShelterDetails = async (shelterName: string) => {
      try {
          const response = await axios.get(`https://api.lacountyhomelesshelper.me/shelter/${encodeURIComponent(shelterName!)}`);
          return response.data;
      } catch (error) {
          console.error("Error fetching shelter data:", error);
      }
      return null; // or some default data if needed
  }

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
                setMedicalpageData({ ...medicalData}); // Merging the cityData with the imageURL
                if (medicalData.city) {
                    const cityData = await fetchCityDetails(medicalData.city);
                    // Store the shelter details in the state if needed.
                    setCityData(cityData);
                    //cityData.imageURL = await fetchOfficeImage(medicalData.city!);
                }
                if (medicalData.shelter_name) {
                  const shelterData = await fetchShelterDetails(medicalData.shelter_name);
                  // Store the shelter details in the state if needed.
                  setShelterData(shelterData);
                  //cityData.imageURL = await fetchOfficeImage(medicalData.city!);
              }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        }
		handleMedicalList();
    }, [medicalName]);

    return (
        <>
            <div className="text-center mb-3">
                <div className="m-3">
                <h1>
                    {medicalpageData.name}
                </h1>
                <img 
             src = {medicalpageData.image_url || ssa}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }} 
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = ssa; // Set the fallback image when an error occurs
                }}/>
                </div>
                <Container>
                  <Row>
                    <Col>
                <div style = {{ padding: '0 40px' }}>
                <p className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                    <h2>Information About The {medicalpageData.name}</h2>
                Address: {medicalpageData.addrln1} <br/>
                Zip: {medicalpageData.zip}<br/>
                City: {medicalpageData.city} <br />
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
            <Button name='backMedical' href='../medical' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
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
                <b>{shelterData.name}</b>
              </Card.Title>
              <img
                src={shelterData.image_url || volunteer}
                alt=""
                className='card-image-top'
                style={{
                  width: '50%',
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = volunteer; // Set the fallback image when an error occurs
                }}
              ></img>
              <Card.Body>
              <p>
                Name: {shelterData.name} <br/>
                Address: {shelterData.addrln1}<br/>
                Hours: {shelterData.hours} <br/>
                </p>
                <Button name='href' href={`/resources/${medicalpageData.shelter_name}`} className='card-link'>
                  View {shelterData.name}
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