// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// // import * as Auth from '../utils/Auth.jsx';

// export default function Register(props) {
//     // eslint-disable-next-line no-unused-vars
//     const [isRegisterSuccess, setIsRegisterSuccess] = useState(true)
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleEmail = (e) => {
//         setEmail(e.target.value)
//     }
//     const handlePassword = (e) => {
//         setPassword(e.target.value)
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         props.onRegister(email, password)
//         navigate('/sign-in', { replace: true });
//         setIsRegisterSuccess(true)
//         props.onIsInfoTooltip();
//         setTimeout(props.closeFunc, 2000)
//     }

//     return (
//         <div className='root'>
//             <main>
//                 <div className='register'>
//                     <h2 className='register__title' >Регистрация</h2>
//                     <form onSubmit={handleSubmit} >

//                         <input type="email"
//                             className='register__field-email'
//                             placeholder="Email"
//                             value={email || ''}
//                             onChange={handleEmail} />

//                         <input type="password"
//                             className='register__field-password'
//                             placeholder="Пароль"
//                             value={password || ''}
//                             onChange={handlePassword} />

//                         <button className='register__button' onSubmit={handleSubmit}>Зарегистрироваться</button>
//                     </form>
//                     <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
//                 </div>
//             </main>
//         </div>
//     )
// }

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as Auth from '../utils/Auth.jsx';

export default function Register(props) {
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
      }
      const handlePassword = (e) => {
        setPassword(e.target.value)
      }

    function handleSubmit(e) {
        e.preventDefault();
        Auth.register(email, password)
        .then(() => {
            setIsRegisterSuccess(true)
            navigate('/sign-in', {replace: true});
            props.onIsInfoTooltip();
            setTimeout(props.closeFunc, 2000)
        })
        .catch((err)=>{
            setIsRegisterSuccess(false)
            props.onIsInfoTooltip();
            setTimeout(props.closeFunc, 2000);
            console.log(err)
        })
    }

    return (
        <div className='root'>
                <main>
                <div className='register'>
                    <h2 className='register__title' >Регистрация</h2>
                    <form onSubmit={handleSubmit} >

                        <input type="email"
                            className='register__field-email'
                            placeholder="Email"
                            value={email || ''}
                            onChange={handleEmail} />

                        <input type="password"
                            className='register__field-password'
                            placeholder="Пароль"
                            value={password || ''}
                            onChange={handlePassword} />

                        <button className='register__button' onSubmit={handleSubmit}>Зарегистрироваться</button>
                    </form>
                    <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
                </div>
                </main>
        </div>
    )
}