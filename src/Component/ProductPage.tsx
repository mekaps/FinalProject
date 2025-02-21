import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ใช้สำหรับนำทาง
import ProductHeader from "./HeaderProductPage";
import Footer from "./Footer";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState([]); 
  const [sortOrder, setSortOrder] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [footerSize, setFooterSize] = useState(100);
  const navigate = useNavigate(); // ✅ ใช้ Navigate

  const productsPerPage = 8;

  // ✅ ดึงข้อมูลจาก Backend (MongoDB)
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("❌ Error fetching products:", error));
  }, []);

  // ✅ เรียงลำดับสินค้า
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-high") return Number(a.price) - Number(b.price);
    if (sortOrder === "high-low") return Number(b.price) - Number(a.price);
    return 0;
  });

  // ✅ Pagination (แบ่งหน้าสินค้า)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ✅ เมื่อคลิกสินค้า → ไปยังหน้า Product Details
  const goToProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#FFFFFF" }}>
      <ProductHeader />

      {/* ✅ ส่วนเนื้อหาหลัก */}
      <div id="content-container" style={{ ...contentStyle, paddingBottom: `${footerSize}px` }}>
        {/* 🔹 แถบตัวกรอง */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "15px" }}>
            <button onClick={() => setSortOrder("all")} style={buttonStyle}>ทั้งหมด</button>
            <button onClick={() => setSortOrder("high-low")} style={buttonStyle}>ราคา สูง - ต่ำ</button>
            <button onClick={() => setSortOrder("low-high")} style={buttonStyle}>ราคา ต่ำ - สูง</button>
          </div>
          <button style={{ backgroundColor: "transparent", border: "none", fontSize: "16px", cursor: "pointer" }}>แนะนำ</button>
        </div>

        {/* 🔹 แสดงสินค้า */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center" }}>
          {currentProducts.map((product) => (
            <div 
              key={product._id} 
              className="product-card" 
              style={productCardStyle}
              onClick={() => goToProductDetails(product._id)} // ✅ คลิกแล้วไปหน้า Product Details
            >
              <img 
                src={`http://localhost:5000${product.image}`} 
                alt={product.name} 
                style={{ width: "100%", height: "180px", objectFit: "cover" }} 
              />
              <p style={{ fontSize: "20px", color: "black", marginTop: "10px", fontWeight: "bold" }}>{product.name}</p>
              <p style={{ fontWeight: "initial", color: "black" }}>{Number(product.price).toLocaleString()} บาท</p>
            </div>  
          ))}
        </div>

        {/* 🔹 ระบบแบ่งหน้า */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={{
                padding: "8px 15px",
                fontSize: "16px",
                border: "none",
                backgroundColor: currentPage === index + 1 ? "#000" : "#ccc",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Footer ปรับขนาดอัตโนมัติ */}
      <div style={{ height: `${footerSize}px`, transition: "height 0.3s ease-in-out" }}>
        <Footer />
      </div>
    </div>
  );
};

// ✅ สไตล์ขององค์ประกอบต่างๆ
const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#FFFFFF",
  overflowY: "auto",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 15px",
  fontSize: "16px",
  border: "none",
  backgroundColor: "#000",
  color: "#fff",
  cursor: "pointer",
  borderRadius: "5px",
};

// ✅ กรอบสินค้า (มี Hover Effect)
const productCardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "10px",
  textAlign: "center",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer", // ✅ ทำให้คลิกได้
};

// ✅ CSS Hover Effect
const style = document.createElement("style");
style.innerHTML = `
  .product-card:hover {
    transform: scale(1.05); /* ✅ ขยายเมื่อ Hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* ✅ เพิ่มเงา */
  }
`;
document.head.appendChild(style);

export default ProductPage;
