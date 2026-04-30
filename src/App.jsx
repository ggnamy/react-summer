import { ExpenseProvider } from './context/ExpenseContext';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

export default function App() {
  return (
    <ExpenseProvider>
      <div className="app-wrapper">
        <header className="app-header">
          <h1> Expense Tracker</h1>
        </header>

        <div className="app-layout">
          <aside className="app-sidebar">
            <ExpenseSummary />
            <ExpenseChart />
          </aside>
          
          <main className="app-content">
            <AddExpenseForm />
            <div className="list-container">
              <ExpenseList />
            </div>
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}