import React, {useState} from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
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
                { 
                    icon: require('../../assets/images/abihobbs.jpeg'),
                    nickname: 'jessy',
                    username: 'woobot',
                    comment: "VC DEU PULL?",
                    likes: 8,
                    time: '2h',
                    replyTo: 'evlia04'
                },
                { 
                    icon: require('../../assets/images/carrobrega.jpg'),
                    nickname: 'tiago',
                    username: 'ogait',
                    comment: "vdd, agora só quebra o próprio código mesmo",
                    likes: 12,
                    time: '1h',
                    replyTo: 'evlia04'
                },
                { 
                    icon: require('../../assets/images/bonecazoiuda.jpg'),
                    nickname: 'eve',
                    username: 'evlia04',
                    comment: "morra tiago",
                    likes: 10,
                    time: '30min',
                    replyTo: 'ogait'

                }
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
                { 
                    icon: require('../../assets/images/guitarcat.jpg'),
                    nickname: 'lipe',
                    username: 'guitarlipe',
                    comment: "só se for pra estudar anatomia 🧠🔪",
                    likes: 5,
                    time: '4h'
                },
                { 
                    icon: require('../../assets/images/casadoicon.png'),
                    nickname: 'mateus sem h',
                    username: 'homemcomprometido',
                    comment: "assiste sim, mas só depois de commitar",
                    likes: 3,
                    time: '3h'
                }
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
                { 
                    icon: require('../../assets/images/carrobrega.jpg'),
                    nickname: 'tiago',
                    username: 'ogait',
                    comment: "queria eu ser conhecido por ser namorado de uma loira",
                    likes: 15,
                    time: '6h'
                },
                { 
                    icon: require('../../assets/images/bonecazoiuda.jpg'),
                    nickname: 'eve',
                    username: 'evlia04',
                    comment: "pelo menos ele não tem que lidar com null safety no código dele 😂",
                    likes: 10,
                    time: '5h'
                }
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
                { 
                    icon: require('../../assets/images/ellietlou.jpeg'),
                    nickname: 'Bruno Rafael',
                    username: 'profbruno',
                    comment: "Foco no código, pessoal! 😅",
                    likes: 20,
                    time: '2h'
                },
                { 
                    icon: require('../../assets/images/abihobbs.jpeg'),
                    nickname: 'jessy',
                    username: 'woobot',
                    comment: "só falta arrumar um date com a taylor swift agora",
                    likes: 7,
                    time: '1h'
                }
            ]
        },
        {
            id: 5,
            nickname: 'mateus sem h',
            icon: require('../../assets/images/casadoicon.png'),
            email: 'mateuspatricio@gmail.com',
            username: 'homemcomprometido',
            content: null,
            image: require('../../assets/images/casadopost.png'),
            comments: [
                { 
                    icon: require('../../assets/images/bonecazoiuda.jpg'),
                    nickname: 'eve',
                    username: 'evlia04',
                    comment: "que foto linda do casal! 💍❤️",
                    likes: 25,
                    time: '8h'
                },
                { 
                    icon: require('../../assets/images/guitarcat.jpg'),
                    nickname: 'lipe',
                    username: 'guitarlipe',
                    comment: "parabéns aos noivos! 🎉",
                    likes: 18,
                    time: '7h'
                }
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
                { 
                    icon: require('../../assets/images/abihobbs.jpeg'),
                    nickname: 'jessy',
                    username: 'woobot',
                    comment: "professor, e se a gente fizer em Kotlin? 😇",
                    likes: 12,
                    time: '3h'
                },
                { 
                    icon: require('../../assets/images/carrobrega.jpg'),
                    nickname: 'tiago',
                    username: 'ogait',
                    comment: "3 é pouco, pede 10 pra ele 😎",
                    likes: 9,
                    time: '2h'
                }
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