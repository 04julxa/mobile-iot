import React from 'react';
import { Avatar, Card, Text, IconButton, Divider } from 'react-native-paper';
import { View } from 'react-native';

export default function Post(props) {
    return (
        <React.Fragment>
            <Card style={{ borderRadius: 0, backgroundColor: '#222325' }}> {/* Definindo fundo preto para contraste */}
                <Card.Title
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Image source={props.icon} size={40} style={{ backgroundColor: 'white', marginTop: 30, marginLeft: -5}} />
                            <Text style={{ marginLeft: 11, marginBottom: -10}}>
                                <Text style={{ fontWeight: 'bold' }}>{props.nickname}</Text> <Text style={{ color: 'gray' }}>@{props.username}</Text>
                            </Text>
                        </View>
                    }
                    right={(props) => (
                        <IconButton {...props} icon="dots-vertical" size={15} onPress={() => {}} style={{color:'gray', marginRight: 10, marginBottom: 0 }} />
                    )}
                    style={{ marginBottom: -25 }} 
                />

                {props.content && (
                    <Card.Content style={{ marginLeft: 48, paddingVertical: 4, marginBottom: -5 }}> 
                        <Text variant="bodyMedium">{props.content}</Text> 
                    </Card.Content>
                )}

                {props.image && (
                    <Card.Cover source={props.image} style={{ width: '79%', alignSelf: "flex-end", marginRight: 20, marginTop: 10 }} />
                )}

<Card.Actions style={{ alignSelf: 'flex-end' }}>
    <IconButton 
        icon="comment-outline" 
        size={18} 
        onPress={() => {}} 
        style={{ marginHorizontal: 40, backgroundColor: 'transparent', borderColor: 'transparent' }} 
        theme={{ colors: { primary: 'white' } }} 
    />
    <IconButton 
        icon="repeat-variant" 
        size={22} 
        onPress={() => {}} 
        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }} 
        theme={{ colors: { primary: 'white' } }} 
    />
    <IconButton 
        icon="heart-outline" 
        size={18} 
        onPress={() => {}} 
        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }} 
        theme={{ colors: { primary: 'white' } }} 
    />
    <IconButton 
        icon="eye-outline" 
        size={18} 
        onPress={() => {}} 
        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }} 
        theme={{ colors: { primary: 'white' } }} 
    />
</Card.Actions>


            </Card>
            <Divider />
        </React.Fragment>
    );
}
