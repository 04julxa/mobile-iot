import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Post from '../../components/src/Post';

export default function Home() {
    const posts = [
        {
            id: 1,
            nickname: 'Evelyn Julia',
            icon: require('../../assets/images/deer.jpeg'),
            email: 'evelynjulia945@gmail.com',
            username: 'evelynjulia',
            content: "viado na mata",
            image: require('../../assets/images/deer.jpeg'),
            comments: [
                { nickname: 'sssss', comment: '!11!' },
                { nickname: 'nome', comment: 'comentário' }
            ]
        },
        {
            id: 2,
            nickname: 'Jessy',
            icon: require('../../assets/images/deer.jpeg'),
            email: 'jessicavlb2005@gmail.com',
            username: 'woobot',
            content: "evelyn é homofobica? cancelem ela",
            image: null,
            comments: [
                { nickname: 'Tiago', comment: 'kaiojwd' },
                { nickname: 'Mateus sem H', comment: 'comentário 1' }
            ]
        },
        {
            id: 3,
            nickname: 'Felipe',
            icon: require('../../assets/images/deer.jpeg'),
            email: 'Felipe000@gmail.com',
            username: 'felipe000',
            content: null,
            image: require('../../assets/images/brisa.jpg'),
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
                {posts.map((item) => (
                    <Post key={item.id} {...item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#222325'
    },
    scrollView: {
        width: '100%'
    }
});
