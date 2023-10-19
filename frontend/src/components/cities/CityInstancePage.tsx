import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import axios from "axios"; 
import { useParams } from "react-router-dom";
import arcadia from '../../assets/arcadia.jpeg'


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


const CityInstancePage: React.FC<{}> = () => {

    const [citypageData, setCitypageData] = useState({} as cityItem)

    const { cityName } = useParams<CityParams>();

    useEffect(() => {
        const fetchCityImage = async (cityName: string) => {
            try {
                const response = await axios.get(`https://pixabay.com/api/?key=40111269-fa085807d2390f3428b52a50e&q=${encodeURIComponent(cityName)}&image_type=all`);
                if (response.data.hits && response.data.hits.length > 0) {
                    return response.data.hits[0].largeImageURL;
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
            return arcadia; // default to arcadia image if no image is found or an error occurs
        };
    
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
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        }
    
        handleCityList();
    }, [cityName]);



      
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
        </>
        
    )
}
export default CityInstancePage;