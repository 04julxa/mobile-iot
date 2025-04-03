import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:3001/api';

// Interface para tipagem dos dados de autenticação
interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: any;
}

// Função principal de login
export const login = async (email: string, password: string): Promise<AuthData> => {
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

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Armazena os dados de autenticação
export const storeAuthData = async (data: AuthData): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.setItem('accessToken', data.accessToken),
      AsyncStorage.setItem('refreshToken', data.refreshToken),
      AsyncStorage.setItem('user', JSON.stringify(data.user)),
    ]);
  } catch (error) {
    console.error('Error storing auth data:', error);
    throw error;
  }
};

// Recupera os dados de autenticação
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
    console.error('Error getting auth data:', error);
    throw error;
  }
};

// Realiza logout
export const logout = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem('accessToken'),
      AsyncStorage.removeItem('refreshToken'),
      AsyncStorage.removeItem('user'),
    ]);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Atualiza o token de acesso
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

// Exportação padrão para compatibilidade
const authService = {
  login,
  storeAuthData,
  getAuthData,
  logout,
  refreshToken
};

export default authService;