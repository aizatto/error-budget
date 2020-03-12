import React, { useState } from 'react';
import './App.css';
import { Availability } from './components/Availability';
import { Menu } from 'antd';
import { ErrorBudget } from './components/ErrorBudget';

enum Key {
  AVAILABILITY = 'availability',
  ERROR_BUDGET = 'error-budget',
}

function App() {
  const [key, setKey] = useState(Key.AVAILABILITY);

  let element = null;
  switch (key) {
    case Key.AVAILABILITY:
      element = <Availability />
      break; 

    case Key.ERROR_BUDGET:
      element = <ErrorBudget />
      break; 
  }

  return (
    <>
      <Menu 
        mode="horizontal"
        onClick={(newKey) => setKey(newKey.key as Key)}
        selectedKeys={[key]}>
        <Menu.Item key={Key.AVAILABILITY}>
          Availability
        </Menu.Item>
        <Menu.Item key={Key.ERROR_BUDGET}>
          Error Budget
        </Menu.Item>
      </Menu>
      {element}
    </>
        // <Availability />
  );
}

export default App;
