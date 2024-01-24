import { useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { axiosGet, axiosGetWithToken, axiosPostWithToken } from "../axiosServices";
import Navbar from '../components/navbar';

const Detail = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [prodById, setProdById] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);

  const getProductById = useCallback(async () => {
    try {
      const res = await axiosGet(`/products/${productId}`);
      setProdById(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [productId]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  const addToCart = async () => {
    console.log("Adding to cart...");
    try {
      if (!isAuthenticated) {
        console.log("User is not authenticated. Redirecting to login page...");
        return;
      }
  
      const cartItem = {
        productId: prodById._id,
        quantity: quantity,
      };
  
      console.log('Adding to cart:', prodById._id, quantity);
      console.log('CartItem:', cartItem);
  
      const existingCart = await axiosGetWithToken("/carts");
  
      if (existingCart && existingCart._id) {
        // Cart exists, update it
        const updatedCart = updateExistingCart(existingCart, cartItem);
        await updateCartOnServer(updatedCart);
        
      } else {
        // Cart doesn't exist, create it
        const newCart = createNewCart(cartItem);
        await createCartOnServer(newCart);

      }
      setAddToCartSuccess(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const updateExistingCart = (existingCart, cartItem) => {
    const updatedCart = {
      ...existingCart,
      products: [...existingCart.products],
    };
  
    const existingProductIndex = updatedCart.products.findIndex(
      p => p.productId.toString() === cartItem.productId.toString()
    );
  
    if (existingProductIndex !== -1) {
      // Product already exists, update
      updatedCart.products[existingProductIndex].quantity = cartItem.quantity;
    } else {
      // Product not exist, add it to the cart
      updatedCart.products.push(cartItem);
    }
  
    // Remove products with quantity 0
    updatedCart.products = updatedCart.products.filter(product => product.quantity > 0);
  
    return updatedCart;
  };
  
  const createNewCart = (cartItem) => {
    return {
      products: [cartItem],
    };
  };
  
  const updateCartOnServer = async (updatedCart) => {
    await axiosPostWithToken("/carts", updatedCart);
  };
  
  const createCartOnServer = async (newCart) => {
    return await axiosPostWithToken("/carts", newCart);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(0, quantity - 1));
  };

  useEffect(() => {
    setAddToCartSuccess(false);
  }, []);

  const handleNavigateToCart = () => {
    console.log("handleNavigateToCart is called.");
    navigate('/carts');
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-4xl mb-5 justify-center">Detail Produk</h1>
        {addToCartSuccess && (
          <div className="bg-green-200 text-green-800 p-2 mb-4">
            Berhasil ditambahkan ke keranjang!
          </div>
        )}
    <div key={prodById._id}>
      <img
        className="max-w-full mb-4 rounded"
        src={`http://localhost:3001/images/products/${prodById.image_url}`}
        alt={prodById.name}
      />
      <h2 className="text-3xl font-bold mb-2">{prodById.name}</h2>
      <p className="text-xl mb-2">{`Harga: Rp ${prodById.price}`}</p>
      <p className="text-gray-700 mb-4">{`Deskripsi: ${prodById.description}`}</p>
      <p className="text-gray-700 mb-4">{`Kategori: ${prodById.category ? prodById.category.name : 'N/A'}`}</p>
      <p className="text-gray-700 mb-4">{`Tags: ${prodById.tags ? prodById.tags.map(tag => tag.name).join(', ') : 'N/A'}`}</p>
    </div>
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          className="mx-2 p-2 border text-center"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={addToCart}
      >
        Tambah ke keranjang
      </button>
      <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => handleNavigateToCart()} 
        >
        Lihat keranjang
      </button>
    </div>
    </>
  );
};

export default Detail;
