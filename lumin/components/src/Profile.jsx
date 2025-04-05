import React, { Component } from "react";
import {
  Animated,
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Divider } from "react-native-paper";
import { BlurView } from "expo-blur";
import api from "./services/api";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      shouldCover: false,
      user: null,
      loading: true,
      error: null,
    };
  }

  async componentDidMount() {
    this.state.scrollY.addListener(({ value }) => {
      const threshold = HEADER_SCROLL_DISTANCE;
      const shouldCover = value >= threshold;

      if (shouldCover !== this.state.shouldCover) {
        this.setState({ shouldCover });
      }
    });

    await this.fetchUserData();
  }

  componentWillUnmount() {
    this.state.scrollY.removeAllListeners();
  }

  fetchUserData = async () => {
    try {
      this.setState({ loading: true, error: null });

      const userId = this.props.user?._id;
      if (!userId) throw new Error("Usuário não autenticado");

      const response = await api.get(`/user/${userId}`);
      console.log("🔍 Dados do usuário retornados:", response.data);
      
      const userData = response.data?.data;
      if (!userData) throw new Error("Dados do usuário não encontrados");
      
      this.setState({ user: userData, loading: false });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      this.setState({
        error: error.message || "Erro ao carregar perfil",
        loading: false,
      });
    }
  };

  render() {
    const { user, shouldCover, loading } = this.state;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const blurOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const profileHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_SCROLL_DISTANCE,
        HEADER_SCROLL_DISTANCE + PROFILE_IMAGE_MIN_HEIGHT,
      ],
      outputRange: [
        HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
        HEADER_MAX_HEIGHT - ((PROFILE_IMAGE_MIN_HEIGHT / 100) / 100), // ele vai até o seu menor tamanho sem mexer de posição
        HEADER_MIN_HEIGHT + 5,
      ],
      extrapolate: "clamp",
    });

    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={{ color: "white", padding: 20 }}>Carregando perfil...</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight,
              zIndex: shouldCover ? 10 : 0,
              elevation: shouldCover ? 10 : 0,
              backgroundColor: user?.avatar ? "transparent" : "#007AFF",
            },
          ]}
        >
          <Animated.View style={[styles.blurOverlay, { opacity: blurOpacity }]}>
            <BlurView intensity={100} style={StyleSheet.absoluteFill} tint="dark" />
          </Animated.View>
        </Animated.View>

        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          <Animated.View
            style={[
              styles.profileImageContainer,
              {
                height: profileHeight,
                width: profileHeight,
                marginTop: profileImageMarginTop,
                backgroundColor: user?.avatar ? "#222325" : "#007AFF",
              },
            ]}
          >
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.defaultIcon}>
                {user?.name && (
                  <Text style={styles.initials}>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </Text>
                )}
              </View>
            )}
          </Animated.View>

          <View style={styles.userInfo}>
            {user?.name && <Text style={styles.nickname}>{user.name}</Text>}
            {user?.username && <Text style={styles.username}>@{user.username}</Text>}
            {user?.bio && <Text style={styles.bio}>{user.bio}</Text>}

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Seguindo</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={{ height: 800 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222325'
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'pink',
    },
    scrollView: {
        flex: 1
    },
    profileImageContainer: {
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
        borderColor: '#222325',
        borderWidth: 3,
        overflow: 'hidden',
        marginLeft: 20,
        alignSelf: 'flex-start',
        backgroundColor: '#222325'
    },
    profileImage: {
        flex: 1,
        width: null,
        height: null
    },

    defaultHeader: {
        flex: 1,
        backgroundColor: '#007AFF'
      },
    defaultIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
    },
    initials: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    headerImage: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    userInfo: {
        padding: 20,
        paddingTop: 5,
    },
    nickname: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5
    },
    username: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 15
    },
    bio: {
        fontSize: 16,
        color: 'white',
        lineHeight: 22,
        marginBottom: 20
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'right',
    },
    statItem: {
        flexDirection: 'row',
        paddingRight: 5,
    },
    statNumber: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        paddingRight: 5
    },
    statLabel: {
        color: 'gray',
        fontSize: 14
    },

    blurOverlay: {
        ...StyleSheet.absoluteFillObject
      }
});

export default Profile;
