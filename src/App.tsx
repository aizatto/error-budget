import React from 'react';
import './App.css';
import { ErrorBudget } from './components/ErrorBudget';

function App() {
  return (
    <>
      <ErrorBudget />
      There may be some rounding errors, because we calculate the time based on availability.
    </>
  );
}

export default App;
