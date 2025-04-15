import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

// Feature data for the app
const FEATURES: Array<{
  id: string;
  title: string;
  description: string;
  icon: "create-outline" | "people-outline" | "thumbs-up-outline" | "pulse-outline";
  colors: string[];
}> = [
  {
    id: '1',
    title: 'Story Creation',
    description: 'Create new stories and define their theme. Set your creative vision in motion.',
    icon: 'create-outline',
    colors: ['#7B4DFF', '#6200EA'],
  },
  {
    id: '2',
    title: 'Live Collaboration',
    description: 'Join rooms and add your paragraphs in real-time. Watch the story unfold together.',
    icon: 'people-outline',
    colors: ['#26A69A', '#00897B'],
  },
  {
    id: '3',
    title: 'Voting System',
    description: 'Vote on the best contributions. Guide the story in the direction you prefer.',
    icon: 'thumbs-up-outline',
    colors: ['#FF7272', '#E53935'],
  },
  {
    id: '4',
    title: 'Real-Time Updates',
    description: 'See story changes as they happen. Experience true collaborative storytelling.',
    icon: 'pulse-outline',
    colors: ['#FFC947', '#FFA000'],
  },
];

// FAQ data
const FAQ = [
  {
    id: '1',
    question: 'How does StorySync work?',
    answer: 'StorySync is a collaborative storytelling platform where users can create or join stories. Each person contributes paragraphs, and the community votes on which contributions to include in the story. It all happens in real-time, so you can watch the story unfold together.',
  },
  {
    id: '2',
    question: 'Do I need an account to use StorySync?',
    answer: 'While you can browse stories anonymously, you\'ll need an account to create stories, contribute paragraphs, or vote. Sign up is quick and easy using your email address.',
  },
  {
    id: '3',
    question: 'How is the story direction determined?',
    answer: 'The community decides! After submissions are made for a section, users vote on their favorite continuation. The paragraph with the most votes gets added to the story, and the process continues.',
  },
  {
    id: '4',
    question: 'Can I use StorySync offline?',
    answer: 'You can draft paragraphs offline, but to participate in the collaborative aspects of the app, you\'ll need an internet connection to sync your contributions and see others\' work.',
  },
];

export default function AboutScreen() {
  // Ref for expanded FAQ items
  const expandedFaqs = useRef<Record<string, boolean>>({}).current;
  
  // Animation values for each FAQ
  const faqAnimations = FAQ.reduce<Record<string, Animated.Value>>((acc, faq) => {
    acc[faq.id] = useRef(new Animated.Value(0)).current;
    return acc;
  }, {});

  // Animation for app icon
  const iconScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Pulsing animation for the app icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // Handle FAQ item toggle
  const toggleFaq = (id: string) => {
    // If already expanded, collapse
    if (expandedFaqs[id]) {
      Animated.timing(faqAnimations[id], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      expandedFaqs[id] = false;
    } else {
      // If collapsed, expand
      Animated.timing(faqAnimations[id], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      expandedFaqs[id] = true;
    }
  };

  return (
    <View style={styles.container}>
      <Header title="About StorySync" showBackButton />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Hero Section with App Icon & Intro */}
        <LinearGradient
          colors={['#7B4DFF', '#6200EA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <Animated.View 
            style={[
              styles.iconContainer, 
              { transform: [{ scale: iconScale }] }
            ]}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.iconGradient}
            >
              <Ionicons name="book" size={48} color="white" />
            </LinearGradient>
          </Animated.View>
          <Text style={styles.heroTitle}>StorySync</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.tagline}>
            A Real-Time Collaborative Storytelling Platform
          </Text>
          <Text style={styles.heroDescription}>
            StorySync brings together writers, storytellers, and creative minds
            to craft unique tales together. Join forces with others and watch as
            narratives unfold in real-time.
          </Text>
        </LinearGradient>

        {/* Features */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="flash-outline" size={20} color="#6200EA" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Key Features</Text>
          </View>
          
          <View style={styles.featuresList}>
            {FEATURES.map((feature) => (
              <View key={feature.id} style={styles.featureItem}>
                <LinearGradient
                  colors={feature.colors as [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.featureIcon}
                >
                  <Ionicons name={feature.icon} size={24} color="#fff" />
                </LinearGradient>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="help-buoy-outline" size={20} color="#6200EA" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>How It Works</Text>
          </View>
          
          <LinearGradient
            colors={['#FFFFFF', '#F5F7FA']}
            style={styles.stepsContainer}
          >
            <View style={styles.step}>
              <LinearGradient
                colors={['#7B4DFF', '#6200EA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepNumber}
              >
                <Text style={styles.stepNumberText}>1</Text>
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Create or Join</Text>
                <Text style={styles.stepText}>
                  Create a new story or join an existing one with a community of writers
                </Text>
              </View>
            </View>
            
            <View style={styles.stepConnectorContainer}>
              <View style={styles.stepConnector} />
            </View>
            
            <View style={styles.step}>
              <LinearGradient
                colors={['#26A69A', '#00897B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepNumber}
              >
                <Text style={styles.stepNumberText}>2</Text>
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Write Contribution</Text>
                <Text style={styles.stepText}>
                  Add your creative paragraph to continue the narrative journey
                </Text>
              </View>
            </View>
            
            <View style={styles.stepConnectorContainer}>
              <View style={styles.stepConnector} />
            </View>
            
            <View style={styles.step}>
              <LinearGradient
                colors={['#FF7272', '#E53935']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepNumber}
              >
                <Text style={styles.stepNumberText}>3</Text>
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Vote on Submissions</Text>
                <Text style={styles.stepText}>
                  Help choose the direction of the story by voting on your favorite entries
                </Text>
              </View>
            </View>
            
            <View style={styles.stepConnectorContainer}>
              <View style={styles.stepConnector} />
            </View>
            
            <View style={styles.step}>
              <LinearGradient
                colors={['#FFC947', '#FFA000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepNumber}
              >
                <Text style={styles.stepNumberText}>4</Text>
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>See Evolution</Text>
                <Text style={styles.stepText}>
                  Watch as the collaborative story evolves and transforms in real-time
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* FAQ */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color="#6200EA" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          </View>
          
          <View style={styles.faqContainer}>
            {FAQ.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <TouchableOpacity 
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <View style={styles.faqIconContainer}>
                    <Ionicons 
                      name={expandedFaqs[faq.id] ? "chevron-up" : "chevron-down"} 
                      size={18} 
                      color="#6200EA" 
                    />
                  </View>
                </TouchableOpacity>
                
                <Animated.View 
                  style={[
                    styles.faqAnswer,
                    {
                      maxHeight: faqAnimations[faq.id].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                      }),
                      opacity: faqAnimations[faq.id],
                    },
                  ]}
                >
                  <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                </Animated.View>
              </View>
            ))}
          </View>
        </View>

        {/* Get Started */}
        <LinearGradient
          colors={['#7B4DFF', '#6200EA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.getStartedContainer}
        >
          <Text style={styles.getStartedTitle}>Ready to Begin?</Text>
          <Text style={styles.getStartedDescription}>
            Join our creative community and start crafting stories together.
          </Text>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => router.push('/(story)/join')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.getStartedButtonGradient}
            >
              <Text style={styles.getStartedButtonText}>
                Explore Stories
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerIcon}>
            <Ionicons name="pencil" size={16} color="#6200EA" />
          </View>
          <Text style={styles.footerText}>
            Made with <Ionicons name="heart" size={12} color="#FF5252" /> for creative minds
          </Text>
          <Text style={styles.copyright}>
            © 2025 StorySync. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 20,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconGradient: {
    width: 90,
    height: 90,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: width * 0.85,
  },
  sectionContainer: {
    marginTop: 30,
    marginHorizontal: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#333',
  },
  featuresList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepsContainer: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  stepContent: {
    flex: 1,
    marginLeft: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepConnectorContainer: {
    paddingLeft: 18,
    height: 16,
  },
  stepConnector: {
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(98, 0, 234, 0.2)',
  },
  faqContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  faqIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(98, 0, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqAnswer: {
    overflow: 'hidden',
    paddingHorizontal: 18,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    paddingBottom: 18,
  },
  getStartedContainer: {
    marginTop: 30,
    marginHorizontal: 16,
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  getStartedDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  getStartedButton: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  getStartedButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  getStartedButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 16,
  },
  footerIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(98, 0, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});