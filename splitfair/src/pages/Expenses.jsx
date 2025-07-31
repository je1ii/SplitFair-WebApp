import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Dashboard from '../components/Dashboard';

import './Expenses.css';

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="expenses-container">
      <h1 className="expenses-title">Expenses</h1>
      <br></br>

      <button onClick={toggleForm} className="expenses-button">
        {showForm ? 'Close Form' : 'Add Expense'}
      </button>

      {showForm && (
        <div className="expenses-form">
          <ExpenseForm />
        </div>
      )}

      <div className="expenses-dashboard">
        <Dashboard />
      </div>
    </div>
  );
}
