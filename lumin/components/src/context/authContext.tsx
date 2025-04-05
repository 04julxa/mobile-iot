import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, AuthResponse, storeAuthData} from '../services/authServices';

interface UserProfileResponse {
  success: boolean;
  data?: {
    avatar?: string;
    bio?: string;
    [key: string]: any;
  };
}

interface AuthContextData {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

 const loadAuthData = async () => {
  try {
    const { accessToken, refreshToken, user } = await authService.getAuthData();

    if (accessToken && user) {
      setUser(user);
      setAccessToken(accessToken);
    }
  } catch (error) {
    console.error('Erro ao carregar as informações:', error);
    await handleLogout();
  }
};


  const handleLogin = async (authData: AuthResponse) => {
    await storeAuthData(authData);
    setUser(authData.user);
    setAccessToken(authData.accessToken);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setAccessToken(null);
  };

  const fetchUserProfile = async () => {
    if (!user?._id) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${authService.API_URL}/user/${user._id}`);
      const data: UserProfileResponse = await response.json();
  
      if (data.success && data.data) {
        setUser(prev => {
          if (!prev) return null;
          return {
            ...prev,
            ...data.data,
            avatar: data.data?.avatar || prev.avatar || '',
            bio: data.data?.bio || prev.bio || ''
          };
        });
      }
    } catch (error) {
      console.error('Erro ao buscar o perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const authData = await authService.login(email, password);
      await handleLogin(authData);
    } catch (error) {
      console.error('Erro no login:', error);
      await handleLogout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await handleLogout();
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      setIsLoading(true);
      const newAccessToken = await authService.refreshToken();
      setAccessToken(newAccessToken);
    } catch (error) {
      console.error('Refresh token failed:', error);
      await handleLogout();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAuthData().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        isLoading,
        login,
        logout,
        fetchUserProfile,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};