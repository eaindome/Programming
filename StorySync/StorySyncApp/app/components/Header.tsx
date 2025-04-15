import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, usePathname } from 'expo-router';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  rightComponent,
  transparent = false,
}: HeaderProps) {
  const navigation = useNavigation();
  const pathname = usePathname();
  
  // Determine if we're on the home screen to show logo instead of title
  const isHomeScreen = pathname === '/' || pathname === '/index';
  
  return (
    <>
      <StatusBar style={transparent ? ("light-content" as StatusBarStyle) : ("dark-content" as StatusBarStyle)} />
      <View style={[
        styles.header, 
        transparent && styles.transparentHeader
      ]}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={transparent ? "#fff" : "#333"} 
              />
            </TouchableOpacity>
          )}
          
          {isHomeScreen ? (
            <View style={styles.logoContainer}>
              <Ionicons name="book" size={24} color={transparent ? "#fff" : "#6200EA"} />
              <Text style={[
                styles.logoText, 
                transparent && styles.lightText
              ]}>
                StorySync
              </Text>
            </View>
          ) : (
            <Text style={[
              styles.title, 
              transparent && styles.lightText
            ]}>
              {title || ''}
            </Text>
          )}
        </View>
        
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#F5F7FA',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    zIndex: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EA',
    marginLeft: 6,
  },
  lightText: {
    color: '#fff',
  },
});