import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Balloon from './chat/balloon';
import styles from './chat/chatstyle';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { io, Socket } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
}

interface User {
  id: string;
  name: string;
}

let socket: Socket;

const Chat = () => {
  const scrollRef = useRef<FlatList>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const [userLogged, setUserLogged] = useState('');
  const [token, setToken] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [chat, setChat] = useState<{ messages: Message[] }>({ messages: [] });
  const [message, setMessage] = useState('');

  const cacheMessages = async (messages: Message[]) => {
    await AsyncStorage.setItem(`chat_${receiverId}`, JSON.stringify(messages));
  };

  const loadCachedMessages = async () => {
    const cached = await AsyncStorage.getItem(`chat_${receiverId}`);
    if (cached) {
      setChat({ messages: JSON.parse(cached) });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      const userId = await SecureStore.getItemAsync('userId');

      if (!userToken || !userId) {
        Alert.alert('Erro', 'Usuário não autenticado. Redirecionando para login.');
        router.push('/login');
        return;
      }

      if (!params.receiverId) {
        Alert.alert('Erro', 'Destinatário não especificado. Redirecionando para a página inicial.');
        router.push('/home');
        return;
      }

      setToken(userToken);
      setUserLogged(userId);
      setReceiverId(params.receiverId as string);
    };

    checkAuth();
  }, [params]);

  useEffect(() => {
    if (!userLogged || !receiverId || !token) return;

    const fetchReceiver = async () => {
      try {
        await loadCachedMessages();

        const userResponse = await fetch(`http://10.5.4.33:3001/api/user/${receiverId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.success && userData.data) {
            setReceiverName(userData.data.name || 'Usuário');
          }
        } else {
          throw new Error('Falha ao buscar dados do destinatário.');
        }
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        Alert.alert('Erro', 'Não foi possível carregar os dados do destinatário. Tente novamente.');
      }
    };

    fetchReceiver();
  }, [userLogged, receiverId, token]);

  useEffect(() => {
    if (!token || !userLogged) return;

    socket = io('http://10.5.4.33:3001', {
      transports: ['websocket'],
      auth: { token },
    });

    socket.on('connect', () => {
      socket.emit('add_user', userLogged); 
    });

    socket.on('receive_message', (data: Message) => {
      setChat((prev) => {
        if (prev.messages.some((msg) => msg.id === data.id)) {
          return prev;
        }
        const newMessages = [...prev.messages, data];
        cacheMessages(newMessages);
        return { messages: newMessages };
      });
    });

    socket.on('connect_error', () => {
      console.warn('Erro de conexão com o servidor. Tentando reconectar...');
      setTimeout(() => socket.connect(), 5000); 
    });

    return () => {
      socket?.disconnect();
    };
  }, [token, userLogged]);

  useEffect(() => {
    if (chat.messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [chat.messages]);

  const sendMessage = () => {
    if (!message.trim() || !userLogged || !receiverId) {
      Alert.alert('Erro', 'Não foi possível enviar a mensagem. Verifique os dados.');
      return;
    }

    const messageObject: Message = {
      id: `${Date.now()}-${Math.random()}`,
      senderId: userLogged,
      receiverId,
      text: message,
      time: new Date().toISOString(),
    };

    setChat((prev) => {
      const newMessages = [...prev.messages, messageObject];
      cacheMessages(newMessages); 
      return { messages: newMessages };
    });
    setMessage('');

    socket.emit('send_message', messageObject, (response: any) => {
      if (!response?.success) {
        setChat((prev) => ({
          messages: prev.messages.filter((msg) => msg.id !== messageObject.id),
        }));
        Alert.alert('Erro', 'Falha ao enviar a mensagem para o servidor.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={40} color="#4B7CCC" />
        <Text style={styles.headerText}>{receiverName || 'Carregando...'}</Text>
      </View>
      <FlatList
        ref={scrollRef}
        style={styles.scrollViewContainer}
        data={chat.messages}
        renderItem={({ item }) => (
          <Balloon message={item} currentUser={userLogged} />
        )}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Sem mensagens no momento</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.messageTextInputContainer}>
        <TextInput
          style={styles.messageTextInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={message}
          multiline
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;