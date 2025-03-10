import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Gravatar } from 'react-native-gravatar';

export default props => {
    return (
        <View style={styles.container}>
            <Gravatar options={{ email: props.email, secure: true }} style={styles.avatar} />
            <Text style={styles.nickname}>{props.nickname}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
    },
    avatar: {
        width: 40,  
        height: 40,
        borderRadius: 20,  
        marginHorizontal: 10,
    },
    nickname: {
        color: '#02DBFF',  
        fontSize: 18,  
        fontWeight: 'bold',
    },
});
