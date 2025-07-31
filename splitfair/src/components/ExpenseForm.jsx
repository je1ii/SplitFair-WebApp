import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import './ExpenseForm.css';

export default function ExpenseForm() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [splits, setSplits] = useState([{ name: '', amount: '' }]);

  const handleAddSplit = () => {
    setSplits([...splits, { name: '', amount: '' }]);
  };

  const handleRemoveSplit = (index) => {
    const updated = [...splits];
    updated.splice(index, 1);
    setSplits(updated);
  };

  const handleSplitChange = (index, field, value) => {
    const updated = [...splits];
    updated[index][field] = field === 'amount' ? parseFloat(value) || '' : value;
    setSplits(updated);
  };

  const totalSplitAmount = splits.reduce((sum, split) => {
    return sum + (parseFloat(split.amount) || 0);
  }, 0);

  const allFieldsFilled =
    title.trim() &&
    desc.trim() &&
    payer.trim() &&
    amount &&
    category.trim() &&
    splits.every((s) => s.name.trim() && s.amount);

  const amountMatch = parseFloat(amount) === totalSplitAmount;

  const isFormValid = allFieldsFilled && amountMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !isFormValid) return;

    const expenseData = {
      title,
      desc,
      payer,
      amount: parseFloat(amount),
      category,
      createdAt: serverTimestamp(),
      createdBy: user.uid,
      splits: splits.reduce((acc, { name, amount }) => {
        acc[name] = { amount: parseFloat(amount), settled: false };
        return acc;
      }, {}),
    };

    await addDoc(collection(db, 'expenses'), expenseData);

    // Reset form
    setTitle('');
    setDesc('');
    setPayer('');
    setAmount('');
    setCategory('');
    setSplits([{ name: '', amount: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Payer</label>
        <input value={payer} onChange={(e) => setPayer(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Total Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <div className="form-group-column">
        <label>Splits</label>
        <div className="splits-list">
          {splits.map((split, index) => (
            <div key={index} className="split-group">
              <input
                placeholder="Name"
                value={split.name}
                onChange={(e) => handleSplitChange(index, 'name', e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={split.amount}
                onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
              />
              {splits.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSplit(index)}
                  className="remove-split-btn"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddSplit} className="add-split-btn">
            + Add Split
          </button>
        </div>
      </div>

      <div className="split-total-warning">
        Split Total: ₱{totalSplitAmount.toFixed(2)}{' '}
        {!amountMatch && <span style={{ color: 'red' }}>(Must equal ₱{amount || '0.00'})</span>}
      </div>

      <button type="submit" className="submit-btn" disabled={!isFormValid}>
        Add Expense
      </button>
    </form>
  );
}
