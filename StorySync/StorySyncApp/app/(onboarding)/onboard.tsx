import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Onboarding data with added image paths
const ONBOARDING_DATA: Array<{
  id: string;
  title: string;
  description: string;
  icon: 'book-outline' | 'create-outline' | 'people-outline' | 'rocket-outline';
  gradientColors: string[];
}> = [
  {
    id: '1',
    title: 'Welcome to StorySync',
    description: 'A real-time collaborative storytelling platform where your creativity meets others.',
    icon: 'book-outline',
    gradientColors: ['#6A11CB', '#8E54E9'],
  },
  {
    id: '2',
    title: 'Co-Create Stories',
    description: 'Join forces with writers around the world to craft unique stories, paragraph by paragraph.',
    icon: 'create-outline',
    gradientColors: ['#00B4DB', '#0083B0'],
  },
  {
    id: '3',
    title: 'Vote & Collaborate',
    description: 'Vote on the best contributions and watch as the narrative unfolds in real-time.',
    icon: 'people-outline',
    gradientColors: ['#F857A6', '#FF5858'],
  },
  {
    id: '4',
    title: 'Ready to Begin?',
    description: 'Start your creative journey and connect with fellow storytellers today.',
    icon: 'rocket-outline',
    gradientColors: ['#4776E6', '#2575FC'],
  },
];

// Linear gradient component for background and buttons
const LinearGradient = ({ colors, style, children }: { colors: string[], style?: any, children?: React.ReactNode }) => {
  // This is a simplified version - in your real app, use expo-linear-gradient
  return (
    <View style={[{ backgroundColor: colors[0] }, style]}>
      {children}
    </View>
  );
};

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Animation values
  const inputRange = ONBOARDING_DATA.map((_, i) => i * width);
  
  // Handle user skipping onboarding
  const handleSkip = () => {
    router.replace('/(auth)/sign-in');
  };

  // Handle moving to next screen
  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // On last screen, go to auth
      router.replace('/(auth)/sign-in');
    }
  };

  // Handle flatlist scroll
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Handle when scroll ends to update current index
  interface MomentumScrollEndEvent {
    nativeEvent: {
      contentOffset: {
        x: number;
      };
    };
  }

  const handleMomentumScrollEnd = (event: MomentumScrollEndEvent) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  // Animation for background color
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: ONBOARDING_DATA.map(item => item.gradientColors[1]),
  });

  // Render onboarding item
  const renderItem = ({ item, index }: { 
    item: { 
      id: string; 
      title: string; 
      description: string; 
      icon: 'book-outline' | 'create-outline' | 'people-outline' | 'rocket-outline';
      gradientColors: string[];
    }; 
    index: number 
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1, 0],
      extrapolate: 'clamp'
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [50, 0, 50],
      extrapolate: 'clamp'
    });

    return (
      <View style={[styles.slide, { width }]}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity,
              transform: [{ translateY }]
            }
          ]}
        >
          <LinearGradient 
            colors={item.gradientColors} 
            style={styles.iconContainer}
          >
            <Ionicons name={item.icon} size={60} color="white" />
          </LinearGradient>
          
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Onboarding slides */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{ paddingTop: insets.top + 40 }}
      />

      {/* Skip button (except on last screen) */}
      {currentIndex < ONBOARDING_DATA.length - 1 && (
        <TouchableOpacity 
          style={[styles.skipButton, { top: insets.top + 20 }]} 
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Bottom controls */}
      <View style={[styles.controlsContainer, { paddingBottom: insets.bottom + 20 }]}>
        {/* Pagination indicators */}
        <View style={styles.paginationContainer}>
          {ONBOARDING_DATA.map((_, index) => {
            const dotWidth = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ],
              outputRange: [8, 24, 8],
              extrapolate: 'clamp',
            });
            
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width
              ],
              outputRange: [0.4, 1, 0.4],
              extrapolate: 'clamp',
            });
            
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  { 
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <LinearGradient 
            colors={ONBOARDING_DATA[currentIndex].gradientColors} 
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Ionicons 
              name={currentIndex === ONBOARDING_DATA.length - 1 ? 'rocket' : 'arrow-forward'} 
              size={20} 
              color="white" 
              style={styles.buttonIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backdropFilter: 'blur(10px)',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 28,
    marginBottom: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});