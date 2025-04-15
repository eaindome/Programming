import React, { useState, useRef, useEffect } from 'react';
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
import { useSignUp } from '@clerk/clerk-expo';
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

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  
  // Enhanced animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const verifySlideAnim = useRef(new Animated.Value(-100)).current;
  const verifyFadeAnim = useRef(new Animated.Value(0)).current;
  
  // Password validation
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: '#ccc'
  });
  
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
  
  const checkPasswordStrength = (pass: string): number => {
    let score = 0;
    let message = '';
    let color = '#ccc';
    
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score === 0) {
      message = 'Very Weak';
      color = '#FF5252';
    } else if (score === 1) {
      message = 'Weak';
      color = '#FF5252';
    } else if (score === 2) {
      message = 'Medium';
      color = '#FFC107';
    } else if (score === 3) {
      message = 'Strong';
      color = '#00BFA5';
    } else {
      message = 'Very Strong';
      color = '#00BFA5';
    }
    
    setPasswordStrength({ score, message, color });
    return score;
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return;
    
    // Simple validation
    if (!emailAddress.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (passwordStrength.score < 2) {
      setError('Please choose a stronger password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      
      // Animate out sign up view
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setPendingVerification(true);
        
        // Animate in verification view
        Animated.parallel([
          Animated.timing(verifyFadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(verifySlideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          })
        ]).start();
      });
      
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign up. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return;
    setIsLoading(true);
    setError('');
    
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        setError('Verification failed. Please try again.');
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Verification failed. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const isSignUpFormValid = emailAddress.trim() !== '' && password.trim() !== '' && passwordStrength.score >= 2;
  const isVerifyFormValid = code.trim().length >= 6;
  
  // Color theme to match sign-in screen
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
          {!pendingVerification ? (
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
                  <Ionicons name="create" size={40} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>Join StorySync</Text>
                <Text style={styles.headerSubtitle}>Begin your creative adventure</Text>
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
                  placeholder="Create password"
                  placeholderTextColor="#AAA"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    checkPasswordStrength(text);
                  }}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityToggle}>
                  <Ionicons 
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#999" 
                  />
                </TouchableOpacity>
              </View>
              
              {password.length > 0 && (
                <View style={styles.passwordStrengthContainer}>
                  <View style={styles.strengthBarContainer}>
                    {[1, 2, 3, 4].map((index) => (
                      <View 
                        key={index}
                        style={[
                          styles.strengthBar,
                          { 
                            backgroundColor: index <= passwordStrength.score 
                              ? passwordStrength.color 
                              : '#E0E0E0' 
                          }
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.message}
                  </Text>
                </View>
              )}
              
              <TouchableOpacity 
                style={[
                  styles.signUpButton, 
                  !isSignUpFormValid && styles.signUpButtonDisabled
                ]}
                onPress={onSignUpPress}
                disabled={!isSignUpFormValid || isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={primaryGradient} 
                  style={styles.buttonGradient}
                >
                  {isLoading ? (
                    <Ionicons name="reload-outline" size={24} color="white" style={styles.loadingIcon} />
                  ) : (
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
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
              
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <Link href="/sign-in" asChild>
                  <TouchableOpacity>
                    <Text style={styles.signInLink}>Sign in</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </Animated.View>
          ) : (
            <Animated.View 
              style={[
                styles.formContainer,
                { 
                  opacity: verifyFadeAnim,
                  transform: [{ translateX: verifySlideAnim }]
                }
              ]}
            >
              <View style={styles.headerContainer}>
                <LinearGradient colors={primaryGradient} style={styles.iconContainer}>
                  <Ionicons name="mail-unread" size={40} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>Verify Email</Text>
                <Text style={styles.headerSubtitle}>
                  Enter the code sent to {emailAddress}
                </Text>
              </View>
              
              {error ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={18} color="#FF5252" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
              
              <View style={styles.codeInputContainer}>
                <Ionicons name="key-outline" size={20} color={primaryGradient[0]} style={styles.inputIcon} />
                <TextInput
                  style={styles.codeInput}
                  placeholder="Enter verification code"
                  placeholderTextColor="#AAA"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                  maxLength={6}
                />
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.signUpButton, 
                  !isVerifyFormValid && styles.signUpButtonDisabled
                ]}
                onPress={onVerifyPress}
                disabled={!isVerifyFormValid || isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={primaryGradient} 
                  style={styles.buttonGradient}
                >
                  {isLoading ? (
                    <Ionicons name="reload-outline" size={24} color="white" style={styles.loadingIcon} />
                  ) : (
                    <Text style={styles.signUpButtonText}>Verify & Continue</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.resendCodeButton}
                onPress={async () => {
                  try {
                    await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Text style={styles.resendCodeText}>Resend code</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
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
  passwordStrengthContainer: {
    marginBottom: 20,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  strengthText: {
    fontSize: 12,
    textAlign: 'right',
  },
  signUpButton: {
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
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIcon: {
    transform: [{ rotate: '45deg' }],
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInText: {
    color: '#666',
    fontSize: 14,
  },
  signInLink: {
    color: '#00BFA5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  codeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    overflow: 'hidden',
  },
  codeInput: {
    flex: 1,
    height: 56,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    letterSpacing: 4,
  },
  resendCodeButton: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 8,
  },
  resendCodeText: {
    color: '#6A11CB',
    fontSize: 14,
  },
});