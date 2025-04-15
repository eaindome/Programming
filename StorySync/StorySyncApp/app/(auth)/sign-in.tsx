import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Simple LinearGradient component (replace with expo-linear-gradient in your actual app)
const LinearGradient = ({ colors, style, children }: { colors: string[], style?: any, children?: React.ReactNode }) => {
  return (
    <View style={[{ backgroundColor: colors[0] }, style]}>
      {children}
    </View>
  );
};

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Enhanced animations
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const backgroundOpacity = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      })
    ]).start();
  }, []);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const onSignInPress = async () => {
    // For demo purposes, simply navigate
    router.replace('/index');
    
    // Uncomment the following for actual implementation
    // if (!isLoaded) return;
    // setIsLoading(true);
    // setError('');
    
    // try {
    //   const signInAttempt = await signIn.create({
    //     identifier: emailAddress,
    //     password,
    //   });
      
    //   if (signInAttempt.status === 'complete') {
    //     await setActive({ session: signInAttempt.createdSessionId });
    //     router.replace('/');
    //   } else {
    //     setError('Something went wrong. Please try again.');
    //     console.error(JSON.stringify(signInAttempt, null, 2));
    //   }
    // } catch (err: any) {
    //   setError(err.errors?.[0]?.message || 'Failed to sign in. Please check your credentials.');
    //   console.error(JSON.stringify(err, null, 2));
    // } finally {
    //   setIsLoading(false);
    // }
  };
  
  const isFormValid = emailAddress.trim() !== '' && password.trim() !== '';
  
  // Color theme to match onboarding screen
  const primaryGradient = ['#6A11CB', '#2575FC'];
  const secondaryColor = '#00BFA5';
  
  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: backgroundOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['#FFFFFF', '#F0F4FF']
          })
        }
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Background elements */}
      <Animated.View style={[
        styles.backgroundCircle, 
        { 
          opacity: backgroundOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.7]
          }),
          top: -height * 0.2,
          right: -width * 0.3,
          width: width * 0.8,
          height: width * 0.8,
          backgroundColor: primaryGradient[0],
        }
      ]} />
      
      <Animated.View style={[
        styles.backgroundCircle, 
        { 
          opacity: backgroundOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5]
          }),
          bottom: -height * 0.1,
          left: -width * 0.4,
          width: width * 0.7,
          height: width * 0.7,
          backgroundColor: secondaryColor,
        }
      ]} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View 
            style={[
              styles.formContainer, 
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.headerContainer}>
              <LinearGradient colors={primaryGradient} style={styles.iconContainer}>
                <Ionicons name="book" size={40} color="white" />
              </LinearGradient>
              <Text style={styles.headerTitle}>Welcome Back</Text>
              <Text style={styles.headerSubtitle}>Sign in to continue your creative journey</Text>
            </View>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={18} color="#FF5252" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={primaryGradient[0]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#AAA"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={primaryGradient[0]} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#AAA"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
                <Ionicons 
                  name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.signInButton, 
                !isFormValid && styles.signInButtonDisabled
              ]}
              onPress={onSignInPress}
              disabled={!isFormValid || isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient 
                colors={primaryGradient} 
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <Ionicons name="reload-outline" size={24} color="white" style={styles.loadingIcon} />
                ) : (
                  <Text style={styles.signInButtonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
            
            <Link href="/forgot-password" asChild>
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link href="/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    position: 'relative',
    overflow: 'hidden',
  },
  keyboardAvoid: {
    flex: 1,
  },
  backgroundCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.7,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6A11CB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 14,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    overflow: 'hidden',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  visibilityToggle: {
    padding: 14,
  },
  signInButton: {
    height: 56,
    borderRadius: 16,
    marginTop: 8,
    overflow: 'hidden',
    shadowColor: '#6A11CB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIcon: {
    transform: [{ rotate: '45deg' }],
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  forgotPasswordText: {
    color: '#6A11CB',
    fontSize: 14,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E7FF',
  },
  dividerText: {
    color: '#999',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8FAFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: '#666',
    fontSize: 14,
  },
  signUpLink: {
    color: '#00BFA5',
    fontSize: 14,
    fontWeight: 'bold',
  },
});