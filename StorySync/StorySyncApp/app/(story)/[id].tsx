import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated as RNAnimated,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { 
  FadeIn, 
  FadeOut, 
  SlideInUp, 
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Mock data for a story
const MOCK_STORY = {
  id: 'story-123',
  title: 'The Mystery of Whispering Woods',
  genre: 'Mystery',
  participants: 8,
  paragraphs: [
    {
      id: 'p1',
      author: 'Jane Smith',
      content: 'The old cabin stood at the edge of Whispering Woods, its windows dark and shutters creaking in the gentle breeze. It had been abandoned for decades, or so the locals claimed, but tonight a faint light glimmered behind the dusty glass.',
      timestamp: '2025-04-09T20:30:00Z',
      votes: 12
    },
    {
      id: 'p2',
      author: 'Alex Johnson',
      content: 'Detective Morgan pulled her car to a stop, gravel crunching beneath the tires. The report had been strange—unexplained noises, glimpses of movement through the trees, and now this light. She\'d dismissed it as teenage pranks or wild animal activity, but something about this place made the hair on the back of her neck stand up.',
      timestamp: '2025-04-09T20:45:00Z',
      votes: 8
    },
    {
      id: 'p3',
      author: 'Sam Reynolds',
      content: 'As she approached the cabin, notebook in one hand and flashlight in the other, the wind suddenly died down. The woods fell silent—no chirping crickets, no rustling leaves, nothing. Just an unnatural stillness that seemed to press against her eardrums.',
      timestamp: '2025-04-09T21:05:00Z',
      votes: 15
    },
  ],
  currentPhase: 'voting', // 'writing' or 'voting'
  contributions: [
    {
      id: 'c1',
      author: 'Taylor Lee',
      content: 'She reached for the door handle, its brass surface cold against her fingertips. Before she could turn it, she heard a soft whisper from inside—not words exactly, but something between a sigh and a name. Her name. "Morgan," the house seemed to breathe.',
      timestamp: '2025-04-10T08:15:00Z',
      votes: 3
    },
    {
      id: 'c2',
      author: 'Jordan Blake',
      content: 'Morgan froze, her training momentarily forgotten as goosebumps raced up her arms. No one in town knew she was coming here tonight. She hadn\'t even told her partner. And yet, something inside knew her. Drawing her service weapon, she took a deep breath and pushed the door open.',
      timestamp: '2025-04-10T08:20:00Z',
      votes: 5
    },
    {
      id: 'c3',
      author: 'Riley Kim',
      content: 'The door swung open with surprising ease, revealing not the dusty, abandoned interior she expected, but a room that looked recently lived in. A teacup sat on a small table, still steaming. Fresh flowers stood in a vase. And on the wall, dozens of photographs—all of her, taken over years, some from when she was just a child.',
      timestamp: '2025-04-10T08:25:00Z',
      votes: 7
    },
  ]
};

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [story, setStory] = useState(MOCK_STORY);
  const [newParagraph, setNewParagraph] = useState('');
  const [showPhaseMessage, setShowPhaseMessage] = useState(false);
  const [userVoted, setUserVoted] = useState<string | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const phaseMessageOpacity = useRef(new RNAnimated.Value(0)).current;
  
  // Animated values for the floating action button
  const fabScale = useSharedValue(1);
  const fabOpacity = useSharedValue(1);
  
  useEffect(() => {
    // Show phase message briefly when screen loads
    setShowPhaseMessage(true);
    RNAnimated.timing(phaseMessageOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        RNAnimated.timing(phaseMessageOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowPhaseMessage(false);
        });
      }, 3000);
    });
    
    // Listen for keyboard to hide FAB when keyboard is open
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      fabOpacity.value = withTiming(0);
      fabScale.value = withTiming(0);
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      fabOpacity.value = withTiming(1);
      fabScale.value = withSpring(1);
    });
    
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  
  const handleContribute = () => {
    if (story.currentPhase === 'writing') {
      // In writing phase, submit the paragraph
      if (newParagraph.trim()) {
        // Here you would send to backend
        console.log('Submitted paragraph:', newParagraph);
        setNewParagraph('');
        
        // Mock the phase change for demo purposes
        const updatedStory = {...story, currentPhase: 'voting'};
        setStory(updatedStory);
        setShowPhaseMessage(true);
        
        // Show phase change message
        RNAnimated.timing(phaseMessageOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            RNAnimated.timing(phaseMessageOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setShowPhaseMessage(false);
            });
          }, 3000);
        });
      }
    }
  };
  
  const handleVote = (contributionId: string) => {
    if (userVoted && userVoted !== contributionId) {
      // Remove previous vote and add new one
      const updatedContributions = story.contributions.map(c => {
        if (c.id === userVoted) {
          return {...c, votes: c.votes - 1};
        }
        if (c.id === contributionId) {
          return {...c, votes: c.votes + 1};
        }
        return c;
      });
      
      setStory({...story, contributions: updatedContributions});
      setUserVoted(contributionId);
    } else if (!userVoted) {
      // Add new vote
      const updatedContributions = story.contributions.map(c => {
        if (c.id === contributionId) {
          return {...c, votes: c.votes + 1};
        }
        return c;
      });
      
      setStory({...story, contributions: updatedContributions});
      setUserVoted(contributionId);
    } else {
      // Remove vote if clicking same contribution
      const updatedContributions = story.contributions.map(c => {
        if (c.id === contributionId) {
          return {...c, votes: c.votes - 1};
        }
        return c;
      });
      
      setStory({...story, contributions: updatedContributions});
      setUserVoted(null);
    }
  };
  
  const handleAddParagraph = () => {
    setIsWriting(true);
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };
  
  const handleCloseWriting = () => {
    setIsWriting(false);
    setNewParagraph('');
  };
  
  // Animated style for FAB
  const fabAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: fabScale.value }],
      opacity: fabOpacity.value,
    };
  });
  
  // Sort contributions by votes
  const sortedContributions = [...story.contributions].sort((a, b) => b.votes - a.votes);
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#6200EA" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {story.title}
            </Text>
            <View style={styles.headerStats}>
              <View style={styles.statItem}>
                <Ionicons name="people-outline" size={16} color="#666" />
                <Text style={styles.statText}>{story.participants} writers</Text>
              </View>
              <View style={styles.genreBadge}>
                <Text style={styles.genreText}>{story.genre}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Phase Message */}
        {showPhaseMessage && (
          <RNAnimated.View 
            style={[
              styles.phaseMessage, 
              { 
                opacity: phaseMessageOpacity, 
                backgroundColor: story.currentPhase === 'writing' ? '#00BFA5' : '#FFA000' 
              }
            ]}
          >
            <Ionicons 
              name={story.currentPhase === 'writing' ? 'create' : 'checkmark-circle-outline'} 
              size={20} 
              color="white" 
            />
            <Text style={styles.phaseMessageText}>
              {story.currentPhase === 'writing' 
                ? "Writing Phase: Add your paragraph!" 
                : "Voting Phase: Choose the best continuation!"}
            </Text>
          </RNAnimated.View>
        )}

        {/* Story Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.storyContainer}
          contentContainerStyle={styles.storyContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Story paragraphs */}
          {story.paragraphs.map((paragraph, index) => (
            <Animated.View 
              key={paragraph.id}
              entering={FadeIn.delay(index * 100).springify()}
              style={styles.paragraphCard}
            >
              <Text style={styles.paragraphText}>
                {paragraph.content}
              </Text>
              <View style={styles.paragraphFooter}>
                <Text style={styles.authorText}>
                  {paragraph.author}
                </Text>
              </View>
            </Animated.View>
          ))}

          {/* Voting section */}
          {story.currentPhase === 'voting' && !isWriting && (
            <Animated.View 
              entering={SlideInUp.springify()}
              style={styles.votingSection}
            >
              <View style={styles.votingSectionHeader}>
                <Ionicons name="people" size={20} color="#6200EA" />
                <Text style={styles.votingSectionTitle}>
                  Vote for the next paragraph
                </Text>
              </View>
              
              {sortedContributions.map((contribution) => (
                <Animated.View 
                  key={contribution.id}
                  entering={FadeIn.delay(200).springify()}
                  style={styles.contributionCard}
                >
                  <Text style={styles.contributionText}>
                    {contribution.content}
                  </Text>
                  <View style={styles.contributionFooter}>
                    <Text style={styles.authorText}>
                      {contribution.author}
                    </Text>
                    <TouchableOpacity
                      style={[
                        styles.voteButton,
                        userVoted === contribution.id && styles.votedButton
                      ]}
                      onPress={() => handleVote(contribution.id)}
                    >
                      <Ionicons 
                        name={userVoted === contribution.id ? "heart" : "heart-outline"} 
                        size={18} 
                        color={userVoted === contribution.id ? "white" : "#FF5252"} 
                      />
                      <Text 
                        style={[
                          styles.voteCount,
                          userVoted === contribution.id && styles.votedText
                        ]}
                      >
                        {contribution.votes}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </Animated.View>
          )}

          {/* Writing section */}
          {isWriting && (
            <Animated.View
              entering={SlideInUp.springify()}
              exiting={SlideOutDown.springify()}
              style={styles.writingSection}
            >
              <View style={styles.writingSectionHeader}>
                <Text style={styles.writingSectionTitle}>
                  Add your contribution
                </Text>
                <TouchableOpacity
                  style={styles.closeWritingButton}
                  onPress={handleCloseWriting}
                >
                  <Ionicons name="close" size={22} color="#666" />
                </TouchableOpacity>
              </View>
              
              <TextInput
                style={styles.paragraphInput}
                value={newParagraph}
                onChangeText={setNewParagraph}
                placeholder="Continue the story..."
                placeholderTextColor="#9E9E9E"
                multiline
                autoFocus
                maxLength={500}
              />
              
              <View style={styles.charCountContainer}>
                <Text style={styles.charCount}>
                  {newParagraph.length}/500
                </Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !newParagraph.trim() && styles.disabledButton
                ]}
                onPress={handleContribute}
                disabled={!newParagraph.trim()}
              >
                <Text style={styles.submitButtonText}>
                  Submit Paragraph
                </Text>
                <Ionicons name="send" size={18} color="white" />
              </TouchableOpacity>
            </Animated.View>
          )}
          
          {/* Bottom padding for FAB */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Floating Action Button */}
        {!isWriting && story.currentPhase === 'writing' && (
          <Animated.View style={[styles.fab, fabAnimatedStyle]}>
            <TouchableOpacity
              style={styles.fabButton}
              onPress={handleAddParagraph}
            >
              <Ionicons name="create" size={28} color="white" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

interface Story {
    id: string;
    title: string;
    genre: string;
    participants: number;
    paragraphs: Paragraph[];
    currentPhase: 'writing' | 'voting';
    contributions: Contribution[];
}

interface Paragraph {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    votes: number;
}

interface Contribution {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    votes: number;
}

const styles: { [key: string]: any } = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 60,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6200EA',
    },
    headerStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
    },
    statText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    genreBadge: {
        backgroundColor: '#E8EAF6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 20,
    },
    phaseMessage: {
        position: 'absolute',
        top: 120,
        left: 20,
        right: 20,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        zIndex: 20,
    },
    phaseMessageText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
    },
    storyContainer: {
        flex: 1,
    },
    storyContent: {
        padding: 20,
        paddingTop: 30,
    },
    paragraphCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    paragraphText: {
        fontSize: 17,
        lineHeight: 26,
        color: '#212121',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    paragraphFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    authorText: {
        fontSize: 14,
        color: '#757575',
        fontStyle: 'italic',
    },
    votingSection: {
        marginTop: 16,
        marginBottom: 20,
    },
    votingSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    votingSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6200EA',
        marginLeft: 8,
    },
    contributionCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    contributionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#212121',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    contributionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    voteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    votedButton: {
        backgroundColor: '#FF5252',
    },
    voteCount: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#FF5252',
    },
    votedText: {
        color: 'white',
    },
    writingSection: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    writingSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    writingSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6200EA',
    },
    closeWritingButton: {
        padding: 8,
    },
    paragraphInput: {
        height: 200,
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#212121',
        lineHeight: 24,
        textAlignVertical: 'top',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    charCountContainer: {
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 16,
    },
    charCount: {
        fontSize: 14,
        color: '#9E9E9E',
    },
    submitButton: {
        backgroundColor: '#6200EA',
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6200EA',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    disabledButton: {
        backgroundColor: '#B0BEC5',
        shadowOpacity: 0.1,
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        borderRadius: 30,
        shadowColor: '#6200EA',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    fabButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6200EA',
        justifyContent: 'center',
        alignItems: 'center',
    },
});