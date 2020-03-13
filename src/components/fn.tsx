
const DAYS_IN_MONTH = 31;
const DAYS_IN_YEAR = 365;
const PRECISION = 5;

export interface DowntimeTable {
  secondsPerDay: number,
  minutesPerDay: number,
  hoursPerDay: number,
  secondsPerWeek: number,
  minutesPerWeek: number,
  hoursPerWeek: number,
  secondsPerMonth: number,
  minutesPerMonth: number,
  hoursPerMonth: number,
  secondsPerYear: number,
  minutesPerYear: number,
  hoursPerYear: number,
}

export function calculateDowntimeTableFromAvailbility(oriAvailability: number): DowntimeTable {
  let availability = oriAvailability >= 100
    ? 100
    : oriAvailability;

  availability = availability <= 0
    ? 0
    : availability;

  const percentage = (100 - availability) / 100;

  let downtime = {
    secondsPerDay: Math.ceil(percentage * 24 * 60 * 60),
    minutesPerDay: percentage * 24 * 60,
    hoursPerDay: percentage * 24,
  }

  const table = {
    ...downtime,
    secondsPerWeek: downtime.secondsPerDay * 7,
    minutesPerWeek: downtime.minutesPerDay * 7,
    hoursPerWeek: downtime.hoursPerDay * 7,
    secondsPerMonth: downtime.secondsPerDay * DAYS_IN_MONTH,
    minutesPerMonth: downtime.minutesPerDay * DAYS_IN_MONTH,
    hoursPerMonth: downtime.hoursPerDay * DAYS_IN_MONTH,
    secondsPerYear: downtime.secondsPerDay * DAYS_IN_YEAR,
    minutesPerYear: downtime.minutesPerDay * DAYS_IN_YEAR,
    hoursPerYear: downtime.hoursPerDay * DAYS_IN_YEAR,
  };
  return table;
}

export function calculateDowntimeTableFromSeconds(time: number): DowntimeTable {
  const percentage = time / (24 * 60 * 60);

  let downtime = {
    secondsPerDay: time,
    minutesPerDay: percentage * 24 * 60,
    hoursPerDay: percentage * 24,
  }

  const table = {
    ...downtime,
    secondsPerWeek: downtime.secondsPerDay * 7,
    minutesPerWeek: downtime.minutesPerDay * 7,
    hoursPerWeek: downtime.hoursPerDay * 7,
    secondsPerMonth: downtime.secondsPerDay * DAYS_IN_MONTH,
    minutesPerMonth: downtime.minutesPerDay * DAYS_IN_MONTH,
    hoursPerMonth: downtime.hoursPerDay * DAYS_IN_MONTH,
    secondsPerYear: downtime.secondsPerDay * DAYS_IN_YEAR,
    minutesPerYear: downtime.minutesPerDay * DAYS_IN_YEAR,
    hoursPerYear: downtime.hoursPerDay * DAYS_IN_YEAR,
  };
  return table;
}
export function calculateDowntimeTableFromMetric(timePerDay: number, metric: string): DowntimeTable {
  let downtime = {
    secondsPerDay: timePerDay,
    minutesPerDay: timePerDay / 24 * 60,
    hoursPerDay: timePerDay / 24 * 60 * 60,
  }

  switch (metric) {
    case 'minutes':
      downtime = {
        secondsPerDay: timePerDay * 60,
        minutesPerDay: timePerDay,
        hoursPerDay: timePerDay / (24 * 60),
      }
      break;

    case 'hours':
      downtime = {
        secondsPerDay: timePerDay * 60 * 60,
        minutesPerDay: timePerDay * 60,
        hoursPerDay: timePerDay,
      }
      break;
  }

  const table = {
    ...downtime,
    secondsPerWeek: downtime.secondsPerDay * 7,
    minutesPerWeek: downtime.minutesPerDay * 7,
    hoursPerWeek: downtime.hoursPerDay * 7,
    secondsPerMonth: downtime.secondsPerDay * DAYS_IN_MONTH,
    minutesPerMonth: downtime.minutesPerDay * DAYS_IN_MONTH,
    hoursPerMonth: downtime.hoursPerDay * DAYS_IN_MONTH,
    secondsPerYear: downtime.secondsPerDay * DAYS_IN_YEAR,
    minutesPerYear: downtime.minutesPerDay * DAYS_IN_YEAR,
    hoursPerYear: downtime.hoursPerDay * DAYS_IN_YEAR,
  };
  return table;
}

export function calculateAvailability(errorBudget: number, metric: string) {
  let downtime = 0;
  switch (metric) {
    case 'seconds/day':
      downtime = errorBudget / (24 * 60 * 60);
      break;
 
    case 'minutes/day':
      downtime = errorBudget / (24 * 60);
      break;

    case 'hours/day':
      downtime = errorBudget / 24;
      break;

    case 'seconds/week':
      downtime = errorBudget / (24 * 60 * 60 * 7);
      break;
 
    case 'minutes/week':
      downtime = errorBudget / (24 * 60 * 7);
      break;

    case 'hours/week':
      downtime = errorBudget / (24 * 7);
      break;

    case 'seconds/month':
      downtime = errorBudget / (24 * 60 * 60 * 31);
      break;
 
    case 'minutes/month':
      downtime = errorBudget / (24 * 60 * 31);
      break;

    case 'hours/month':
      downtime = errorBudget / (24 * 31);
      break;

    case 'seconds/year':
      downtime = errorBudget / (24 * 60 * 60 * 365);
      break;
 
    case 'minutes/year':
      downtime = errorBudget / (24 * 60 * 365);
      break;

    case 'hours/year':
      downtime = errorBudget / (24 * 365);
      break;
  }

  downtime = downtime * 100;
  const availability = 100 - downtime;
  return availability;
}

export function getDowntimeFromAvailbility(availability: number, metric: string) {
  const downtime = calculateDowntimeTableFromAvailbility(availability);
  switch (metric) {
    case 'seconds/day':
      return downtime.secondsPerDay;

    case 'minutes/day':
      return downtime.minutesPerDay;

    case 'hours/day':
      return downtime.hoursPerDay;

    case 'seconds/week':
      return downtime.secondsPerWeek;

    case 'minutes/week':
      return downtime.minutesPerWeek;

    case 'hours/week':
      return downtime.hoursPerWeek;

    case 'seconds/month':
      return downtime.secondsPerMonth;

    case 'minutes/month':
      return downtime.minutesPerMonth;

    case 'hours/month':
      return downtime.hoursPerMonth;

    case 'seconds/year':
      return downtime.secondsPerYear;

    case 'minutes/year':
      return downtime.minutesPerYear;

    case 'hours/year':
      return downtime.hoursPerYear;
    
    default:
      return 0;
  }
}

export function getDowntimeFromSeconds(time: number, metric: string) {
  const downtime = calculateDowntimeTableFromSeconds(time);
  switch (metric) {
    case 'seconds/day':
      return downtime.secondsPerDay;

    case 'minutes/day':
      return downtime.minutesPerDay;

    case 'hours/day':
      return downtime.hoursPerDay;

    case 'seconds/week':
      return downtime.secondsPerWeek;

    case 'minutes/week':
      return downtime.minutesPerWeek;

    case 'hours/week':
      return downtime.hoursPerWeek;

    case 'seconds/month':
      return downtime.secondsPerMonth;

    case 'minutes/month':
      return downtime.minutesPerMonth;

    case 'hours/month':
      return downtime.hoursPerMonth;

    case 'seconds/year':
      return downtime.secondsPerYear;

    case 'minutes/year':
      return downtime.minutesPerYear;

    case 'hours/year':
      return downtime.hoursPerYear;
    
    default:
      return 0;
  }
}

export function calculateSecondsFromMetric(time: number, metric: string) {
  switch (metric) {
    case 'seconds':
      return time;

    case 'minutes':
      return time * 60;

    case 'hours':
      return time * 60 * 60;

    default:
      return 0;
  }
}

export function formatTime(time: number) {
  const seconds = Math.ceil(time % 60);
  const minutes = Math.floor(time / 60 % 60);
  const hours = Math.floor(time / 3600);

  let str = '';
  let displayMinutes = hours || minutes;
  if (hours) {
    str += `${hours}h`;
  }
  if (displayMinutes) {
    str += `${minutes}m`
  }
  const ms = seconds === 0 ? '' : ` x ${(time / 1000).toFixed(5)}`;
  return `${str}${seconds}${ms}s`;
}

function toFixed(number: number): string {
  if (number % 1 === 0) {
    return `${number}`
  }
  let fixed = number.toFixed(PRECISION);
  fixed = fixed.replace(/0+$/, '');
  fixed = fixed.replace(/\.+$/, '');
  return fixed;
}

export function formatTimeToMetric(time: number, metric: string) {
  switch (metric) {
    case 'seconds':
      return `${toFixed(time)}s`;

    case 'minutes': {
      const minutes = Math.floor(time / 60);

      const minutesStr = minutes ? `${minutes}m` : ''

      return `${minutesStr}${toFixed(time % 60)}s`;
    }

    case 'hours': {
      const minutes = Math.floor(time / 60 % 60);
      const hours = Math.floor(time / (60 * 60));

      const hoursStr = hours ? `${hours}h` : ''

      return `${hoursStr}${minutes}m${toFixed(time % 60)}s`;
    }
  }
}