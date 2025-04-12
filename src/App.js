import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    concertId: '',
    email: '',
    name: '',
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

      if (!res.ok) throw new Error('something broke, bro');

      alert('ticket submitted, ya dork');
    } catch (err) {
      console.error(err);
      alert('error submitting ticket, nice job');
    }
  };

  return (
    <div className="App">
      <h1>Concert Ticket Form</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label>{key}</label><br />
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            /><br /><br />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;