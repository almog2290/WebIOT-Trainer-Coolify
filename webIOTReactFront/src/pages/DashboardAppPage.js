import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import React, { useEffect ,useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid,Container, Typography , Stack, Button } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
    AppTasks,
    AppOrderTimeline,
    AppWebsiteVisits,
    AppCurrentVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppConversionRates,
} from '../sections/@dashboard/app';

// fetch information hooks made 
import { fetchInfoDash , fetchSessionLive } from '../hooks/fetchInfoDash';
import { useGetFetch } from '../hooks/useGetFetch';

// settings
import {bestSteps} from '../hooks/settingsBest10';

export default function DashboardAppPage() {
    const theme = useTheme();
    const { fetchData } = useGetFetch();

    const [informationBarData, setInformationBarData] = useState({});
    const [best10Data, setBest10Data] = useState({});
    const [isPendingInfoBar, setIsPendingInfoBar] = useState(false);
    const [errorInfoBar, setErrorInfoBar] = useState(null);
    const [isPendingBest10, setIsPendingBest10] = useState(false);
    const [errorBest10, setErrorBest10] = useState(null);
    // flag to update the information bar and best10
    const [updateInfoPage,setUpdateInfoPage] = useState(true);

    // exlength, exdate, exstep are arrays of information of best10 , and informationBarData is an object of information bar
    const [ExLength,setExLength] = useState([]);
    const [Exdate,setExdate] = useState([]);
    const [Exstep,setExstep] = useState([]);
    const [shortestEx,setShortestEx] = useState(null);

    // trainStatusData is a boolean variable to send post request to server
    const [trainStatusData, setTrainStatusData] = useState(false);
    // sessionLiveData is an object of information of live session
    const [sessionLiveData, setSessionLiveData] = useState({"movSuccess" :null,"movFailed":null,"Status":null,"prevStatus":null ,"distance":null});
    // labelStatus is a string variable to show the status of the session live
    const [labelStatus, setLabelStatus] = useState(null);
    // intervalId is a variable to store the interval of session live
    const [intervalId, setIntervalId] = useState(null);
    // button variables
    const [buttonText, setButtonText] = useState('start');
    const [buttonColor, setButtonColor] = useState('primary');
    const [buttonIcon, setButtonIcon] = useState(<Iconify icon={'material-symbols:start-rounded'} width={32} />);

    const { fetchInformationBarData, fetchBest10Data } = fetchInfoDash(
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
    );

    useEffect(() => {
        console.count("useEffectInfoPage");
        fetchInformationBarData();
        fetchBest10Data();
    }, [updateInfoPage]);

    useEffect(() => {
        console.count("useEffectTrainStatus");
        if(trainStatusData === true)        
        {
            fetch(`${process.env.REACT_APP_API_URL}/api/sensors/trainStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 1 }),
            })
            .catch((error) => {
                console.error('Error in trainStatus post:', error);
            });

            // get session live data from server any 500ms
            const id = setInterval(() => {
                fetchSessionLive(sessionLiveData,setSessionLiveData,setLabelStatus);
            }, 500);

            // store intervalId in the state so it can be accessed later
            setIntervalId(id);
        }

        return () => {
            if (intervalId) {
              clearInterval(intervalId);
            }
        };

    },[trainStatusData]);
    
    
    const handleClick = () => {
      console.log("Button Clicked");
      
      // You can access trainStatusData.status here
      if(buttonText === 'start'){
        console.log("Click1");
        setButtonText('stop');
        setButtonIcon(<Iconify icon={'ant-design:stop-filled'} width={32} />);
        setButtonColor('error');
        // send post to server
        setTrainStatusData(true);
      }
      else if(buttonText === 'stop')
      {
        console.log("Click2");
        setButtonText('start');
        setButtonIcon(<Iconify icon={'material-symbols:start-rounded'} width={32} />);
        setButtonColor('primary');
        setTrainStatusData(false);

        // stop the interval of session live
        clearInterval(intervalId);
        setSessionLiveData({"movSuccess" :null,"movFailed":null,"Status":null,"prevStatus":null,"distance":null});
        setLabelStatus(null);

        // trigger update information bar and best10
        setUpdateInfoPage(!updateInfoPage);
      }
    };

    return (
        <>
            <Helmet>
                <title> KneeTerapy | Dashboard </title>
            </Helmet>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back Faris
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary 
                            title="All meetings" 
                            total={informationBarData?.meetings ?? 0} 
                            icon={'guidance:meeting-room'} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary 
                            title="Last exscrise length (min:sec)" 
                            total={informationBarData?.lastExerciseLength ?? 0} 
                            color="info" 
                            icon={'guidance:personal-training'} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary 
                            title="Correct steps taken" 
                            total={informationBarData?.steps ?? 0} 
                            color="warning" 
                            icon={'fluent-emoji-high-contrast:mechanical-leg'} 
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary 
                            title="Level stage" 
                            total={informationBarData?.levelStage ?? 0} 
                            color="error" 
                            icon={'carbon:skill-level'} 
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        {!isPendingBest10 && Exdate?.length > 0 ? (
                            <AppWebsiteVisits
                            title="Correct steps taken in treatment (TOP10)"
                            subheader={`Best record: ${bestSteps(Exstep)} steps`}
                            chartLabels={[
                                Exdate[0],
                                Exdate[1],
                                Exdate[2],
                                Exdate[3],
                                Exdate[4],
                                Exdate[5],
                                Exdate[6],
                                Exdate[7],
                                Exdate[8],
                                Exdate[9],
                            ]}
                            chartData={[
                                {
                                name: 'Faris',
                                type: 'column',
                                fill: 'solid',
                                data: [
                                    Exstep[0],
                                    Exstep[1],
                                    Exstep[2],
                                    Exstep[3],
                                    Exstep[4],
                                    Exstep[5],
                                    Exstep[6],
                                    Exstep[7],
                                    Exstep[8],
                                    Exstep[9],
                                ],
                                },
                            ]}
                            />
                        ) : (
                            <>
                                {isPendingBest10 ? <p>Loading..</p> : null}
                                {errorBest10 ? <p>{errorBest10}</p> : null}
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        {!isPendingBest10 && ExLength?.length > 0 ? (
                            <AppConversionRates
                            title="Treatment time history (TOP10)"
                            subheader={`Shortest treatment is: ${shortestEx} minutes`}
                            chartData={[
                                { label: 'Treatment 1', value: ExLength[0] },
                                { label: 'Treatment 2', value: ExLength[1] },
                                { label: 'Treatment 3', value: ExLength[2] },
                                { label: 'Treatment 4', value: ExLength[3] },
                                { label: 'Treatment 5', value: ExLength[4] },
                                { label: 'Treatment 6', value: ExLength[5] },
                                { label: 'Treatment 7', value: ExLength[6] },
                                { label: 'Treatment 8', value: ExLength[7] },
                                { label: 'Treatment 9', value: ExLength[8] },
                                { label: 'Treatment 10', value: ExLength[9] },
                            ]}
                            />
                        ) : (
                            <>
                                {isPendingBest10 ? <p>Loading..</p> : null}
                                {errorBest10 ? <p>{errorBest10}</p> : null}
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AppCurrentVisits
                        title="Current Steps Progress"
                        chartData={[
                            { label: 'Correct Steps', value: informationBarData?.steps ?? 0},
                            { label: 'Failed Steps', value: (informationBarData?.meetings * 5 - informationBarData?.steps) ?? 0},
                        ]}
                        chartColors={[
                            theme.palette.primary.main,
                            theme.palette.warning.main,
                        ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AppTrafficBySite
                        title="Live Training" 
                        list={[
                            {
                            name: 'Correct Steps',
                            value: sessionLiveData.movSuccess,
                            valueColor: 'error',
                            icon: <Iconify icon={'icon-park-twotone:correct'} color="#25C784" width={32} />,
                            },
                            {
                            name: 'Failed Steps',
                            value: sessionLiveData.movFailed,
                            icon: <Iconify icon={'icon-park-outline:loudly-crying-face-whit-open-mouth'} color="#FF7F1D" width={32} />,
                            },
                            {
                            name: 'Status',
                            value: labelStatus,
                            icon: <Iconify icon={'tabler:status-change'} color="#CC3233" width={32} />,
                            },
                            {
                                name: 'Distance (CM)',
                                value: sessionLiveData.distance,
                                icon: <Iconify icon={'icon-park-outline:map-distance'} color="#1877F2" width={32} />,
                            },
                        ]}              
                        />
                        <Stack direction="row" spacing={2}>
                        <Button fullWidth size="large" type="submit" variant="contained" color={buttonColor} startIcon={buttonIcon} onClick={handleClick}>
                        {buttonText}
                        </Button>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AppOrderTimeline
                            title="Meeting Timeline"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                    'Meeting with the Physiotherapist',
                                    'doctor appointment',
                                    'doctor appointment',
                                    'Meeting with the Physiotherapist',
                                    'Meeting with the Physiotherapist',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <AppTasks
                            title="Tasks"
                            list={[
                                { id: '1', label: 'stand on one leg for 15 seconds' },
                                { id: '2', label: 'Walk for 200 meters' },
                                { id: '3', label: 'Go up and down stairs for 2 minutes' },
                                { id: '4', label: 'run if you can for 100 meters' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}




