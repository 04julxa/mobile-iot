import React, { useState } from 'react';
import { 
  View, 
  Modal, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';

const CreatePostModal = ({ visible, onClose, onSubmit }) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = () => {
    onSubmit(postText);
    setPostText('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onClose}
          >
            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Criar publicação</Text>
          <TouchableOpacity 
            style={styles.postButton}
            disabled={!postText.trim()}
            onPress={handleSubmit}
          >
            <Text style={styles.postButtonText}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Corpo do post */}
        <ScrollView style={styles.modalContent}>
          {/* Área do usuário */}
          <View style={styles.userArea}>
            <Image 
              source={require('../../assets/images/abihobbs.jpeg')}
              style={styles.userIcon}
            />

            <TextInput
              style={styles.postInput}
              multiline
              placeholder="No que você está pensando?"
              placeholderTextColor="#777"
              value={postText}
              onChangeText={setPostText}
              autoFocus
            />
          </View>
        </ScrollView>

        <View style={styles.mediaOptions}>
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton}>
              <Icon name="image" type="material-community" color="#4B7CCC" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Icon name="file-gif-box" type="material-community" color="#4B7CCC" size={28} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Icon name="emoji-emotions" type="material" color="#4B7CCC" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mediaButton}>
              <Icon name="place" type="material" color="#4B7CCC" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#1e1f21',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  modalTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  postButton: {
    backgroundColor: "#4B7CCC",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 15,
  },
  userArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInput: {
    color: 'white',
    fontSize: 18,
    maxHeight: 200,
    padding: 0,
    marginBottom: 0,
    flex: 1,
  },
  mediaOptions: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  mediaOptionsTitle: {
    color: '#777',
    marginBottom: 10,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  mediaButton: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
});

export default CreatePostModal;