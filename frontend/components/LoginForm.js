import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PT from 'prop-types';
import { axiosWithAuth } from '../axios';

export default function LoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const onChange = evt => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    axiosWithAuth().post('http://localhost:9000/api/login', values)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        navigate('/Articles');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const isDisabled = () => {
    return values.username.trim().length < 3 || values.password.trim().length < 8;
  };

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  );
}

LoginForm.propTypes = {
  login: PT.func.isRequired, 
};
