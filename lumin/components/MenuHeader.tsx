import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Divider, Menu } from 'react-native-paper'
import { useAuth } from '../components/src/context/authContext' 

const MenuHeader = () => {
  const [visible, setVisible] = useState(false)
  const router = useRouter()
  const { logout } = useAuth() 

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)} style={{ marginRight: 15 }}>
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#222325" />
        </TouchableOpacity>
      }
    >
      <Menu.Item title={<Text>Perfil</Text>} />
      <Menu.Item title={<Text>Configurações</Text>} />
      <Menu.Item title={<Text>Conversar com a IA</Text>} />
      <Divider />
      <Menu.Item onPress={handleLogout} title={<Text>Logout</Text>} />
    </Menu>
  )
}

export default MenuHeader
