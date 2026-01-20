import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  company: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_EMAIL = 'userdemo@constarva.com';
const DEMO_PASSWORD = '123';
const DEMO_USER: User = {
  email: DEMO_EMAIL,
  name: 'Alex Johnson',
  company: 'TechVenture Labs',
  avatar: undefined,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const storedAuth = localStorage.getItem('demo_auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(parsed.user);
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setUser(DEMO_USER);
      localStorage.setItem('demo_auth', JSON.stringify({ user: DEMO_USER }));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('demo_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
