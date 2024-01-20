import React from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";

export default function Header(props) {

    const navigate = useNavigate();

    function signOut() {
        localStorage.removeItem('jwt');
        navigate("/sign-in");
        window.location.reload()
    }

    return (
        <header className="header">
            <div className="header__logo" />
             <div className="header__container">
             {props.loggedIn && <p className="header__email">{props.userEmail}</p>}
                <Routes>
                    <Route path='/' element={<Link to='/sign-in' onClick={signOut} className="register__link header__exit">Выйти</Link>} ></Route>
                    <Route path='/sign-up' element={<Link to='/sign-in' className="header__sign-up"></Link>} />
                    <Route path='/sign-in' element={<Link to='/sign-up' className="header__login" />} />
                </Routes>
            </div>

        </header>
    )
}