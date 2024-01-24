import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosGetWithToken } from "../axiosServices";
import Navbar from "../components/navbar";

const Cart = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = useCallback(async () => {
    try {
      const res = await axiosGetWithToken('/carts');
      console.log('Cart Items Response:', res.data);
      setCartItems(res.data);
    } catch (err) {
      console.log('Error fetching cart items:', err);
    }
  }, []);
  
  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCartItems]);
  
  useEffect(() => {
    console.log('Cart Items:', cartItems);
    // Log specific properties
    cartItems.products?.forEach((item, index) => {
      console.log(`Item ${index + 1} Products:`, item);
    });
  }, [cartItems]);

  const formatCurrency = (value) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };  
  
  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.quantity * (product.productId && product.productId.price);
    }, 0);
  };

  const handleCheckOut = () => {
    navigate('/orders');
  };


  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {isAuthenticated ? (
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">Keranjang Belanja</h2>
          {cartItems && cartItems.products && cartItems.products.length > 0 ? (
            <div className="flex flex-col">
              {cartItems.products.map((product, index) => (
                <div key={product.productId._id} className="flex items-center mb-4">
                  <img
                    src={`http://localhost:3001/images/products/${product.productId.image_url}`}
                    alt={product.productId && product.productId.name}
                    className="h-12 w-auto mr-2 flex-shrink-0"
                  />
                  <div className="ml-2 flex">
                    <div className="w-40">
                      <p>{product.productId && product.productId.name}</p>
                    </div>
                    <div className="w-24">
                      <p>{`x ${product.quantity}`}</p>
                    </div>
                    <div className="w-32">
                    <p>{`Rp ${formatCurrency(product.productId && product.productId.price)}`}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 mb-10">
                <p className="font-bold">Total Price: Rp {formatCurrency(calculateTotalPrice(cartItems.products))}</p>
              </div>
              <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => handleCheckOut()}>
            Checkout
          </button>
            </div>
            
          ) : (
            <p>Keranjang anda kosong.</p>
          )}

          
          <Link to="/" className="text-blue-500 hover:underline mt-4">
            Back
          </Link>
        </div>
      ) : null}
    </>
  );
};
  

export default Cart;