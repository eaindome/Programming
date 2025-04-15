import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock data for stories
const MOCK_STORIES = [
  {
    id: '1',
    title: 'The Last Guardian',
    contributors: 8,
    genre: 'Fantasy',
    coverColor: '#6200EA',
    height: 180,
  },
  {
    id: '2',
    title: 'Echoes of Tomorrow',
    contributors: 5,
    genre: 'Sci-Fi',
    coverColor: '#00BFA5',
    height: 220,
  },
  {
    id: '3',
    title: 'Whispers in the Dark',
    contributors: 12,
    genre: 'Mystery',
    coverColor: '#FF5252',
    height: 200,
  },
  {
    id: '4',
    title: 'Beyond the Horizon',
    contributors: 3,
    genre: 'Adventure',
    coverColor: '#FFC107',
    height: 230,
  },
  {
    id: '5',
    title: 'Silent Memories',
    contributors: 7,
    genre: 'Drama',
    coverColor: '#6200EA',
    height: 190,
  },
  {
    id: '6',
    title: 'The Forgotten Path',
    contributors: 4,
    genre: 'Fantasy',
    coverColor: '#00BFA5',
    height: 210,
  },
];

// Filter options for stories
const FILTERS = ['Popular', 'Recent', 'In Progress'];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState('Popular');
  const { width } = useWindowDimensions();
  const cardWidth = width / 2 - 24; // Two cards per row with margins

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>StorySync<Text style={styles.sparkle}>✨</Text></Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#6200EA" />
        </TouchableOpacity>
      </View>
      
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stories Grid */}
      <ScrollView
        contentContainerStyle={styles.storiesContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.storiesGrid}>
          {MOCK_STORIES.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={[
                styles.storyCard,
                { width: cardWidth, height: story.height },
              ]}
            >
              <View style={[styles.storyCover, { backgroundColor: story.coverColor }]}>
                <Text style={styles.storyInitial}>{story.title[0]}</Text>
              </View>
              <View style={styles.storyInfo}>
                <Text style={styles.storyTitle} numberOfLines={1}>
                  {story.title}
                </Text>
                <Text style={styles.storyMeta}>
                  {story.genre} • {story.contributors} contributors
                </Text>
                <View style={styles.continueButton}>
                  <Text style={styles.continueText}>Continue</Text>
                  <Ionicons name="arrow-forward" size={14} color="#00BFA5" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6200EA',
  },
  sparkle: {
    fontSize: 18,
  },
  profileButton: {
    padding: 4,
  },
  filterContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeFilterTab: {
    backgroundColor: '#6200EA',
  },
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  storiesContainer: {
    padding: 16,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyCover: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyInitial: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  storyMeta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00BFA5',
    marginRight: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200EA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6200EA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});