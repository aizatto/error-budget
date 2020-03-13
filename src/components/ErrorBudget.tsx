import React, { useState, useRef } from 'react';
import { Select, InputNumber, Row, Col } from 'antd';
import { AvailabilityTable2 } from './Availability';
import { calculateAvailability, calculateSecondsFromMetric, getDowntimeFromSeconds, getDowntimeFromAvailbility, calculateDowntimeTableFromMetric } from './fn';

const { Option } = Select;

export const ErrorBudget: React.FC = () => {
  const [metric, setMetric] = useState('seconds/day');
  const [secondsPerDay, setSecondsPerDay] = useState(60);
  const [display, setDisplay] = useState(60);
  const availability = calculateAvailability(display, metric);
  const [metric2,] = metric.split('/');
  const downtimeTable = calculateDowntimeTableFromMetric(display, metric2);
  
  const errorBudgetRef = useRef<any>();

  const setAvailability = (newAvailability: number) => {
    const current = errorBudgetRef.current;
    if (!current) {
      return;
    }

    const newSeconds = getDowntimeFromAvailbility(newAvailability, 'seconds/day');
    const newDisplay = getDowntimeFromAvailbility(newAvailability, metric);
    current.inputNumberRef.input.value = newDisplay;
    setSecondsPerDay(newSeconds);
    setDisplay(newDisplay);
  }

  return (
    <>
      <Row justify="center">
        <Col span="8">
          <div>
            <InputNumber
              ref={errorBudgetRef}
              size="large"
              value={display}
              min={0}
              step={0.1}
              onChange={(value) => {
                if (!value) {
                  return;
                }
                const [newMetric, ] = metric.split('/');
                const newSeconds = calculateSecondsFromMetric(value, newMetric);
                const newDisplay = getDowntimeFromSeconds(newSeconds, metric);
                setSecondsPerDay(newSeconds)
                setDisplay(newDisplay);
              }}
            />
            <Select
              defaultValue={metric}
              size="large"
              onChange={(newMetric) => {
                const downtime = getDowntimeFromSeconds(secondsPerDay, newMetric);
                setMetric(newMetric);
                setDisplay(downtime);
              }}>
              <Option value="seconds/day">
                seconds/day
              </Option>
              <Option value="minutes/day">
                minutes/day
              </Option>
              <Option value="hours/day">
                hours/day
              </Option>
              <Option value="seconds/week">
                seconds/week
              </Option>
              <Option value="minutes/week">
                minutes/week
              </Option>
              <Option value="hours/week">
                hours/week
              </Option>
              <Option value="seconds/month">
                seconds/month
              </Option>
              <Option value="minutes/month">
                minutes/month
              </Option>
              <Option value="hours/month">
                hours/month
              </Option>
              <Option value="seconds/year">
                seconds/year
              </Option>
              <Option value="minutes/year">
                minutes/year
              </Option>
              <Option value="hours/year">
                hours/year
              </Option>
            </Select>
          </div>
          <div>
            <InputNumber
              size="large"
              value={availability}
              min={0}
              max={100}
              step={0.1}
              style={{width: '14rem'}}
              onChange={(value) => {
                if (!value) {
                  return;
                }

                // setErrorBudgetRef(getDowntimeFromAvailbility(value, metric));
                setAvailability(value);
              }}
            />
            %
          </div>
        </Col>
      </Row>
      <AvailabilityTable2 downtime={downtimeTable} />
    </>
  ) 
}