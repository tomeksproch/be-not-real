import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 justify-center items-center bg-black">
      <Text className="text-3xl font-bold text-white">Profile</Text>
    </SafeAreaView>
  );
}
