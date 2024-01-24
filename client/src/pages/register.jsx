import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRegister } from '../axiosServices';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
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
                setRegistrationSuccess(true);          
            } else {
                console.error('Error during registration: No response data');
            }
        } catch (error) {
            console.error('Error during registration:', error.response ? error.response.data : error.message);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };    

    return (
        <div className='px-4justify-center items-center'>
            <h1 className='text-xl mb-4 font-bold'>Sign Up</h1>
            
            {registrationSuccess ? (
                <div className="text-black mb-4">
                    Selamat, akun berhasil terdaftar!
                </div>
            ) : null}
            
            <form onSubmit={handleSignup} className='border p-6 flex flex-col items-center'>
                <div className='grid gap-4 md:grid-cols-2 mb-4'>
                    <label htmlFor="fullName">Nama Lengkap:</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='grid gap-4 md:grid-cols-2 mb-4'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>

            {registrationSuccess ? (
                <div className="mt-4">
                    <button onClick={handleLoginRedirect}>Login</button>
                </div>
            ) : null}

        </div>
    );
};


export default Signup;
