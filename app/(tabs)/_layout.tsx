import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  return (
    <NativeTabs tintColor="#FF453A" labelStyle={{ color: '#8E8E93' }}>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf={'house'} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf={'person'} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
