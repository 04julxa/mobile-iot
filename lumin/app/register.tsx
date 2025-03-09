import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

const registerPage = () => {
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

           < View style={styles.logoContainer}>
            <MaterialCommunityIcons style={styles.logo} name="account-circle" size={34} color="black" />
            <Text style={styles.title}>Lumin</Text>
            </View>
                   
            <TextInput style={styles.input}>User</TextInput>
            <TextInput style={styles.input}>Email</TextInput>
            <TextInput style={styles.input} secureTextEntry>Senha</TextInput>
            <TextInput style={styles.input} secureTextEntry>Confirmar Senha</TextInput>

        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => {replacePath('/login')}}>|
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
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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
    },
    logo: {
        marginRight: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 10
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
      }
})

export default registerPage