import React, { useState, useEffect, useCallback } from "react";
import axios from "axios"; 
import ssa from '../../assets/ssa.jpeg'
import { Button } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { useImages } from '../ImageContext';
//ZACH
const SEARCH_ENGINE_ID = '226027a2f9e54422b';
const GOOGLE_API_KEY = 'AIzaSyAiNi5igRxIAvxcuZ1TRL7ii-Eu3sWLaWE';


type MedicalParams = {
    medicalName: string;
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

const MedicalInstancePage: React.FC<{}> = () => {

    const [medicalpageData, setMedicalpageData] = useState({} as medicalItem)

    const { medicalName } = useParams<MedicalParams>();
    const { images, setImage } = useImages();


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
				url: `http://127.0.0.1:5000/api/medicare/${encodeURIComponent(medicalName!)}`,
                params: {id: medicalName},
			};
			try {
                const response = await axios.request(options);
                const medicalData: medicalItem = {
                    ...response.data,
                };
                const imageURL = await fetchOfficeImage(medicalName!);
                setMedicalpageData({ ...medicalData, imageURL }); // Merging the cityData with the imageURL
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
                  width: '70%',
                }} />
                </div>
                <div style = {{ padding: '0 400px' }}>
                <p className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                    <h2>Information About The {medicalpageData.name}</h2>
                Address: {medicalpageData.addrln1} <br/>
                Zip: {medicalpageData.zip}<br/>
                Hours: {medicalpageData.hours} <br/>
                Phone: {medicalpageData.phones || 'Unavailable'} <br/>
                {medicalpageData.description} <br/>
            </p>
            </div>
            <Button name='href' href='../medical' className='card-link text-warning-emphasis bg-warning border border-warning-subtle rounded-3'>
                Back to Medical
            </Button>
            </div>
        </>
    )
}
export default MedicalInstancePage;