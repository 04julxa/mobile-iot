import React, {useState} from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image 
} from 'react-native';
import Post from '../../components/src/Post';
import { FAB, Icon } from 'react-native-elements';
import CreatePostModal from '../../components/src/CreatePostModal';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([
        {
            id: 1,
            nickname: 'eve',
            icon: require('../../assets/images/bonecazoiuda.jpg'),
            email: 'evelynjulia945@gmail.com',
            username: 'evlia04',
            content: "saudade quando eu quebrava a aplicação dos outros ao invés de quebrar a minha",
            image: require('../../assets/images/evepost.jpeg'),
            comments: [
                { nickname: 'sssss', comment: '!11!' },
                { nickname: 'nome', comment: 'comentário' }
            ]
        },
        {
            id: 2,
            nickname: 'jessy',
            icon: require('../../assets/images/abihobbs.jpeg'),
            email: 'jessicavlb2005@gmail.com',
            username: 'woobot',
            content: "terminei a primeira fase de mobile, já tá podendo assistir hannibal dnv?",
            image: null,
            comments: [
                { nickname: 'Tiago', comment: 'kaiojwd' },
                { nickname: 'Mateus sem H', comment: 'comentário 1' }
            ]
        },
        {
            id: 3,
            nickname: 'lipe',
            icon: require('../../assets/images/guitarcat.jpg'),
            email: 'Felipe000@gmail.com',
            username: 'guitarlipe',
            content: "travis passou anos sendo um dos melhores TEs da liga, aí começou a namorar a loira lá e agora tem gente q acha q ele só é 'o namorado da taylor' 💀 irmão, o cara tem 3 anéis e recebe passe do mahomes, respeito kkkk",
            image: null,
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        },

        {
            id: 4,
            nickname: 'tiago',
            icon: require('../../assets/images/carrobrega.jpg'),
            email: 'tiagosousa@gmail.com',
            username: 'ogait',
            content: "@guitarlipe queria eu ser conhecido por ser namorado de uma loira",
            image: null,
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]},

        {
            id: 5,
            nickname: 'mateus sem h',
            icon: require('../../assets/images/casadoicon.png'),
            email: 'mateuspatricio@gmail.com',
            username: 'homemcomprometido',
            content: null,
            image: require('../../assets/images/casadopost.png'),
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        },

        {
            id: 6,
            nickname: 'Bruno Rafael',
            icon: require('../../assets/images/ellietlou.jpeg'),
            email: 'brunorafael@unifacisa.com',
            username: 'profbruno',
            content: "Essa entrega tá merecendo um 3, muito bom",
            image: null,
            comments: [
                { nickname: 'Evelyn', comment: 'jjjjjjjjjjj' },
                { nickname: 'Jessy', comment: 'jdjwejj' }
            ]
        }
    ]);
    const handleNewPost = (postContent: string) => {
        const newPost = {
            id: posts.length + 1,
            nickname: 'Você',
            icon: require('../../assets/images/abihobbs.jpeg'),
            email: 'user@example.com',
            username: 'seu_usuario',
            content: postContent,
            image: null,
            comments: []
        };
        
        setPosts([newPost, ...posts]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* FAB que abre o modal */}
            <FAB
                color="#4B7CCC"
                placement="right"
                style={styles.fab}
                onPress={() => setModalVisible(true)}
                icon={<Icon name="add" type="material" color="white" />}
            />

            <CreatePostModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleNewPost}
            />

            <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
                {posts.map((item) => (
                    <Post key={item.id} {...item} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#222325'
    },
    scrollView: {
        width: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 8,
        zIndex: 10
    }
});