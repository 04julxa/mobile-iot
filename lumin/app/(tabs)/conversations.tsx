import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  username: string;
  avatar?: string | null;
}

const Conversations = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URLS = [
    'http://10.5.4.33:3001/api/user/',
    'http://26.165.8.133:3001/api/user/',
    'http://localhost:3001/api/user/',
  ];
  let selectedApiUrl = API_URLS[0]; 

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (!token) {
        setError('Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      const testConnectivity = async () => {
        const endpoints = ['', '/api']; 
        for (const url of API_URLS) {
          const baseUrl = url.replace('/api/user/', '');
          for (const endpoint of endpoints) {
            const testUrl = `${baseUrl}${endpoint}`;
            console.log('[Conversations] Testing connectivity to:', testUrl);
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 5000); 
              const response = await fetch(testUrl, {
                method: 'GET',
                signal: controller.signal,
              });
              clearTimeout(timeoutId);
              console.log('[Conversations] Connectivity test response for', testUrl, ':', response.status, 'ok:', response.ok);
              if (response.ok || response.status === 404) {
                selectedApiUrl = url;
                console.log('[Conversations] Selected API URL:', selectedApiUrl);
                return true;
              }
            } catch (err: any) {
              console.error('[Conversations] Connectivity test failed for', testUrl, ':', {
                message: err.message,
                name: err.name,
                code: err.code,
              });
            }
          }
        }
        console.error('[Conversations] All connectivity tests failed');
        return false;
      };

      const isServerReachable = await testConnectivity();
      if (!isServerReachable) {
        setError('Servidor não está acessível. Verifique a conexão ou o endereço do servidor.');
        setLoading(false);
        return;
      }

      const response = await fetch(selectedApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Sessão expirada. Faça login novamente.');
        } else if (response.status === 404) {
          setError('Endpoint de usuários não encontrado. Verifique o servidor.');
        } else {
          setError(`Erro ${response.status}: Não foi possível carregar os usuários.`);
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('[Conversations] API response data:', data); 
      if (!data.success || !Array.isArray(data.data)) {
        setError('Formato de dados inválido. Esperava-se uma lista de usuários.');
        setLoading(false);
        return;
      }

      const mappedUsers = data.data.map((user: any) => ({
        id: user._id,
        username: user.username,
        avatar: user.avatar ? (typeof user.avatar === 'string' ? user.avatar : user.avatar.uri || null) : null, 
      }));
      console.log('[Conversations] Mapped users:', mappedUsers); 
      setUsers(mappedUsers);
      setLoading(false);
    } catch (err: any) {
      console.error('[Conversations] Error fetching users:', err);
      setError(err.message || 'Falha na conexão com o servidor.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startChat = (receiverId: string) => {
    router.push({
      pathname: '/chat',
      params: { receiverId },
    });
  };

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => startChat(item.id)}
      activeOpacity={0.7}
    >
      {item.avatar && typeof item.avatar === 'string' ? (
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
          resizeMode="cover"
          onError={(e) => console.log('[Image] Error loading avatar:', e.nativeEvent.error)}
        />
      ) : (
        <MaterialCommunityIcons name="account-circle" size={40} color="#4B7CCC" />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.username}</Text>
        <Text style={styles.lastMessage}>Iniciar uma conversa</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4B7CCC" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Conversas</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma conversa por enquanto. Comece uma!</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={fetchUsers}>
        <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222325',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#222325',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 10,
    paddingTop: 10,
    width: '100%',
    flexGrow: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2A2B2E',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B7CCC',
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  lastMessage: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  errorText: {
    textAlign: 'center',
    color: '#FF5555',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4B7CCC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4B7CCC',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default Conversations;