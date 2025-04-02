import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./HeaderProductPage";

const Purchase: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]); // เก็บข้อมูลการสั่งซื้อ
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(""); // ข้อความแสดงข้อผิดพลาด
  const navigate = useNavigate();

  // ดึงข้อมูลการสั่งซื้อจาก API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("กรุณาล็อกอินก่อนดำเนินการต่อ");
          setIsLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5000/auth/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (err) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลคำสั่งซื้อ:", err);
        setError("**เราจะส่งข้อมูลการซื้อและหมายเลขพัสดุภายใน 1-2 วัน สอบถามเพิ่มเติมโทร 0985244692**");
      } finally {
        setIsLoading(false);
      }
    };
      
    fetchOrders();
  }, []);

  const goToOrderDetail = (orderId: string) => {
    navigate(`/orderdetail/${orderId}`);
  };

  return (
    <div style={containerStyle}>
      <ProductHeader />
      <div style={orderHistoryContainerStyle}>
        <h2 style={titleStyle}>ประวัติการสั่งซื้อ</h2>

        {/* กำหนดว่า หากยังโหลดหรือมีข้อผิดพลาดให้แสดงข้อความ */}
        {isLoading ? (
          <p>กำลังโหลดข้อมูลการสั่งซื้อ...</p>
        ) : error ? (
          <p style={errorStyle}>{error}</p>
        ) : orders.length === 0 ? (
          <p style={emptyOrderStyle}>ยังไม่มีประวัติการสั่งซื้อ</p>
        ) : (
          <table style={orderTableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>หมายเลขคำสั่งซื้อ</th>
                <th style={thStyle}>วันที่สั่งซื้อ</th>
                <th style={thStyle}>ยอดรวม</th>
                <th style={thStyle}>สถานะ</th>
                <th style={thStyle}>รายละเอียด</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} style={rowStyle}>
                  <td style={tdStyle}>{order.orderNumber}</td>
                  <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={tdStyle}>{Number(order.totalAmount).toLocaleString()} บาท</td>
                  <td style={tdStyle}>{order.status}</td>
                  <td style={tdStyle}>
                    <button
                      style={detailButtonStyle}
                      onClick={() => goToOrderDetail(order._id)}
                    >
                      ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// CSS Styles
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#FFF",
};

const orderHistoryContainerStyle: React.CSSProperties = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  flex: 1,
};

const titleStyle: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "20px",
};

const orderTableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle: React.CSSProperties = {
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  backgroundColor: "#f4f4f4",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const rowStyle: React.CSSProperties = {
  backgroundColor: "#f9f9f9",
};

const detailButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  padding: "8px 16px",
  fontSize: "14px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontWeight: "bold",
};

const emptyOrderStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "18px",
  color: "#777",
};

export default Purchase;
