import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const RentList = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [message, setMessage] = useState('');

  const getAllUsers = () => {
    fetch('http://localhost:555/users')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch users');
          return [];
        }
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const deleteUser = (userID) => {
    fetch('http://localhost:555/users/deleteuser', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: userID}), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to delete user. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }

      const updatedItems = users.filter(item => item.ID !== userID);
      setUsers(updatedItems);
      

      setMessage('User Deleted successfully');
      alert('User Deleted successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  }

  useEffect(() => {
    getAllUsers();

    const token = localStorage.getItem('token');
    if (token) {
        setIsLoggedin(true);
    } else {
        setIsLoggedin(false);
    }
  }, []);

  return (
    <div className='container app-container'>
    <div className="form-section">
      <h3>All Users</h3>
      {message}
      <ul>
        {users.map((item) => (
          <li className='list-item' key={item.ID}>
            <div className='item-detail'>
              {item.EMAIL} - {item.NAME}
            </div>
            <div className='item-actions'>

              {localStorage.getItem('isAdmin') === 'true' && 
                  <>
                    <Button variant='danger' onClick={() => deleteUser(item.ID)}>Delete</Button>
                  </>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default RentList;
