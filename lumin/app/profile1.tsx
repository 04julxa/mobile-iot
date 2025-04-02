import React, { Component } from 'react';
import {  Text, View,  StyleSheet,  Image, FlatList } from 'react-native';
import {Post} from '../components/src/Post'

class Profile extends Component {
  state = {
    posts: [
      { id: '1', nickname: 'Evelyn Julia', username: 'evlia04', content: 'Primeira publicação', image: null },
      { id: '2', nickname: 'Evelyn Julia', username: 'evlia04', content: 'Segunda publicação', image: null },
      { id: '3', nickname: 'Evelyn Julia', username: 'evlia04', content: 'FUNCIONOU', image: null }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={require('../assets/images/bonecazoiuda.jpg')} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.nickname}>Evelyn Julia</Text>
            <Text style={styles.username}>@evlia04</Text>
            <Text style={styles.location}>📍 Alcantil, Paraíba</Text>
            <Text style={styles.bio}>?????? bio</Text>
            <Text style={styles.followers}>2.5k Seguidores • 300 Seguindo</Text>
          </View>
        </View>

        <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              nickname={item.nickname}
              username={item.username}
              content={item.content}
              icon={require('../assets/images/bonecazoiuda.jpg')}
              image={item.image}
            />
          )}
        />
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222325', 
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444', 
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray', 
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: 10,
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', 
  },
  username: {
    fontSize: 16,
    color: '#aaa', 
  },
  location: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 5,
  },
  bio: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginVertical: 5,
  },
  followers: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default Profile;

