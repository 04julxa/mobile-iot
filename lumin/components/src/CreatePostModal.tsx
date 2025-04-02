import React, { useState, useCallback } from 'react';
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

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (postText: string) => void;
  userImage?: string;
  post?: any; 
  isBookmarked?: boolean; 
  onBookmarkPress?: () => void; 

}

const CreatePostModal: React.FC<CreatePostModalProps> = React.memo(({ 
  visible, 
  onClose, 
  onSubmit,
  userImage = require('../../assets/images/abihobbs.jpeg')
}) => {
  const [postText, setPostText] = useState('');

  const handleSubmit = useCallback(() => {
    onSubmit(postText);
    setPostText('');
    onClose();
  }, [postText, onSubmit, onClose]);

  const handleTextChange = useCallback((text: string) => {
    setPostText(text);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onClose}
            accessibilityLabel="Fechar modal"
          >
            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>Criar publicação</Text>
          
          <TouchableOpacity 
            style={[styles.postButton, !postText.trim() && styles.disabledButton]}
            disabled={!postText.trim()}
            onPress={handleSubmit}
            accessibilityLabel="Publicar post"
          >
            <Text style={styles.postButtonText}>
              Publicar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <ScrollView 
          style={styles.modalContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.userArea}>
            <Image 
              source={userImage}
              style={styles.userIcon}
              accessibilityIgnoresInvertColors
            />

            <TextInput
              style={styles.postInput}
              multiline
              placeholder="No que você está pensando?"
              placeholderTextColor="#777"
              value={postText}
              onChangeText={handleTextChange}
              autoFocus
              textAlignVertical="top"
              maxLength={500}
              accessibilityLabel="Campo de texto para publicação"
            />
          </View>
        </ScrollView>

        <View style={styles.mediaOptions}>
          <View style={styles.mediaButtons}>
            {MEDIA_OPTIONS.map((option) => (
              <MediaButton
                key={option.iconName}
                iconName={option.iconName}
                iconType={option.iconType}
                onPress={option.onPress}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
});

const MediaButton = React.memo(({ iconName, iconType, onPress }: {
  iconName: string;
  iconType: string;
  onPress: () => void;
}) => (
  <TouchableOpacity 
    style={styles.mediaButton}
    onPress={onPress}
    accessibilityLabel={`Adicionar ${iconName}`}
  >
    <Icon 
      name={iconName} 
      type={iconType} 
      color="#4B7CCC" 
      size={24} 
    />
  </TouchableOpacity>
));

const MEDIA_OPTIONS = [
  {
    iconName: 'image',
    iconType: 'material-community',
    onPress: () => console.log('Adicionar imagem')
  },
  {
    iconName: 'file-gif-box',
    iconType: 'material-community',
    onPress: () => console.log('Adicionar GIF')
  },
  {
    iconName: 'emoji-emotions',
    iconType: 'material',
    onPress: () => console.log('Adicionar emoji')
  },
  {
    iconName: 'place',
    iconType: 'material',
    onPress: () => console.log('Adicionar localização')
  }
];

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
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  disabledButton: {
    opacity: 0.5,
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
    alignItems: 'flex-start',
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
    lineHeight: 24,
  },
  mediaOptions: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mediaButton: {
    padding: 10,
  },
});

export default CreatePostModal;