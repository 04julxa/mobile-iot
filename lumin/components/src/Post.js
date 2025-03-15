import React, { useState, useEffect } from 'react';
import { Avatar, Card, Text, IconButton, Divider } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Post(props) {
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        checkIfBookmarked();
    }, []);

    const checkIfBookmarked = async () => {
        try {
            const savedBookmarks = await AsyncStorage.getItem('bookmarks');
            const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
            setBookmarked(bookmarks.some(post => post.id === props.id));
        } catch (error) {
            console.error('Erro ao recuperar os bookmarks:', error);
        }
    };

    // Adiciona ou remove o post dos bookmarks
    const toggleBookmark = async () => {
        try {
            const savedBookmarks = await AsyncStorage.getItem('bookmarks');
            let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

            if (bookmarked) {
                // Remove o post dos bookmarks
                bookmarks = bookmarks.filter(post => post.id !== props.id);
            } else {
                // Adiciona o post aos bookmarks
                bookmarks.push({
                    id: props.id,
                    nickname: props.nickname,
                    icon: props.icon,
                    username: props.username,
                    content: props.content,
                    image: props.image
                });
            }

            await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            setBookmarked(!bookmarked);
        } catch (error) {
            console.error('Erro ao salvar o bookmark:', error);
        }
    };

    return (
        <React.Fragment>
            <Card style={{ borderRadius: 0, backgroundColor: '#222325' }}>
                <Card.Title
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Image source={props.icon} size={40} style={{ backgroundColor: 'white', marginTop: 5, marginLeft: -5 }} />
                            <Text style={{ marginLeft: 8.5, marginTop: -15 }}>
                                <Text style={{ fontWeight: 'bold' }}>{props.nickname}</Text> <Text style={{ color: 'gray' }}>@{props.username}</Text>
                            </Text>
                        </View>
                    }
                    right={(props) => (
                        <IconButton {...props} icon="dots-vertical" size={15} onPress={() => { }} style={{ color: 'gray', marginRight: 10, marginTop: -10 }} />
                    )}
                    style={{ marginBottom: -25 }}
                />

                {props.content && (
                    <Card.Content style={{ marginLeft: 44, paddingVertical: 4, marginTop: -13 }}>
                        <Text variant="bodyMedium">{props.content}</Text>
                    </Card.Content>
                )}

                {props.image && (
                    <Card.Cover source={props.image} style={{ width: '79%', alignSelf: "flex-end", marginRight: 20, marginTop: 5 }} />
                )}

                <Card.Actions style={{ alignSelf: 'flex-end', marginTop: -10, marginBottom: -10}}>
                    <IconButton
                        icon="comment-outline"
                        size={18}
                        onPress={() => { }}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent', borderColor: 'transparent' }}
                        theme={{ colors: { primary: 'white' } }}
                    />
                    <IconButton
                        icon="repeat-variant"
                        size={22}
                        onPress={() => { }}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'white' } }}
                    />
                    <IconButton
                        icon="heart-outline"
                        size={18}
                        onPress={() => { }}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'white' } }}
                    />
                    <IconButton
                        icon={bookmarked ? "bookmark" : "bookmark-outline"}
                        size={18}
                        onPress={toggleBookmark}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'white' } }}
                    />
                </Card.Actions>

            </Card>
            <Divider />
        </React.Fragment>
    );
}
