import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'

import { LinearGradient } from 'expo-linear-gradient'

const welcome = () => {
    const router = useRouter()
    const replacePath = (path: any) => {
        router.replace(path);
    }
    return (
    <LinearGradient
    colors={["#18191A", "#222325", "#2D2E30", "#3A3B3C", "#222325"]}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}>
        <View style={styles.formContainer}>
            <Image source={require('../assets/images/lumin-bluelogo.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />
            <Text style={{color: '#02DBFF', fontSize: 24, marginTop: 50, marginBottom: 20, fontWeight: 'semibold'}}>Seja bem vindo!</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => {replacePath('/login')}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => {replacePath('/register')}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Registrar</Text>
        </TouchableOpacity>
    </LinearGradient>
    
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02DBFF',
        alignSelf: 'center' 
    },
    registerButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02DBFF',
        alignSelf: 'center'
    }
})

export default welcome