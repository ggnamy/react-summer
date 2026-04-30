import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseList() {
  const { expenses, filter, setFilter, categories, deleteExpense, editExpense } = useExpenses();

  const filtered = filter === 'All' ? expenses : expenses.filter(e => e.category === filter);

  const handleEdit = (exp) => {
    const newName = prompt("แก้ไขชื่อรายการ:", exp.name);
    const newAmount = prompt("แก้ไขจำนวนเงิน:", exp.amount);
    if (newName && newAmount) {
      editExpense({ ...exp, name: newName, amount: parseFloat(newAmount) });
    }
  };

  return (
    <div className="card">
      <div className="filter-scroll">
        <button className={`chip ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
        {categories.map(c => (
          <button key={c} className={`chip ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="list-wrapper">
        {filtered.map(exp => (
          <div key={exp.id} className="expense-row">
            <div className="exp-main">
              <span className="exp-name">{exp.name}</span>
              <span className="exp-meta">{exp.category} • {exp.date}</span>
            </div>
            <div className="exp-right">
              <span className="exp-amount">฿{exp.amount.toLocaleString()}</span>
              <div className="action-btns">
                <button className="btn-icon edit" onClick={() => handleEdit(exp)}>✏️</button>
                <button className="btn-icon delete" onClick={() => deleteExpense(exp.id)}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="empty-msg">ไม่มีรายการที่บันทึกไว้</p>}
      </div>
    </div>
  );
}