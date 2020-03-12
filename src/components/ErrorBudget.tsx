import React, { useState, useRef } from 'react';
import { Select, InputNumber, Row, Col } from 'antd';
import { AvailabilityTable } from './Availability';
import { calculateAvailability, getDowntimeFromAvailbility } from './fn';

const { Option } = Select;

export const ErrorBudget: React.FC = () => {
  const [metric, setMetric] = useState('seconds/day');
  const [errorBudget, setErrorBudget] = useState(60);
  const availability = calculateAvailability(errorBudget, metric);
  
  const errorBudgetRef = useRef<any>();

  const setErrorBudgetRef = (value: number) => {
    const current = errorBudgetRef.current;
    if (!current) {
      return;
    }

    const downtime = getDowntimeFromAvailbility(value, metric);
    // current.inputNumberRef.input.value = downtime;
    setErrorBudget(downtime);
  }

  return (
    <>
      <Row justify="center">
        <Col span="8">
          <div>
            <InputNumber
              ref={errorBudgetRef}
              size="large"
              value={errorBudget}
              min={0}
              step={0.1}
              onChange={(value) => value && setErrorBudget(value)}
            />
            <Select
              defaultValue={metric}
              size="large"
              onChange={(newMetric) => {
                const downtime = getDowntimeFromAvailbility(availability, newMetric);
                setMetric(newMetric);
                setErrorBudget(downtime);
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
                setErrorBudgetRef(value);
              }}
            />
            %
          </div>
        </Col>
      </Row>
      <AvailabilityTable availability={availability} />
    </>
  ) 
}