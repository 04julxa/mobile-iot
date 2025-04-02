import React, { useState } from 'react';
import { 
    Modal, 
    View, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    Dimensions,
    ViewStyle,
    TextStyle,
    ImageStyle
  } from 'react-native';
import { Card, IconButton, Divider, Avatar, Portal } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import CreateCommentModal from './CreateCommentModal'
import { PostActions } from './PostActions';
import { Post } from './Post';

interface ViewPostModalProps {
  visible: boolean;
  post: any;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkPress: () => void;
  isFollowing: boolean;
  toggleFollow: () => void;
}

export const ViewPostModal = ({ 
  visible, 
  post, 
  onClose, 
  isBookmarked, 
  onBookmarkPress,
  isFollowing,
  toggleFollow
}: ViewPostModalProps) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  if (!post) return null;
  
  return (
    <Portal>
      <Modal 
        visible={visible} 
        onDismiss={onClose}
      >
        <View style={styles.modalContainer}>
        <View style={styles.fullScreenContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onClose}
            >
              <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Post</Text>
          </View>
          
          <ScrollView 
            style={styles.modalScrollView}
            showsVerticalScrollIndicator={false}
          >
            <Card style={styles.modalCard}> 
              <Card.Title
                title={
                  <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Avatar.Image 
                        source={post.icon} 
                        size={40} 
                        style={{ backgroundColor: 'white', marginTop: 5, marginLeft: -5 }} 
                      />
                      <View style={{ marginLeft: 8.5, marginTop: 3 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>{post.author.name}</Text>
                        <Text style={{ color: 'gray', marginTop: -3 }}>@{post.author.username}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -15}}>
                      <TouchableOpacity 
                        style={[styles.followButton, isFollowing && styles.followingButton]}
                        onPress={toggleFollow}
                      >
                        <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                          {isFollowing ? "Seguindo" : "Seguir"}
                        </Text>
                      </TouchableOpacity>

                      <IconButton 
                        icon="dots-vertical" 
                        size={18} 
                        onPress={() => { }} 
                        iconColor="gray"
                        style={{ marginLeft: 5 }} 
                      />
                    </View>
                  </View>
                }
              />
              
              <Card.Content style={{ marginLeft: 0, paddingVertical: 4, marginTop: 5 }}>
                <View style={{ marginBottom: 10 }}>
                  {post.content && (
                    <Text style={{ color: 'white', fontSize: 16 }}>
                      {post.content}
                    </Text>
                  )}

                  {post.image && (
                    <Card.Cover
                      source={post.image}
                      style={{
                        width: '100%',
                        alignSelf: "center",
                        marginTop: 15,
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                  )}

                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>19:38 • 29 mar. 25 •</Text>
                      <Text style={styles.statNumber}> 100</Text>
                      <Text style={styles.statLabel}>Visualizações</Text>
                    </View>
                  </View>

                  <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{post.reposts || 0}</Text>
                      <Text style={styles.statLabel}>Republicações</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{post.comments?.length || 0}</Text>
                      <Text style={styles.statLabel}>Comentarios</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{post.likesCount || 0}</Text>
                      <Text style={styles.statLabel}>Curtidas</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>{post.saves || 0}</Text>
                      <Text style={styles.statLabel}>Itens Salvos</Text>
                    </View>
                  </View>

                  <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                </View>
              </Card.Content>
              
              <PostActions
                    commentsCount={post.comments.length}
                    initialReposts={0} 
                    initialLikes={post.likes.length}
                    onBookmarkPress={onBookmarkPress}
                    isBookmarked={isBookmarked}
                    

                  />
              
              <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
              
              <View style={styles.commentsContainer}>
                {post.comments?.map((comment: any, index: number) => (
                  <React.Fragment key={index}>
                    <View style={styles.commentItem}>
                      <Avatar.Image 
                        source={comment.icon} 
                        size={40} 
                        style={styles.commentAvatar}
                      />
                      
                      <View style={styles.commentContent}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentAuthor}>{comment.nickname}</Text>
                          <Text style={styles.commentUsername}>@{comment.username}</Text>
                          <Text style={styles.commentTime}>• {comment.time}</Text>
                        </View>
                        
                        {comment.replyTo && (
                          <Text style={styles.replyText}>
                            Em resposta a <Text style={styles.replyUsername}>@{comment.replyTo}</Text>
                          </Text>
                        )}
                        
                        <Text style={styles.commentText}>{comment.comment}</Text>
                        
                        <TouchableOpacity style={styles.commentLike}>
                          <Icon 
                            name="heart-outline" 
                            type="material-community" 
                            size={14} 
                            color="gray" 
                          />
                          <Text style={styles.commentLikeCount}>{comment.likes}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    {index < post.comments.length - 1 && (
                      <Divider style={{marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)'}} />
                    )}
                  </React.Fragment>
                ))}    
              </View>
            </Card>
          </ScrollView>
        </View>
        </View>
        <CreateCommentModal
            visible={isCommentModalVisible}
            onClose={() => setIsCommentModalVisible(false)}
            onSubmit={(commentText) => {
                console.log('Novo comentário:', commentText);
                setIsCommentModalVisible(false);
            }}
            currentUser={{
                id: "user123", 
                name: "Seu Nome",
                avatar: require('../../assets/images/abihobbs.jpeg') 
            }}
            post={post}
            />
      </Modal>
    </Portal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  } as ViewStyle,
  modalScrollView: {
    flex: 1,
  } as ViewStyle,
  fullScreenContainer: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#222325',
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#222325',
  },
  modalHeader: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  backButton: {
    padding: 0,
  },
  modalHeaderTitle: {
    color: 'white',
    fontSize: 20,
    marginLeft: 20
  } as TextStyle,
  followButton: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginRight: -8
  } as ViewStyle,
  followButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  followingButton: {
    backgroundColor: "#4B7CCC",
    fontSize: 14,
    fontWeight: 'bold'
  },
  followingButtonText: {
    color: 'white'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5
  },
  statItem: {
    flexDirection: 'row',
    paddingRight: 5,
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
    paddingRight: 5
  },
  statLabel: {
    color: 'gray',
    fontSize: 13,
  },
  commentsContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    backgroundColor: '#444',
    marginRight: 10,
  } as ViewStyle,
  commentContent: {
    flex: 1,
    marginTop: -3, 
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAuthor: {
    color: 'white',
    fontWeight: '600',
    marginRight: 5,
  } as TextStyle,
  commentUsername: {
    color: 'gray',
    marginRight: 5,
  },
  commentTime: {
    color: 'gray',
    fontSize: 12,
  },
  commentText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: -10
  } as ViewStyle,
  commentLikeCount: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 5,
  },
  replyText: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 4,
  },
  replyUsername: {
    color: '#4B7CCC',
    fontSize: 12,
  }
});