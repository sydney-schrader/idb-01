import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";

const ResourceInstancePage: React.FC<{}> = () => {

    const [resourcepageData, setResourcepageData] = useState({} as resourceItem)

    type ResourceParams = {
        resourceName: string;
    };
    
   
    type resourceItem = {
        name: string;
    };

    const { resourceName } = useParams<ResourceParams>();

    
    useEffect(() => {
		const handleResourceList = () => {
			const options = {
				method: 'GET',
				url: `http://127.0.0.1:5000/api/shelter/${encodeURIComponent(resourceName!)}`,
                params: {id: resourceName},
			};
			axios.request(options).then(function(response){
				setResourcepageData(response.data);
			}).catch(function (error) {
				console.error(error);
			})
		}
		handleResourceList();
	}, [ resourceName])


      
    return (
        <h1>
            {resourcepageData.name}
        </h1>
    )
}
export default ResourceInstancePage;