import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback as TWF, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class AddComment extends Component { 
    state = {
        comment: '',
        editMode: false,
    }

    handleAddComment = () => {
        Alert.alert('Adicionado!', this.state.comment);
    }

    render() {
        let commentArea = null;
        if (this.state.editMode) {
            commentArea = (
                <View style={styles.container}>
                    <TextInput placeholder='Comentário...'
                        style={styles.input} autoFocus={true}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}
                        onSubmitEditing={this.handleAddComment} />
                    <TWF onPress={() => this.setState({ editMode: false })}>
                        <Icon name='times' size={15} color='#FFF' />
                    </TWF>
                </View>
            );
        } else {
            commentArea = (
                <TWF onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Icon name='comment-o' size={28} color='#FFF' />
                    </View>
                </TWF>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                {commentArea}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#222325', 
        borderRadius: 10, 
        padding: 10,
    },
    caption: {
        marginLeft: 10,
        fontSize: 14,
        color: '#FFF',
    },
    input: {
        width: '85%', 
        padding: 10,
        backgroundColor: '#333', 
        color: '#FFF', 
        borderRadius: 5, 
        borderColor: '#02DBFF',
        borderWidth: 1, 
    },
});

export default AddComment;
