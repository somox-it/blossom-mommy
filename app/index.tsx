
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import WeeklyProgress from '../components/WeeklyProgress';
import QuickActions from '../components/QuickActions';
import BottomNavigation from '../components/BottomNavigation';
import SimpleBottomSheet from '../components/BottomSheet';
import { weeklyTips } from '../data/pregnancyData';

export default function HomeScreen() {
  const { pregnancyData } = usePregnancyData();
  const [activeTab, setActiveTab] = useState('home');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const quickActions = [
    {
      id: '1',
      title: 'Track Symptoms',
      icon: 'medical-outline',
      color: colors.secondary,
      onPress: () => router.push('/symptoms')
    },
    {
      id: '2',
      title: 'Weight Tracker',
      icon: 'scale-outline',
      color: colors.accent,
      onPress: () => router.push('/weight')
    },
    {
      id: '3',
      title: 'Period Tracking',
      icon: 'calendar-outline',
      color: colors.highlight,
      onPress: () => router.push('/periods')
    },
    {
      id: '4',
      title: 'Shop Essentials',
      icon: 'bag-outline',
      color: colors.primary,
      onPress: () => router.push('/shop')
    }
  ];

  const navItems = [
    {
      id: 'home',
      title: 'Home',
      icon: 'home-outline',
      active: activeTab === 'home',
      onPress: () => setActiveTab('home')
    },
    {
      id: 'track',
      title: 'Track',
      icon: 'analytics-outline',
      active: activeTab === 'track',
      onPress: () => {
        setActiveTab('track');
        router.push('/tracking');
      }
    },
    {
      id: 'periods',
      title: 'Periods',
      icon: 'calendar-outline',
      active: activeTab === 'periods',
      onPress: () => {
        setActiveTab('periods');
        router.push('/periods');
      }
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: 'bag-outline',
      active: activeTab === 'shop',
      onPress: () => {
        setActiveTab('shop');
        router.push('/shop');
      }
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: 'person-outline',
      active: activeTab === 'profile',
      onPress: () => {
        setActiveTab('profile');
        setIsBottomSheetVisible(true);
      }
    }
  ];

  const currentTip = weeklyTips[pregnancyData.currentWeek] || "Every week brings you closer to meeting your little one!";

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          <View style={{ marginBottom: 20 }}>
            <Text style={commonStyles.title}>Hello, Mama! 👶</Text>
            <Text style={commonStyles.textLight}>How are you feeling today?</Text>
          </View>

          <WeeklyProgress 
            currentWeek={pregnancyData.currentWeek}
            dueDate={pregnancyData.dueDate}
            babyName={pregnancyData.babyName}
          />

          <View style={[commonStyles.card, { backgroundColor: colors.highlight, marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { fontSize: 16, marginBottom: 8 }]}>
              Week {pregnancyData.currentWeek} Tip
            </Text>
            <Text style={commonStyles.text}>{currentTip}</Text>
          </View>

          <QuickActions actions={quickActions} />

          <View style={[commonStyles.card, { marginBottom: 100 }]}>
            <Text style={commonStyles.subtitle}>Today&apos;s Reminders</Text>
            <View style={{ marginTop: 12 }}>
              <Text style={commonStyles.textLight}>• Take your prenatal vitamin</Text>
              <Text style={commonStyles.textLight}>• Drink plenty of water</Text>
              <Text style={commonStyles.textLight}>• Get some gentle exercise</Text>
              <Text style={commonStyles.textLight}>• Track your symptoms</Text>
              <Text style={commonStyles.textLight}>• Check your period calendar</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation items={navItems} />

      <SimpleBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={commonStyles.subtitle}>Profile Settings</Text>
          <TouchableOpacity 
            style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}
            onPress={() => {
              setIsBottomSheetVisible(false);
              router.push('/profile');
            }}
          >
            <Text style={commonStyles.text}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}
            onPress={() => {
              setIsBottomSheetVisible(false);
              router.push('/resources');
            }}
          >
            <Text style={commonStyles.text}>Learning Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}
            onPress={() => {
              setIsBottomSheetVisible(false);
              router.push('/appointments');
            }}
          >
            <Text style={commonStyles.text}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ paddingVertical: 15 }}
          >
            <Text style={commonStyles.text}>Settings</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
