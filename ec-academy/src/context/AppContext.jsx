import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    students: 320,
    programs: 2,
    courses: 7,
    pass_rate: '95%',
    trainers: 5
  });

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Check for saved session or initial data fetch could go here
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Logic for saving token/session
  };

  const logout = () => {
    setUser(null);
    // Logic for clearing token/session
  };

  return (
    <AppContext.Provider value={{
      user,
      loading,
      stats,
      announcements,
      setAnnouncements,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
