import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#222325', 
        },
        tabBarActiveTintColor: '#02DBFF', 
        tabBarInactiveTintColor: '#02DBFF', 
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerTitle: () => (
            <Image
              source={require('../../assets/images/lumin-blacklogo.png')}
              style={{ width: 100, height: 40, resizeMode: 'contain' }} // Reduzi um pouco o tamanho da logo
            />
          ),
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#02EFFA', '#02DBFF', '#02F1FB']}
              style={{ flex: 1 }}
            />
          ),
          headerStyle: {
            height: 70, 
          },
        }}
      />,
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerTitle: () => (
            <Image
              source={require('../../assets/images/lumin-blacklogo.png')}
              style={{ width: 110, height: 55, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#02EFFA', '#02DBFF', '#02F1FB']}
              style={{ flex: 1 }}
              />
          ),
          headerStyle: {
            height: 70, 
          },
        }}
      />,

<Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          headerTitle: () => (
            <Image
              source={require('../../assets/images/lumin-blacklogo.png')}
              style={{ width: 110, height: 55, resizeMode: 'contain' }}
            />
          ),
          headerTitleAlign: 'center',
          headerBackground: () => (
            <LinearGradient
              colors={['#02EFFA', '#02DBFF', '#02F1FB']}
              style={{ flex: 1 }}
              />
          ),
          headerStyle: {
            height: 70, 
          },
        }}
      />, 
    </Tabs>
  );
}
