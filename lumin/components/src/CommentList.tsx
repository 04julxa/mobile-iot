import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

interface Comment {
  id: string;
  author: string;
  username: string;
  content: string;
  timestamp: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários</Text>
      
      {comments.map(comment => (
        <View key={comment.id} style={styles.comment}>
          <Avatar.Text 
            size={36} 
            label={comment.author[0]} 
            style={styles.avatar} 
          />
          <View style={styles.commentContent}>
            <Text style={styles.commentAuthor}>
              {comment.author} <Text style={styles.commentUsername}>@{comment.username}</Text>
            </Text>
            <Text style={styles.commentText}>{comment.content}</Text>
            <Text style={styles.commentTime}>{comment.timestamp}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: '#4B7CCC',
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    color: 'white',
    fontWeight: 'bold',
  },
  commentUsername: {
    color: '#777',
  },
  commentText: {
    color: 'white',
    marginVertical: 4,
  },
  commentTime: {
    color: '#777',
    fontSize: 12,
  },
});