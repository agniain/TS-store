import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRegister } from '../axiosServices';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axiosRegister('/register', {
                full_name: fullName,
                email,
                username,
                password,
            });
    
            console.log('Full response:', response);
    
            if (response && response.data) {
                console.log('registered successfully:', response.data);          
                navigate('/login');
            } else {
                console.error('Error during registration: No response data');
            }
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };    

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};


export default Signup;
