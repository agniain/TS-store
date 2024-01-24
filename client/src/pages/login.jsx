import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosLogin } from '../axiosServices';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosLogin('/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setLoginSuccess(true);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleHomeRedirect = () => {
        navigate('/');
    };

    return (
        <div className='px-4justify-center items-center'>
            <h1 className='text-xl mb-4 font-bold'>Log in</h1>
            <form onSubmit={handleLogin} className='border p-6 flex flex-col items-center'>
                <div className='grid gap-4 md:grid-cols-2 mb-4'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>

            {loginSuccess ? (
                <div className="mt-4">
                    <button onClick={handleHomeRedirect}>Kembali</button>
                </div>
            ) : null}
        </div>
    );
};

export default Login;
