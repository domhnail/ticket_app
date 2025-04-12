import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    concertId: '',
    name: '',
    email: '',
    phone: '',
    quantity: '',
    creditCard: '',
    expiration: '',
    securityCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed request');

      setModal({ show: true, type: 'success', message: 'Ticket submitted.'});
    } catch (err) {
      console.error(err);
      setModal({ show: true, type: 'error', message: 'Error.' });
    }
  };

  const closeModal = () => setModal({ show: false, type: '', message: '' });

  return (
    <div className="App">
      <h1>Concert Ticket Form</h1>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-column">
          <FormInput label="concertId" value={formData.concertId} onChange={handleChange} />
          <FormInput label="name" value={formData.name} onChange={handleChange} />
          <FormInput label="email" value={formData.email} onChange={handleChange} />
          <FormInput label="phone" value={formData.phone} onChange={handleChange} />
          <FormInput label="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div className="form-column">
          <FormInput label="creditCard" value={formData.creditCard} onChange={handleChange} />
          <FormInput label="expiration" value={formData.expiration} onChange={handleChange} />
          <FormInput label="securityCode" value={formData.securityCode} onChange={handleChange} />
          <FormInput label="address" value={formData.address} onChange={handleChange} />
          <FormInput label="city" value={formData.city} onChange={handleChange} />
          <FormInput label="province" value={formData.province} onChange={handleChange} />
          <FormInput label="postalCode" value={formData.postalCode} onChange={handleChange} />
          <FormInput label="country" value={formData.country} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal ${modal.type}`}>
            <p>{modal.message}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange }) {
  return (
    <div className="form-field">
      <label htmlFor={label}>{label}</label>
      <input type="text" name={label} id={label} value={value} onChange={onChange} />
    </div>
  );
}

export default App;