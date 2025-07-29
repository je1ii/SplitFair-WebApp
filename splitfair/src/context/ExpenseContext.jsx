import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();
export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) {
      setExpenses([]);
      return;
    }

    const q = query(collection(db, 'expenses'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, [user]);

  const addExpense = async (desc, amount, payer, splits) => {
    if (!user) return;
    const newExpense = {
      id: uuidv4(),
      desc,
      amount,
      payer,
      splits,
      userId: user.uid,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'expenses'), newExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
