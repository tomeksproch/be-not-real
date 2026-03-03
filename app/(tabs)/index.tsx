import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

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
      setPreviewImage(result.assets[0].uri);
      setShowPreview(true);
      setDescription('');
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
      setPreviewImage(result.assets[0].uri);
      setShowPreview(true);
      setDescription('');
    }
  };

  const showImagePicker = () => {
    Alert.alert('Select image', 'choose an option', [
      { text: 'Take photo', onPress: () => handleTakePhoto() },
      { text: 'Choose from library', onPress: () => handleImagePicker() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handlePost = () => {
    console.log('Posting with description:', description);
    setShowPreview(false);
    setPreviewImage(null);
    setDescription('');
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-black">
      <StatusBar style="light" />

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl font-black text-white/10 tracking-tighter text-center mb-2">
          Be Not Real
        </Text>
        <Text className="text-white/50 text-[15px] font-medium tracking-wide text-center">
          Twój profil jest zbyt autentyczny.
        </Text>
        <Text className="text-white/30 text-[13px] mt-1 text-center">
          Kliknij plusa i sfałszuj swój dzień.
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        className="z-50 shadow-lg shadow-[#FF453A]/60 justify-center items-center absolute bottom-12 right-6"
        onPress={showImagePicker}
      >
        <LinearGradient
          colors={['#FF453A', '#FF9F0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className="text-white text-4xl font-light pb-1">+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Modal
        visible={showPreview}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowPreview(false)}
      >
        <SafeAreaView className="flex-1 bg-black">
          <LinearGradient
            colors={['#8B1A1A', '#3A0B0B', 'transparent']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[StyleSheet.absoluteFill, { height: 500, opacity: 0.7 }]}
          />

          <View className="flex-1 justify-center px-6 z-10 gap-6">
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={() => setShowPreview(false)}>
                <View className="bg-white/10 px-4 py-2.5 rounded-full border border-white/5">
                  <Text className="text-white/80 text-[13px] font-bold">Cancel</Text>
                </View>
              </TouchableOpacity>
              <Text className="text-white text-xl font-black uppercase tracking-wider z-20">
                Draft Post
              </Text>
              <View className="w-16" />
            </View>

            <View className="items-center z-20">
              <View className="w-full aspect-square rounded-[36px] overflow-hidden border border-white/10 shadow-xl shadow-black/60 bg-white/5">
                {previewImage && (
                  <Image
                    source={{ uri: previewImage }}
                    contentFit="cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </View>
            </View>

            <View className="mb-6 z-20">
              <BlurView
                intensity={20}
                tint="dark"
                className="rounded-[24px] overflow-hidden border border-white/5"
              >
                <TextInput
                  placeholder="Add a description to fake your life (optional)"
                  placeholderTextColor="#8E8E93"
                  value={description}
                  onChangeText={setDescription}
                  className="h-32 px-5 py-4 text-white text-[15px] bg-white/5"
                  maxLength={500}
                  textAlignVertical="top"
                  multiline
                />
              </BlurView>
            </View>

            <View className="mt-auto mb-6 z-20">
              <TouchableOpacity activeOpacity={0.8} onPress={handlePost}>
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
                  <Text className="text-white text-[15px] font-black tracking-wider uppercase">
                    Post
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
