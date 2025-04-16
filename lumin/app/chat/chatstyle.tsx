import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222325', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#222325',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)', 
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  scrollViewContainer: {
    flex: 1,
    padding: 10,
  },
  messageTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#222325',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)', 
  },
  messageTextInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 17,
    color: '#FFFFFF', 
    backgroundColor: '#2A2B2E', 
    borderRadius: 20,
    borderWidth: 0,
  },
  sendButton: {
    backgroundColor: '#4B7CCC', 
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)', 
    fontSize: 16,
  },

  
});



export default styles;