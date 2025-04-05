import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Profile from '../../components/src/Profile';
import { AuthProvider, useAuth } from '../../components/src/context/authContext';

const AppContent = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Usuário não autenticado.</Text>
      </View>
    );
  }

  return <Profile user={user} />; 
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
