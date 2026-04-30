import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseChart() {
  const { expenses, categories } = useExpenses();

  const data = categories.map(cat => ({
    name: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0)
  }));

  const max = Math.max(...data.map(d => d.total), 1);

  return (
    <div className="card">
      <h3 className="card-title">📊 สถิติแยกตามหมวดหมู่</h3>
      <div className="chart-list">
        {data.map(d => (
          <div key={d.name} className="chart-item">
            <div className="chart-info">
              <span>{d.name}</span>
              <span>฿{d.total.toLocaleString()}</span>
            </div>
            <div className="bar-bg">
              <div className="bar-fill" style={{ width: `${(d.total / max) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}