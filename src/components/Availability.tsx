import { InputNumber, Table, Row, Col } from 'antd';
import React, { useState } from 'react';
import { calculateDowntime, formatTimeToMetric } from './fn';

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
      // value: downtime.minutesPerDay,
      value: downtime.secondsPerDay,
    },
    {
      key: 'hoursPerDay',
      name: 'Hours Per Day',
      shorthand: 'hours/day',
      // value: downtime.hoursPerDay,
      value: downtime.secondsPerDay,
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
      // value: downtime.minutesPerWeek,
      value: downtime.secondsPerWeek,
    },
    {
      key: 'hoursPerWeek',
      name: 'Hours Per Week',
      shorthand: 'hours/week',
      // value: downtime.hoursPerWeek,
      value: downtime.secondsPerWeek,
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
      shorthand: 'minutes/month',
      // value: downtime.minutesPerMonth,
      value: downtime.secondsPerMonth,
    },
    {
      key: 'hoursPerMonth',
      name: 'Hours Per Month',
      shorthand: 'hours/month',
      // value: downtime.hoursPerMonth,
      value: downtime.secondsPerMonth,
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
      // value: downtime.minutesPerYear,
      value: downtime.secondsPerYear,
    },
    {
      key: 'hoursPerYear',
      name: 'Hours Per Year',
      shorthand: 'hours/year',
      // value: downtime.hoursPerYear,
      value: downtime.secondsPerYear,
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Downtime',
      align: 'right',
      // render: (value: number) => value.toFixed(PRECISION),
      render: (row: any) => {
        const [metric] = row.shorthand.split('/');
        return formatTimeToMetric(Math.ceil(row.value), metric);
      },
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