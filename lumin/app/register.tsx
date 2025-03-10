import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'

function loginPage() {
    const router = useRouter()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const replacePath = (path: any) => {
        router.replace(path)
    }
    return (
        <LinearGradient
            colors={["#18191A", "#222325", "#2D2E30", "#3A3B3C", "#222325"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}>
            <View style={styles.formContainer}>

                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons style={styles.logo} name="account-circle" size={34} color='#02DBFF'/>
                    <Text style={styles.title}>Crie a sua conta</Text>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#02DBFF"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    placeholderTextColor="#02DBFF"
                />
                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry={!isPasswordVisible}
                        placeholder="Senha"
                        placeholderTextColor="#02DBFF"
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon} 
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <AntDesign name={isPasswordVisible ? "eyeo" : "eye"} size={24} color="#02DBFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordInput}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry={!isPasswordVisible}
                        placeholder="Confirme a senha"
                        placeholderTextColor="#02DBFF"
                    />
                
                </View>

            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => { replacePath('/login') }}>
                <Text style={{ color: 'black' }}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={() => { replacePath('/welcome') }}>
                <Text style={{ color: 'black' }}>Voltar</Text>
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
    },
    logo: {
        marginRight: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#02DBFF',
        marginLeft: 10
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#02DBFF',
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#02DBFF'
    },
    passwordInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#02DBFF',
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#02DBFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputText: {
        height: 50,
        width: '80%',
        padding: 5,
        fontSize: 16,
        paddingHorizontal: 2,
        marginTop: 10,
        marginBottom: 10,
        color: '#02DBFF'
    },
    eyeIcon: {
        marginLeft: 10,
    }
})

export default loginPage
