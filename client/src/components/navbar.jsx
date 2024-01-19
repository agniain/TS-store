import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-sky-100 flex justify-between items-center py-2 px-12 w-full">
      <div className="text-slate-900 text-5xl font-semibold">
        <Link to='/' >
            TS store.
        </Link>
      </div>
      <div className="flex space-x-4">
        <div className="relative group">
            <span className="text-black uppercase cursor-pointer">
              Kategori
            </span>
            {/* Dropdown Content */}
            <div className="hidden group-hover:block absolute bg-white shadow-md mt-2 p-2">
              <Link to="/categories/Album" className="block py-1">Album</Link> 
              <Link to="/categories/T-Shirt" className="block py-1">T-Shirt</Link>
              <Link to="/categories/Hoodie" className="block py-1">Hoodie</Link> 
          </div>
        </div>
        <Link to='/register' className='uppercase'>
          Sign in
        </Link>
        <Link to='/login' className='uppercase'>
          Log in
        </Link>
        <Link to='/' className="py-1 px-6 bg-slate-100 rounded-full border border-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75">
          <ShoppingCart />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;