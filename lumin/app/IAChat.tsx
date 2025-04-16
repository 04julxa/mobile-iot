import React, { useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View, FlatList, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Balloon from './chat/balloon';
import styles from './chat/chatstyle';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
}

const AIChat = () => {
  const scrollRef = useRef<FlatList>(null);
  const router = useRouter();
  const [token, setToken] = useState('');
  const [chat, setChat] = useState<{ messages: Message[] }>({ messages: [] });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'http://10.5.4.33:3001/api/ai';

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await SecureStore.getItemAsync('userToken');
      if (!userToken) {
        Alert.alert('Erro', 'Usuário não autenticado. Redirecionando para login.');
        router.push('/login');
        return;
      }
      setToken(userToken);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (chat.messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [chat.messages]);

  const sendMessage = async () => {
    if (!message.trim()) {
      Alert.alert('Erro', 'Digite uma mensagem antes de enviar.');
      return;
    }
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const messageObject: Message = {
      id: `${Date.now()}-${Math.random()}`,
      senderId: 'user',
      text: message,
      time: new Date().toISOString(),
    };

    setChat((prev) => ({ messages: [...prev.messages, messageObject] }));
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        BASE_URL,
        { question: messageObject.text },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        const aiMessage: Message = {
          id: `${Date.now()}-${Math.random()}`,
          senderId: 'ai',
          text: response.data.response,
          time: new Date().toISOString(),
        };
        setChat((prev) => ({ messages: [...prev.messages, aiMessage] }));
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor da IA.');
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        style={styles.scrollViewContainer}
        data={chat.messages}
        renderItem={({ item }) => <Balloon message={item} currentUser="user" />}
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
          placeholder="Digite sua mensagem para a IA..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={message}
          multiline
          onChangeText={setMessage}
          editable={!isLoading}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, isLoading && { opacity: 0.5 }]}
          disabled={isLoading || !message.trim()}
        >
          <Ionicons name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AIChat;