import React, {Component} from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Post from '../../components/src/Post';

export default function Home() {
    const state = {
        posts: [
            {
                id: Math.random(),
                nickname: 'Evelyn Julia',
                icon: require('../../assets/images/deer.jpeg'),
                email: 'evelynjulia945@gmail.com',
                username: 'evelynjulia',
                content: "viado na mata",
                image: require('../../assets/images/deer.jpeg'),
                comments: [{
                    nickname: 'sssss',
                    comment: '!11!'
                }, {
                    nickname: 'nome',
                    comment: 'comentário'
                }, ]
            },
                {
                    id: Math.random(),
                    nickname: 'Jessy',
                    icon: require('../../assets/images/deer.jpeg'),
                    email: 'jessicavlb2005@gmail.com',
                    username: 'woobot',
                    content: "evelyn é homofobica? cancelem ela",
                    image: null,
                    comments: [{
                        nickname: 'Tiago',
                        comment: 'kaiojwd'
                    }, {
                        nickname: 'Mateus sem H',
                        comment: 'comentário 1' 
            },]
                },
                    {
                        id: Math.random(),
                        nickname: 'Felipe',
                        icon: require('../../assets/images/deer.jpeg'),
                        email: 'Felipe000@gmail.com',
                        username: 'felipe000',
                        content: null,
                        image: require('../../assets/images/brisa.jpg'),
                        comments: [{
                            nickname: 'Evelyn',
                            comment: 'jjjjjjjjjjj'
                        }, {
                            nickname: 'Jessy',
                            comment: 'jdjwejj'
                        } ]

            }]
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{width: '100%'}}>
                {
                    state.posts.map((item) => {
                        return <Post key={item.id} {...item} />
                    })
                }
            </ScrollView>
                    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        width: '100%'
        
    }
})