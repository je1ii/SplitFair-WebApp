import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import Dashboard from '../components/Dashboard';

export default function Expenses() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Expenses</h1>

      <button
        onClick={toggleForm}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? 'Close Form' : 'Add Expense'}
      </button>

      {showForm && (
        <div className="mb-6">
          <ExpenseForm />
        </div>
      )}

      <div className="mb-6">
        <Dashboard />
      </div>
    </div>
  );
}
