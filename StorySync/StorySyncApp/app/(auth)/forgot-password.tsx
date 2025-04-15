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
  Alert,
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

export default function ForgotPasswordScreen() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  const [emailAddress, setEmailAddress] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const verifyFadeAnim = useRef(new Animated.Value(0)).current;
  const verifySlideAnim = useRef(new Animated.Value(-100)).current;
  
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
  
  const handleResetRequest = async () => {
    if (!isLoaded || isLoading) return;
    
    // Simple validation
    if (!emailAddress.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      if (!signIn) {
        setError('Sign-in object is not available.');
        return;
      }
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });
      
      // Animate out request view
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
        setStep('verify');
        
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
      setError(err.errors?.[0]?.message || 'Failed to send reset code. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetConfirm = async () => {
    if (!isLoaded || isLoading) return;
    
    if (passwordStrength.score < 2) {
      setError('Please choose a stronger password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });
      
      if (result.status === 'complete') {
        Alert.alert(
          'Success',
          'Your password has been reset successfully.',
          [
            { 
              text: 'Sign In Now', 
              onPress: () => router.replace('/sign-in')
            }
          ]
        );
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to reset password. Please try again.');
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const isRequestFormValid = emailAddress.trim() !== '';
  const isResetFormValid = code.trim() !== '' && newPassword.trim() !== '' && passwordStrength.score >= 2;
  
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
          {step === 'request' ? (
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
                  <Ionicons name="key-outline" size={40} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>Reset Password</Text>
                <Text style={styles.headerSubtitle}>Enter your email to receive a reset code</Text>
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
              
              <TouchableOpacity 
                style={[
                  styles.resetButton, 
                  !isRequestFormValid && styles.resetButtonDisabled
                ]}
                onPress={handleResetRequest}
                disabled={!isRequestFormValid || isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={primaryGradient} 
                  style={styles.buttonGradient}
                >
                  {isLoading ? (
                    <Ionicons name="reload-outline" size={24} color="white" style={styles.loadingIcon} />
                  ) : (
                    <Text style={styles.resetButtonText}>Send Reset Code</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <Link href="/sign-in" asChild>
                <TouchableOpacity style={styles.returnToSignInButton}>
                  <Text style={styles.returnToSignInText}>Return to Sign In</Text>
                </TouchableOpacity>
              </Link>
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
                  <Ionicons name="lock-open-outline" size={40} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>Create New Password</Text>
                <Text style={styles.headerSubtitle}>
                  Enter the code sent to {emailAddress} and create a new password
                </Text>
              </View>
              
              {error ? (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={18} color="#FF5252" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
              
              <View style={styles.inputContainer}>
                <Ionicons name="key-outline" size={20} color={primaryGradient[0]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Verification code"
                  placeholderTextColor="#AAA"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                  maxLength={6}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={primaryGradient[0]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="New password"
                  placeholderTextColor="#AAA"
                  secureTextEntry={!isPasswordVisible}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
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
              
              {newPassword.length > 0 && (
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
                  styles.resetButton, 
                  !isResetFormValid && styles.resetButtonDisabled
                ]}
                onPress={handleResetConfirm}
                disabled={!isResetFormValid || isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient 
                  colors={primaryGradient} 
                  style={styles.buttonGradient}
                >
                  {isLoading ? (
                    <Ionicons name="reload-outline" size={24} color="white" style={styles.loadingIcon} />
                  ) : (
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.resendCodeButton}
                onPress={async () => {
                  try {
                    await signIn?.create({
                      strategy: 'reset_password_email_code',
                      identifier: emailAddress,
                    });
                    Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
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
    flex: 1,
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
  resetButton: {
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
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIcon: {
    transform: [{ rotate: '45deg' }],
  },
  returnToSignInButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  returnToSignInText: {
    color: '#6A11CB',
    fontSize: 14,
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