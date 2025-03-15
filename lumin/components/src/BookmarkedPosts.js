import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';

export default function BookmarkedPosts() {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    // Recarrega os posts salvos sempre que a tela for acessada
    useFocusEffect(
        useCallback(() => {
            loadBookmarks();
        }, [])
    );

    const loadBookmarks = async () => {
        try {
            const savedBookmarks = await AsyncStorage.getItem('bookmarks');
            const bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
            setBookmarkedPosts(bookmarks);
        } catch (error) {
            console.error('Erro ao carregar os bookmarks:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
            {bookmarkedPosts.length > 0 ? (
                bookmarkedPosts.map((item) => <Post key={item.id} {...item} />)
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Nenhum post salvo</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        width: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: 'gray',
        fontSize: 16,
    },
});
