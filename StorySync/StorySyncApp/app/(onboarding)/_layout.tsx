import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Slot } from 'expo-router';

export default function RootLayout() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      if (!hasOnboarded) {
        router.replace('/(onboarding)/index');
      } else {
        setChecked(true); 
      }
    };
    checkOnboarding();
  }, []);

  if (!checked) return null;

  return <Slot />;
}
