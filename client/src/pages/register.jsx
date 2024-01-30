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
        <div className='px-4 max-w-2xl text-center'>
          {registrationSuccess ? (
            <>
            <div className="border border-gray-600 mt-5 py-4">
              <div className="text-black mb-4">
                Selamat, akun berhasil terdaftar!
              </div>
              <div className="mt-4">
                <button onClick={handleLoginRedirect} className='bg-cyan-950 px-6 py-2 text-white rounded hover:bg-cyan-900'>
                  Login
                </button>
              </div>
            </div>
            </>
          ) : (
            <>
              <h1 className='text-xl mt-7 mb-4 font-bold'>Sign Up</h1>
              <form onSubmit={handleSignup} className='border p-6 flex flex-col items-center'>
                <div className="container mb-4">
                  <label htmlFor="fullName" className="w-40">Nama Lengkap:</label>
                  <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <div className="container mb-4">
                  <label htmlFor="email" className="w-40">Email:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <div className="container mb-4">
                  <label htmlFor="username" className="w-40">Username:</label>
                  <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <div className="container mb-4">
                  <label htmlFor="password" className="w-40">Password:</label>
                  <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-md p-2" required />
                </div>
                <button className='bg-cyan-950 px-6 py-2 text-white rounded hover:bg-cyan-900' type="submit">Sign Up</button>
              </form>
            </>
          )}
        </div>
    );
      
};


export default Signup;
