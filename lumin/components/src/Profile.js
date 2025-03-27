import React, { Component } from "react";
import {
    Animated,
    View,
    Text,
    ScrollView,
    Image,
    SafeAreaView,
    StyleSheet
} from "react-native";
import {Divider } from 'react-native-paper'; 
import {BlurView} from '@react-native-community/blur'

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            shouldCover: false, // Novo estado para controlar o zIndex
            user: this.props.user || { 
                id: 1,
                nickname: 'eve',
                icon: require('../../assets/images/bonecazoiuda.jpg'),
                headerImage: require('../../assets/images/bonecazoiuda.jpg'),
                email: 'evelynjulia945@gmail.com',
                username: 'evlia04',
                bio: "Desenvolvedora Mobile | React Native | Quebradora de apps profissionais"
            }
        };
    }

    componentDidMount() {
        // Listener para controlar quando o header deve cobrir o conteúdo
        this.state.scrollY.addListener(({ value }) => {
            const threshold = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
            const shouldCover = value >= threshold;
            
            if (shouldCover !== this.state.shouldCover) {
                this.setState({ shouldCover });
            }
        });
    }

    componentWillUnmount() {
        this.state.scrollY.removeAllListeners();
    }

    render() {
        const { user, shouldCover } = this.state;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

        const headerBlurr = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [0.5, 1],
            extrapolate: 'clamp'
        });

        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [0.5, 1],
            extrapolate: 'clamp'
        });

        const profileHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
            extrapolate: 'clamp'
        });

        const profileImageMarginTop = this.state.scrollY.interpolate({
            inputRange: [
                0, 
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_IMAGE_MIN_HEIGHT // Novo estágio para subir depois de diminuir
            ],
            outputRange: [
                HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT / 2),
                HEADER_MAX_HEIGHT - ((PROFILE_IMAGE_MIN_HEIGHT / 100) / 100), // ele vai até o seu menor tamanho sem mexer de posição
                HEADER_MIN_HEIGHT + 5
            ],
            extrapolate: 'clamp'
        });


        return (
            <SafeAreaView style={styles.container}>
                <Animated.View style={[
                    styles.header, 
                    { 
                        height: headerHeight,
                        zIndex: shouldCover ? 10 : 0,
                        elevation: shouldCover ? 10 : 0,
                    }

                ]}>

                    <Image 
                    source={user.headerImage} 
                    style={styles.profileImage}
                />

                </Animated.View>                
                <ScrollView 
                    style={styles.scrollView}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: false }
                    )}
                >
                    <Animated.View style={[
                        styles.profileImageContainer,
                        { 
                            height: profileHeight,
                            width: profileHeight,
                            marginTop: profileImageMarginTop,
                        }
                    ]}>
                        <Image 
                            source={user.icon} 
                            style={styles.profileImage}
                        />

                    </Animated.View>

                    <View style={styles.userInfo}>
                        <Text style={styles.nickname}>{user.nickname}</Text>
                        <Text style={styles.username}>@{user.username}</Text>
                        <Text style={styles.bio}>{user.bio}</Text>
                        
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>356</Text>
                                <Text style={styles.statLabel}>Seguindo</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>1.2k</Text>
                                <Text style={styles.statLabel}>Seguidores</Text>
                            </View>
                        </View>
                    </View>

                    <Divider></Divider>

                    <View style={{ height: 800 }}></View>
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
        ...StyleSheet.absoluteFillObject, // Ocupa toda a área do header
      }
});

export default Profile;