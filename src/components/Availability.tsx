import { InputNumber, Table, Row, Col } from 'antd';
import React, { useState } from 'react';
import { calculateDowntimeTableFromAvailbility, formatTimeToMetric, DowntimeTable } from './fn';

export const AvailabilityTable: React.FC<{availability: number}> = (props) => {
  const { availability } = props;

  const downtime = calculateDowntimeTableFromAvailbility(availability);
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
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    // },
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
      shorthand: 'hours/day',
      // value: downtime.hoursPerDay,
      value: downtime.secondsPerDay,
    },
    {
      key: 'hoursPerWeek',
      name: 'Hours Per Week',
      shorthand: 'hours/week',
      // value: downtime.hoursPerWeek,
      value: downtime.secondsPerWeek,
    },
    {
      key: 'hoursPerMonth',
      name: 'Hours Per Month',
      shorthand: 'hours/month',
      // value: downtime.hoursPerMonth,
      value: downtime.secondsPerMonth,
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
      title: 'Uptime',
      align: 'right',
      render: (row: any) => {
        const [,metric] = row.shorthand.split('/');
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
      title: 'Shorthand',
      dataIndex: 'shorthand',
      render: (shorthand: string) => {
        const [,metric] = shorthand.split('/')
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