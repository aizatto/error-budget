import { InputNumber, Table, Row, Col } from 'antd';
import React, { useState } from 'react';

const DAYS_IN_MONTH = 31;
const DAYS_IN_YEAR = 365;
const PRECISION = 3;

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

export const AvailabilityTable: React.FC<{availability: number}> = (props) => {
  const { availability } = props;

  const downtime = calculateDowntime(availability);
  const downtimeDataSource = [
    {
      key: 'secondsPerDay',
      name: 'Seconds Per Day',
      shorthand: 'seconds/day',
      value: downtime.secondsPerDay,
    },
    {
      key: 'minutesPerDay',
      name: 'Minutes Per Day',
      shorthand: 'minutes/day',
      value: downtime.minutesPerDay,
    },
    {
      key: 'hoursPerDay',
      name: 'Hours Per Day',
      shorthand: 'hours/day',
      value: downtime.hoursPerDay,
    },
    {
      key: 'secondsPerWeek',
      name: 'Seconds Per Week',
      shorthand: 'seconds/week',
      value: downtime.secondsPerWeek,
    },
    {
      key: 'minutesPerWeek',
      name: 'Minutes Per Week',
      shorthand: 'minutes/week',
      value: downtime.minutesPerWeek,
    },
    {
      key: 'hoursPerWeek',
      name: 'Hours Per Week',
      shorthand: 'hours/week',
      value: downtime.hoursPerWeek,
    },
    {
      key: 'secondsPerMonth',
      name: 'Seconds Per Month',
      shorthand: 'seconds/month',
      value: downtime.secondsPerMonth,
    },
    {
      key: 'minutesPerMonth',
      name: 'Minutes Per Month',
      shorthand: 'weeks/month',
      value: downtime.minutesPerMonth,
    },
    {
      key: 'hoursPerMonth',
      name: 'Hours Per Month',
      shorthand: 'hours/month',
      value: downtime.hoursPerMonth,
    },
    {
      key: 'secondsPerYear',
      name: 'Seconds Per Year',
      shorthand: 'seconds/year',
      value: downtime.secondsPerYear,
    },
    {
      key: 'minutesPerYear',
      name: 'Minutes Per Year',
      shorthand: 'minutes/year',
      value: downtime.minutesPerYear,
    },
    {
      key: 'hoursPerYear',
      name: 'Hours Per Year',
      shorthand: 'hours/year',
      value: downtime.hoursPerYear,
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Downtime',
      dataIndex: 'value',
      align: 'right',
      render: (value: number) => value.toFixed(PRECISION),
    },
    {
      title: 'Shorthand',
      dataIndex: 'shorthand',
    },
  ];

  return (
    <Table
      pagination={false}
      dataSource={downtimeDataSource}
      // @ts-ignore
      columns={columns}
    />
  );
}

export const Availability: React.FC = () => {
  const [availability, setAvailability] = useState(99.99);

  return (
    <>
      <Row justify="center">
        <Col span="6">
          <InputNumber
            style={{fontSize: '2rem', width: '12rem'}}
            defaultValue={availability}
            min={0}
            max={100}
            step={0.1}
            onChange={(value) => value && setAvailability(value)}
          />
          %
        </Col>
      </Row>
      <AvailabilityTable availability={availability} />
    </>
  );
}