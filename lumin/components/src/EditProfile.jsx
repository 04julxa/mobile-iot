import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import api from "./services/api";
import { Icon } from 'react-native-elements';

const HEADER_HEIGHT = 120;
const PROFILE_IMAGE_SIZE = 80;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
      formData: {
        name: '',
        username: '',
        bio: '',
        avatar: null,
        headerImage: null,
      },
      tempAvatar: null,
      tempHeader: null,
      isSaving: false,
    };
  }

  async componentDidMount() {
    await this.fetchUserData();
  }

  fetchUserData = async () => {
    try {
      this.setState({ loading: true, error: null });
    
      const userId = this.props.user._id; 
      const response = await api.get(`/user/${userId}`);
      const userData = response.data?.data;
  
      // Converter os Buffers para URIs utilizáveis
      const avatarUri = userData.avatar?.data 
        ? `data:${userData.avatar.contentType};base64,${Buffer.from(userData.avatar.data).toString('base64')}`
        : null;
      
      const headerUri = userData.header?.data 
        ? `data:${userData.header.contentType};base64,${Buffer.from(userData.header.data).toString('base64')}`
        : null;
  
      this.setState({
        user: userData,
        formData: {
          name: userData.name || '',
          username: userData.username || '',
          bio: userData.bio || '',
          avatar: avatarUri,
          headerImage: headerUri,
        },
        loading: false
      });
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      this.setState({
        error: error.message || "Erro ao carregar perfil",
        loading: false,
      });
    }
  };

  handleChange = (field, value) => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [field]: value
      }
    }));
  };

  pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'avatar' ? [1, 1] : [3, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      if (type === 'avatar') {
        this.setState({
          tempAvatar: imageUri,
          formData: { ...this.state.formData, avatar: imageUri }
        });
      } else {
        this.setState({
          tempHeader: imageUri,
          formData: { ...this.state.formData, headerImage: imageUri }
        });
      }
    }
  };

  handleSave = async () => {
    try {
      this.setState({ isSaving: true });
  
      const userId = this.props.user?._id;
      const formData = new FormData();
  
      formData.append('name', this.state.formData.name);
      formData.append('username', this.state.formData.username);
      formData.append('bio', this.state.formData.bio);
  
      if (this.state.tempAvatar) {
        const response = await fetch(this.state.tempAvatar);
        const blob = await response.blob();
  
        formData.append('avatar', {
          uri: this.state.tempAvatar,
          type: blob.type || 'image/jpeg',
          name: 'avatar.jpg',
        });
      }
      
      console.log("FormData enviado: ", formData);

      const response = await api.put(`/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      this.setState({
        user: response.data.data,
        isSaving: false,
        tempAvatar: null,
      });
  
      if (this.props.onClose) this.props.onClose();
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      this.setState({
        error: error.response?.data?.message || "Erro ao salvar perfil",
        isSaving: false,
      });
    }
  };
  
  render() {
    const { loading, formData, isSaving, error } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.backButton} onPress={this.props.onClose}>
            <Icon name="arrow-back" type="material" color="#4B7CCC" size={24} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Editar perfil</Text>
          <TouchableOpacity
            disabled={isSaving}
            onPress={this.handleSave}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.header} 
          onPress={() => this.pickImage('header')}
        >
          {formData.headerImage ? (
            <Image
              source={{ uri: formData.headerImage }}
              style={styles.headerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.defaultHeader}>
              <Text style={styles.changePhotoText}>Toque para adicionar foto de capa</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.profileImageContainer,
            {
              backgroundColor: formData.avatar ? "#222325" : "#007AFF",
            },
          ]}
          onPress={() => this.pickImage('avatar')}
        >
          {formData.avatar ? (
            <Image
              source={{ uri: formData.avatar }}
              style={styles.profileImage}
              resizeMode="cover"
            />
          ) : null}
          <Text style={styles.changePhotoText}>Alterar</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => this.handleChange('name', text)}
              placeholder="Seu nome"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome de usuário</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => this.handleChange('username', text)}
              placeholder="@username"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={formData.bio}
              onChangeText={(text) => {
                if (text.length <= 160) this.handleChange('bio', text);
              }}
              placeholder=" "
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              maxLength={160}
            />
            <Text style={{ color: '#999', fontSize: 12, textAlign: 'right' }}>
              {formData.bio.length}/160
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222325'
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
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#007AFF',
    marginBottom: PROFILE_IMAGE_SIZE / 2,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  defaultHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  profileImageContainer: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    borderColor: '#222325',
    borderWidth: 3,
    overflow: 'hidden',
    marginLeft: 20,
    position: 'absolute',
    top: 140,
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  defaultIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: PROFILE_IMAGE_SIZE / 2,
  },
  changePhotoText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 2,
    width: '100%',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
    color: 'white',
    padding: 12,
    fontSize: 16,
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default EditProfile;
