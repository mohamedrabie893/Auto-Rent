import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useOutletContext } from 'react-router-dom';

const LoginForm = () => {
  const { setIsLoggedin } = useOutletContext();

  const navigate = useNavigate();
  let email = useRef();
  let password = useRef();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      setIsLoggedin(true);
      localStorage.setItem('isAdmin', userData.admin);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.id);
      setMessage('Successful');
      navigate('/');
    }

    catch (error) {
      setMessage(error.message);
      alert(error.message);
    };
  };


  return (
    <div className='container app-container'>
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
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
};

export default LoginForm;
