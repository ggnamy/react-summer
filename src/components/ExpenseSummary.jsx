import { useExpenses } from '../context/ExpenseContext';

export default function ExpenseSummary() {
  const { totalAmount, budget, setBudget, exportCSV } = useExpenses();
  const percent = budget > 0 ? (totalAmount / budget) * 100 : 0;
  const isOverBudget = percent > 100;

  return (
    <div className="card summary-card">
      <p className="label">ยอดรวมการใช้จ่าย</p>
      <h2 className="total-display">฿{totalAmount.toLocaleString()}</h2>
      
      <div className="budget-input-group">
        <label>ตั้งงบประมาณ:</label>
        <input 
          type="number" 
          className="input-field"
          value={budget || ''} 
          onChange={(e) => setBudget(parseFloat(e.target.value) || 0)} 
          placeholder="0.00"
        />
      </div>

      <div className="progress-section">
        <div className="progress-text">
          <span>ความคืบหน้า</span>
          <span>{percent.toFixed(1)}%</span>
        </div>
        <div className="progress-track">
          <div 
            className={`progress-bar ${isOverBudget ? 'over' : ''}`} 
            style={{ width: `${Math.min(percent, 100)}%` }}
          ></div>
        </div>
      </div>

      <button className="btn-outline" onClick={exportCSV}>📤 Export รายงาน (CSV)</button>
    </div>
  );
}