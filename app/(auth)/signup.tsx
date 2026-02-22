import { useAuth } from '@/context/AuthContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { signUp } = useAuth();

  useEffect(() => {
    router.push('/(auth)/hello');
  }, []);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
    } catch {
      Alert.alert('Error', 'Failed to sign up, try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <LinearGradient
        colors={['#8B1A1A', '#3A0B0B', 'transparent']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[StyleSheet.absoluteFill, { height: 500, opacity: 0.7 }]}
      />

      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center px-8">
          <View className="mb-8 items-center z-10">
            <Text className="text-4xl font-black text-white mb-2 tracking-tighter">
              Be Not Real
            </Text>
            <Text className="text-[15px] text-white/60 font-medium tracking-wide">
              Create your fake life
            </Text>
          </View>

          <View className="mb-6 z-10 gap-4">
            <BlurView
              intensity={20}
              tint="dark"
              className="rounded-[24px] overflow-hidden border border-white/5"
            >
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#8E8E93"
                autoComplete="name"
                className="h-[56px] px-5 text-white text-[15px] bg-white/5"
                value={name}
                onChangeText={setName}
              />
            </BlurView>

            <BlurView
              intensity={20}
              tint="dark"
              className="rounded-[24px] overflow-hidden border border-white/5"
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
                className="h-[56px] px-5 text-white text-[15px] bg-white/5"
                value={email}
                onChangeText={setEmail}
              />
            </BlurView>

            <BlurView
              intensity={20}
              tint="dark"
              className="rounded-[24px] overflow-hidden border border-white/5"
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#8E8E93"
                secureTextEntry
                autoComplete="password"
                autoCapitalize="none"
                className="h-[56px] px-5 text-white text-[15px] bg-white/5"
                value={password}
                onChangeText={setPassword}
              />
            </BlurView>
          </View>

          <TouchableOpacity activeOpacity={0.8} className="z-10" onPress={handleSignUp}>
            <LinearGradient
              colors={['#FF453A', '#FF9F0A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text className="text-white text-[15px] font-black tracking-wider uppercase">
                {loading ? <ActivityIndicator color="white" size={24} /> : 'Create account'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 items-center z-10"
            onPress={() => router.push('/(auth)/login')}
          >
            <Text className="text-white/60 text-[13px] font-medium">
              Already have an account? <Text className="text-white font-bold">Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
