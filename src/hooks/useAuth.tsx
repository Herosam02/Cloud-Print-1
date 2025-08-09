import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  accountType: 'individual' | 'business' | 'school' | 'church' | 'organization';
  avatar?: string;
  loyaltyPoints: number;
  verified: boolean;
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const savedUser = localStorage.getItem('cloudprint-user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const userData: User = {
        id: '1',
        name: email.includes('john') ? 'John Doe' : 
              email.includes('sarah') ? 'Sarah Johnson' :
              email.includes('admin') ? 'Admin User' :
              'Cloud Print User',
        email: email,
        phone: '+234-901-234-5678',
        company: email.includes('business') ? 'TechCorp Nigeria' : 
                 email.includes('school') ? 'University of Lagos' :
                 email.includes('church') ? 'Grace Chapel' : undefined,
        accountType: email.includes('business') ? 'business' :
                     email.includes('school') ? 'school' :
                     email.includes('church') ? 'church' :
                     email.includes('org') ? 'organization' : 'individual',
        loyaltyPoints: Math.floor(Math.random() * 2000) + 500,
        verified: true,
        createdAt: '2024-01-15T10:00:00Z',
        lastLogin: new Date().toISOString()
      };

      setUser(userData);
      localStorage.setItem('cloudprint-user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        company: userData.company,
        accountType: userData.accountType,
        loyaltyPoints: 100, // Welcome bonus
        verified: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Auto-login after successful signup
      setUser(newUser);
      localStorage.setItem('cloudprint-user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('cloudprint-user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('cloudprint-user', JSON.stringify(updatedUser));
    }
  };

  const resetPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, this would send a reset email
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    updateUser,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
