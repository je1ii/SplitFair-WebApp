import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

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

  const handleSplitChange = (index, field, value) => {
    const updated = [...splits];
    updated[index][field] = field === 'amount' ? parseFloat(value) : value;
    setSplits(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const expenseData = {
      title,
      desc,
      payer,
      amount: parseFloat(amount),
      category,
      createdAt: serverTimestamp(),
      splits: splits.reduce((acc, { name, amount }) => {
        if (name && amount) {
          acc[name] = { amount, settled: false };
        }
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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block font-medium">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <input value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Payer</label>
        <input value={payer} onChange={(e) => setPayer(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Total Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Splits</label>
        {splits.map((split, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              placeholder="Name"
              value={split.name}
              onChange={(e) => handleSplitChange(index, 'name', e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={split.amount}
              onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
              className="w-1/2 p-2 border rounded"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddSplit} className="text-sm text-blue-600 hover:underline">
          + Add Split
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Expense
      </button>
    </form>
  );
}
