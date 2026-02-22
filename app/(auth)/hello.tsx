import { supabase } from '@/lib/supabase/client';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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

export default function Hello() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Error', 'You need to grant permission to access your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Error', 'You need to grant permission to access your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert('Select profile image', 'choose an option', [
      { text: 'Take photo', onPress: () => handleTakePhoto() },
      { text: 'Choose from library', onPress: () => handleImagePicker() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleContinue = async () => {
    if (!name || !username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters long');
      return;
    }

    setLoading(true);
    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username);

      if (existingUser) {
        Alert.alert('Error', 'Username already exists');
        setLoading(false);
        return;
      }
    } catch {
      Alert.alert('Error', 'Failed to continue, try again later');
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
        <View className="flex-1 justify-center px-6 z-10">
          <View className="mb-8 items-center z-10">
            <Text className="text-4xl font-black text-white mb-2 tracking-tighter">
              Complete Your Profile
            </Text>
            <Text className="text-[15px] text-white/60 font-medium tracking-wide text-center">
              Add your information to get started
            </Text>
          </View>

          <View className="items-center mb-8 z-10">
            <TouchableOpacity activeOpacity={0.8} className="relative" onPress={showImagePicker}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: 100, height: 100, borderRadius: 60 }}
                />
              ) : (
                <View className="w-[100px] h-[100px] rounded-full border-2 border-dashed border-white/20 items-center justify-center bg-white/5">
                  <Text className="text-white/40 text-4xl font-light mb-1">+</Text>
                </View>
              )}
              <View className="absolute bottom-0 right-0 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Text className="text-black text-[11px] font-black uppercase tracking-wider">
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="mb-8 z-10 gap-4">
            <BlurView
              intensity={20}
              tint="dark"
              className="rounded-[24px] overflow-hidden border border-white/5"
            >
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#8E8E93"
                className="h-[56px] px-5 text-white text-[15px] bg-white/5"
                value={name}
                onChangeText={setName}
                autoComplete="name"
              />
            </BlurView>

            <BlurView
              intensity={20}
              tint="dark"
              className="rounded-[24px] overflow-hidden border border-white/5"
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#8E8E93"
                autoCapitalize="none"
                className="h-[56px] px-5 text-white text-[15px] bg-white/5"
                value={username}
                onChangeText={setUsername}
                autoComplete="username"
              />
            </BlurView>
          </View>

          <TouchableOpacity activeOpacity={0.8} className="z-10" onPress={handleContinue}>
            <LinearGradient
              colors={['#FF453A', '#FF9F0A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {loading ? (
                <ActivityIndicator color="white" size={24} />
              ) : (
                <Text className="text-white text-[15px] font-black tracking-wider uppercase">
                  Continue
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
