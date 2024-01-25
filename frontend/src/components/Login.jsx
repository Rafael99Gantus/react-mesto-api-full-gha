import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as Auth from '../utils/Auth.jsx';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    Auth.authorize(email, password)
      .then((data) => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setEmail('');
          setPassword('');
          props.onLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err)=>{
        props.onIsInfoTooltip();
        setTimeout(props.closeFunc, 2000);
        console.log(err)
    })
  }

  return (
    <div className='root'>
      <main>
        <div className='login'>
          <h2 className='register__title' >Вход</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" className='register__field-email' placeholder="Email" onChange={handleEmail} value={email || ''} />
            <input type="password" className='register__field-password' placeholder="Пароль" onChange={handlePassword} value={password || ''} />
            <button className='register__button'>Войти</button>
          </form>
        </div>
      </main>
    </div>
  )
}