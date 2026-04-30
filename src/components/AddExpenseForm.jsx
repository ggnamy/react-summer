import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

export default function AddExpenseForm() {
  const { addExpense, categories } = useExpenses();
  const [form, setForm] = useState({ 
    name: '', 
    amount: '', 
    category: categories[0], 
    date: new Date().toISOString().split('T')[0] 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount) return alert("กรุณากรอกข้อมูลให้ครบ");
    addExpense({ ...form, amount: parseFloat(form.amount) });
    setForm({ ...form, name: '', amount: '' });
  };

  return (
    <form className="card add-form" onSubmit={handleSubmit}>
      <h3 className="card-title">➕ เพิ่มรายการใหม่</h3>
      <div className="form-group">
        <input 
          className="input-field"
          placeholder="จ่ายค่าอะไร?" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
        />
        <input 
          className="input-field"
          type="number" 
          placeholder="จำนวนเงิน (฿)" 
          value={form.amount} 
          onChange={e => setForm({...form, amount: e.target.value})} 
        />
        <div className="form-row">
          <select className="select-field" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className="input-field" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
        </div>
      </div>
      <button className="btn-primary">บันทึกข้อมูล</button>
    </form>
  );
}