// import { Link, useParams } from "react-router-dom";
// import React, { useCallback, useEffect, useState } from "react";
// import './index.scss';
// import { axiosGet } from "../../axiosServices";

// const Detail = () => {
//   const { productId } = useParams();
//   const [prodById, setProdById] = useState({});

//   const getProductById = useCallback(async () => {
//     try {
//       const res = await axiosGet(`/product/${productId}`);
//       setProdById(res.data);
//     } catch (err) {console.log(err)};
//   }, [productId]);

//   useEffect(() => {
//     getProductById();
//   }, [getProductById]);

//   return (
//     <div className="main">
//       <Link to="/" className="btn btn-primary">Kembali</Link>

//       <table className="table">
//         <tbody>
//           <tr>
//             <td>ID</td>
//             <td>: {prodById.id}</td>
//           </tr>
//           <tr>
//             <td>Nama</td>
//             <td>: {prodById.name}</td>
//           </tr>
//           <tr>
//             <td>Harga</td>
//             <td>: {prodById.price}</td>
//           </tr>
//           <tr>
//             <td>Stock</td>
//             <td>: {prodById.stock}</td>
//           </tr>
//           <tr>
//             <td>Status</td>
//             <td>: {prodById.status}</td>
//           </tr>
//         </tbody>  
//       </table>
//     </div>
//   )
// }

// export default Detail;