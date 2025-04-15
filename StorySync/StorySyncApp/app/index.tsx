import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList,
  Animated,
  Dimensions,
  ImageBackground,
  StatusBar,
  RefreshControl,
  SafeAreaView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';

// Types for our data
interface Story {
  id: string;
  title: string;
  contributors: number;
  paragraphs: number;
  coverColor: string;
  image: any;
  lastUpdated?: string;
}

interface ActivityItem {
  id: string;
  user: string;
  avatar: string | null;
  action: string;
  story: string;
  storyId: string;
  time: string;
}

// Sample data for featured stories
const FEATURED_STORIES: Story[] = [
  {
    id: '1',
    title: 'The Lost City',
    contributors: 8,
    paragraphs: 24,
    coverColor: '#6200EA',
    image: require('../assets/story-bg.jpg'),
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    title: 'Whispers in the Wind',
    contributors: 12,
    paragraphs: 31,
    coverColor: '#00BFA5',
    image: require('../assets/story-bg.jpg'),
    lastUpdated: '5 hours ago'
  },
  {
    id: '3',
    title: 'Echoes of Time',
    contributors: 5,
    paragraphs: 16,
    coverColor: '#FF5252',
    image: require('../assets/story-bg.jpg'),
    lastUpdated: '1 day ago'
  },
];

// Sample data for recent activity
const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    user: 'Alex',
    avatar: null,
    action: 'added a new paragraph to',
    story: 'The Lost City',
    storyId: '1',
    time: '5 min ago',
  },
  {
    id: '2',
    user: 'Taylor',
    avatar: null,
    action: 'started a new story',
    story: 'Beyond the Horizon',
    storyId: '4',
    time: '18 min ago',
  },
  {
    id: '3',
    user: 'Jordan',
    avatar: null,
    action: 'voted on a contribution in',
    story: 'Whispers in the Wind',
    storyId: '2',
    time: '42 min ago',
  },
];

// Sample data for your stories
const YOUR_STORIES: Story[] = [
  {
    id: '4',
    title: 'Beyond the Horizon',
    contributors: 3,
    paragraphs: 8,
    coverColor: '#304FFE',
    image: require('../assets/story-bg.jpg'),
    lastUpdated: '18 min ago'
  },
  {
    id: '5',
    title: 'Midnight Memories',
    contributors: 6,
    paragraphs: 12,
    coverColor: '#FFC107',
    image: require('../assets/story-bg.jpg'),
    lastUpdated: '2 days ago'
  },
];

// Header Component
const Header: React.FC<{ transparent?: boolean; animatedOpacity?: Animated.AnimatedInterpolation<number> }> = ({
  transparent = false,
  animatedOpacity,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.header,
        transparent ? styles.transparentHeader : styles.solidHeader,
      ]}
    >
      <Animated.View
        style={[
          styles.headerContent,
          animatedOpacity ? { opacity: animatedOpacity } : {},
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            transparent ? styles.lightText : styles.darkText,
          ]}
        >
          StorySync
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="search"
              size={24}
              color={transparent ? '#fff' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/(notifications)/notifications')}
          >
            <Ionicons
              name="notifications"
              size={24}
              color={transparent ? '#fff' : '#333'}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const mockUser = {
  id: '123',
  firstName: 'Demo',
  lastName: 'User',
  emailAddresses: [{ emailAddress: 'demo.user@exampl.com'}],
  imageUrl: null
}

export default function HomeScreen() {
  // const { user } = useUser();
  const user = mockUser; // For demo purposes, using a mock user
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const [refreshing, setRefreshing] = useState(false);

  // Simplified animations - just one fade in for the whole UI
  const mainContentOpacity = useRef(new Animated.Value(0)).current;
  const fabScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Simple fade-in and button animation
    Animated.parallel([
      Animated.timing(mainContentOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(fabScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Hero shrinking effect
  const heroHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [220, 160],
    extrapolate: 'clamp',
  });

  const navigateToStory = (storyId: string): void => {
    router.push(`/(story)/${storyId}`);
  };

  const navigateToCreate = () => {
    router.push('/(story)/create');
  };

  const navigateToJoin = () => {
    router.push('/(story)/join');
  };

  const navigateToDashboard = () => {
    router.push('/(user)/dashboard');
  };

  const navigateToProfile = () => {
    router.push('/(user)/profile');
  };

  const simulateRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  // Helper function to generate consistent colors based on username
  const getAvatarColor = (name: string): string => {
    const colors: string[] = ['#6200EA', '#00BFA5', '#FF5252', '#FFC107', '#304FFE'];
    const charCode: number = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const renderStoryCard = ({ item }: { item: Story }) => (
    <TouchableOpacity 
      style={styles.storyCard} 
      onPress={() => navigateToStory(item.id)}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={item.image}
        style={styles.storyCover}
        imageStyle={styles.storyImage}
      >
        <LinearGradient
          colors={['transparent', `${item.coverColor}EE`]}
          style={styles.storyGradient}
        >
          <Text style={styles.storyTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.storyMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="people" size={14} color="#fff" />
              <Text style={styles.storyMetaText}>{item.contributors}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="document-text" size={14} color="#fff" />
              <Text style={styles.storyMetaText}>{item.paragraphs}</Text>
            </View>
            
            {item.lastUpdated && (
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#fff" />
                <Text style={styles.storyMetaText}>{item.lastUpdated}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderActivityItem = ({ item }: { item: ActivityItem }) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.activityItem}
      onPress={() => navigateToStory(item.storyId)}
      activeOpacity={0.8}
    >
      <View style={[styles.activityAvatar, { backgroundColor: getAvatarColor(item.user) }]}>
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.activityAvatarText}>
            {item.user.charAt(0)}
          </Text>
        )}
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.activityUser}>{item.user}</Text> {item.action}{' '}
          <Text style={styles.activityStory}>{item.story}</Text>
        </Text>
        <Text style={styles.activityTime}>{item.time}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );

  const renderYourStoriesSection = () => {
    if (!user) return null;
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="book" size={20} color="#6200EA" />
            <Text style={styles.sectionTitle}>Your Stories</Text>
          </View>
          <TouchableOpacity 
            onPress={navigateToDashboard}
            style={styles.seeAllButton}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {YOUR_STORIES.length > 0 ? (
          <FlatList
            data={YOUR_STORIES}
            renderItem={({ item }) => renderStoryCard({ item })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyList}
            decelerationRate="fast"
            snapToInterval={width * 0.6 + 12}
            snapToAlignment="start"
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="book-outline" size={40} color="#ccc" />
            <Text style={styles.emptyStateText}>No stories yet</Text>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={navigateToCreate}
            >
              <Text style={styles.emptyStateButtonText}>Create a Story</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content" 
      />
      
      {/* Animated hero section */}
      <Animated.View style={[
        styles.heroContainer, 
        { height: heroHeight }
      ]}>
        <ImageBackground
          source={require('../assets/story-bg.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(98,0,234,0.7)']}
            style={styles.heroOverlay}
          >
            {!user && (
              <View style={styles.heroContent}>
                <Text style={styles.heroSubtitle}>
                  Collaborate on stories in real-time with 
                </Text>
                <View style={styles.heroButtons}>
                  <TouchableOpacity
                    style={[styles.heroButton, styles.primaryButton]}
                    onPress={() => router.push('/(auth)/sign-in')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.primaryButtonText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.heroButton, styles.secondaryButton]}
                    onPress={() => router.push('/(auth)/sign-up')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.secondaryButtonText}>Create Account</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            {user && (
              <View style={styles.userHeroContainer}>
                <TouchableOpacity 
                  style={styles.userInfoContainer}
                  onPress={navigateToProfile}
                  activeOpacity={0.8}
                >
                  <View style={styles.userAvatar}>
                    {user.imageUrl ? (
                      <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
                    ) : (
                      <Text style={styles.userAvatarText}>
                        {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || '?'}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.greetingText}>
                      Hello, {user.firstName || user.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'Writer'}!
                    </Text>
                    <Text style={styles.activeStoriesText}>
                      {YOUR_STORIES.length} Active {YOUR_STORIES.length === 1 ? 'Story' : 'Stories'}
                    </Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.dashboardButton}
                  onPress={navigateToDashboard}
                  activeOpacity={0.8}
                >
                  <Ionicons name="grid-outline" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </ImageBackground>
      </Animated.View>

      {/* Animated header that appears when scrolling */}
      <Animated.View 
        style={[
          styles.animatedHeaderContainer,
          { opacity: headerOpacity }
        ]}
      >
        <Header />
      </Animated.View>

      {/* Transparent header for initial view */}
      <Header
        transparent={true}
        animatedOpacity={scrollY.interpolate({
          inputRange: [0, 80],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        })}
      />

      <Animated.ScrollView
        style={[styles.scrollView, { opacity: mainContentOpacity }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={simulateRefresh}
            tintColor="#6200EA"
            colors={["#6200EA"]}
          />
        }
      >
        {/* Spacer for hero section */}
        <View style={styles.heroSpacer} />
        
        {/* Quick Actions Section */}
        <View style={styles.quickActionsContainer}>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={navigateToCreate}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, styles.createIcon]}>
                <Ionicons name="create" size={22} color="#fff" />
              </View>
              <Text style={styles.actionText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={navigateToJoin}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, styles.joinIcon]}>
                <Ionicons name="people" size={22} color="#fff" />
              </View>
              <Text style={styles.actionText}>Join</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={navigateToDashboard}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, styles.dashboardIcon]}>
                <Ionicons name="stats-chart" size={22} color="#fff" />
              </View>
              <Text style={styles.actionText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/(public)/about')}
              activeOpacity={0.7}
            >
              <View style={[styles.actionIcon, styles.aboutIcon]}>
                <Ionicons name="information" size={22} color="#fff" />
              </View>
              <Text style={styles.actionText}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Your Stories Section (only if logged in) */}
        {renderYourStoriesSection()}

        {/* Featured Stories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="star" size={20} color="#6200EA" />
              <Text style={styles.sectionTitle}>Featured Stories</Text>
            </View>
            <TouchableOpacity 
              onPress={() => router.push('/(story)/explore')}
              style={styles.seeAllButton}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={FEATURED_STORIES}
            renderItem={({ item }) => renderStoryCard({ item })}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyList}
            decelerationRate="fast"
            snapToInterval={width * 0.6 + 12}
            snapToAlignment="start"
          />
        </View>

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="time" size={20} color="#6200EA" />
              <Text style={styles.sectionTitle}>Recent Activity</Text>
            </View>
            {RECENT_ACTIVITY.length > 3 && (
              <TouchableOpacity 
                style={styles.seeAllButton}
                activeOpacity={0.7}
                onPress={() => router.push('/(activity)/all')}
              >
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.activityList}>
            {RECENT_ACTIVITY.map((item) => renderActivityItem({ item }))}
            {RECENT_ACTIVITY.length === 0 && (
              <View style={styles.emptyStateContainer}>
                <Ionicons name="notifications-off-outline" size={40} color="#ccc" />
                <Text style={styles.emptyStateText}>No recent activity</Text>
                <TouchableOpacity 
                  style={styles.emptyStateButton}
                  onPress={navigateToJoin}
                >
                  <Text style={styles.emptyStateButtonText}>Join a Story</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Bottom space */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Create story floating button */}
      <Animated.View 
        style={[
          styles.fabContainer,
          { transform: [{ scale: fabScale }] }
        ]}
      >
        <TouchableOpacity 
          style={styles.fab}
          onPress={navigateToCreate}
          activeOpacity={0.8}
        >
          <Ionicons name="create" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  transparentHeader: {
    backgroundColor: 'transparent',
  },
  solidHeader: {
    backgroundColor: '#F7F9FC',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#fff',
  },
  darkText: {
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  heroContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: 220,
  },
  hero: {
    height: '100%',
  },
  heroOverlay: {
    height: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroButtons: {
    flexDirection: 'row',
  },
  heroButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  primaryButtonText: {
    color: '#6200EA',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  userHeroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userAvatarText: {
    color: '#6200EA',
    fontWeight: 'bold',
    fontSize: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  activeStoriesText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  dashboardButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroSpacer: {
    height: 180,
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  createIcon: {
    backgroundColor: '#6200EA',
  },
  joinIcon: {
    backgroundColor: '#00BFA5',
  },
  dashboardIcon: {
    backgroundColor: '#FFC107',
  },
  aboutIcon: {
    backgroundColor: '#FF5252',
  },
  actionText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  seeAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(98, 0, 234, 0.1)',
  },
  seeAllText: {
    color: '#6200EA',
    fontWeight: '500',
    fontSize: 14,
  },
  storyList: {
    paddingRight: 8,
  },
  storyCard: {
    width: Dimensions.get('window').width * 0.6,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  storyCover: {
    width: '100%',
    height: '100%',
  },
  storyImage: {
    borderRadius: 12,
  },
  storyGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'flex-end',
    height: '60%',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  storyMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  storyMetaText: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 4,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  activityAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
    marginRight: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  activityUser: {
    fontWeight: 'bold',
    color: '#333',
  },
  activityStory: {
    fontWeight: '500',
    color: '#6200EA',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyStateContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyStateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200EA',
    borderRadius: 24,
  },
  emptyStateButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 5,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200EA',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6200EA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});