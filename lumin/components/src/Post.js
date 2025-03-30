import React, { useState, useEffect } from 'react'; 
import { Avatar, Card, Text, IconButton, Divider, Modal, Portal } from 'react-native-paper'; 
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';


export default function Post(props) {
    const [bookmarked, setBookmarked] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

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

    const toggleBookmark = async () => {
        try {
            const savedBookmarks = await AsyncStorage.getItem('bookmarks');
            let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];
    
            if (bookmarked) {
                bookmarks = bookmarks.filter(post => post.id !== props.id);
            } else {
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

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <React.Fragment>
            <Card 
                style={{ borderRadius: 0, backgroundColor: '#222325' }}
                onPress={showModal}
            >
                <Card.Title
                    title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar.Image source={props.icon} size={40} style={{ backgroundColor: 'white', marginTop: 5, marginLeft: -5 }} />
                            <Text style={{ marginLeft: 8.5, marginTop: -15}}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{props.nickname}</Text> <Text style={{ color: 'gray' }}>@{props.username}</Text>
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
                        <Text variant="bodyMedium" style={{color: 'white'}}>{props.content}</Text>
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
                        theme={{ colors: { primary: 'grey' } }}
                    />
                    <IconButton
                        icon="repeat-variant"
                        size={22}
                        onPress={() => { }}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'grey' } }}
                    />
                    <IconButton
                        icon="heart-outline"
                        size={18}
                        onPress={() => { }}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'grey' } }}
                    />
                    <IconButton
                        icon={bookmarked ? "bookmark" : "bookmark-outline"}
                        size={18}
                        onPress={toggleBookmark}
                        style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                        theme={{ colors: { primary: 'grey' } }}
                    />
                </Card.Actions>
            </Card>
            <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

            <Portal>
                <Modal 
                    visible={visible} 
                    onDismiss={hideModal} 
                    contentContainerStyle={styles.modalContainer}
                >
                    <View style={styles.fullScreenContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity 
                                style={styles.backButton}
                                onPress={hideModal}
                            >
                            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
                            </TouchableOpacity>
                            <Text style={styles.modalHeaderTitle}>Postar</Text>
                        
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
                                                source={props.icon} 
                                                size={40} 
                                                style={{ backgroundColor: 'white', marginTop: 5, marginLeft: -5 }} 
                                            />
                                            <View style={{ marginLeft: 8.5, marginTop: 3 }}>
                                                <Text style={{ fontWeight: 'bold', color: 'white' }}>{props.nickname}</Text>
                                                <Text style={{ color: 'gray', marginTop: -3 }}>@{props.username}</Text>
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
                                                style={{ color: 'gray', marginLeft: 5 }} 
                                            />
                                        </View>
                                    </View>
                                }
                            />
                        <Card.Content style={{ marginLeft: 0, paddingVertical: 4, marginTop: 5 }}>
                            <View style={{ marginBottom: 10 }}>
                                {props.content && (
                                    <Text variant="bodyMedium" style={{ color: 'white', fontSize: 16 }}>
                                        {props.content}
                                    </Text>
                                )}

                                {props.image && (
                                    <Card.Cover
                                        source={props.image}
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
                                        <Text style={styles.statNumber}>1</Text>
                                        <Text style={styles.statLabel}>Republicações</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>2</Text>
                                        <Text style={styles.statLabel}>Comentarios</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>3</Text>
                                        <Text style={styles.statLabel}>Curtidas</Text>
                                    </View>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statNumber}>4</Text>
                                        <Text style={styles.statLabel}>Itens Salvos</Text>
                                    </View>
                                </View>

                                <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                            </View>
                        </Card.Content>
                            <Card.Actions style={{alignItems: 'center', marginTop: -25, marginBottom: -10, padding: 0}}>
                                <IconButton
                                    icon="comment-outline"
                                    size={20}
                                    onPress={() => { }}
                                    style={{marginHorizontal: 40, backgroundColor: 'transparent', borderColor: 'transparent'}}
                                    theme={{ colors: { primary: 'gray' } }}
                                />
                                <IconButton
                                    icon="repeat-variant"
                                    size={24}
                                    onPress={() => { }}
                                    style={{ marginHorizontal: 50, backgroundColor: 'transparent' }}
                                    theme={{ colors: { primary: 'gray' } }}
                                />
                                <IconButton
                                    icon="heart-outline"
                                    size={20}
                                    onPress={() => { }}
                                    style={{ marginHorizontal: 50, backgroundColor: 'transparent' }}
                                    theme={{ colors: { primary: 'gray' } }}
                                />
                                <IconButton
                                    icon={bookmarked ? "bookmark" : "bookmark-outline"}
                                    size={20}
                                    onPress={toggleBookmark}
                                    style={{ marginHorizontal: 40, backgroundColor: 'transparent' }}
                                    theme={{ colors: { primary: 'gray' } }}
                                />
                            </Card.Actions>
                            <Divider style={{ marginVertical: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                            <View style={styles.commentsContainer}>
                                
                                {props.comments && props.comments.map((comment, index) => (
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
                                        {index < props.comments.length - 1 && (
                                            <Divider 
                                                style={{marginBottom: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                                                } 
                                            />
                                        )}
                                    </React.Fragment>
                                ))}    
                                </View>
                            
                        </Card>
                        </ScrollView>
                    </View>
                </Modal>
            </Portal>
        </React.Fragment>
    );
}
const { width, height } = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    modalScrollView: {
        flex: 1,
    },
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
      },
    
    followButton: {
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginRight: -8
    },
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
        justifyContent: 'right',
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
        fontSize: 13
    },
    commentsContainer: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    commentItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    commentAvatar: {
        backgroundColor: '#444',
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentAuthor: {
        color: 'white',
        fontWeight: '600',
        marginRight: 5,
    },
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
    },
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
    },
    commentContent: {
        flex: 1,
        marginTop: -3, 
    }
});