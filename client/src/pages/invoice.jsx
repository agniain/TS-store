import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosGetWithToken } from "../axiosServices";

const Invoice = () => {
  const { orderId } = useParams();
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axiosGetWithToken(`/invoices/${orderId}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Invoice</h2>

      <div>
        <h3 className="text-2xl font-bold mb-2">Nama:</h3>
        <p>{invoiceData.user && invoiceData.user.nama}</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Alamat:</h3>
        <p>
          {invoiceData.delivery_Address &&
            `${invoiceData.delivery_Address.alamat}, ${invoiceData.delivery_Address.kelurahan}, ${invoiceData.delivery_Address.kecamatan}, ${invoiceData.delivery_Address.kota}, ${invoiceData.delivery_Address.provinsi}, ${invoiceData.delivery_Address.detail}`}
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Order Detail:</h3>
        {invoiceData.order_details &&
          invoiceData.order_details.map((item) => (
            <div key={item._id} className="mb-4">
              {item.product.name}, {item.price}, {item.quantity}
            </div>
          ))}
      </div>

      <p className="font-bold">Ongkos Kirim: Rp {invoiceData.deliveryFee}</p>
      <p className="font-bold">Total Order: Rp {invoiceData.totalOrder}</p>
      <p className="font-bold">Status: {invoiceData.status}</p>

      <Link to="/" className="text-blue-500 hover:underline mt-4">
        Kembali
      </Link>
    </div>
  );
};

export default Invoice;
