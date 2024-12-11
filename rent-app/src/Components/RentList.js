import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const RentList = () => {
  const [rents, setRents] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);

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
      })
      .catch((error) => {
        console.error('Error fetching rents:', error);
      });
  };

  const bookRent = (id) => {
    alert(id);
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
      <ul>
        {rents.map((item) => (
          <li key={item.ID}>
            {item.TYPE} - {item.MODEL} - {item.AVAILABILITY} (Quantity: {item.QUANTITY})

            {isLoggedin &&
              <Button variant='primary' onClick={() => bookRent(item.ID)}>Book Now</Button>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentList;
