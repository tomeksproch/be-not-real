import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
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
      // setProfileImage(result.assets[0].uri);
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
      // setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert('Select profile image', 'choose an option', [
      { text: 'Take photo', onPress: () => handleTakePhoto() },
      { text: 'Choose from library', onPress: () => handleImagePicker() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-black">
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
        className="z-50 shadow-lg shadow-[#FF453A]/60 flex-1 justify-center items-center absolute bottom-32 right-4"
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
          <Text className="text-white text-5xl font-light pb-1">+</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
