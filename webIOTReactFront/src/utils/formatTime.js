import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export const timeToSeconds = (time) => {
  const [minutes, seconds] = time.split(':');
  return Number(minutes) * 60 + Number(seconds);
};


export function secondsToMinutesAndSeconds(seconds) {
  if (!Number.isNaN(seconds) && seconds >= 0) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  return "Invalid input"; // Moved outside the if block
}


