// import { useState } from 'react';
// import Input from '../../components/Input';
// import './index.scss';
// import { axiosPost } from '../../axiosServices';

// const Tambah = () => {
//   const [formValues, setFormValues] = useState({
//     id: 0,
//     name: "",
//     price: 0,
//     stock: 0,
//     status: false, 
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await createProduct(formValues);
//       setFormValues({
//         id: 0,
//         name: "",
//         price: 0,
//         stock: 0,
//         status: false,
//       });
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createProduct = async (values) => {
//     try {
//       const res = await axiosPost('/product', values);
//       console.log(res);
//       alert("Produk Berhasil Ditambah!");

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInputChange = (name, value) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="main">
//       <div className="card">
//         <h2>Tambah Produk</h2>
//         <br />
//         <form onSubmit={handleSubmit}>
//         <Input 
//             name="id" 
//             type="number"
//             placeholder="ID Produk..."
//             label="ID"
//             value={formValues.id}
//             onChange={(e) => handleInputChange("id", e.target.value)}  
//           />
//           <Input 
//             name="name" 
//             type="text"
//             placeholder="Nama Produk..."
//             label="Nama"
//             value={formValues.name}
//             onChange={(e) => handleInputChange("name", e.target.value)}  
//           />
//           <Input 
//             name="price" 
//             type="number"
//             placeholder="Harga Produk..."
//             label="Harga"
//             value={formValues.price}
//             onChange={(e) => handleInputChange("price", e.target.value)}  
//           />
//           <Input 
//             name="stock" 
//             type="number"
//             placeholder="Stock Produk..."
//             label="Stock"
//             value={formValues.stock}
//             onChange={(e) => handleInputChange("stock", e.target.value)}  
//           />
//           <Input 
//             name="status" 
//             type="checkbox"
//             placeholder="Status Produk...."
//             label="Status"
//             value={formValues.status}
//             onChange={(e) => handleInputChange("status", e.target.checked)}  
//           />
//           <button type="submit" className="btn btn-primary">Simpan</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Tambah;