import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, AuthResponse, storeAuthData } from '../services/authServices';

interface UserProfileData {
  avatar?: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  headerImage?: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  bio?: string;
  [key: string]: any;
}

interface UserProfileResponse {
  success: boolean;
  data?: UserProfileData;
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
      const { accessToken, user } = await authService.getAuthData();

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
    if (!user?._id || !accessToken) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`${authService.API_URL}/user/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
  
      const data: UserProfileResponse = await response.json();
  
      if (!data?.success || !data?.data) {
        throw new Error('Dados do perfil inválidos');
      }
  
      setUser(prev => {
        if (!prev) return null;
  
        const updatedUser: User = {
          ...prev,
          name: data.data?.name ?? prev.name,
          email: data.data?.email ?? prev.email,
          username: data.data?.username ?? prev.username,
          avatar: data.data?.avatar ?? prev.avatar,
          headerImage: data.data?.headerImage ?? prev.headerImage,
          bio: data.data?.bio ?? prev.bio,
          // Mantém outros campos existentes
          ...(prev as any)
        };
        
        return updatedUser;
      });
    } catch (error) {
      console.error('Erro ao buscar o perfil:', error);
      throw error;
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
      console.error('Erro no logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
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
    const initializeAuth = async () => {
      await loadAuthData();
      setIsLoading(false);
    };

    initializeAuth();
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