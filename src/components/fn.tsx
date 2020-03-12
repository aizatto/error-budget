
const DAYS_IN_MONTH = 31;
const DAYS_IN_YEAR = 365;

export function calculateDowntime(oriAvailability: number) {
  let availability = oriAvailability >= 100
    ? 100
    : oriAvailability;

  availability = availability <= 0
    ? 0
    : availability;

  const percentage = (100 - availability) / 100;

  let downtime = {
    secondsPerDay: percentage * 24 * 60 * 60,
    minutesPerDay: percentage * 24 * 60,
    hoursPerDay: percentage * 24,
  }

  return {
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
  const downtime = calculateDowntime(availability);
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