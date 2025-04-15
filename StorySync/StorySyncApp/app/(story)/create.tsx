import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function CreateStoryScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [firstParagraph, setFirstParagraph] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [creationMethod, setCreationMethod] = useState('write'); // 'write' or 'upload'
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Genre options with icons
  const genres: { name: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
    { name: 'Fantasy', icon: 'color-wand-outline', color: '#7C4DFF' },
    { name: 'Mystery', icon: 'search-outline', color: '#FF5252' },
    { name: 'Romance', icon: 'heart-outline', color: '#F50057' },
    { name: 'Sci-Fi', icon: 'planet-outline', color: '#00BFA5' },
    { name: 'Horror', icon: 'skull-outline', color: '#455A64' },
    { name: 'Adventure', icon: 'compass-outline', color: '#FF9800' },
    { name: 'Comedy', icon: 'happy-outline', color: '#FFC107' },
    { name: 'Drama', icon: 'ear-outline', color: '#795548' },
  ];

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'],
        copyToCacheDirectory: true
      });
      
      if (result.canceled === false) {
        setUploadedFile(result.assets[0]);
        
        // Simulate file processing with progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.1;
          setUploadProgress(Math.min(progress, 1));
          
          if (progress >= 1) {
            clearInterval(interval);
            
            // After "processing", prefill the form with extracted content
            setTimeout(() => {
              // This would normally be actual content extracted from the file
              setTitle(result.assets[0].name.split('.')[0]);
              setFirstParagraph("Content extracted from your uploaded document would appear here. In a real implementation, we would parse the document and extract the text content to populate this field.");
            }, 500);
          }
        }, 100);
      }
    } catch (error) {
      console.log('Error picking document', error);
    }
  };

  const handleCreateStory = () => {
    // Here you would add logic to send the story data to your backend
    console.log({ title, description, genre, firstParagraph, isPublic, creationMethod, uploadedFile });
    
    // Navigate to the newly created story
    // This would normally use the ID returned from the backend
    const mockStoryId = 'new-story-123';
    router.push(`/(story)/${mockStoryId}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <LinearGradient
        colors={['rgba(98, 0, 234, 0.05)', 'rgba(98, 0, 234, 0.0)']}
        style={styles.gradientBackground}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInUp.delay(100).springify()}
          style={styles.headerContainer}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <LinearGradient
              colors={['#7C4DFF', '#6200EA']}
              style={styles.backButtonGradient}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.header}>Create a New Story</Text>
        </Animated.View>

        {/* Creation Method Toggle */}
        <Animated.View 
          entering={FadeInUp.delay(200).springify()}
          style={styles.creationMethodContainer}
        >
          <View style={styles.methodToggleContainer}>
            <TouchableOpacity
              style={[
                styles.methodToggleButton,
                creationMethod === 'write' && styles.activeMethodToggle,
              ]}
              onPress={() => setCreationMethod('write')}
            >
              <Ionicons 
                name="create-outline" 
                size={20} 
                color={creationMethod === 'write' ? 'white' : '#6200EA'} 
              />
              <Text 
                style={[
                  styles.methodToggleText,
                  creationMethod === 'write' && styles.activeToggleText,
                ]}
              >
                Write
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.methodToggleButton,
                creationMethod === 'upload' && styles.activeMethodToggle,
              ]}
              onPress={() => setCreationMethod('upload')}
            >
              <Ionicons 
                name="cloud-upload-outline" 
                size={20} 
                color={creationMethod === 'upload' ? 'white' : '#6200EA'} 
              />
              <Text 
                style={[
                  styles.methodToggleText,
                  creationMethod === 'upload' && styles.activeToggleText,
                ]}
              >
                Upload
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {creationMethod === 'upload' && (
          <Animated.View 
            entering={FadeInUp.delay(250).springify()}
            style={styles.uploadContainer}
          >
            {!uploadedFile ? (
              <TouchableOpacity 
                style={styles.uploadBox}
                onPress={pickDocument}
              >
                <Ionicons name="cloud-upload-outline" size={48} color="#6200EA" />
                <Text style={styles.uploadText}>Upload a document</Text>
                <Text style={styles.uploadSubtext}>
                  Supported formats: .txt, .docx, .pdf
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.filePreviewContainer}>
                <View style={styles.fileIconContainer}>
                  <Ionicons 
                    name={
                      uploadedFile.name.endsWith('.pdf') ? 'document-text' : 
                      uploadedFile.name.endsWith('.docx') ? 'document' : 
                      'text'
                    } 
                    size={32} 
                    color="#6200EA" 
                  />
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {uploadedFile.name}
                  </Text>
                  <Text style={styles.fileSize}>
                    {((uploadedFile.size ?? 0) / 1024).toFixed(1)} KB
                  </Text>
                  
                  {uploadProgress < 1 ? (
                    <View style={styles.progressBarContainer}>
                      <View 
                        style={[
                          styles.progressBarFill, 
                          { width: `${uploadProgress * 100}%` }
                        ]} 
                      />
                    </View>
                  ) : (
                    <Text style={styles.processedText}>
                      Processed successfully
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    setUploadedFile(null);
                    setUploadProgress(0);
                  }}
                >
                  <Ionicons name="close-circle" size={24} color="#FF5252" />
                </TouchableOpacity>
              </View>
            )}
          </Animated.View>
        )}

        <Animated.View 
          entering={FadeInUp.delay(300).springify()}
          style={styles.inputContainer}
        >
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Give your story a captivating title..."
            placeholderTextColor="#9E9E9E"
            maxLength={50}
          />
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          style={styles.inputContainer}
        >
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Set the stage for your story..."
            placeholderTextColor="#9E9E9E"
            multiline
            maxLength={200}
          />
          <Text style={styles.charCount}>
            {description.length}/200
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(500).springify()}
          style={styles.inputContainer}
        >
          <Text style={styles.label}>Genre</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genreContainer}
          >
            {genres.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.genreButton,
                  genre === item.name && [styles.selectedGenre, {backgroundColor: item.color}],
                ]}
                onPress={() => setGenre(item.name)}
              >
                <Ionicons 
                  name={item.icon} 
                  size={18} 
                  color={genre === item.name ? 'white' : item.color} 
                />
                <Text 
                  style={[
                    styles.genreText,
                    {color: item.color},
                    genre === item.name && styles.selectedGenreText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(600).springify()}
          style={styles.inputContainer}
        >
          <Text style={styles.label}>
            {creationMethod === 'upload' ? 'Story Content' : 'First Paragraph'}
          </Text>
          <TextInput
            style={[styles.input, styles.firstParagraph]}
            value={firstParagraph}
            onChangeText={setFirstParagraph}
            placeholder={creationMethod === 'upload' 
              ? "Your uploaded content will appear here..."
              : "Once upon a time..."}
            placeholderTextColor="#9E9E9E"
            multiline
            maxLength={500}
          />
          <Text style={styles.charCount}>
            {firstParagraph.length}/500
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(700).springify()}
          style={styles.visibilityContainer}
        >
          <Text style={styles.label}>Story Visibility</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                isPublic && styles.activeToggle,
              ]}
              onPress={() => setIsPublic(true)}
            >
              <Ionicons 
                name="globe-outline" 
                size={20} 
                color={isPublic ? 'white' : '#6200EA'} 
              />
              <Text 
                style={[
                  styles.toggleText,
                  isPublic && styles.activeToggleText,
                ]}
              >
                Public
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.toggleButton,
                !isPublic && styles.activeToggle,
              ]}
              onPress={() => setIsPublic(false)}
            >
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={!isPublic ? 'white' : '#6200EA'} 
              />
              <Text 
                style={[
                  styles.toggleText,
                  !isPublic && styles.activeToggleText,
                ]}
              >
                Private
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.visibilityHint}>
            {isPublic 
              ? "Anyone can discover and contribute to public stories" 
              : "Only people you invite can see and contribute to private stories"}
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(100).springify()}
          style={styles.createButtonContainer}
        >
          <TouchableOpacity
            style={[
              styles.createButton,
              (!title.trim() || !firstParagraph.trim()) && styles.disabledButton
            ]}
            onPress={handleCreateStory}
            disabled={!title.trim() || !firstParagraph.trim()}
          >
            <LinearGradient
              colors={['#7C4DFF', '#6200EA']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>Begin Your Story</Text>
              <Ionicons name="create" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  backButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  backButtonGradient: {
    padding: 10,
    borderRadius: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  creationMethodContainer: {
    marginBottom: 24,
  },
  methodToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  methodToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
  },
  activeMethodToggle: {
    backgroundColor: '#6200EA',
  },
  methodToggleText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#6200EA',
    fontSize: 16,
  },
  uploadContainer: {
    marginBottom: 24,
  },
  uploadBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6200EA',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 6,
    textAlign: 'center',
  },
  filePreviewContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  fileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#EDE7F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6200EA',
  },
  processedText: {
    fontSize: 14,
    color: '#00BFA5',
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#212121',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'right',
    marginTop: 8,
  },
  firstParagraph: {
    height: 180,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    lineHeight: 24,
  },
  genreContainer: {
    paddingVertical: 8,
  },
  genreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedGenre: {
    backgroundColor: '#6200EA',
  },
  genreText: {
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedGenreText: {
    color: 'white',
  },
  visibilityContainer: {
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flex: 1,
  },
  activeToggle: {
    backgroundColor: '#6200EA',
  },
  toggleText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#6200EA',
    fontSize: 15,
  },
  activeToggleText: {
    color: 'white',
  },
  visibilityHint: {
    fontSize: 14,
    color: '#757575',
    fontStyle: 'italic',
  },
  createButtonContainer: {
    marginTop: 16,
    marginBottom: 30,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8,
  },
});