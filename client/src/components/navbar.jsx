import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import StoreIcon from '@mui/icons-material/Store';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;

  const clearToken = () => {
    localStorage.removeItem('token');
  };

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <nav className="bg-sky-100 flex justify-between items-center py-2 px-12 w-full">
      <div className="text-slate-900 text-5xl font-semibold">
        <Link to='/' >
            TS store.
        </Link>
      </div>
      <div className="flex space-x-4">
        <div className="relative group"> 
          <span className="py-1 hover:bg-slate-200 focus:outline-none">
            KATEGORI
          </span>
          {/* Dropdown Content */}
          <div className="hidden group-hover:block absolute bg-white shadow-md mt-2 p-2">
            <Link to="/categories/Album/products" className="block py-1">Album</Link>
            <Link to="/categories/T-shirt/products" className="block py-1">T-Shirt</Link>
            <Link to="/categories/Hoodie/products" className="block py-1">Hoodie</Link>
          </div>
        </div>
        {isAuthenticated ? (
        <div className="flex items-center space-x-4">
        <div className="relative group">
          <span className="py-1 px-10 hover:bg-slate-200 focus:outline-none">
            AKUN
          </span>
          <div className="hidden group-hover:block absolute bg-white shadow-md mt-2 p-2">
            <Link to="/delivery-address" className="block py-1">Alamat</Link>
            <button onClick={handleLogout} className="block py-1">Logout</button>
          </div>
          <Link to='/carts' className="py-1 px-6 bg-slate-100 rounded-full border border-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75">
            <ShoppingCart />
          </Link>
        </div>
      </div>
      ) : (
          <>
            <Link to='/register' className='py-1 px-6 hover:bg-slate-200'>
              Sign up
            </Link>
            <Link to='/login' className='py-1 px-6 hover:bg-slate-200'>
              Log in
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