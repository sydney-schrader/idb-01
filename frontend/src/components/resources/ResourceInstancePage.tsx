import React, { useState, useEffect, useCallback } from "react";
import { Button } from 'react-bootstrap'
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

const ResourceInstancePage: React.FC<{}> = () => {

    const [resourcepageData, setResourcepageData] = useState({} as resourceItem)
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
		const handleResourceList = async() => {
			const options = {
				method: 'GET',
				url: `http://127.0.0.1:5000/api/shelter/${encodeURIComponent(resourceName!)}`,
                params: {id: resourceName},
			};
			try {
                const response = await axios.request(options);
                const resourceData: resourceItem = {
                    ...response.data,
                };
                const imageURL = await fetchShelterImage(resourceName!);
                setResourcepageData({ ...resourceData, imageURL }); // Merging the cityData with the imageURL
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
        </>
    )
}
export default ResourceInstancePage;