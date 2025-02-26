import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  user: string | null;
  phoneNumber: string;
  cart: { productCode: string; name: string; image: string; price: number; quantity: number }[];
  login: (email: string) => void;
  logout: () => void;
  updatePhoneNumber: (newPhone: string) => void;
  addToCart: (product: { productCode: string; name: string; image: string; price: number }) => void;
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, newQuantity: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cart, setCart] = useState<
    { productCode: string; name: string; image: string; price: number; quantity: number }[]
  >([]);

  // ✅ ดึงข้อมูลตะกร้าและเบอร์โทรศัพท์หลังจาก Login
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/user/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setCart(data.cart);
          setPhoneNumber(data.phoneNumber || ""); // ✅ ตั้งค่าเบอร์โทร (ถ้าไม่มีให้เป็น "")
        })
        .catch((error) => console.error("❌ Error fetching user data:", error));
    }
  }, [user]);

  const login = (email: string) => {
    setUser(email);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setPhoneNumber("");
  };

  // ✅ อัปเดตเบอร์โทรศัพท์
  const updatePhoneNumber = (newPhone: string) => {
    if (!user) return;

    fetch("http://localhost:5000/user/updatePhone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, phoneNumber: newPhone }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📞 อัปเดตเบอร์โทร:", data);
        setPhoneNumber(newPhone);
      })
      .catch((error) => console.error("❌ Error updating phone number:", error));
  };

  // ✅ เพิ่มสินค้าไปยังฐานข้อมูล MongoDB
  const addToCart = (product: { productCode: string; name: string; image: string; price: number }) => {
    if (!user) return;

    fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, product }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("❌ Error adding to cart:", error));
  };

  // ✅ อัปเดตจำนวนสินค้า
  const updateQuantity = (productCode: string, newQuantity: number) => {
    if (!user) return;
    if (newQuantity <= 0) {
      removeFromCart(productCode); // ✅ ถ้าจำนวนเป็น 0 ให้ลบสินค้าออก
      return;
    }

    fetch("http://localhost:5000/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, productCode, quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("❌ Error updating cart:", error));
  };

  // ✅ ลบสินค้าออกจากตะกร้า
  const removeFromCart = (productCode: string) => {
    if (!user) return;

    fetch("http://localhost:5000/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, productCode }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("❌ Error removing from cart:", error));
  };

  return (
    <UserContext.Provider
      value={{ user, phoneNumber, cart, login, logout, updatePhoneNumber, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser ต้องอยู่ภายใน UserProvider");
  }
  return context;
};
