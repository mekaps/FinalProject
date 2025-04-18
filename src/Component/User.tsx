import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  user: string | null;
  userName: string | null;
  phoneNumber: string;
  cart: { _id: string; name: string; image: string; price: number; quantity: number; size?: string }[];
  cartCount: number;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  updatePhoneNumber: (newPhone: string) => void;
  addToCart: (product: { _id: string; name: string; image: string; price: number; size: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cart, setCart] = useState<{
    _id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    size?: string;
  }[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null); // userEmail state

  // ฟังก์ชันดึงข้อมูลตะกร้าจาก Backend
  const fetchCartData = () => {
    if (user) {
      fetch(`https://backend-production-4db9.up.railway.app/cart/${user}`)
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.name);  // ตั้งค่า userName
          setCart(Array.isArray(data.cart) ? data.cart : []); // ตั้งค่าตะกร้าให้เป็น array
          setPhoneNumber(data.phoneNumber || ""); // ตั้งค่าเบอร์โทร
        })
        .catch((error) => console.error("❌ Error fetching user data:", error));
    }
  };

  // ดึงข้อมูลจาก Backend เมื่อ login
  useEffect(() => {
    if (user) {
      setUserEmail(user);  // ตั้งค่า userEmail เมื่อ login
      fetchCartData(); // เรียกใช้ฟังก์ชัน fetchCartData
    }
  }, [user]); // เมื่อ user เปลี่ยนแปลงจะดึงข้อมูลใหม่

  const login = (email: string) => {
    setUser(email); // ตั้งค่า user เมื่อ login
  };

  const logout = () => {
    setUser(null);
    setCart([]); // ลบข้อมูลตะกร้าเมื่อ logout
    setPhoneNumber("");
    setUserName(null);
    setUserEmail(null);  // ลบข้อมูล userEmail เมื่อ logout
  };

  const updatePhoneNumber = (newPhone: string) => {
    if (!user) return;

    fetch("https://backend-production-4db9.up.railway.app/user/updatePhone", {
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

  const addToCart = (product: { _id: string; name: string; image: string; size: string; price: number }) => {
    if (!user) return;

    if (!product._id || !product.price || !product.size) {
      console.error("❌ Missing _id, price, or size", product);
      return;
    }

    const email = user;

    fetch("https://backend-production-4db9.up.railway.app/cart/add", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, products: [{ ...product, quantity: 1 }] }),  // ส่งไซส์ที่ผู้ใช้เลือก
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);  // อัปเดตตะกร้า
      })
      .catch((error) => console.error("❌ Error adding to cart:", error));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (!user) return;
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    fetch("https://backend-production-4db9.up.railway.app/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, productId, quantity: newQuantity }),
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("❌ Error updating cart:", error));
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;

    fetch("https://backend-production-4db9.up.railway.app/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user, productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCart(data); // ถ้าเป็น Array อัปเดตตะกร้า
        } else {
          console.error("❌ Error: cart data is not an array", data);
        }
      })
      .catch((error) => console.error("❌ Error removing from cart:", error));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userName,
        phoneNumber,
        cart,
        cartCount: cart.length,  // นับจำนวนสินค้าในตะกร้า
        userEmail,  // ส่ง userEmail ไปใน context
        login,
        logout,
        updatePhoneNumber,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
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
  return {
    ...context,
    cart: Array.isArray(context.cart) ? context.cart : [],  // ตรวจสอบให้ cart เป็น array
  };
};
