import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

function LoginPage() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState({ value: '', dirty: false });
    const [password, setPassword] = useState({ value: '', dirty: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <Text style={styles.errorText}>Email inválido</Text>;
        }
        return null;
    };

    const handleErrorPassword = () => {
        if (!password.value && password.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        }
        return null;
    };

    const handleLogin = () => {
        if (!emailRegex.test(email.value) || !password.value) {
            setEmail({ ...email, dirty: true });
            setPassword({ ...password, dirty: true });
            return;
        }
        router.push('/home');
    };

    return (
        <LinearGradient
            colors={["#222325", '#222325']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}>
            
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons style={styles.logo} name="account-circle" size={34} color='#4B7CCC' />
                    <Text style={styles.title}>Entre na sua conta</Text>
                </View>

                <TextInput 
                    onChangeText={(text) => setEmail({ value: text, dirty: true })} 
                    style={styles.input} 
                    placeholder="Email" 
                    placeholderTextColor="#4B7CCC" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {handleErrorEmail()}

                <View style={styles.passwordInput}>
                    <TextInput 
                        onChangeText={(text) => setPassword({ value: text, dirty: true })} 
                        style={styles.inputText} 
                        secureTextEntry={!isPasswordVisible} 
                        placeholder="Senha" 
                        placeholderTextColor="#4B7CCC" 
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon} 
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <AntDesign name={isPasswordVisible ? "eyeo" : "eye"} size={24} color="#4B7CCC" />
                    </TouchableOpacity>
                </View>
                {handleErrorPassword()}
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/welcome')}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    loginButton: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B7CCC',
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
        backgroundColor: '#4B7CCC',
        alignSelf: 'center'
    },
    logo: {
        marginRight: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B7CCC'    
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#4B7CCC',
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        color: '#4B7CCC'
    },
    passwordInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#4B7CCC',
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
        color: '#4B7CCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputText: {
        height: 50,
        width: '80%',
        fontSize: 16,
        color: '#4B7CCC'
    },
    eyeIcon: {
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%'
    }
});

export default LoginPage;

