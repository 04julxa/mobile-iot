import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
    colors = {['#4c669f', '#3b5998', '#192f6a']}
    start={{ x: 0, y: 0 }}  
    end={{ x: 1, y: 1 }}   
    style={{ flex: 1 }}>
        <View style={styles.formContainer}>
            <AntDesign name="home" size={100} color="black" />
            <Text style={{color: 'black', fontSize: 23, marginBottom: 20}}>Lumin</Text>
            <Text style={{color: 'black', fontSize: 24, marginBottom: 20}}>Seja bem vindo</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => {replacePath('/login')}}>|
        <Text style={{color: 'black'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => {replacePath('/register')}}>|
        <Text style={{color: 'black'}}>Registrar</Text>
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
        backgroundColor: '#3b5998',
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
        backgroundColor: '#3b5998',
        alignSelf: 'center'
    }
})

export default welcome