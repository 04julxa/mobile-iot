import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

function RegisterPage() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState({ value: '', dirty: false });
    const [password, setPassword] = useState({ value: '', dirty: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', dirty: false });
    const [username, setUsername] = useState({ value: '', dirty: false });
    const [phone, setPhone] = useState({ value: '', dirty: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    const handleErrorEmail = () => {
        if (!email.value && email.dirty) {
            return <Text style={styles.errorText}>Campo obrigatório</Text>;
        } else if (!emailRegex.test(email.value) && email.dirty) {
            return <Text style={styles.errorText}>Email inválido</Text>;
        }
        return null;
    };
        const handleErrorPhone = () => {
            if (!phone.value && phone.dirty) {
                return <Text style={styles.errorText}>Campo obrigatório</Text>;
            } else if (!phoneRegex.test(phone.value) && phone.dirty) {
                return <Text style={styles.errorText}>Número de celular inválido</Text>;
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
        return null;
    }

    const handleRegister = () => {
        if (!emailRegex.test(email.value) || !phoneRegex.test(phone.value) || !password.value || !username.value || password.value !== confirmPassword.value) {
            setEmail({ ...email, dirty: true });
            setPassword({ ...password, dirty: true });
            setUsername({ ...username, dirty: true });
            setConfirmPassword ({ ...confirmPassword, dirty: true });
            setPhone({ ...phone, dirty: true });
            return;
        }
        router.push('/login');
    };

    return (
        <LinearGradient
            colors={["#18191A", "#222325", "#2D2E30", "#3A3B3C", "#222325"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons style={styles.logo} name="account-circle" size={34} color="#02DBFF" />
                    <Text style={styles.title}>Crie a sua conta</Text>
                </View>

                <TextInput
                    onChangeText={(text) => setEmail({ value: text, dirty: true })}
                    onBlur={() => setEmail({ ...email, dirty: true })}
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#02DBFF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {handleErrorEmail()}

                <TextInput
                    onChangeText={(text) => setPhone({ value: text, dirty: true })}
                    onBlur={() => setPhone({ ...phone, dirty: true })}
                    style={styles.input}
                    placeholder="Número de celular"
                    placeholderTextColor="#02DBFF"
                    keyboardType="phone-pad"
                />
                {handleErrorPhone()}

                <TextInput
                onChangeText={(text) => setUsername({ value: text, dirty: true })}
                onBlur={() => setUsername({ ...username, dirty: true })}
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#02DBFF"
                />
                {validateUsername()}

                <View style={styles.passwordInput}>
                    <TextInput
                        onChangeText={(text) => setPassword({ value: text, dirty: true })}
                        onBlur={() => setPassword({ ...password, dirty: true })}
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
                {handleErrorPassword()}

                <View style={styles.passwordInput}>
                    <TextInput
                     onChangeText={(text) => setConfirmPassword({ value: text, dirty: true })}
                     onBlur={() => setConfirmPassword({ ...confirmPassword, dirty: true })}
                     style={styles.inputText}
                     secureTextEntry={!isPasswordVisible}
                     placeholder="Confirme a senha"
                     placeholderTextColor="#02DBFF"
                    />
                </View>
                {handleErrorConfirmPassword()}
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Se cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/welcome')}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
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
