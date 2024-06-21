// ---------------------------------------------------------------------
export function fixLenghtFormat(exLengthBest10) {
    const exLenghtFromServer = exLengthBest10;
    const ExLength = [];

    // Spliting the time by ':' to remove hours 
    for (let i = 0; i < exLenghtFromServer.length; i += 1) {
        const [hours, minutes, seconds] = exLenghtFromServer[i].split(':');
        // Remove leading zero from minutes if it exists
        ExLength[i] = `${parseInt(minutes, 10)}:${seconds}`.replace(' AM', '');;
    }

    return ExLength;
}

export function shortestExrsice(ExLength) {
    // Function to convert "mm:ss" time format to seconds
    const timeToSeconds = (time) => {
        const [minutes, seconds] = time.split(':');
        return Number(minutes) * 60 + Number(seconds);
    };

    let minInSeconds = timeToSeconds(ExLength[0]);

    for (let i = 1; i < ExLength.length; i += 1) {
        const currentInSeconds = timeToSeconds(ExLength[i]);
        if (currentInSeconds < minInSeconds) {
            minInSeconds = currentInSeconds;
        }
    }
    
    // Convert the minimum time back to "mm:ss" format if needed
    const minutes = Math.floor(minInSeconds / 60);
    const seconds = minInSeconds % 60;
    const minTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return minTime;
}



export function bestSteps(Exstep) {
    let max = Exstep[0];

    for (let i = 1; i < Exstep.length; i += 1) {
        if (Exstep[i] > max) {
            max = Exstep[i];
        }
    }
    return max;
}
