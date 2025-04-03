import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { login, storeAuthData } from './services/authServices';

interface FormField {
  value: string;
  dirty: boolean;
}

function LoginPage() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState<FormField>({ value: '', dirty: false });
    const [password, setPassword] = useState<FormField>({ value: '', dirty: false });
    const [isLoading, setIsLoading] = useState(false);

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

    const handleLogin = async () => {
        // Validação antes da submissão
        setEmail(prev => ({ ...prev, dirty: true }));
        setPassword(prev => ({ ...prev, dirty: true }));
        
        if (!emailRegex.test(email.value)) {
            Alert.alert('Erro', 'Por favor, insira um email válido');
            return;
        }

        if (!password.value) {
            Alert.alert('Erro', 'Por favor, insira sua senha');
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(email.value, password.value);
            await storeAuthData(data);
            
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
            router.replace('/home'); // Usar replace para evitar voltar para login
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login';
            Alert.alert('Erro', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={["#222325", '#222325']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>
            
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <MaterialCommunityIcons name="account-circle" size={34} color='#4B7CCC' />
                    <Text style={styles.title}>Entre na sua conta</Text>
                </View>

                <TextInput 
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, dirty: true })} 
                    style={styles.input} 
                    placeholder="Email" 
                    placeholderTextColor="#4B7CCC" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    importantForAutofill="yes"
                    textContentType="emailAddress"
                />
                {handleErrorEmail()}

                <View style={styles.passwordInput}>
                    <TextInput 
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, dirty: true })} 
                        style={styles.inputText} 
                        secureTextEntry={!isPasswordVisible} 
                        placeholder="Senha" 
                        placeholderTextColor="#4B7CCC"
                        importantForAutofill="yes"
                        textContentType="password"
                    />
                    <TouchableOpacity 
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        accessibilityLabel={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
                    >
                        <AntDesign 
                            name={isPasswordVisible ? "eyeo" : "eye"} 
                            size={24} 
                            color="#4B7CCC" 
                        />
                    </TouchableOpacity>
                </View>
                {handleErrorPassword()}
            </View>

            <TouchableOpacity 
                style={styles.loginButton} 
                onPress={handleLogin}
                disabled={isLoading}
                accessibilityRole="button"
            >
                {isLoading ? (
                    <ActivityIndicator color="black" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.secondaryButton} 
                onPress={() => router.push('/welcome')}
                accessibilityRole="button"
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        alignSelf: 'center'
    },
    loginButton: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B7CCC',
        alignSelf: 'center',
        minHeight: 50,
    },
    secondaryButton: {
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        marginBottom: 30,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4B7CCC',
        alignSelf: 'center',
        minHeight: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4B7CCC',
        marginLeft: 10,
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
        marginVertical: 10,
        color: '#4B7CCC',
    },
    passwordInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#4B7CCC',
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: '80%',
        paddingHorizontal: 10,
        fontSize: 16,
        marginVertical: 10,
        color: '#4B7CCC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputText: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#4B7CCC',
        paddingRight: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        width: '80%',
    },
    buttonText: {
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginPage;