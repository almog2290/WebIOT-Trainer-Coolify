import axios from 'axios';
import { fixLenghtFormat , shortestExrsice } from './settingsBest10';
import { formatSessionLiveStatus , compareSessionLive } from '../utils/formatStatus';

// this hook is used to fetch the data for the information bar and the best10 chart
export function fetchInfoScreen(setInformationBarData, setExLength, setExdate, setExstep, setShortestEx) {
    const fetchInformationBar = async () => {
        try {
            console.count("starting fetch information bar");
            console.log("App url",`${process.env.REACT_APP_API_URL}/api/sensors/information_bar`);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/information_bar`);
            const infoData = response.data;
            if (infoData)
                setInformationBarData(infoData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // get best10 data from server
    const fetchBest10 = async () => {
        try {
            console.count("starting fetch best10");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/best10`);
            const best10Data = response.data;
            if (best10Data) {
                // Access the data from the 'best10' object
                const exLengthData = fixLenghtFormat(best10Data[0].exLenght);
                const exDateData = [...best10Data[1].exDate];
                const exStepData = [...best10Data[2].exStep];
                const shortestEx = shortestExrsice(exLengthData);

                // Update the state variables with the extracted data
                setExLength(exLengthData);
                setExdate(exDateData);
                setExstep(exStepData);
                setShortestEx(shortestEx);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return { fetchInformationBar, fetchBest10 };
} 

// this hook is used to fetch the data for the session live
export const fetchSessionLive = async (prevSessionLive,setSessionLive,setLabelStatus) => {
    try {
        console.count("starting fetch session live");
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/sensors/session_live`);
        const sessionLiveData = response.data;
        if (sessionLiveData) {

            if(!compareSessionLive(prevSessionLive,sessionLiveData)){
                setLabelStatus(formatSessionLiveStatus(sessionLiveData.prevStatus,sessionLiveData.Status));
            }

            setSessionLive(sessionLiveData);
            // compare sessionLive with other sessionLive object and if there is a change in the status, update the label

        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

