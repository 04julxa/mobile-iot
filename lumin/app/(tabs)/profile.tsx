import React from 'react';
import { View } from 'react-native';
import Profile from '../../components/src/Profile';

const App = () => {
  const userData = {
    nickname: 'eve',
    username: 'evlia04',
    icon: require('../../assets/images/bonecazoiuda.jpg'),
    headerImage: require('../../assets/images/bonecazoiuda.jpg'),
    bio: "Desenvolvedora Mobile | React Native",
    posts: [ 
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
            nickname: "amigo1",
            username: "amigo_dev",
            icon: null,
            comment: "Parabéns pelo post! 👏",
            likes: 5,
            time: "2h",
            replyTo: 'evlia04'
          }
        ]
      },
    ]

  };

  return (
    <View style={{ flex: 1 }}>
      <Profile user={userData} />
    </View>
  );
};

export default App;