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
                navigate('/');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='px-4 py-5 max-w-2xl '>
            <h1 className='text-xl mb-4 font-bold text-center'>Log in</h1>
            <form onSubmit={handleLogin} className='border p-6 flex flex-col items-center'>
                <div className="container mb-4">                
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <div className="container mb-4">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <button type="submit" className='bg-cyan-950 px-6 py-2 text-white text-center rounded hover:bg-cyan-900'>Login</button>
            </form>
        </div>
    );
};

export default Login;
