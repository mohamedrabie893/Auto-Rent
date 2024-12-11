import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const RentList = () => {
  const [rents, setRents] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [message, setMessage] = useState('');

  const getAllRents = () => {
    fetch('http://localhost:555/rents')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch rents');
          return [];
        }
      })
      .then((data) => {
        setRents(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching rents:', error);
      });
  };

  const bookRent = (type, model, rentID) => {
    alert(type, model);

    fetch('http://localhost:555/book', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type, model, userId: localStorage.getItem('userId'), rentID}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to book rent. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Rent booked successfully');
      alert('Rent booked successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  }

  useEffect(() => {
    getAllRents();

    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedin(true);
    } else {
        setIsLoggedin(false);
    }
  }, []);

  return (
    <div className="form-section">
      <h3>All Rents</h3>
      {message}
      <ul>
        {rents.map((item) => (
          <li key={item.ID}>
            {item.TYPE} - {item.MODEL} - {item.AVAILABILITY} (Quantity: {item.QUANTITY})

            {isLoggedin &&
              <Button disabled={item.QUANTITY === 0 || item.QUANTITY < 0} variant='primary' onClick={() => bookRent(item.TYPE, item.MODEL, item.ID)}>Book Now</Button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentList;
