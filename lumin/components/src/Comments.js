import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

class Comments extends Component {
    render() {
        let view = null;
        if (this.props.comments) {
            view = this.props.comments.map((item, index) => {
                return (
                    <View key={index}>
                        <View style={styles.commentContainer}>
                            <Text style={styles.nickname}>{item.nickname}: </Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                        </View>
                        {index < this.props.comments.length - 1 && <Divider />}
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
        backgroundColor: '#222325', 
        borderRadius: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10
    },
    nickname: {
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 5,
    },
    comment: {
        color: '#FFF', 
        fontSize: 14,
    },
});

export default Comments;
