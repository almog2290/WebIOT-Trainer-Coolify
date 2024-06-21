// compare sessionLive with other sessionLive object
export const compareSessionLive = (sessionLive, otherSessionLive) => {

    if (sessionLive.movSuccess !== otherSessionLive.movSuccess) {
        return false;
    }

    if (sessionLive.movFailed !== otherSessionLive.movFailed) {
        return false;
    }

    if (sessionLive.x !== otherSessionLive.x) {
        return false;
    }

    if (sessionLive.y !== otherSessionLive.y) {
        return false;
    }

    if (sessionLive.Status !== otherSessionLive.Status) {
        return false;
    }
    
    if (sessionLive.prevStatus !== otherSessionLive.prevStatus) {
        return false;
    }

    return true;
}


// if  1 to 3 - > leg move front of the laser correctly without hit the obstacle
// if  2 to 4 - > leg move front of the laser && hit obstacle
// if  3 to 4 - > leg was move front of the laser && later hit obstacle
// if  4 to 1 || 3 to 1 || 2 to 1 -> wait for movement ... !!
// this function will return the status of the sessionLive.
export const formatSessionLiveStatus = (pervStatus,currStatus) => {
    
    // console.log(`pervStatus: ${pervStatus} currStatus: ${currStatus}`);

    if(pervStatus === 3 && currStatus === 1){
        // console.log("1");
        return "Great Movement !";
    }

    if(pervStatus === 2 && currStatus === 4){
        // console.log("2");
        return "Sorry, You hit the obstacle !";
    }

    if(pervStatus === 3 && currStatus === 4){
        // console.log("3");
        return "Sorry, You hit the obstacle !";
    }

    if(pervStatus === 4 && currStatus === 1){
        // console.log("4");
        return "Wait for movement ...";
    }

    if(pervStatus === 3 && currStatus === 1){
        // console.log("5");
        return "Wait for movement ...";
    }

    if(pervStatus === 2 && currStatus === 1){
        // console.log("6");
        return "Sorry, You hit the obstacle !";
    }

    if(pervStatus === 1 && currStatus === 2){
        // console.log("6");
        return "Sorry, You hit the obstacle !";
    }

    // console.log("7");
    return "Wait for movement ..."
}

// function to format distance in milimeter to meter 
export const formatMilimeterToCMeter = (value) => {

    if(value === null || value === undefined){
        return null;
    }

    return value / 100;
}