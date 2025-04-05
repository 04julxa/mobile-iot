import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator,
  Alert,
  Text,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import { FAB } from 'react-native-elements';
import { Post } from '../../components/src/Post';
import CreatePostModal from '../../components/src/CreatePostModal';
import { ViewPostModal } from '../../components/src/ViewPostModal';
import { useAuth } from '../../components/src/context/authContext';
import { Buffer } from 'buffer';

interface Author {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface Post {
  _id: string;
  content: string;
  author: Author;
  icon?: any;
  image?: any;
  likes?: any[];
  comments?: any[];
  createdAt?: string;
  onPress?: () => void;
  likesCount?: number;
  reposts?: number; 
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { user, accessToken } = useAuth();


  const API_BASE_URL = 'http://10.0.2.2:3001/api';

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/post`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      const simplifiedPosts = result.data.map((post: Post) => ({
        _id: post._id,
        content: post.content,
        author: post.author || {
          _id: '',
          name: 'Anônimo',
          username: '',
          email: ''
        },
        likes: Array.isArray(post.likes) ? post.likes : [],
        comments: Array.isArray(post.comments) ? post.comments : [],
        createdAt: post.createdAt || ''
      }));
      
      setPosts(simplifiedPosts);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleNewPost = useCallback(async (postContent: string) => {
   try {
      const formData = new FormData();
      formData.append('content', postContent);
      formData.append('author', String(user?._id));
      
      const response = await fetch(`${API_BASE_URL}/post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, 
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar post: ${response.status}`);
      }
  
      const result = await response.json();
      setPosts(prevPosts => [result.data, ...prevPosts]);
      setCreateModalVisible(false);
      Alert.alert('Sucesso', 'Post criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert(
        'Erro',
        `Falha ao criar post: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }, [accessToken]);

  const handleViewPost = useCallback((post: Post) => {
    setSelectedPost(post);
    setViewModalVisible(true);
  }, []);

  const handleCloseViewModal = useCallback(() => {
    setViewModalVisible(false);
    setSelectedPost(null);
  }, []);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#4B7CCC" style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <FAB
            title="Tentar novamente"
            onPress={fetchPosts}
            buttonStyle={styles.retryButton}
            titleStyle={styles.retryButtonText}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Post 
            {...item} 
            id={item._id}
            nickname={item.author.name}
            username={item.author.username}
            onPress={() => handleViewPost(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#4B7CCC']}
            tintColor="#4B7CCC"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post encontrado</Text>
            <FAB
              title="Recarregar"
              onPress={fetchPosts}
              buttonStyle={styles.reloadButton}
              titleStyle={styles.reloadButtonText}
            />
          </View>
        }
      />

      <FAB
        color="#4B7CCC"
        placement="right"
        style={styles.fab}
        onPress={() => setCreateModalVisible(true)}
        icon={{ name: "add", color: "white" }}
      />

      <CreatePostModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleNewPost}
        userImage={user?.avatar}
        userInitial={user?.name?.charAt(0)}
      />

      <ViewPostModal
        visible={viewModalVisible}
        post={selectedPost}
        onClose={handleCloseViewModal}
        isBookmarked={false}
        onBookmarkPress={() => console.log('Bookmark toggled')} 
        isFollowing={false} 
        toggleFollow={() => console.log('Follow toggled')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222325'
  },
  loader: {
    marginTop: 20
  },
  listContent: {
    paddingBottom: 80,
    flexGrow: 1
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 8,
    zIndex: 10
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16
  },
  retryButton: {
    backgroundColor: '#4B7CCC',
    borderRadius: 8,
    paddingHorizontal: 20
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16
  },
  reloadButton: {
    backgroundColor: '#4B7CCC',
    borderRadius: 8,
    paddingHorizontal: 20
  },
  reloadButtonText: {
    color: 'white',
    fontSize: 16
  }
});