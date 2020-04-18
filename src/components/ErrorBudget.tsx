import React, { useState, useRef } from 'react';
import { Select, InputNumber, Row, Col } from 'antd';
import { AvailabilityTable2 } from './Availability';
import { calculateAvailability, getDowntimeFromAvailbility, calculateDowntimeTableFromMetric, changeDisplayFromMetric, Ratio, getDisplay } from './fn';

const { Option } = Select;

export const ErrorBudget: React.FC = () => {
  const [metric, setMetric] = useState<Ratio>(Ratio.SECONDS_PER_DAY);
  const [display, setDisplay] = useState(60);
  const availability = calculateAvailability(display, metric);
  // @ts-ignore
  const downtimeTable = calculateDowntimeTableFromMetric(display, metric);
  
  const errorBudgetRef = useRef<any>();

  const setAvailability = (newAvailability: number) => {
    const current = errorBudgetRef.current;
    if (!current) {
      return;
    }

    const newDisplay = getDowntimeFromAvailbility(newAvailability, metric);
    current.inputNumberRef.input.value = newDisplay;
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
                const newDowntimeTable = calculateDowntimeTableFromMetric(value, metric);
                setDisplay(getDisplay(newDowntimeTable, metric));
              }}
            />
            <Select
              defaultValue={metric}
              size="large"
              onChange={(newMetric) => {
                const newDisplay = changeDisplayFromMetric(display, metric, newMetric);
                setMetric(newMetric);
                setDisplay(newDisplay);
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
              <Option value="seconds/90 days">
                seconds/90 days
              </Option>
              <Option value="minutes/90 days">
                minutes/90 days
              </Option>
              <Option value="hours/90 days">
                hours/90 days
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