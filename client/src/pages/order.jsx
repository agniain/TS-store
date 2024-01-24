import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  axiosDelete,
  axiosGetUser,
  axiosGetWithToken,
  axiosPostWithToken,
} from "../axiosServices";

const Order = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [statusPayment, setStatusPayment] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    cartItems.products?.forEach((item, index) => {
      console.log(`Item ${index + 1} Products:`, item);
    });
  }, [cartItems]);

  useEffect(() => {
    console.log('user full name:', userData && userData.full_name);
  }, [userData]);

  useEffect(() => {
    console.log('Delivery Address:', deliveryAddress);
  }, [deliveryAddress]);

  useEffect(() => {
    console.log('Delivery Fee:', deliveryFee);
    console.log('Status Payment:', statusPayment);
  }, [deliveryFee, statusPayment]);

  const fetchData = async () => {
    try {
      const cartRes = await axiosGetWithToken("/carts");
      setCartItems(cartRes.data);

      const userRes = await axiosGetUser("/users");
      setUserData(userRes.data);

      const addressRes = await axiosGetWithToken("/delivery-address");
      if (addressRes.data && addressRes.data) {
        setDeliveryAddress(addressRes.data);
      } else {
        console.error("No delivery address found");
      }

      const orderRes = await axiosGetWithToken("/orders");
      console.log("Order Response:", orderRes.data);
  
      if (orderRes.data && orderRes.data.length > 0) {
        // Access the first element of the array
        const firstOrder = orderRes.data[0];
        
        setDeliveryFee(firstOrder.delivery_fee);
        setStatusPayment(firstOrder.status);
      } else {
        console.error("Order data not available");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const calculateSubtotal = (products) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      return 0;
    }
  
    return products.reduce((acc, product) => {
      return acc + product.quantity * product.productId.price;
    }, 0);
  };  

  const placeOrder = async () => {
    try {
      const isAuthenticated = localStorage.getItem("token") !== null;
  
      if (!isAuthenticated) {
        throw new Error("User not authenticated");
      }
  
      const orderDetails = cartItems.products.map((item) => ({
        user: userData._id,
        product: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }));
      
      // Calculation
      const subTotal = calculateSubtotal(cartItems.products);
      const totalOrder = subTotal + deliveryFee;

      const orderPayload = {
        order_details: orderDetails,
        delivery_address: deliveryAddress._id,
        delivery_fee: deliveryFee,
        sub_total: subTotal,
        total_order: totalOrder,
        status: statusPayment,
      };
  
      // Place order
      const orderRes = await axiosPostWithToken("/orders", orderPayload);
  
      if (orderRes.data && orderRes.data.order && orderRes.data.order._id) {
        setOrderId(orderRes.data.order._id);
        setIsOrderPlaced(true);
  
        // Fetch order details from the server
        const fetchedOrderDetailsRes = await axiosGetWithToken(`/orders`);
  
        if (fetchedOrderDetailsRes.data && fetchedOrderDetailsRes.data.order_details) {
          // Clear the cart
          await axiosDelete("/carts");
        } else {
          console.error("Error fetching order details");
          // Optionally handle this case (e.g., show an error message to the user)
        }
      } else {
        throw new Error("Error placing order: Order ID not available in the response");
      }
    } catch (placeOrderError) {
      console.error("Error placing order:", placeOrderError.message);
      // Optionally handle this case (e.g., show an error message to the user)
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleInvoiceRedirect = () => {
    navigate(`/invoices/${orderId}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {isAuthenticated ? (
        <>
          {!isOrderPlaced ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Order Details</h2>
              <div>{userData && userData.full_name}</div>
  
              <div>
                <h3 className="text-2xl font-bold mb-2">Alamat Pengiriman</h3>
                <div className="mb-4">
                  {`${deliveryAddress.alamat}, ${deliveryAddress.kelurahan}, ${deliveryAddress.kecamatan}, ${deliveryAddress.kota}, ${deliveryAddress.provinsi}, ${deliveryAddress.detail}`}
                </div>
              </div>
  
              <div>
                {cartItems && cartItems.products && cartItems.products.length > 0 && (
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
                      <p className="font-bold">Total Harga: {formatCurrency(calculateSubtotal(cartItems.products))}</p>
                      <p className="font-bold">Ongkos Kirim: {formatCurrency(deliveryFee)}</p>
                      <p className="font-bold">Total Pesanan: {formatCurrency(calculateSubtotal(cartItems.products) + deliveryFee)}</p>
                      <p className="font-bold">Status Pembayaran: {statusPayment}</p>
                    </div>
                  </div>
                )}
  
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={placeOrder}
                >
                  Buat Pesanan
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <p className="text-green-600 font-bold">Pesanan berhasil!</p>
              <div className="mt-4">
                <button onClick={handleInvoiceRedirect} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Lihat Invoice
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500">
          You are not authenticated. Please log in to view this page.
        </p>
      )}
      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Kembali
      </Link>
    </div>
  );  
 
};

export default Order;
