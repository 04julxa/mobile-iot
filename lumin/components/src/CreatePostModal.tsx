import React, { useState, useCallback, useMemo } from 'react';
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
import { PermissionsAndroid, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (postText: string, selectedImage: any) => void;
  userImage?: string | null;
  post?: any;
  isBookmarked?: boolean;
  onBookmarkPress?: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = React.memo(({
  visible,
  onClose,
  onSubmit,
  userImage,
}) => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null); 

  const handleSubmit = useCallback(() => {
    onSubmit(postText, selectedImage);
    setPostText('');
    setSelectedImage(null);
    onClose();
  }, [postText, selectedImage, onSubmit, onClose]);

  const handleTextChange = useCallback((text: string) => {
    setPostText(text);
  }, []);
  
  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Permissão negada para acessar a galeria!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const selected = result.assets[0];
      console.log('Imagem selecionada:', selected.uri);
      setSelectedImage(selected);
    }
  };

  const MEDIA_OPTIONS = useMemo(() => [
    {
      iconName: 'image',
      iconType: 'material-community',
      onPress: pickImageFromGallery
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
  ], []);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Criar publicação</Text>
          <TouchableOpacity
            style={[styles.postButton, !postText.trim() && !selectedImage && styles.disabledButton]}
            disabled={!postText.trim() && !selectedImage}
            onPress={handleSubmit}
          >
            <Text style={styles.postButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} keyboardShouldPersistTaps="handled">
          <View style={styles.userArea}>
            {userImage ? (
              <Image
                source={typeof userImage === 'string' ? { uri: userImage } : userImage}
                style={styles.userIcon}
              />
            ) : (
              <View style={styles.placeholderIcon} />
            )}

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
            />
          </View>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage.uri }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 10,
                marginTop: 10
              }}
              resizeMode="cover"
            />
          )}
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
  <TouchableOpacity style={styles.mediaButton} onPress={onPress}>
    <Icon name={iconName} type={iconType} color="#4B7CCC" size={24} />
  </TouchableOpacity>
));

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
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4B7CCC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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
    marginTop: 6,
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
