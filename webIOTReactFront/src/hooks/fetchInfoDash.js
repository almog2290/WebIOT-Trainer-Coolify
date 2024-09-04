import axios from 'axios';
import {fixLenghtFormat ,shortestExrsice} from './settingsBest10';
import { formatSessionLiveStatus , compareSessionLive } from '../utils/formatStatus';

export function fetchInfoDash(
    fetchData, 
    setInformationBarData, 
    setIsPendingInfoBar, 
    setErrorInfoBar, 
    setBest10Data, 
    setIsPendingBest10, 
    setErrorBest10, 
    isPendingBest10, 
    best10Data, 
    setExLength, 
    setExdate, 
    setExstep, 
    setShortestEx
) {
    const fetchInformationBarData = async () => {
        await fetchData(`/api/sensors/information_bar`, setInformationBarData, setIsPendingInfoBar, setErrorInfoBar);
    };

    const fetchBest10Data = async () => {

        await fetchData(`/api/sensors/best10`, setBest10Data, setIsPendingBest10, setErrorBest10);

        if (!isPendingBest10 && best10Data) {

            const exLengthData = fixLenghtFormat(best10Data[0].exLenght);
            const exDateData = [...best10Data[1].exDate];
            const exStepData = [...best10Data[2].exStep];
            const shortestEx = shortestExrsice(exLengthData);

            setExLength(exLengthData);
            setExdate(exDateData);
            setExstep(exStepData);
            setShortestEx(shortestEx);
        }
    };

    return { fetchInformationBarData, fetchBest10Data };
}


// this hook is used to fetch the data for the session live
export const fetchSessionLive = async (prevSessionLive,setSessionLive,setLabelStatus) => {
    try {
        console.count("starting fetch session live");
        const response = await axios.get(`/api/sensors/session_live`);
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