import { useExpenses } from '../context/ExpenseContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { generateReceipt } from '../components/Receipt';

export default function Dashboard() {
  const { expenses } = useExpenses();
  const { user } = useAuth();

  const handleToggleSettle = async (expenseId, person, currentStatus) => {
    const ref = doc(db, 'expenses', expenseId);
    await updateDoc(ref, {
      [`splits.${person}.settled`]: !currentStatus,
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses recorded yet.</p>
      ) : (
        <div className="space-y-6">
          {expenses.map((expense) => (
            <div key={expense.id} className="border-b pb-4">
              <p className="font-medium">
                {expense.payer} paid ₱{expense.amount.toFixed(2)} split as:
              </p>
              <p className="text-sm text-gray-600">Category: {expense.category || 'N/A'}</p>

              <ul className="ml-4 mt-2 space-y-1">
                {Object.entries(expense.splits).map(([person, details]) => (
                  <li key={person} className="flex justify-between items-center">
                    <span>
                      - {person}: ₱{details.amount.toFixed(2)}{' '}
                      {details.settled && (
                        <span className="text-green-600 font-medium">(Settled)</span>
                      )}
                    </span>
                    <button
                      onClick={() => handleToggleSettle(expense.id, person, details.settled)}
                      className={`text-sm ${
                        details.settled ? 'text-red-600' : 'text-blue-600'
                      } hover:underline`}
                    >
                      {details.settled ? 'Undo Settled' : 'Mark as Settled'}
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => generateReceipt(expense, true)}
                className="mt-3 ml-4 px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-800"
              >
                Preview Receipt
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
