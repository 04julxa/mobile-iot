import React, { useState, useCallback } from 'react';
import { 
  View, 
  Modal, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';

interface User {
  id: string;
  name: string;
  username?: string;
  avatar?: any;
}

interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt?: Date;
  likes?: number;
}

interface Post {
  id: string;
  content: string;
  author: User;
  likes: number;
  comments?: Comment[]; 
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt?: Date;
}

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (commentText: string) => void;
  currentUser: User;
  post: Post;
}

const CommentModal: React.FC<CommentModalProps> = React.memo(({ 
  visible, 
  onClose, 
  onSubmit,
  currentUser,
  post
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = useCallback(() => {
    if (commentText.trim()) {
      onSubmit(commentText);
      setCommentText('');
    }
  }, [commentText, onSubmit]);

  const handleTextChange = useCallback((text: string) => {
    setCommentText(text);
  }, []);

  const comments = post.comments || [];

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onClose}
            accessibilityLabel="Fechar modal"
          >
            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Comentários</Text>
          
          <TouchableOpacity 
            style={[styles.postButton, !commentText.trim() && styles.disabledButton]}
            disabled={!commentText.trim()}
            onPress={handleSubmit}
            accessibilityLabel="Publicar comentário"
          >
            <Text style={styles.postButtonText}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.modalContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image 
                source={post.author.avatar || require('../../assets/images/abihobbs.jpeg')}
                style={styles.postAuthorImage}
              />
              <View style={styles.postAuthorInfo}>
                <Text style={styles.postAuthorName}>{post.author.name}</Text>
                {post.author.username && (
                  <Text style={styles.postUsername}>@{post.author.username}</Text>
                )}
              </View>
            </View>
            
            <Text style={styles.postText}>{post.content}</Text>
            
            <View style={styles.postStats}>
              <TouchableOpacity style={styles.postStat}>
                <Icon 
                  name={post.isLiked ? "favorite" : "favorite-border"} 
                  type="material" 
                  color={post.isLiked ? "#ff4444" : "#777"} 
                  size={20} 
                />
                <Text style={styles.postStatText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.postStat}>
                <Icon 
                  name="comment" 
                  type="material" 
                  color="#4B7CCC" 
                  size={20} 
                />
                <Text style={styles.postStatText}>{comments.length}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Lista de comentários existentes */}
          {comments.length > 0 && (
            <View style={styles.commentsContainer}>
              {comments.map((comment, index) => (
                <View key={comment.id || index} style={styles.commentItem}>
                  <Image 
                    source={comment.author.avatar || require('../../assets/images/abihobbs.jpeg')}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentAuthor}>{comment.author.name}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Área de novo comentário */}
          <View style={styles.commentArea}>
            <Image 
              source={currentUser.avatar || require('../../assets/images/abihobbs.jpeg')}
              style={styles.userIcon}
              accessibilityIgnoresInvertColors
            />

            <TextInput
              style={styles.commentInput}
              multiline
              placeholder="Escreva um comentário..."
              placeholderTextColor="#777"
              value={commentText}
              onChangeText={handleTextChange}
              autoFocus
              textAlignVertical="top"
              maxLength={500}
              accessibilityLabel="Campo de texto para comentário"
            />
          </View>
        </ScrollView>

        <View style={styles.mediaOptions}>
          <View style={styles.mediaButtons}>
            {MEDIA_OPTIONS.map((option) => (
              <MediaButton
                key={option.iconName}
                iconName={option.iconName}
                iconType={option.iconType}
                onPress={option.onPress}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
});


const MediaButton = React.memo(({ iconName, iconType, onPress }: {
  iconName: string;
  iconType: string;
  onPress: () => void;
}) => (
  <TouchableOpacity 
    style={styles.mediaButton}
    onPress={onPress}
    accessibilityLabel={`Adicionar ${iconName}`}
  >
    <Icon 
      name={iconName} 
      type={iconType} 
      color="#4B7CCC" 
      size={24} 
    />
  </TouchableOpacity>
));

const MEDIA_OPTIONS = [
  {
    iconName: 'image',
    iconType: 'material-community',
    onPress: () => console.log('Adicionar imagem')
  },
  {
    iconName: 'file-gif-box',
    iconType: 'material-community',
    onPress: () => console.log('Adicionar GIF')
  },
  {
    iconName: 'emoji-emotions',
    iconType: 'material',
    onPress: () => console.log('Adicionar emoji')
  },
];

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#1e1f21',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 5,
  },
  modalTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  postButton: {
    backgroundColor: "#4B7CCC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 15,
  },
  postContainer: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postAuthorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthorName: {
    color: 'white',
    fontWeight: 'bold',
  },
  postTimestamp: {
    color: '#777',
    fontSize: 12,
  },
  postText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  postStatText: {
    color: '#777',
    marginLeft: 5,
    fontSize: 14,
  },
  commentArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInput: {
    color: 'white',
    fontSize: 16,
    maxHeight: 200,
    padding: 0,
    marginBottom: 0,
    flex: 1,
    lineHeight: 24,
  },
  mediaOptions: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaButton: {
    padding: 10,
  },
  commentsContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 15,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentAuthor: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    color: 'white',
    fontSize: 14,
  },
  postUsername: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },
});

export default CommentModal;