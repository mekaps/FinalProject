import React, { createContext, useContext, useState, ReactNode } from "react";

// สร้าง Context
interface UserContextType {
  user: string | null;
  cartCount: number;
  login: (username: string) => void;
  logout: () => void;
  addToCart: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// สร้าง Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0); // ✅ จำนวนสินค้าในตะกร้า

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
    setCartCount(0); // ✅ รีเซ็ตตะกร้าเมื่อออกจากระบบ
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <UserContext.Provider value={{ user, cartCount, login, logout, addToCart }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook ใช้งาน Context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser ต้องอยู่ภายใน UserProvider");
  }
  return context;
};
