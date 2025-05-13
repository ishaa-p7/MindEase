import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Hook to use the context
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // Optional: Load userId from localStorage on app load
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log('[UserContext] Loaded userId from localStorage:', storedUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
