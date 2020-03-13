import React from 'react';
import './App.css';
import { ErrorBudget } from './components/ErrorBudget';

function App() {
  return (
    <>
      <ErrorBudget />
      <ul>
        <li>There may be some rounding errors, because we calculate the time based on availability.</li>
        <li><a href="https://github.com/aizatto/error-budget">GitHub: Source Code</a></li>
      </ul>
    </>
  );
}

export default App;
