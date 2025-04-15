import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { 
  FadeIn,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function JoinCreateScreen() {
  // Animation values for card presses
  const createScale = useSharedValue(1);
  const joinScale = useSharedValue(1);
  
  // Handle navigation
  const handleCreateNew = () => {
    createScale.value = withSpring(0.95, {}, () => {
      createScale.value = withSpring(1, {}, () => {
        router.push('/(story)/create');
      });
    });
  };
  
  const handleJoinExisting = () => {
    joinScale.value = withSpring(0.95, {}, () => {
      joinScale.value = withSpring(1, {}, () => {
        router.push('/(story)/join');
      });
    });
  };
  
  // Animated styles for cards
  const createCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: createScale.value }],
    };
  });
  
  const joinCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: joinScale.value }],
    };
  });
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <Animated.View 
        entering={FadeIn.delay(100).springify()}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#6200EA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>StorySync</Text>
      </Animated.View>
      
      <View style={styles.content}>
        {/* Create Story Card */}
        <Animated.View
          entering={SlideInLeft.delay(300).springify()}
          style={[styles.cardContainer, createCardStyle]}
        >
          <TouchableOpacity
            style={[styles.card, styles.createCard]}
            onPress={handleCreateNew}
            activeOpacity={0.9}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="create-outline" size={80} color="white" />
            </View>
            <Text style={styles.cardTitle}>Start a New Story</Text>
            <Text style={styles.cardDescription}>
              Begin your storytelling journey and invite others to join the narrative.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardCTA}>Create</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Join Story Card */}
        <Animated.View
          entering={SlideInRight.delay(400).springify()}
          style={[styles.cardContainer, joinCardStyle]}
        >
          <TouchableOpacity
            style={[styles.card, styles.joinCard]}
            onPress={handleJoinExisting}
            activeOpacity={0.9}
          >
            <View style={[styles.iconContainer, styles.joinIconContainer]}>
              <Ionicons name="people-outline" size={80} color="white" />
            </View>
            <Text style={[styles.cardTitle, styles.joinTitle]}>Join an Adventure</Text>
            <Text style={styles.cardDescription}>
              Contribute to existing stories and collaborate with other writers.
            </Text>
            <View style={[styles.cardFooter, styles.joinFooter]}>
              <Text style={styles.cardCTA}>Browse</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Bottom Decoration */}
      <Animated.View
        entering={FadeIn.delay(500).springify()}
        style={styles.bottomDecoration}
      >
        <Text style={styles.bottomText}>Where creativity meets collaboration</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EA',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  createCard: {
    backgroundColor: '#6200EA',
  },
  joinCard: {
    backgroundColor: '#00BFA5',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  joinIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  joinTitle: {
    color: 'white',
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  joinFooter: {
    justifyContent: 'flex-end',
  },
  cardCTA: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 8,
  },
  bottomDecoration: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  bottomText: {
    fontSize: 16,
    color: '#6200EA',
    fontStyle: 'italic',
    textAlign: 'center',
    opacity: 0.8,
  },
});