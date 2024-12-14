import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
const RegisterForm = () => {
  const navigate = useNavigate();
  let isAdmin = useRef();
  let name = useRef();
  let email = useRef();
  let password = useRef();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const registerUser = () => {
    fetch('http://localhost:555/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.current.value, email: email.current.value, password: password.current.value, isAdmin: isAdmin.current.value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        setMessage('Registration successful');
        alert('Registration successful'); 
        navigate('/login');
      })
      .catch((error) => {
        setMessage(error.message);
        alert(error.message); 
      });
  };
  useEffect(() => {
    isAdmin.current.value = false;
  }, []);
  return (
    <div className="form-section">
      <h3>User Registration</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          ref={name}
          onChange={(e) => (name.current.value = e.target.value)} 
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          ref={email}
          onChange={(e) => (email.current.value = e.target.value)} 
          required
        />
        <br />
        <div className='password-wrapper'>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          ref={password}
          onChange={(e) => (password.current.value = e.target.value)}
          required
        />
        <button className='show-password-btn' type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        </div>

        <br />
        <label style={{display: 'none' }}>
          <input
            type="checkbox"
            ref={isAdmin}
            onChange={(e) => (isAdmin.current.value = e.target.checked)} 
          />
          Admin
        </label>
        <br />
        <button type="button" onClick={registerUser}>
          Register
        </button>
      </form>
      <p>{message}</p> 
    </div>
  );
};

export default RegisterForm;
