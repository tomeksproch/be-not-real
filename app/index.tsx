import { useAuth } from '@/context/AuthContext';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <ActivityIndicator size="large" color="#FF453A" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  if (user && !user.onboardingCompleted) {
    return <Redirect href="/(auth)/hello" />;
  }

  return <Redirect href="/(tabs)" />;
}
