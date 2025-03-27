import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Post from '../../components/src/Post';

export default function Home() {
    const posts = [
        {
            id: 1,
            nickname: 'eve',
            icon: require('../../assets/images/bonecazoiuda.jpg'),
            email: 'evelynjulia945@gmail.com',
            username: 'evlia04',
            content: "saudade quando eu quebrava a aplicação dos outros ao invés de quebrar a minha",
            image: require('../../assets/images/evepost.jpeg'),
            comments: [
                { nickname: 'sssss', comment: '!11!' },
                { nickname: 'nome', comment: 'comentário' }
            ]
        },
        {
            id: 2,
            nickname: 'jessy',
            icon: require('../../assets/images/abihobbs.jpeg'),
            email: 'jessicavlb2005@gmail.com',
            username: 'woobot',
            content: "terminei a primeira fase de mobile, já tá podendo assistir hannibal dnv?",
            image: null,
            comments: [
                { nickname: 'Tiago', comment: 'kaiojwd' },
                { nickname: 'Mateus sem H', comment: 'comentário 1' }
            ]
        },
        {
            id: 3,
            nickname: 'lipe',
            icon: require('../../assets/images/guitarcat.jpg'),
            email: 'Felipe000@gmail.com',
            username: 'guitarlipe',
            content: "travis passou anos sendo um dos melhores TEs da liga, aí começou a namorar a loira lá e agora tem gente q acha q ele só é 'o namorado da taylor' 💀 irmão, o cara tem 3 anéis e recebe passe do mahomes, respeito kkkk",
            image: null,
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        },

        {
            id: 4,
            nickname: 'tiago',
            icon: require('../../assets/images/carrobrega.jpg'),
            email: 'tiagosousa@gmail.com',
            username: 'ogait',
            content: "@guitarlipe queria eu ser conhecido por ser namorado de uma loira",
            image: null,
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        },

        {
            id: 5,
            nickname: 'mateus sem h',
            icon: require('../../assets/images/casadoicon.png'),
            email: 'mateuspatricio@gmail.com',
            username: 'homemcomprometido',
            content: null,
            image: require('../../assets/images/casadopost.png'),
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        },

        {
            id: 6,
            nickname: 'Bruno Rafael',
            icon: require('../../assets/images/ellietlou.jpeg'),
            email: 'brunorafael@unifacisa.com',
            username: 'profbruno',
            content: "Essa entrega tá merecendo um 3, muito bom",
            image: null,
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
