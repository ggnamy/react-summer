import { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();
const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case 'EDIT':
      return {
        ...state,
        expenses: state.expenses.map(e => e.id === action.payload.id ? action.payload : e)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    case 'LOAD':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { expenses: [], filter: 'All', budget: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('tracker_data');
    if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
  }, []);

  useEffect(() => {
    localStorage.setItem('tracker_data', JSON.stringify(state));
  }, [state]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const exportCSV = () => {
    const headers = "Date,Name,Category,Amount\n";
    const data = state.expenses.map(e => `${e.date},${e.name},${e.category},${e.amount}`).join("\n");
    const blob = new Blob([headers + data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <ExpenseContext.Provider value={{ 
      ...state, 
      categories: CATEGORIES, 
      totalAmount,
      addExpense: (exp) => dispatch({ type: 'ADD', payload: { ...exp, id: Date.now() } }),
      deleteExpense: (id) => dispatch({ type: 'DELETE', payload: id }),
      editExpense: (exp) => dispatch({ type: 'EDIT', payload: exp }),
      setFilter: (cat) => dispatch({ type: 'SET_FILTER', payload: cat }),
      setBudget: (val) => dispatch({ type: 'SET_BUDGET', payload: val }),
      exportCSV
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = () => useContext(ExpenseContext);