import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, KeyboardAvoidingView, Platform  } from 'react-native';
import baseURL from '../components/src/services/api'

function RegisterPage() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState({ value: '', dirty: false });
    const [password, setPassword] = useState({ value: '', dirty: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', dirty: false });
    const [username, setUsername] = useState({ value: '', dirty: false });
    const [nickname, setNickname] = useState({ value: '', dirty: false });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <Text style={styles.errorText}>Email inválido</Text>;
        }
        return null;
    };
    
    const handleNickname = () => {
        if (!nickname.value && nickname.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        }
        return null;
    };

    const handleErrorPassword = () => {
        if (!password.value && password.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        }
        if (password.value.length < 6 && password.dirty) 
            return <Text style={styles.errorText}>A senha deve ter pelo menos 6 caracteres</Text>;
        return null;
    };

    const handleErrorConfirmPassword = () => {
        if (!confirmPassword.value && confirmPassword.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        } else if (confirmPassword.value !== password.value && confirmPassword.dirty) {
            return <Text style={styles.errorText}>Senhas diferentes</Text>;
        }
        return null;
    };

    const validateUsername = () => {    
        if (!username.value && username.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        }
    
        if (username.value && !usernameRegex.test(username.value) && username.dirty) {
            return <Text style={styles.errorText}>Apenas letras, números e "_" são permitidos</Text>;
        }
    
        return null;
    };

    const isFormValid = () => {
        return (
            emailRegex.test(email.value) &&
            usernameRegex.test(username.value) &&
            password.value.length >= 6 &&
            confirmPassword.value === password.value &&
            nickname.value
        );
    };

    const handleRegister = async () => {
        if (!emailRegex.test(email.value) ||
            !password.value || !username.value || 
            password.value !== confirmPassword.value) {
            return;
        }

        try {
            const response = await fetch(`http://10.5.4.33:3001/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nickname.value,
                    email: email.value,
                    password: password.value,
                    username: username.value,
                    avatar: "",
                    bio: "",
                    follower: 0, 
                    following: 0
                }),
            });

            const data = await response.json();

            if (!isFormValid()) {
                Alert.alert("Erro", "Por favor, preencha todos os campos corretamente.");
                return;
            }

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.push('/login');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao conectar com o servidor';
            Alert.alert('Erro', errorMessage);
        }
    };

    return (
        <LinearGradient
        colors={["#222325", '#222325']}
        start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons style={styles.logo} name="account-circle" size={34} color="#4B7CCC" />
                    <Text style={styles.title}>Crie a sua conta</Text>
                </View>

                <TextInput
                    onChangeText={(text) => setEmail({ value: text, dirty: true })}
                    onBlur={() => setEmail({ ...email, dirty: true })}
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#4B7CCC"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {handleErrorEmail()}

                <TextInput
                    onChangeText={(text) => setNickname({ value: text, dirty: true })}
                    onBlur={() => setNickname({ ...nickname, dirty: true })}
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="#4B7CCC"
                />
                {handleNickname()}

                <TextInput
                onChangeText={(text) => setUsername({ value: text, dirty: true })}
                onBlur={() => setUsername({ ...username, dirty: true })}
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#4B7CCC"
                />
                {validateUsername()}

                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={(text) => setPassword({ value: text, dirty: true })}
                        onBlur={() => setPassword({ ...password, dirty: true })}
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

                <View style={styles.passwordInput}>
                    <TextInput
                     onChangeText={(text) => setConfirmPassword({ value: text, dirty: true })}
                     onBlur={() => setConfirmPassword({ ...confirmPassword, dirty: true })}
                     style={styles.inputText}
                     secureTextEntry={!isPasswordVisible}
                     placeholder="Confirme a senha"
                     placeholderTextColor="#4B7CCC"
                    />
                </View>
                {handleErrorConfirmPassword()}
            </View>
            </ScrollView>

            <View style={{marginTop: 0}}>

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Se cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/welcome')}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
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
        alignItems: 'center',
        marginTop: 50
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
        paddingHorizontal: 10,
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
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        color: '#4B7CCC',
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
        color: '#4B7CCC'
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%'
    },
    eyeIcon: {
        marginLeft: 10,
    }
})

export default RegisterPage