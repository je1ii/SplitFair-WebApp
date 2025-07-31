import { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const ExpenseContext = createContext();

export function useExpenses() {
  return useContext(ExpenseContext);
}

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ExpenseContext.Provider value={{ expenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}
