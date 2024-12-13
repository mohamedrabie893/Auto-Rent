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

  const bookRent = (type, model, rentID, quantity) => {
    fetch('http://localhost:555/book', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type, model, quantity , userID: parseInt(localStorage.getItem('userId')), rentID}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to book rent. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }

      setRents((prevItems) =>
        prevItems.map((item) =>
          item.ID === rentID ? { ...item, QUANTITY: item.QUANTITY-1 } : item
        )
      );
      

      setMessage('Rent booked successfully');
      alert('Rent booked successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  }

  const deleteRent = (type, model, rentID) => {
    fetch('http://localhost:555/rents/deleterent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({type, model, rentID}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to book rent. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }

      const updatedItems = rents.filter(item => item.ID !== rentID);
      setRents(updatedItems);
      

      setMessage('Rent Deleted successfully');
      alert('Rent Deleted successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  }

  const editRent = (rentID, quantity) => {
    fetch(`http://localhost:555/rents/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: rentID, quantity}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to book rent. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }

      setRents((prevItems) =>
        prevItems.map((item) =>
          item.ID === rentID ? { ...item, QUANTITY: quantity } : item
        )
      );

      setMessage('Rent Updated successfully');
      alert('Rent Updated successfully'); 
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
            {item.TYPE} - {item.MODEL} (Quantity: {item.QUANTITY})

            {isLoggedin &&
              <Button disabled={item.QUANTITY === 0 || item.QUANTITY < 0} variant='dark' onClick={() => bookRent(item.TYPE, item.MODEL, item.ID, item.QUANTITY)}>Book Now</Button>
            }

            {localStorage.getItem('isAdmin') === 'true' && 
                <>
                  <Button variant='warning' onClick={() => editRent(item.TYPE, item.MODEL, item.ID)}>Edit</Button>
                  <Button variant='danger' onClick={() => deleteRent(item.TYPE, item.MODEL, item.ID, 5)}>Delete</Button>
                </>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentList;
