import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for user contributions
const USER_CONTRIBUTIONS = [
  {
    id: '1',
    storyTitle: 'The Last Guardian',
    contributionDate: '2 days ago',
    status: 'winning', // winning, ongoing, pending
    snippet: 'The ancient door creaked open, revealing a chamber untouched for centuries...',
  },
  {
    id: '2',
    storyTitle: 'Echoes of Tomorrow',
    contributionDate: '1 week ago',
    status: 'ongoing',
    snippet: 'As the last ship departed, Sarah realized the colony would never be the same...',
  },
  {
    id: '3',
    storyTitle: 'Whispers in the Dark',
    contributionDate: '2 weeks ago',
    status: 'winning',
    snippet: "The detective's flashlight revealed footprints leading away from the scene...",
  },
  {
    id: '4',
    storyTitle: 'Beyond the Horizon',
    contributionDate: '1 month ago',
    status: 'pending',
    snippet: 'Mountains loomed in the distance, their peaks touching the clouds like ancient fingers...',
  },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  
  interface StatusColors {
    [key: string]: { colors: string[], textColor: string };
  }

  const getStatusStyle = (status: string) => {
    const statusStyles: StatusColors = {
      winning: { 
        colors: ['#FFD54F', '#FFA000'], 
        textColor: '#7D4900' 
      },
      ongoing: { 
        colors: ['#B388FF', '#6200EA'], 
        textColor: '#FFFFFF' 
      },
      pending: { 
        colors: ['#80CBC4', '#00897B'], 
        textColor: '#FFFFFF' 
      },
    };

    return statusStyles[status] || { colors: ['#EEEEEE', '#BDBDBD'], textColor: '#757575' };
  };
  
  const getStatusLabel = (status: string): string => {
    switch(status) {
      case 'winning': return 'Winner';
      case 'ongoing': return 'In Progress';
      case 'pending': return 'Voting';
      default: return status;
    }
  };

  const getStatusIcon = (status: string): "trophy-outline" | "time-outline" | "thumbs-up-outline" | "help-circle-outline" => {
    switch(status) {
      case 'winning': return 'trophy-outline';
      case 'ongoing': return 'time-outline';
      case 'pending': return 'thumbs-up-outline';
      default: return 'help-circle-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header with Gradient */}
      <LinearGradient
        colors={['#7B4DFF', '#6200EA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Profile Information in Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#B388FF', '#6200EA']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>JD</Text>
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userBio}>Weaving words into worlds, one paragraph at a time.</Text>
          </View>
        </View>
      </LinearGradient>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10</Text>
              <Text style={styles.statLabel}>Contributions</Text>
            </View>
            <View style={styles.statsDevider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Wins</Text>
              <View style={styles.trophyIcon}>
                <Ionicons name="trophy" size={18} color="#FFC107" />
              </View>
            </View>
            <View style={styles.statsDevider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Stories Started</Text>
            </View>
          </View>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="create-outline" size={20} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>New Story</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="document-text-outline" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>New Draft</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFF8E1' }]}>
              <Ionicons name="search-outline" size={20} color="#FFC107" />
            </View>
            <Text style={styles.actionText}>Browse</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contribution Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="bookmarks-outline" size={20} color="#6200EA" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>My Contributions</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={16} color="#6200EA" />
          </TouchableOpacity>
        </View>
        
        {/* Contributions List */}
        {USER_CONTRIBUTIONS.map(contribution => {
          const statusStyle = getStatusStyle(contribution.status);
          
          return (
            <TouchableOpacity 
              key={contribution.id} 
              style={styles.contributionCard}
              activeOpacity={0.7}
            >
              <View style={styles.contributionHeader}>
                <Text style={styles.storyTitle} numberOfLines={1}>
                  {contribution.storyTitle}
                </Text>
                <LinearGradient
                  colors={statusStyle.colors as [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.statusBadge}
                >
                  <Ionicons 
                    name={getStatusIcon(contribution.status)} 
                    size={14} 
                    color={statusStyle.textColor} 
                    style={{marginRight: 4}} 
                  />
                  <Text style={[styles.statusText, {color: statusStyle.textColor}]}>
                    {getStatusLabel(contribution.status)}
                  </Text>
                </LinearGradient>
              </View>
              
              <View style={styles.contributionContent}>
                <View style={styles.quoteDecoration} />
                <Text style={styles.contributionSnippet} numberOfLines={2}>
                  {contribution.snippet}
                </Text>
              </View>
              
              <View style={styles.contributionFooter}>
                <View style={styles.dateContainer}>
                  <Ionicons name="time-outline" size={14} color="#888" style={{marginRight: 4}} />
                  <Text style={styles.contributionDate}>
                    {contribution.contributionDate}
                  </Text>
                </View>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueText}>Continue</Text>
                  <Ionicons name="arrow-forward" size={14} color="#6200EA" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Drafts Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="newspaper-outline" size={20} color="#6200EA" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>My Drafts</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <Ionicons name="chevron-forward" size={16} color="#6200EA" />
          </TouchableOpacity>
        </View>
        
        {/* Empty State for Drafts */}
        <View style={styles.emptyState}>
          <LinearGradient
            colors={['#F3E5F5', '#EDE7F6']}
            style={styles.emptyIconContainer}
          >
            <Ionicons name="document-text-outline" size={36} color="#6200EA" />
          </LinearGradient>
          <Text style={styles.emptyTitle}>No Drafts Yet</Text>
          <Text style={styles.emptyDescription}>
            Start writing a draft and it will appear here for you to finish later.
          </Text>
          <TouchableOpacity style={styles.createButton}>
            <LinearGradient
              colors={['#7B4DFF', '#6200EA']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButtonGradient}
            >
              <Ionicons name="create-outline" size={16} color="white" style={{marginRight: 8}} />
              <Text style={styles.createButtonText}>Create New Draft</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerGradient: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 20,
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  backButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  userBio: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 25,
    paddingBottom: 32,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  statsDevider: {
    width: 1,
    height: '80%',
    backgroundColor: '#EEE',
    alignSelf: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EA',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  trophyIcon: {
    position: 'absolute',
    top: -5,
    right: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6200EA',
    fontWeight: '500',
    marginRight: 2,
  },
  contributionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  contributionContent: {
    marginBottom: 12,
    position: 'relative',
    paddingLeft: 15,
  },
  quoteDecoration: {
    position: 'absolute',
    left: 0,
    top: 5,
    bottom: 5,
    width: 3,
    backgroundColor: '#6200EA',
    borderRadius: 3,
  },
  contributionSnippet: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  contributionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributionDate: {
    fontSize: 12,
    color: '#888',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  continueText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6200EA',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  createButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});