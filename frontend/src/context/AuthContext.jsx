import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in with Frappe session
    checkFrappeSession();
  }, []);

  const checkFrappeSession = async () => {
    try {
      const response = await fetch('/api/method/frappe.auth.get_logged_user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.message && data.message !== 'Guest') {
        // Get user details from Frappe
        const userDetails = await getUserDetails(data.message);
        setUser(userDetails);
      } else {
        // No valid Frappe session
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking Frappe session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async (email) => {
    try {
      const response = await fetch(`/api/method/frappe.client.get_value`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctype: 'User',
          fieldname: ['email', 'full_name', 'role_profile_name'],
          filters: { email: email }
        })
      });

      const data = await response.json();

      if (response.ok && data.message) {
        return {
          email: data.message.email || email,
          name: data.message.full_name || email,
          role: data.message.role_profile_name || 'System User'
        };
      } else {
        // Fallback to basic user data
        return {
          email: email,
          name: email,
          role: 'System User'
        };
      }
    } catch (error) {
      console.error('Error getting user details:', error);
      // Fallback to basic user data
      return {
        email: email,
        name: email,
        role: 'System User'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/method/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          usr: email,
          pwd: password
        })
      });

      const data = await response.json();

      if (!response.ok || data.exc || data.message === "Invalid Login") {
        throw new Error(data.message || "Invalid email or password");
      }

      // Successfully logged in with Frappe - get full user details
      const userDetails = await getUserDetails(email);
      setUser(userDetails);
      return { success: true, user: userDetails };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  const logout = async () => {
    try {
      // Logout from Frappe session
      await fetch('/api/method/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error logging out from Frappe:', error);
    } finally {
      // Clear local state regardless of Frappe logout result
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
