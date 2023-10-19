import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";

const MedicalInstancePage: React.FC<{}> = () => {

    const [medicalpageData, setMedicalpageData] = useState({} as medicalItem)

    type MedicalParams = {
        medicalName: string;
    };
    
   
    type medicalItem = {
        name: string;
    };

    const { medicalName } = useParams<MedicalParams>();

    
    useEffect(() => {
		const handleMedicalList = () => {
			const options = {
				method: 'GET',
				url: `http://127.0.0.1:5000/api/medicare/${encodeURIComponent(medicalName!)}`,
                params: {id: medicalName},
			};
			axios.request(options).then(function(response){
				setMedicalpageData(response.data);
			}).catch(function (error) {
				console.error(error);
			})
		}
		handleMedicalList();
	}, [ medicalName])


      
    return (
        <h1>
            {medicalpageData.name}
        </h1>
    )
}
export default MedicalInstancePage;