import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const navigate = useNavigate();
  let email = useRef();
  let password = useRef();
  const [message, setMessage] = useState('');

  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:555/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.current.value, password: password.current.value })
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const userData = await response.json();

      console.log(userData);
      localStorage.setItem('isAdmin', userData.admin);
      localStorage.setItem('token', userData.token);
      setMessage('Successful');
      navigate('/');
    }

    catch (error) {
      setMessage(error.message);
      alert(message);
    };
  };


  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          ref={email}
          onChange={(e) => (email.current.value = e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          onChange={(e) => (password.current.value = e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;
