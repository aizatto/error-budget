import { Table } from 'antd';
import React, { useState } from 'react';
import { formatTimeToMetric, DowntimeTable } from './fn';

export const FormatTime: React.FC<{time: number}> = (props) => {
  const [hover, setHover] = useState(false);
  const { time } = props;

  const seconds = formatTimeToMetric(time, 'seconds');
  const minutes = formatTimeToMetric(time, 'minutes');
  const hours = formatTimeToMetric(time, 'hours');
  const days = formatTimeToMetric(time, 'days');

  const content = hover
    ? <>
        {days !== hours ? `${days}, or ` : ''}
        {hours !== minutes ? `${hours}, or ` : ''}
        {minutes}
        {', or '}
        {seconds}
      </>
    : days;


  return (
    <div
      // title={title}
      onMouseOver={() => setHover(true)}
      onMouseOut={() =>setHover(false)}
      >
      {content}
    </div>
  );
}

export const AvailabilityTable2: React.FC<{downtime: DowntimeTable}> = (props) => {
  const { downtime } = props;

  // const downtime = calculateDowntimeTableFromAvailbility(availability);
  const downtimeDataSource = [
    {
      key: 'hoursPerDay',
      name: 'Hours Per Day',
      measurement: 'hours/day',
      // value: downtime.hoursPerDay,
      value: downtime.secondsPerDay,
    },
    {
      key: 'hoursPerWeek',
      name: 'Hours Per Week',
      measurement: 'hours/week',
      // value: downtime.hoursPerWeek,
      value: downtime.secondsPerWeek,
    },
    {
      key: 'hoursPerMonth',
      name: 'Hours Per Month',
      measurement: 'hours/month',
      // value: downtime.hoursPerMonth,
      value: downtime.secondsPerMonth,
    },
    {
      key: 'hoursPerNinetyDays',
      name: 'Hours Per NinetyDays',
      measurement: 'hours/90 days',
      // value: downtime.hoursPerNinetyDays,
      value: downtime.secondsPerNinetyDays,
    },
    {
      key: 'hoursPerYear',
      name: 'Hours Per Year',
      measurement: 'hours/year',
      // value: downtime.hoursPerYear,
      value: downtime.secondsPerYear,
    },
  ];

  const columns = [
    {
      title: 'Uptime',
      align: 'right',
      render: (row: any) => {
        const [,metric] = row.measurement.split('/');
        let secondsInMetric = 86400;
        switch (metric) {
          case 'day':
            break;

          case 'week':
            secondsInMetric *= 7;
            break;

          case 'month':
            secondsInMetric *= 31;
            break;

          case '90 days':
            secondsInMetric *= 90;
            break;

          case 'year':
            secondsInMetric *= 365;
            break;
        }
        return <FormatTime time={secondsInMetric - row.value} />;
      },
    },
    {
      title: 'Downtime',
      align: 'right',
      render: (row: any) => {
        return <FormatTime time={row.value} />;
      },
    },
    {
      title: 'Measurement',
      dataIndex: 'measurement',
      render: (measurement: string) => {
        const [,metric] = measurement.split('/')
        return `per ${metric}`;
      },
    },
  ];

  return (
    <Table
      tableLayout="fixed"
      pagination={false}
      dataSource={downtimeDataSource}
      // @ts-ignore
      columns={columns}
    />
  );
}