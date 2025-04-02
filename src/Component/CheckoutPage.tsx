import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import Modal from "react-modal"; // Import Modal for popup

// Stripe public key
const stripePromise = loadStripe("pk_test_51R6CzM07q2471zn72tg6k1jSmStnS6WuKgNgUxzT73yzsSFEV8KPiAJW2AqlAyA7QgO5o99fgu89ZscpY7S91aUk00efKMyvDz");

Modal.setAppElement("#root"); // For accessibility

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, shippingAddress, products } = location.state;

  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false); // Track success
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // For Popup modal

  const stripe = useStripe();
  const elements = useElements();

  if (!totalAmount) {
    return <div>❌ ไม่มีข้อมูลยอดเงิน</div>;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    setIsProcessing(true);
  
    const card = elements.getElement(CardElement);
  
    if (!card) {
      return;
    }
  
    const { token, error } = await stripe.createToken(card);
  
    if (error) {
      setError(error.message || "เกิดข้อผิดพลาดในการชำระเงิน");
      setIsProcessing(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: totalAmount,
        token: token.id,
      });
  
      const { clientSecret } = response.data;
  
      const result = await stripe.confirmCardPayment(clientSecret);
  
      if (result.error) {
        setError(result.error.message || "การชำระเงินไม่สำเร็จ");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentSuccess(true);
          setModalIsOpen(true); // เปิด modal สำหรับใบเสร็จ
  
          // ข้อมูลการสั่งซื้อที่จะส่งไปยัง Backend
          const orderData = {
            email: user,  // ส่ง email ของผู้ใช้ที่ทำการล็อกอิน
            shippingAddress,
            products,
            totalAmount,
          };
  
          // ส่งข้อมูลการสั่งซื้อไปที่ backend
          await axios.post("http://localhost:5000/order/complete", orderData);
  
          // ลบสินค้าจากตะกร้า (หลังจากการชำระเงินสำเร็จ)
          await axios.post("http://localhost:5000/cart/clear", { email: user });
        }
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการชำระเงิน:", err);
      setError("ไม่สามารถชำระเงินได้ กรุณาลองใหม่อีกครั้ง");
    }
  
    setIsProcessing(false);
  };
  // Function to generate PDF invoice
  const generateInvoicePDF = () => {
    const doc = new jsPDF();
    doc.setFont("TH Sarabun", "normal");

    doc.text("Invoice", 20, 20);
    doc.text(`Amount: ${Number(totalAmount).toLocaleString()} THB`, 20, 30);
    doc.text(`Shipping Address: ${shippingAddress.name}`, 20, 40);
    doc.text(`Address: ${shippingAddress.address}`, 20, 50);
    doc.text(`Phone: ${shippingAddress.phone}`, 20, 60);

    doc.save("invoice.pdf"); // Save the file as invoice.pdf
  };

  return (
    <div style={pageContainerStyle}>
      {paymentSuccess ? (
        <>
          <h1 style={modalContentStyle}>การชำระเงินสำเร็จ</h1>
          <button style={downloadButtonStyle} onClick={generateInvoicePDF}>
            ดาวน์โหลดใบเสร็จ
          </button>
        </>
      ) : (
        <>
          <h1 style={titleStyle}>ชำระเงินผ่าน Credit Card</h1>

          <div style={infoContainerStyle}>
            <h2 style={amountStyle}>ยอดเงินที่ต้องชำระ: {Number(totalAmount).toLocaleString()} บาท</h2>
            <h2 style={amountStyle}>
              ที่อยู่จัดส่ง: {shippingAddress.name}
            </h2>
            <h2 style={amountStyle}>{shippingAddress.address}</h2>
            <h2 style={amountStyle}>{shippingAddress.phone}</h2>
          </div>

          <div style={paymentFormContainerStyle}>
            <h3>กรุณากรอกข้อมูลบัตรเครดิตของคุณ</h3>
            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit" disabled={isProcessing || !stripe} style={submitButtonStyle}>
                {isProcessing ? "กำลังประมวลผล..." : "ชำระเงิน"}
              </button>
            </form>
            {error && <div style={errorStyle}>{error}</div>}
          </div>

          <div style={backButtonContainerStyle}>
            <button style={backButtonStyle} onClick={() => window.history.back()}>
              กลับไปยังหน้าตะกร้าสินค้า
            </button>
          </div>
        </>
      )}

      {/* Modal Popup for Invoice */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Invoice Modal"
        style={modalStyle}
      >
        <h2 style={modalContentStyle}>ใบเสร็จการชำระเงิน</h2>
        <div style={modalContentStyle}>
          <p><strong>ยอดเงินที่ชำระ:</strong> {Number(totalAmount).toLocaleString()} บาท</p>
          <p><strong>ที่อยู่จัดส่ง:</strong> {shippingAddress.name}</p>
          <p><strong>ที่อยู่:</strong> {shippingAddress.address}</p>
          <p><strong>เบอร์โทร:</strong> {shippingAddress.phone}</p>
          <button onClick={generateInvoicePDF} style={downloadButtonStyle}>ดาวน์โหลดใบเสร็จ</button>
        </div>
      </Modal>
    </div>
  );
};

// Styles for the page
const pageContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#fff",
};

const titleStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const infoContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const amountStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
};

const paymentFormContainerStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333"
};

const submitButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
};

const errorStyle: React.CSSProperties = {
  color: "red",
  fontWeight: "bold",
};

const backButtonContainerStyle: React.CSSProperties = {
  marginTop: "20px",
};

const backButtonStyle: React.CSSProperties = {
  backgroundColor: "#312CCC",
  color: "#FFFFFF",
  fontSize: "18px",
  fontWeight: "bold",
  padding: "12px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
};

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "400px",
    backgroundColor: "#fff"
  },
};

const modalContentStyle = {
  marginBottom: "20px",
  textAlign: "center",
  color: "#333",
};

const downloadButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginTop: "10px",
};

export default CheckoutPage;
