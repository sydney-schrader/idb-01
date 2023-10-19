import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";

const CityInstancePage: React.FC<{}> = () => {

    const [citypageData, setCitypageData] = useState({} as cityItem)

    type CityParams = {
        cityName: string;
    };
    
   
    type cityItem = {
        csa_label: string;
    };

    const { cityName } = useParams<CityParams>();

    
    useEffect(() => {
		const handleCityList = () => {
			const options = {
				method: 'GET',
				url: `http://127.0.0.1:5000/api/city/${encodeURIComponent(cityName!)}`,
                params: {id: cityName},
			};
			axios.request(options).then(function(response){
				setCitypageData(response.data);
			}).catch(function (error) {
				console.error(error);
			})
		}
		handleCityList();
	}, [ cityName])


      
    return (
        <h1>
            {citypageData.csa_label}
        </h1>
    )
}
export default CityInstancePage;