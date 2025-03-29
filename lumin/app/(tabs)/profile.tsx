import React from 'react';
import { View } from 'react-native';
import Profile from '../../components/src/Profile';

const App = () => {
  const userData = {
    nickname: 'eve',
    username: 'evlia04',
    icon: require('../../assets/images/bonecazoiuda.jpg'),
    headerImage: require('../../assets/images/bonecazoiuda.jpg'),
    bio: "Desenvolvedora Mobile | React Native"
  };

  return (
    <View style={{ flex: 1 }}>
      <Profile user={userData} />
    </View>
  );
};

export default App;