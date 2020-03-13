
const DAYS_IN_MONTH = 31;
const DAYS_IN_YEAR = 365;
const PRECISION = 5;

export enum UnitOfTime {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
};

export enum Ratio {
  SECONDS_PER_DAY = 'seconds/day',
  MINUTES_PER_DAY = 'minutes/day',
  HOURS_PER_DAY = 'hours/day',
  SECONDS_PER_WEEK = 'seconds/week',
  MINUTES_PER_WEEK = 'minutes/week',
  HOURS_PER_WEEK = 'hours/week',
  SECONDS_PER_MONTH = 'seconds/month',
  MINUTES_PER_MONTH = 'minutes/month',
  HOURS_PER_MONTH = 'hours/month',
  SECONDS_PER_YEAR = 'seconds/year',
  MINUTES_PER_YEAR = 'minutes/year',
  HOURS_PER_YEAR = 'hours/year',
};

export interface DowntimeTableDay {
  secondsPerDay: number,
  minutesPerDay: number,
  hoursPerDay: number,
}

export interface DowntimeTable extends DowntimeTableDay {
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

export function expandDownTimeTable(downtime: DowntimeTableDay): DowntimeTable {
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

export function calculateDowntimeTableFromAvailbility(oriAvailability: number): DowntimeTable {
  let availability = oriAvailability >= 100
    ? 100
    : oriAvailability;

  availability = availability <= 0
    ? 0
    : availability;

  const percentage = (100 - availability) / 100;

  return expandDownTimeTable({
    secondsPerDay: Math.ceil(percentage * 24 * 60 * 60),
    minutesPerDay: percentage * 24 * 60,
    hoursPerDay: percentage * 24,
  });
}

export function calculateDowntimeTableFromSeconds(time: number): DowntimeTable {
  const percentage = time / (24 * 60 * 60);

  return expandDownTimeTable({
    secondsPerDay: time,
    minutesPerDay: percentage * 24 * 60,
    hoursPerDay: percentage * 24,
  });
}
export function calculateDowntimeTableFromMetric(timePerMetric: number, metric: Ratio): DowntimeTable {
  switch (metric) {
    case 'seconds/day':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric,
        minutesPerDay: timePerMetric / 60,
        hoursPerDay: timePerMetric / (60 * 60)
      });

    case 'minutes/day':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60,
        minutesPerDay: timePerMetric,
        hoursPerDay: timePerMetric / 60,
      });

    case 'hours/day':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 * 60,
        minutesPerDay: timePerMetric * 60,
        hoursPerDay: timePerMetric,
      });

    case 'seconds/week':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric / 7,
        minutesPerDay: timePerMetric / 60 / 7,
        hoursPerDay: timePerMetric / (60 * 60) / 7,
      });

    case 'minutes/week':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 /7,
        minutesPerDay: timePerMetric / 7,
        hoursPerDay: timePerMetric / 60 / 7,
      });

    case 'hours/week':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 * 60 / 7,
        minutesPerDay: timePerMetric * 60 / 7,
        hoursPerDay: timePerMetric / 7,
      });

    case 'seconds/month':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric / 31,
        minutesPerDay: timePerMetric / 60 / 31,
        hoursPerDay: timePerMetric / (60 * 60 / 31),
      });

    case 'minutes/month':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 / 31,
        minutesPerDay: timePerMetric / 31,
        hoursPerDay: timePerMetric / 60 / 31,
      });

    case 'hours/month':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 * 60 / 31,
        minutesPerDay: timePerMetric * 60 / 31,
        hoursPerDay: timePerMetric / 31,
      });

    case 'seconds/year':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric / 365,
        minutesPerDay: timePerMetric / 60 / 365,
        hoursPerDay: timePerMetric / (60 * 60) / 365,
      });

    case 'minutes/year':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 / 365,
        minutesPerDay: timePerMetric / 365,
        hoursPerDay: timePerMetric / 60 / 365,
      });

    case 'hours/year':
      return expandDownTimeTable({
        secondsPerDay: timePerMetric * 60 * 60 / 365,
        minutesPerDay: timePerMetric * 60 / 365,
        hoursPerDay: timePerMetric / 365,
      });

    default:
      throw new Error(`Unknown metric: ${metric}`);
  }
}

export function calculateAvailability(errorBudget: number, metric: Ratio) {
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

export function getDowntimeFromAvailbility(availability: number, metric: Ratio) {
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

export function getDisplay(downtime: DowntimeTable, metric: Ratio): number {
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
      throw new Error(`Unknown metric: ${metric}`);
  }
}

export function changeDisplayFromMetric(display: number, oldMetric: Ratio, newMetric: Ratio): number {
  const downtime = calculateDowntimeTableFromMetric(display, oldMetric);
  return getDisplay(downtime, newMetric);
}

export function calculateSecondsFromMetric(time: number, unitOfTime: UnitOfTime) {
  switch (unitOfTime) {
    case 'seconds':
      return time;

    case 'minutes':
      return time * 60;

    case 'hours':
      return time * 60 * 60;

    default:
      throw new Error(`Unknown metric: ${unitOfTime}`);
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

      const minutesStr = minutes ? `${minutes}m ` : ''

      return `${minutesStr}${toFixed(time % 60)}s`;
    }

    case 'hours': {
      const minutes = Math.floor(time / 60 % 60);
      const hours = Math.floor(time / (60 * 60));

      const hoursStr = hours ? `${hours}h ` : ''

      return `${hoursStr}${minutes}m ${toFixed(time % 60)}s`;
    }

    case 'days': {
      const minutes = Math.floor(time / 60 % 60);
      const hours = Math.floor(time / (60 * 60) % 24);
      const days = Math.floor(time / (60 * 60 * 24));

      const hoursStr = hours ? `${hours}h ` : ''
      const daysStr = days ? `${days}d ` : ''

      return `${daysStr}${hoursStr}${minutes}m ${toFixed(time % 60)}s`;
    }
  }
}