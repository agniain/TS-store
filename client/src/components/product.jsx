import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosGet } from "../axiosServices";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosGet("/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axiosGet("/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchProducts();
    fetchTags();
  }, []); 

  const handleTagClick = async (tagId) => {
    try {
      const response = await axiosGet(`/tags/${tagId}/products`);
      setSelectedTag(response.data);
    } catch (error) {
      console.error("Error fetching products by tag:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // filter
  const filteredProducts = selectedTag
  ? selectedTag 
  : products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl ml-5 mb-4">Katalog Produk</h1>
      <input
        type="text"
        placeholder="Cari Produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 ml-5"
      />
      <div className="flex space-x-4 mb-4 ml-5">
        <p className="text-2xl">Tags: </p>
        {tags.map((tag) => (
          <button
            key={tag._id}
            onClick={() => handleTagClick(tag._id)}
            className={`px-4 py-2 text-black rounded-md ${
              selectedTag === tag._id ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="cursor-pointer p-2 md:p-4 border rounded-md transition-all duration-300 hover:shadow-md"
          >
            <img
              src={`http://localhost:3001/images/products/${product.image_url}`}
              alt={product.name}
              className="mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">Rp {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
