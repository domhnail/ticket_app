import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    concertId: '0', // default to first option
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

  const apiUrl = process.env.REACT_APP_API_URL;

  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('API URL:', apiUrl);
      if (!res.ok) throw new Error('Failed request');
      setModal({ show: true, type: 'success', message: 'Ticket submitted.' });
    } catch (err) {
      console.error(err);
      setModal({ show: true, type: 'error', message: 'Error submitting ticket.' });
    }
  };

  const closeModal = () => setModal({ show: false, type: '', message: '' });

  return (
    <div className="App">
      <header className="concert-header">
        <h1>🎸 Live Concert Tickets</h1>
        <p>Select your show and grab your seat before they’re gone!</p>
      </header>

      <section className="concert-info">
        <div className="band">
          <h2>BADBADNOTGOOD</h2>
          <p>Genre-bending jazz & hip-hop fusion straight from Toronto.</p>
        </div>
        <div className="band">
          <h2>American Football</h2>
          <p>Emo legends here to make you cry in 5/4 time.</p>
        </div>
      </section>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-column">
          <div className="form-field">
            <label htmlFor="concertId">Concert</label>
            <select name="concertId" id="concertId" value={formData.concertId} onChange={handleChange}>
              <option value="0">BADBADNOTGOOD</option>
              <option value="1">American Football</option>
            </select>
          </div>
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