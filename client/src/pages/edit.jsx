// import { useEffect, useState } from "react";
// import Input from "../../components/Input";
// import { axiosGet, axiosPut } from "../../axiosServices";
// import { useParams } from "react-router-dom";


// const Edit = () => {
//   const { productId } = useParams();
//   const [prodById, setEditModal] = useState({});

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//       const prevData = async () => {
//         setLoading(true);
//         try {
//           const response = await axiosGet(`/product/${productId}`);
//           setEditModal(response.data);
//         } catch (err) {
//           console.log(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//   prevData();
//   }, [productId]);
  
//   const handleInputChange = (name, value) => {
//     setEditModal((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleEdit = async () => {
//         setLoading(true)
//         try {
//             const res = await axiosPut(`/product/${productId}`, prodById);
//             console.log(res);

//             const updatedData = await axiosGet(`/product/${productId}`);
//             console.log(res);
            
//             setEditModal(updatedData.data);
//             alert("Produk Berhasil Diubah!");
//         }
//         catch (err) {
//             console.log(err)
//         } finally {
//           setLoading(false);
//         }
//   };

//   return (
//     <div className="main">
//       <div className="card">
//         <h2>Edit Produk</h2>
//         <br />
//         <form onSubmit={handleEdit}>
//         <Input 
//             name="id" 
//             type="number"
//             label="ID"
//             value={prodById.id}
//             onChange={(e) => handleInputChange("id", e.target.value)}  
//           />
//           <Input 
//             name="name" 
//             type="text"
//             label="Nama"
//             value={prodById.name}
//             onChange={(e) => handleInputChange("name", e.target.value)}  
//           />
//           <Input 
//             name="price" 
//             type="number"
//             label="Harga"
//             value={prodById.price}
//             onChange={(e) => handleInputChange("price", e.target.value)}  
//           />
//           <Input 
//             name="stock" 
//             type="number"
//             label="Stock"
//             value={prodById.stock}
//             onChange={(e) => handleInputChange("stock", e.target.value)}  
//           />
//           <Input 
//             name="status" 
//             type="checkbox"
//             label="Status"
//             checked={prodById.status}
//             onChange={(e) => handleInputChange("status", e.target.checked)}  
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Edit;