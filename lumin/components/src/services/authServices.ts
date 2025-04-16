import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';

const API_URL = 'http://192.168.18.41:3001/api';
export interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
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
  } | null; 
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
  follower?: string[];
  following?: string[];
  location?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha no login');
    }

    const data = await response.json();
    
    if (!data.accessToken || !data.refreshToken || !data.user?._id) {
      throw new Error('Resposta da API inválida');
    }

    await storeAuthData(data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAuthData = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
}> => {
  try {
    const [accessToken, refreshToken, user] = await Promise.all([
      AsyncStorage.getItem('accessToken'),
      AsyncStorage.getItem('refreshToken'),
      AsyncStorage.getItem('user'),
    ]);

    return {
      accessToken,
      refreshToken,
      user: user ? JSON.parse(user) : null,
    };
  } catch (error) {
    console.error('Erro ao obter dados de autenticação:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken'),
      AsyncStorage.removeItem('user'),
    ]);
  } catch (error) {
    console.error('Erro no logout:', error);
    throw error;
  }
};

export const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('Nenhum refresh token disponível');
  
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });
  
    if (!response.ok) {
      throw new Error('Falha ao atualizar token');
    }
  
    const data = await response.json();
    await AsyncStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

export const storeAuthData = async (authData: AuthResponse): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.setItem('accessToken', authData.accessToken),
      AsyncStorage.setItem('refreshToken', authData.refreshToken),
      AsyncStorage.setItem('user', JSON.stringify(authData.user)),
    ]);
  } catch (error) {
    console.error('Erro ao armazenar dados de autenticação:', error);
    throw error;
  }
};


const authService = {
  login,
  getAuthData,
  logout,
  refreshToken,
  API_URL
};

export default authService;
