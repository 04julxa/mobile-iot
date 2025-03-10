import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Comments extends Component {
    render() {
        let view = null;
        if (this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return (
                    <View style={styles.commentContainer} key={index}>
                        <Text style={styles.nickname}>{item.nickname}: </Text>
                        <Text style={styles.comment}>{item.comment}</Text>
                    </View>
                );
            });
        }
        return (    
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: '#222325', 
        borderRadius: 10,
        padding: 15,
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#02DBFF', 
        paddingBottom: 10,
    },
    nickname: {
        fontWeight: 'bold',
        color: '#02DBFF', 
        marginRight: 5,
    },
    comment: {
        color: '#FFF', 
        fontSize: 14,
    },
});

export default Comments;
