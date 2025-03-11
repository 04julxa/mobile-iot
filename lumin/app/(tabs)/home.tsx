import React, {Component} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Post from '../../components/src/Post';

class Home extends Component {
    state = {
        posts: [
            {
                id: Math.random(),
                nickname: 'Evelyn Julia',
                email: 'evelynjulia945@gmail.com',
                image: require('../../assets/images/lumin-bluelogo.png'),
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
                    email: 'jessicavlb2005@gmail.com',
                    image: require('../../assets/images/lumin-bluelogo.png'),
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
                        email: 'Felipe000@gmail.com',
                        image: require('../../assets/images/lumin-bluelogo.png'),
                        comments: [{
                            nickname: 'Evelyn',
                            comment: 'jjjjjjjjjjj'
                        }, {
                            nickname: 'Jessy',
                            comment: 'jdjwejj'
                        } ]

            }]
    }

    render () {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={item=>`${item.id}`}
                    renderItem={({item}) =>
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
})

export default Home