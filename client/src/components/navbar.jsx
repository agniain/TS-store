import React, { useState } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { axiosDeleteToken } from '../axiosServices';


const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const forDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
  };

  const handleLogout = async () => {
    clearToken();
  
    try {
      await axiosDeleteToken('/logout');
    } catch (error) {
      console.error('Error logging out on the server:', error);
    }
  
    navigate('/');
  };

  return (
    <nav className="bg-cyan-950 flex justify-between items-center py-2 px-12 w-full">
      <div className="text-slate-50 text-5xl font-semibold">
        <Link to='/' >
            TS store.
        </Link>
      </div>
      <div className="flex space-x-4 ">
        <div className="relative group"> 
          <span className="cursor-pointer text-slate-50 hover:bg-cyan-900 focus:outline-none">
            KATEGORI
          </span>
          <div className="hidden group-hover:block absolute bg-white shadow-md ">
            <Link to="/categories/Album/products" className="block py-1">Album</Link>
            <Link to="/categories/T-shirt/products" className="block py-1">T-Shirt</Link>
            <Link to="/categories/Hoodie/products" className="block py-1">Hoodie</Link>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <span onClick={forDropdown}
                    className="py-1 px-10 text-slate-50 hover:bg-cyan-900 focus:outline-none">
                AKUN
              </span>
              {isDropdownVisible && (
                  <div className="absolute bg-white shadow-md mt-2 p-2">
                    <Link to="/delivery-address" className="block py-1">
                      Alamat
                    </Link>
                    <button onClick={handleLogout} className="block py-1">
                      Logout
                    </button>
                  </div>
                )}     
                <Link
                  to="/carts"
                  className="py-1 px-6 bg-slate-100 rounded-full border border-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75"
                >
                  <ShoppingCart />
                </Link>
          </div>
        </div>
        ) : (
          <>
            <Link to='/register' className='px-6 text-slate-50 hover:bg-slate-700'>
              SIGN UP
            </Link>
            <Link to='/login' className='px-6 text-slate-50 hover:bg-slate-700'>
              LOG IN
            </Link>
            <Link to='/carts' className="py-1 px-6 bg-slate-100 rounded-full border border-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75">
              <ShoppingCart />
            </Link>
          </>
        )}       
      </div>
    </nav>
  );
};

export default Navbar;