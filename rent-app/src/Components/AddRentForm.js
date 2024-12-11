import React, { useState } from 'react';

const AddRentForm = () => {
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [availability, setAvailability] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState(''); 

  const addRent = () => {
    fetch('http://localhost:555/flights/addrent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type, model, availability, quantity }), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add rent. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Rent added successfully');
      alert('Rent added successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h3>Add Rent (Admin)</h3>
      <form>
        <input 
          type="text" 
          placeholder="Type" 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Model" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
          required 
        /><br />
        <input 
          type="number" 
          placeholder="Availability" 
          value={availability} 
          onChange={(e) => setAvailability(e.target.value)} 
          required 
        /><br />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        /><br />
        <button type="button" onClick={addRent}>Add Rent</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddRentForm;
