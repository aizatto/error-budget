import React, { useState } from 'react';
import { Select, InputNumber, Row, Col } from 'antd';
import { AvailabilityTable } from './Availability';

const { Option } = Select;

export const ErrorBudget: React.FC = () => {
  const [errorBudget, setErrorBudget] = useState(60);
  const [metric, setMetric] = useState('seconds/day');

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

  return (
    <>
      <Row justify="center">
        <Col span="6">
          <div>
            <InputNumber
              size="large"
              defaultValue={errorBudget}
              min={0}
              step={0.1}
              onChange={(value) => value && setErrorBudget(value)}
            />
            <Select
              defaultValue={metric}
              size="large"
              onChange={(newMetric) => setMetric(newMetric)}
              >
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
              readOnly
            />
            %
          </div>
        </Col>
      </Row>
      <AvailabilityTable availability={availability} />
    </>
  ) 
}