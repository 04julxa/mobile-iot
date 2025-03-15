import { Tabs } from 'expo-router';
import React from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MenuHeader from '@/components/MenuHeader';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#222325',
          },
          tabBarActiveTintColor: '#02DBFF',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Feed',
            tabBarIcon: ({ focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? '#02DBFF' : 'white'} />
            ),
            headerRight: () => <MenuHeader />,
            headerTitle: () => (
              <Image
                source={require('../../assets/images/lumin-blacklogo.png')}
                style={{ width: 100, height: 40, resizeMode: 'contain' }}
              />
            ),
            headerTitleAlign: 'center',
            headerBackground: () => (
              <LinearGradient colors={['#02EFFA', '#02DBFF', '#02F1FB']} style={{ flex: 1 }} />
            ),
            headerStyle: {
              height: 70,
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Salvos',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons size={28} name="bookmark" color={focused ? '#02DBFF' : 'white'} />
            ),
            headerRight: () => <MenuHeader />,
            headerTitle: () => (
              <Image
                source={require('../../assets/images/lumin-blacklogo.png')}
                style={{ width: 100, height: 40, resizeMode: 'contain' }}
              />
            ),
            headerTitleAlign: 'center',
            headerBackground: () => (
              <LinearGradient colors={['#02EFFA', '#02DBFF', '#02F1FB']} style={{ flex: 1 }} />
            ),
            headerStyle: {
              height: 70,
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons size={28} name="account" color={focused ? '#02DBFF' : 'white'} />
            ),
            headerRight: () => <MenuHeader />,
            headerTitle: () => (
              <Image
                source={require('../../assets/images/lumin-blacklogo.png')}
                style={{ width: 100, height: 40, resizeMode: 'contain' }}
              />
            ),
            headerTitleAlign: 'center',
            headerBackground: () => (
              <LinearGradient colors={['#02EFFA', '#02DBFF', '#02F1FB']} style={{ flex: 1 }} />
            ),
            headerStyle: {
              height: 70,
            },
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}