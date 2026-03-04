import { useAuth } from '@/context/AuthContext';
import { Post } from '@/hooks/usePosts';
import { formatTimeAgo, formatTimeRemaining } from '@/lib/date-helper';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const isMyPost = user?.id === post.user_id;

  return (
    <View className="mb-10 px-4">
      <View className="relative shadow-2xl shadow-black/50">
        <View className="w-full aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-white/5">
          <Image
            source={{ uri: post.image_url }}
            contentFit="cover"
            style={{ width: '100%', height: '100%' }}
          />

          <View className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            <Text className="text-white/90 text-[11px] font-bold tracking-wider uppercase">
              {formatTimeRemaining(post.expires_at)}
            </Text>
          </View>
        </View>

        <View className="-mt-16 px-4">
          <BlurView
            intensity={40}
            tint="dark"
            className="rounded-[24px] border border-white/10 overflow-hidden p-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden mr-3">
                  {post.profiles?.profile_image_url ? (
                    <Image
                      source={{ uri: post.profiles.profile_image_url }}
                      contentFit="cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center bg-white/5">
                      <Text className="text-white/50 font-black text-lg">
                        {post.profiles?.name?.charAt(0)?.toUpperCase() || '?'}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="flex-1">
                  <Text className="text-white font-bold text-[15px]" numberOfLines={1}>
                    {isMyPost ? 'You' : post.profiles?.name || 'Unknown User'}
                  </Text>
                  <Text className="text-white/50 text-[12px]" numberOfLines={1}>
                    @{post.profiles?.username || 'unknown'} • {formatTimeAgo(post.created_at)}
                  </Text>
                </View>
              </View>

              {isMyPost && (
                <TouchableOpacity className="p-2 ml-2">
                  <Text className="text-white/50 font-black tracking-widest text-[13px]">...</Text>
                </TouchableOpacity>
              )}
            </View>

            {post.description ? (
              <View className="mt-3">
                <Text className="text-white/90 text-[14px] leading-5 font-medium tracking-wide">
                  {post.description}
                </Text>
              </View>
            ) : null}
          </BlurView>
        </View>
      </View>
    </View>
  );
}
