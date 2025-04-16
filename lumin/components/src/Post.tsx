import React, { useState, useEffect, useCallback } from 'react';
import { Card, Divider, IconButton } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PostHeader } from './PostHeader';
import { PostActions } from './PostActions';

interface PostProps {
  id: string;
  nickname: string;
  username: string;
  content: string;
  icon?: any;
  image?: any;
  comments?: Array<any>;
  createdAt?: string;
  likesCount?: number;
  repostsCount?: number;
  onPress?: () => void;
}

export const Post = React.memo(({ 
  id,
  nickname,
  username,
  content,
  icon,
  image,
  comments = [],
  likesCount = 0,
  repostsCount = 0,
  onPress 
}: PostProps) => {
  const onCommentPress = useCallback(() => {
    console.log('Comment pressed');
  }, []);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        <Card.Title
          title={<PostHeader icon={icon} nickname={nickname} username={username} />}
          right={() => (
            <IconButton
              icon="dots-vertical"
              size={15}
              onPress={() => {}}
              style={styles.menuButton}
            />
          )}
          style={styles.cardTitle}
        />

        {content && (
          <Card.Content style={styles.content}>
            <Text style={styles.contentText}>
              {content}
            </Text>
          </Card.Content>
        )}

        {image && (
          <Card.Cover 
            source={{uri: image}} 
            style={styles.image} 
          />
        )}
        
        <PostActions
          commentsCount={comments.length}
          initialReposts={repostsCount}
          initialLikes={likesCount}
          onBookmarkPress={() => console.log('Bookmark pressed')}
          isBookmarked={false}
        />
      </Card>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
});


const styles = StyleSheet.create({
  card: {
    borderRadius: 0, 
    backgroundColor: '#222325', 
  },
  menuButton: {
    color: 'gray', 
    marginRight: 10, 
    marginTop: -10
  },
  cardTitle: {
    marginBottom: -25
  },
  content: {
    marginLeft: 44, 
    paddingVertical: 4, 
    marginTop: -13
  },
  contentText: {
    color: 'white', 
    fontSize: 15, 
    lineHeight: 22
  },
  image: {
    width: '79%', 
    alignSelf: "flex-end", 
    marginRight: 20, 
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#333'
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  modalContainer: {
    flex: 1
  }
});