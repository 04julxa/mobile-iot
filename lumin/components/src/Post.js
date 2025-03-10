import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import Icon from 'react-native-vector-icons/FontAwesome';

class Post extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image} />
                
                <Author email={this.props.email} 
                        nickname={this.props.nickname} />
                
                <View style={styles.interactionContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name='heart-o' size={30} color='#FFF' />
                    </TouchableOpacity>
                </View>

                <Comments comments={this.props.comments} />
                <AddComment />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#222325',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    interactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    iconButton: {
        marginRight: 1, 
    },
    buttonText: {
        color: '#18191A',
        fontWeight: 'bold',
    }
});

export default Post;
