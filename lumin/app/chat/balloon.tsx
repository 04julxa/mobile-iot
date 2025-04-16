import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bubbleWrapper: {
    flexDirection: 'column',
    marginTop: 10,
  },
  bubbleWrapperSent: {
    alignItems: 'flex-end',
    marginLeft: 40,
  },
  bubbleWrapperReceived: {
    alignItems: 'flex-start',
    marginRight: 40,
  },
  balloon: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  balloonSent: {
    backgroundColor: '#4B7CCC', 
  },
  balloonReceived: {
    backgroundColor: '#2A2B2E', 
  },
  balloonText: {
    fontSize: 18,
    color: '#FFFFFF', 
  },
});

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
}

interface BalloonProps {
  message: Message;
  currentUser: string;
}

const Balloon = ({ message, currentUser }: BalloonProps) => {
  if (!message || !message.text) {
    return null;
  }

  const sent = currentUser === message.senderId;
  const balloonStyle = sent ? styles.balloonSent : styles.balloonReceived;
  const bubbleWrapper = sent
    ? styles.bubbleWrapperSent
    : styles.bubbleWrapperReceived;

  return (
    <View style={{ marginBottom: '2%' }}>
      <View style={[styles.bubbleWrapper, bubbleWrapper]}>
        <View style={[styles.balloon, balloonStyle]}>
          <Text style={styles.balloonText}>{message.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default Balloon;