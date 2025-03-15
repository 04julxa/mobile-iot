import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BookmarkedPosts from '../../components/src/BookmarkedPosts';

export default function Bookmarks() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <BookmarkedPosts />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#222325',
    },
});
