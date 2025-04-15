import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { 
  FadeIn, 
  SlideInUp, 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface FeaturedStory {
  id: string;
  title: string;
  genre: string;
  participants: number;
  paragraphs: number;
  coverColor: [string, string, ...string[]];
  icon: 'treasure-chest' | 'ghost' | 'rocket' | 'magic-staff';
}

// Mock data for featured stories
const FEATURED_STORIES: FeaturedStory[] = [
   {
    id: 'story-1',
    title: 'The Lost City of Atlantis',
    genre: 'Adventure',
    participants: 8,
    paragraphs: 24,
    coverColor: ['#7F00FF', '#5E35B1'],
    icon: 'treasure-chest',
  },
  {
    id: 'story-2',
    title: 'Whispers in the Wind',
    genre: 'Mystery',
    participants: 5,
    paragraphs: 15,
    coverColor: ['#00BFA5', '#00897B'],
    icon: 'ghost',
  },
  {
    id: 'story-3',
    title: 'Starlight Chronicles',
    genre: 'Sci-Fi',
    participants: 12,
    paragraphs: 36,
    coverColor: ['#FF4081', '#D81B60'],
    icon: 'rocket',
  },
  {
    id: 'story-4',
    title: 'Echoes of Tomorrow',
    genre: 'Fantasy',
    participants: 7,
    paragraphs: 19,
    coverColor: ['#8BC34A', '#7CB342'],
    icon: 'magic-staff',
  },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function JoinStoryScreen() {
  const [storyCode, setStoryCode] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);
  const inputRef = useRef(null);
  const buttonScale = useSharedValue(1);

  const handleJoinWithCode = () => {
    if (storyCode.trim()) {
      console.log('Joining story with code:', storyCode);
      router.push(`/(story)/${storyCode}`);
    }
  };

  interface FeaturedStory {
    id: string;
    title: string;
    genre: string;
    participants: number;
    paragraphs: number;
    coverColor: readonly [string, string, ...string[]];
    icon: 'treasure-chest' | 'ghost' | 'rocket' | 'magic-staff';
  }

  const handleJoinFeatured = (storyId: FeaturedStory['id']): void => {
    console.log('Joining featured story:', storyId);
    router.push(`/(story)/${storyId}`);
  };

  const handleCreateNew = () => {
    router.push('/(story)/create');
  };

  const onPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const renderStoryItem = ({ item, index }: { item: FeaturedStory; index: number }) => (
    <Animated.View 
      entering={FadeIn.delay(200 + index * 100).springify()}
      style={styles.storyCardWrapper}
    >
      <TouchableOpacity
        style={styles.storyCard}
        onPress={() => handleJoinFeatured(item.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={item.coverColor}
          style={styles.storyCover}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name={item.icon} size={28} color="white" />
        </LinearGradient>
        
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.genreContainer}>
            <Text style={styles.storyGenre}>{item.genre}</Text>
          </View>
          <View style={styles.storyStats}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={14} color="#8E8E93" />
              <Text style={styles.statText}>{item.participants}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="document-text-outline" size={14} color="#8E8E93" />
              <Text style={styles.statText}>{item.paragraphs}</Text>
            </View>
          </View>
        </View>

        <View style={styles.joinArrowContainer}>
          <Ionicons name="arrow-forward" size={20} color="#6200EA" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
        
        <Animated.View 
          entering={SlideInUp.delay(100).springify()}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#6200EA" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Join a Story</Text>
        </Animated.View>

        <Animated.View 
          entering={SlideInUp.delay(200).springify()}
          style={styles.joinCodeSection}
        >
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="link-outline" size={18} color="#6200EA" />
            <Text style={styles.sectionTitle}>Have a Story Code?</Text>
          </View>
          
          <View style={[
            styles.codeInputContainer,
            focusedInput && styles.codeInputContainerFocused
          ]}>
            <TextInput
              ref={inputRef}
              style={styles.codeInput}
              value={storyCode}
              onChangeText={setStoryCode}
              placeholder="Enter your 6-digit story code"
              placeholderTextColor="#9E9E9E"
              autoCapitalize="none"
              onFocus={() => setFocusedInput(true)}
              onBlur={() => setFocusedInput(false)}
              maxLength={6}
            />
            <TouchableOpacity
              style={[
                styles.joinButton,
                !storyCode.trim() && styles.disabledButton,
              ]}
              onPress={handleJoinWithCode}
              disabled={!storyCode.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.codeHint}>
            Every story has a unique 6-digit code you can use to join
          </Text>
        </Animated.View>

        <View style={styles.divider} />

        <Animated.View 
          entering={SlideInUp.delay(300).springify()}
          style={styles.featuredSection}
        >
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="sparkles-outline" size={18} color="#6200EA" />
            <Text style={styles.sectionTitle}>Featured Stories</Text>
          </View>
          
          <FlatList
            data={FEATURED_STORIES}
            renderItem={renderStoryItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.storiesList}
          />
        </Animated.View>

        <BlurView 
          intensity={80} 
          tint="light" 
          style={styles.createButtonBlur}
        >
          <Animated.View 
            entering={SlideInUp.delay(400).springify()}
            style={[styles.createNewContainer, buttonAnimatedStyle]}
          >
            <TouchableOpacity
              style={styles.createNewButton}
              onPress={handleCreateNew}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              activeOpacity={0.9}
            >
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={styles.createNewText}>Create New Story</Text>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  backButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(98, 0, 234, 0.08)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EA',
    marginLeft: 16,
    letterSpacing: -0.5,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  joinCodeSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    marginLeft: 8,
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  codeInputContainerFocused: {
    borderColor: '#6200EA',
    shadowColor: '#6200EA',
    shadowOpacity: 0.15,
  },
  codeInput: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    paddingVertical: 14,
  },
  joinButton: {
    backgroundColor: '#6200EA',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  codeHint: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 10,
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
    marginBottom: 28,
  },
  featuredSection: {
    flex: 1,
  },
  storiesList: {
    paddingBottom: 100,
  },
  storyCardWrapper: {
    marginBottom: 16,
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  storyCover: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 6,
  },
  genreContainer: {
    backgroundColor: 'rgba(98, 0, 234, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  storyGenre: {
    fontSize: 12,
    color: '#6200EA',
    fontWeight: '500',
  },
  storyStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
    fontWeight: '500',
  },
  joinArrowContainer: {
    backgroundColor: 'rgba(98, 0, 234, 0.08)',
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  createNewContainer: {
    width: '100%',
  },
  createNewButton: {
    backgroundColor: '#6200EA',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  createNewText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});