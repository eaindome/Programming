import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for active stories
const ACTIVE_STORIES: {
  id: string;
  title: string;
  participants: number;
  genre: string;
  coverGradient: [string, string]; // Explicitly typed as a tuple
  lastUpdate: string;
  pendingContributions: number;
  progress: number;
}[] = [
  {
    id: '1',
    title: 'The Last Guardian',
    participants: 8,
    genre: 'Fantasy',
    coverGradient: ['#7C4DFF', '#6200EA'],
    lastUpdate: '10 minutes ago',
    pendingContributions: 3,
    progress: 65, // percentage
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    participants: 5,
    genre: 'Sci-Fi',
    coverGradient: ['#00E5FF', '#00BFA5'],
    lastUpdate: '2 hours ago',
    pendingContributions: 1,
    progress: 40,
  },
  {
    id: '3',
    title: 'Whispers in the Dark',
    participants: 12,
    genre: 'Mystery',
    coverGradient: ['#FF6E40', '#FF3D00'],
    lastUpdate: '1 day ago',
    pendingContributions: 0,
    progress: 85,
  },
];

// Mock data for activity feed
const ACTIVITY_FEED: Activity[] = [
  {
    id: '1',
    type: 'new_contribution',
    storyTitle: 'The Last Guardian',
    user: 'Alex Chen',
    time: '10 minutes ago',
  },
  {
    id: '2',
    type: 'vote_win',
    storyTitle: 'Echoes of Tomorrow',
    user: 'You',
    time: '2 hours ago',
  },
  {
    id: '3',
    type: 'story_complete',
    storyTitle: "The Ocean's Call",
    time: '1 day ago',
  },
  {
    id: '4',
    type: 'new_contributor',
    storyTitle: 'The Last Guardian',
    user: 'Morgan Taylor',
    time: '2 days ago',
  },
];

interface Activity {
  id: string;
  type: 'new_contribution' | 'vote_win' | 'story_complete' | 'new_contributor';
  storyTitle: string;
  user?: string; 
  time: string;
}

export default function DashboardScreen() {
  const [selectedTab, setSelectedTab] = useState('Active');
  const { width } = Dimensions.get('window');
  
  // Activity icon based on type
  interface ActivityIcon {
    name: keyof typeof Ionicons.glyphMap; 
    color: string;
    bg: string;
  }

  const getActivityIcon = (type: string): ActivityIcon => {
    switch(type) {
      case 'new_contribution':
        return { name: 'create', color: '#6200EA', bg: '#EDE7F6' };
      case 'vote_win':
        return { name: 'trophy', color: '#FFC107', bg: '#FFF8E1' };
      case 'story_complete':
        return { name: 'checkbox', color: '#00BFA5', bg: '#E0F2F1' };
      case 'new_contributor':
        return { name: 'person-add', color: '#FF5252', bg: '#FFEBEE' };
      default:
        return { name: 'ellipsis-horizontal', color: '#666', bg: '#F5F7FA' };
    }
  };

  // Generate activity message based on type
  const getActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'new_contribution':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user}</Text> added a new paragraph to <Text style={styles.highlightText}>{activity.storyTitle}</Text>
          </Text>
        );
      case 'vote_win':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user}</Text> won the vote in <Text style={styles.highlightText}>{activity.storyTitle}</Text>
          </Text>
        );
      case 'story_complete':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.storyTitle}</Text> was completed! 🎉
          </Text>
        );
      case 'new_contributor':
        return (
          <Text style={styles.activityText}>
            <Text style={styles.highlightText}>{activity.user}</Text> joined <Text style={styles.highlightText}>{activity.storyTitle}</Text>
          </Text>
        );
      default:
        return <Text style={styles.activityText}>Something happened in the story</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Story<Text style={styles.logoHighlight}>Sync</Text>
          <Text style={styles.sparkle}>✨</Text>
        </Text>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.welcomeText}>Hello, Jamie!</Text>
            <Text style={styles.welcomeSubtext}>Ready to craft some stories?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statCard}>
            <LinearGradient 
              colors={['#7C4DFF', '#6200EA']} 
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Active Stories</Text>
              </View>
              <View style={styles.statIcon}>
                <Ionicons name="book" size={28} color="rgba(255,255,255,0.5)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statCard}>
            <LinearGradient 
              colors={['#00E5FF', '#00BFA5']}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>32</Text>
                <Text style={styles.statLabel}>Contributions</Text>
              </View>
              <View style={styles.statIcon}>
                <Ionicons name="create" size={28} color="rgba(255,255,255,0.5)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statCard}>
            <LinearGradient 
              colors={['#FFC107', '#FF9800']}
              style={styles.statCardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statContent}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
              <View style={styles.statIcon}>
                <Ionicons name="trophy" size={28} color="rgba(255,255,255,0.5)" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {/* Stories Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Active' && styles.activeTab]}
            onPress={() => setSelectedTab('Active')}
          >
            <Text style={[styles.tabText, selectedTab === 'Active' && styles.activeTabText]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Completed' && styles.activeTab]}
            onPress={() => setSelectedTab('Completed')}
          >
            <Text style={[styles.tabText, selectedTab === 'Completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'Created' && styles.activeTab]}
            onPress={() => setSelectedTab('Created')}
          >
            <Text style={[styles.tabText, selectedTab === 'Created' && styles.activeTabText]}>
              Created
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Active Stories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Stories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Story Cards */}
        {ACTIVE_STORIES.map(story => (
          <TouchableOpacity key={story.id} style={styles.storyCard}>
            <LinearGradient 
              colors={story.coverGradient} 
              style={styles.storyBanner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.storyMeta}>
                <Text style={styles.storyGenre}>{story.genre}</Text>
                <View style={styles.participantsContainer}>
                  <Ionicons name="people" size={14} color="white" />
                  <Text style={styles.participantsText}>{story.participants}</Text>
                </View>
              </View>
            </LinearGradient>
            
            <View style={styles.storyContent}>
              <Text style={styles.storyTitle}>{story.title}</Text>
              
              <View style={styles.storyDetails}>
                <View style={styles.lastUpdateContainer}>
                  <Ionicons name="time-outline" size={14} color="#888" />
                  <Text style={styles.lastUpdateText}>{story.lastUpdate}</Text>
                </View>
                
                {story.pendingContributions > 0 && (
                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>
                      {story.pendingContributions} pending
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <LinearGradient 
                    colors={story.coverGradient}
                    style={[styles.progressFill, { width: `${story.progress}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <Text style={styles.progressText}>{story.progress}%</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Read</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryActionButton}>
                  <LinearGradient 
                    colors={story.coverGradient}
                    style={styles.primaryActionGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.primaryActionText}>Contribute</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Activity Feed */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        
        <View style={styles.activityCard}>
          {ACTIVITY_FEED.map(activity => {
            const icon = getActivityIcon(activity.type);
            return (
              <TouchableOpacity key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: icon.bg }]}>
                  <Ionicons name={icon.name} size={18} color={icon.color} />
                </View>
                <View style={styles.activityContent}>
                  {getActivityMessage(activity)}
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More Activity</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fabContainer}>
        <LinearGradient 
          colors={['#7C4DFF', '#6200EA']}
          style={styles.fab}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="add" size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  logoHighlight: {
    color: '#6200EA',
  },
  sparkle: {
    fontSize: 20,
    marginLeft: 2,
  },
  profileButton: {
    padding: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6200EA',
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    right: 4,
    top: 4,
    backgroundColor: '#FF5252',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  statCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  statIcon: {
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: '#EDE7F6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: '#6200EA',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6200EA',
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  storyBanner: {
    height: 80,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  storyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storyGenre: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  storyContent: {
    padding: 20,
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  storyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  lastUpdateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastUpdateText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 6,
  },
  pendingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pendingText: {
    fontSize: 14,
    color: '#FFA000',
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F5',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    width: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  primaryActionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 12,
  },
  primaryActionGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  primaryActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
    paddingTop: 2,
  },
  activityText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  highlightText: {
    fontWeight: '600',
    color: '#6200EA',
  },
  activityTime: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
    backgroundColor: '#F0F0F5',
    borderRadius: 16,
  },
  viewMoreText: {
    fontSize: 14,
    color: '#6200EA',
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});