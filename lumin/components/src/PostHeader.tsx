import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';

interface PostHeaderProps {
  icon: any;
  nickname: string;
  username: string;
}

export const PostHeader = React.memo(({ icon, nickname, username }: PostHeaderProps) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Avatar.Image 
      source={icon} 
      size={40} 
      style={{ backgroundColor: 'white', marginTop: 5, marginLeft: -5 }} 
    />
    <Text style={{ marginLeft: 8.5, marginTop: -15 }}>
      <Text style={{ fontWeight: 'bold', color: 'white' }}>{nickname}</Text>
      <Text style={{ color: 'gray' }}> @{username}</Text>
    </Text>
  </View>
));