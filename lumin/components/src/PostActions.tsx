import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import CommentModal from './CreateCommentModal'

interface PostActionsProps {
  commentsCount: number;
  initialReposts: number;
  initialLikes: number;
  onBookmarkPress: () => void;
  isBookmarked: boolean;
}

export const PostActions = React.memo(({ 
  commentsCount, 
  initialReposts, 
  initialLikes,
  onBookmarkPress,
  isBookmarked
}: PostActionsProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposted] = useState(initialReposts);
  const [isReposted, setIsReposted] = useState(false);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    setReposted(isReposted ? reposts - 1 : likes + 1);
  };

  return (
    <View style={styles.actionsContainer}>
      <View style={styles.actionItem}>
        <IconButton
          icon="comment-outline"
          size={20}
          onPress={() => {}}
          style={styles.actionButton}
          theme={{ colors: { primary: 'gray' } }}
        />
        {commentsCount > 0 && (
          <Text style={styles.actionText}>{commentsCount}</Text>
        )}
      </View>

      <View style={styles.actionItem}>
        <IconButton
          icon="repeat-variant"
          size={24}
          onPress={handleRepost}
          style={styles.actionButton}
          theme={{ colors: { primary: isReposted ? '#4CAF50' : 'gray' } }}
        />
        {reposts > 0 && (
          <Text style={[styles.actionText, isReposted && styles.repostedText]}>
            {reposts}
          </Text>
        )}
      </View>

      <View style={styles.actionItem}>
        <IconButton
          icon={isLiked ? "heart" : "heart-outline"}
          size={20}
          onPress={handleLike}
          style={styles.actionButton}
          theme={{ colors: { primary: isLiked ? 'pink' : 'green' } }}
        />
        {likes > 0 && (
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {likes}
          </Text>
        )}
      </View>

      <View style={styles.actionItem}>
        <IconButton
          icon={isBookmarked ? "bookmark" : "bookmark-outline"}
          size={20}
          onPress={onBookmarkPress}
          style={styles.actionButton}
          theme={{ colors: { primary: isBookmarked ? '#2196F3' : 'gray' } }}
        />
        {isBookmarked && (
          <Text style={[styles.actionText, styles.bookmarkedText]}>1</Text>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 47,
    marginTop: -5,
    marginBottom: -10,
    padding: 0
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'gray',
    fontSize: 12,
    marginLeft: -10
  },
  likedText: {
    color: '#ff0000', 
  },
  repostedText: {
    color: '#4CAF50', 
  },
  bookmarkedText: {
    color: '#2196F3', 
  }
});