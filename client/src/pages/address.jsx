import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPostWithToken } from '../axiosServices';

const DeliveryAddress = () => {
  const [alamat, setAlamat] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kota, setKota] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [detail, setDetail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleDeliveryAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPostWithToken('/delivery-address', {
        alamat,
        kelurahan,
        kecamatan,
        kota,
        provinsi,
        detail,
      });

      console.log('Full response:', response);

      if (response && response.data) {
        console.log('Delivery address created successfully:', response.data);
        setSuccessMessage(true);
      } else {
        console.error('Error during delivery address creation: No response data');
      }
    } catch (error) {
      console.error(
        'Error during delivery address creation:',
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="px-4 justify-center items-center">
      <h1 className="text-xl mb-4 font-bold">Input Alamat Pengiriman</h1>

      <form onSubmit={handleDeliveryAddressSubmit} className="border p-6 flex flex-col items-center">
        <div className="container mb-4">
          <label htmlFor="alamat">Alamat:</label>
          <input type="text" id="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <div className="container mb-4">
          <label htmlFor="kelurahan">Kelurahan:</label>
          <input type="text" id="kelurahan" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <div className="container mb-4">
          <label htmlFor="kecamatan">Kecamatan:</label>
          <input type="text" id="kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <div className="container mb-4">
          <label htmlFor="kota">Kota:</label>
          <input type="text" id="kota" value={kota} onChange={(e) => setKota(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <div className="container mb-4">
          <label htmlFor="provinsi" className="w-30">Provinsi:</label>
          <input type="text" id="provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <div className="container mb-4">
          <label htmlFor="detail" className="w-80">Detail Alamat:</label>
          <input type="text" id="detail" value={detail} onChange={(e) => setDetail(e.target.value)} className="border rounded-md p-2" required />
        </div>

        <button type="submit">Simpan Alamat</button>
      </form>

      {successMessage ? (
        <div className="mt-4">
          <button onClick={handleHomeRedirect}>Kembali</button>
        </div>
      ) : null}
    </div>
  );
};

export default DeliveryAddress;
