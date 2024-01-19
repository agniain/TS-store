import React from 'react';

import Navbar from '../components/navbar';
import Product from '../components/product';
import Footer from '../components/footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Product />
      <Footer />
    </>
  );
};

export default Home;



// import React from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import './index.scss';
// import { useEffect, useState } from "react";
// import { axiosGet } from "../../axiosServices";
// import headerImage from '../../images/1989-TS.jpeg';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   const getAllProducts = async () => {
//     try {
//       const res = await axiosGet('/products');
//       setProducts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   const handleSearch = async (e) => {
//     try {
//       setSearchInput(e.target.value);
//       const res = await axiosGet(`/products/${e.target.value}`);
//       setProducts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleDetail = (id) => {
//     navigate(`/detail/${id}`);
//   };

//   return (
//     <div>
//      {/* Search Bar */}
//      <input
//           type="text"
//           placeholder="Search..."
//           value={searchInput}
//           onChange={handleSearch}
//           className="border p-2 rounded-md"
//         />

//       {/* Header with Image */}
//       <header>
//         {/* Replace the image URL with your actual image */}
//         <img
//           src={headerImage}
//           alt="Header"
//           className="w-full h-full object-cover"
//         />
//       </header>

//      {/* Product Cards */}
//      <div className="container mx-auto mt-8">
//         <div className="grid grid-cols-6 gap-4">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="border p-4 cursor-pointer"
//               onClick={() => handleDetail(product.id)}
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-32 object-cover mb-2"
//               />
//               <p className="text-lg font-semibold">{product.name}</p>
//               <p className="text-gray-600">Rp ${product.price}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;
