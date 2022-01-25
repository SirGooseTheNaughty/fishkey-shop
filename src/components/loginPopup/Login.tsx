import React, { useState } from 'react';
import "./login.scss";
import { signInWithGoogle, registerWithEmail, signInWithEmail, signOut } from '../../services/AuthService';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginPopupContent = (): React.ReactNode => {
        if (props.user) {
            return (
                <>
                    <div className="login__header">ВЫ УВЕРЕНЫ, ЧТО ХОТИТЕ ВЫЙТИ?</div>
                    <div className="you">{props.user.name}</div>
                    <div className="login__buttons">
                        <button onClick={signOut}>Выйти</button>
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="login__header">ВОЙТИ</div>
                <input type="text" className="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="password" placeholder="пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="login__buttons">
                    <button onClick={() => signInWithEmail(email, password)}>Войти</button>
                    <button onClick={() => registerWithEmail(email, password)}>Зарегистрироваться</button>
                    <div className="googleSignup" onClick={signInWithGoogle}>
                        <img src="./google-logo.png" alt="google signup" />
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__close" onClick={() => props.setShowLoginPopup(false)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1L8 8M1 15L8 8M8 8L15 15L1 1" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                {loginPopupContent()}
            </div>
        </div>
    )
};