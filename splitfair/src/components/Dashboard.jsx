import { useExpenses } from '../context/ExpenseContext';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { generateReceipt } from '../components/Receipt';
import { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const { expenses } = useExpenses();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);

  const handleToggleSettle = async (expenseId, person, currentStatus) => {
  try {
    const ref = doc(db, 'expenses', expenseId);
    await updateDoc(ref, {
      [`splits.${person}.settled`]: !currentStatus,
    });
    console.log('Updated settlement status!');
  } catch (err) {
    console.error('Failed to update settlement status:', err);
  }
};


  const handleDelete = async (expenseId) => {
    const ref = doc(db, 'expenses', expenseId);
    await deleteDoc(ref);
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Expense Breakdown</h2>

      {expenses.length === 0 ? (
        <p className="dashboard-empty">No expenses recorded yet.</p>
      ) : (
        <div className="dashboard-grid">
          {expenses.filter((expense) => expense.createdBy === user?.uid).map((expense) => {
            const isExpanded = expanded === expense.id;
            const dateStr = expense.createdAt?.toDate?.().toLocaleString?.() || 'N/A';

            return (
              <div key={expense.id} className="expense-tile">
                <p className="font-medium">{expense.title || 'Untitled Expense'}</p>
                <button onClick={() => toggleExpand(expense.id)} className="settle-button">
                  {isExpanded ? 'Hide Details' : 'View Details'}
                </button>

                {isExpanded && (
                  <div className="expense-details">
                    <p>Payer: {expense.payer}</p>
                    <p>Description: {expense.desc || 'None'}</p>
                    <p>Category: {expense.category || 'Uncategorized'}</p>
                    <p>Total Amount: ₱{expense.amount.toFixed(2)}</p>
                    <p>Date: {dateStr}</p>

                    <ul className="expense-split">
                      {Object.entries(expense.splits).map(([person, details]) => (
                        <li key={person} className="split-item">
                          <span>
                            {person}: ₱{details.amount.toFixed(2)}{' '}
                            {details.settled && <span className="settled-text">(Settled)</span>}
                          </span>
                          <button
                            onClick={() => handleToggleSettle(expense.id, person, details.settled)}
                            className={`settle-button ${details.settled ? 'settled' : ''}`}
                          >
                            {details.settled ? 'Undo Settled' : 'Mark as Settled'}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="button-group">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => generateReceipt(expense, true)}
                        className="receipt-button"
                      >
                        Preview Receipt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
