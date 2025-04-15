import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  // States for various settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineDrafts, setOfflineDrafts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => console.log("Logged out")
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your stories and contributions will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => console.log("Account deleted")
        }
      ]
    );
  };

  // Renders a setting switch item
  const SettingItem = ({ icon, title, description, value, onValueChange }) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIconContainer, { backgroundColor: icon.bg }]}>
        <Ionicons name={icon.name} size={22} color="white" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#CCD", true: "#B0CAFF" }}
        thumbColor={value ? "#6200EA" : "#f4f3f4"}
      />
    </View>
  );

  // Renders a navigation item
  const NavigationItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.navigationItem} onPress={onPress}>
      <View style={[styles.settingIconContainer, { backgroundColor: icon.bg }]}>
        <Ionicons name={icon.name} size={22} color="white" />
      </View>
      <View style={styles.navigationContent}>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#CCD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account</Text>
        </View>
        
        <View style={styles.card}>
          <NavigationItem 
            icon={{ name: "person", bg: "#6200EA" }}
            title="Edit Profile"
            onPress={() => console.log("Edit Profile")}
          />
          <View style={styles.separator} />
          <NavigationItem 
            icon={{ name: "mail", bg: "#00BFA5" }}
            title="Email & Notifications"
            onPress={() => console.log("Email settings")}
          />
          <View style={styles.separator} />
          <NavigationItem 
            icon={{ name: "shield-checkmark", bg: "#FFC107" }}
            title="Privacy & Security"
            onPress={() => console.log("Privacy settings")}
          />
        </View>
        
        {/* App Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>App Settings</Text>
        </View>
        
        <View style={styles.card}>
          <SettingItem 
            icon={{ name: "notifications", bg: "#FF5252" }}
            title="Push Notifications"
            description="Get updates on your stories"
            value={notifications}
            onValueChange={setNotifications}
          />
          <View style={styles.separator} />
          <SettingItem 
            icon={{ name: "moon", bg: "#6200EA" }}
            title="Dark Mode"
            description="Easy on the eyes, perfect for night writing"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <View style={styles.separator} />
          <SettingItem 
            icon={{ name: "cloud-offline", bg: "#00BFA5" }}
            title="Offline Mode"
            description="Save drafts when you're not connected"
            value={offlineDrafts}
            onValueChange={setOfflineDrafts}
          />
        </View>
        
        {/* Experience Settings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Experience</Text>
        </View>
        
        <View style={styles.card}>
          <SettingItem 
            icon={{ name: "volume-high", bg: "#FFC107" }}
            title="Sound Effects"
            description="Audio feedback when contributions are made"
            value={soundEffects}
            onValueChange={setSoundEffects}
          />
          <View style={styles.separator} />
          <SettingItem 
            icon={{ name: "pulse", bg: "#FF5252" }}
            title="Haptic Feedback"
            description="Vibration for interactions"
            value={vibration}
            onValueChange={setVibration}
          />
          <View style={styles.separator} />
          <SettingItem 
            icon={{ name: "save", bg: "#6200EA" }}
            title="Auto-Save"
            description="Save drafts automatically"
            value={autoSave}
            onValueChange={setAutoSave}
          />
        </View>
        
        {/* Help & About */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Help & About</Text>
        </View>
        
        <View style={styles.card}>
          <NavigationItem 
            icon={{ name: "help-circle", bg: "#00BFA5" }}
            title="Help Center"
            onPress={() => console.log("Help Center")}
          />
          <View style={styles.separator} />
          <NavigationItem 
            icon={{ name: "information-circle", bg: "#FFC107" }}
            title="About StorySync"
            onPress={() => console.log("About")}
          />
          <View style={styles.separator} />
          <NavigationItem 
            icon={{ name: "star", bg: "#FF5252" }}
            title="Rate the App"
            onPress={() => console.log("Rate App")}
          />
        </View>
        
        {/* Account Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
        </View>
        
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.actionButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        
        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>StorySync v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 StorySync</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 4,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  navigationContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#888',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginLeft: 56,
  },
  actionButton: {
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6200EA',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5252',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#AAA',
  },
});