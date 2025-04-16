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
          tabBarActiveTintColor: '#4B7CCC',
          tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Feed',
            tabBarIcon: ({ focused }) => (
              <IconSymbol size={28} name="house.fill" color={focused ? '#4B7CCC' : 'white'} />
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
              <LinearGradient colors={["#4B7CCC", "#4B7CCC", "#4B7CCC"]} style={{ flex: 1 }} />
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
              <MaterialCommunityIcons size={28} name="bookmark" color={focused ? '#4B7CCC' : 'white'} />
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
              <LinearGradient colors={["#4B7CCC", "#4B7CCC", "#4B7CCC"]} style={{ flex: 1 }} />
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
              <MaterialCommunityIcons size={28} name="account" color={focused ? "#4B7CCC" : 'white'} />
            ),
            headerShown: false,
          }}
        />

      <Tabs.Screen
          name="conversations"
          options={{
            title: 'Conversas',
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                size={28}
                name="chat"
                color={focused ? '#4B7CCC' : 'white'}
              />
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
              <LinearGradient colors={["#4B7CCC", "#4B7CCC", "#4B7CCC"]} style={{ flex: 1 }} />
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