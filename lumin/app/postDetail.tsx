import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Author from '../components/src/Author';
import Comments from '../components/src/Comments';

import { RouteProp } from '@react-navigation/native';

interface Comment {
    text: string;
}

interface RouteParams {
    email: string;
    nickname: string;
    image: any;
    comments: Comment[];
}

const PostDetail = ({ route }: { route: RouteProp<{ params: RouteParams }, 'params'> }) => {
    if (!route || !route.params) {
        return <Text style={styles.errorText}>Erro: Nenhum dado encontrado.</Text>;
    }

    const { email, nickname, image, comments } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nickname}</Text>
            <Text style={styles.subtitle}>{email}</Text>
            <Image source={image} style={styles.image} />
            <Text style={styles.commentsTitle}>Comentários:</Text>
            {comments.map((comment, index) => (
                <Text key={index} style={styles.comment}>{comment.text}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#222325',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: '#bbb',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
        marginVertical: 10,
        borderRadius: 10,
    },
    commentsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    comment: {
        fontSize: 14,
        color: '#ccc',
        marginVertical: 5,
    },
    errorText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
});

export default PostDetail;