import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sky-100 p-4 mt-8 w-full">
        <div className="container mx-auto flex justify-between items-center">
        {/* About Us */}
        <Link to="/" className="text-black">
            About Us
        </Link>

        {/* Location */}
        <p className="text-black"><LocationOnIcon /> Bandung, Indonesia</p>

        {/* Contact */}
        <div className="flex items-center">
            <a href="https://instagram.com" className="text-black mx-2">
            <InstagramIcon />
            </a>
            <a href="https://wa.me/123456789" className="text-black">
            <WhatsAppIcon />
            </a>
        </div>
        </div>
    </footer>
  )
}

export default Footer;