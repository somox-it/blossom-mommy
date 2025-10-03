
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import Icon from '../components/Icon';

export default function ProfileScreen() {
  const { pregnancyData, updatePregnancyData } = usePregnancyData();
  const [isEditing, setIsEditing] = useState(false);
  const [babyName, setBabyName] = useState(pregnancyData.babyName || '');
  const [dueDate, setDueDate] = useState(pregnancyData.dueDate);
  const [lastPeriod, setLastPeriod] = useState(pregnancyData.lastPeriod);

  const handleSave = () => {
    updatePregnancyData({
      babyName: babyName.trim() || undefined,
      dueDate,
      lastPeriod
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const calculateWeeksFromDates = (lastPeriodDate: string) => {
    const lpDate = new Date(lastPeriodDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Profile
          </Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Icon name={isEditing ? "close" : "create-outline"} size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={[commonStyles.card, { alignItems: 'center' }]}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Icon name="person" size={40} color={colors.text} />
            </View>
            <Text style={[commonStyles.subtitle, { textAlign: 'center' }]}>
              Welcome, Mama!
            </Text>
            <Text style={[commonStyles.textLight, { textAlign: 'center' }]}>
              Week {pregnancyData.currentWeek} of your pregnancy journey
            </Text>
          </View>

          {/* Pregnancy Information */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Pregnancy Information</Text>
            
            <View style={{ marginTop: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Baby&apos;s Name</Text>
              {isEditing ? (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    fontFamily: 'OpenSans_400Regular',
                    color: colors.text,
                  }}
                  placeholder="Enter baby's name (optional)"
                  placeholderTextColor={colors.textLight}
                  value={babyName}
                  onChangeText={setBabyName}
                />
              ) : (
                <Text style={[commonStyles.textLight, { fontSize: 16 }]}>
                  {pregnancyData.babyName || 'Not set'}
                </Text>
              )}
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Due Date</Text>
              {isEditing ? (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    fontFamily: 'OpenSans_400Regular',
                    color: colors.text,
                  }}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.textLight}
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              ) : (
                <Text style={[commonStyles.textLight, { fontSize: 16 }]}>
                  {formatDate(pregnancyData.dueDate)}
                </Text>
              )}
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Last Menstrual Period</Text>
              {isEditing ? (
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 16,
                    fontFamily: 'OpenSans_400Regular',
                    color: colors.text,
                  }}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.textLight}
                  value={lastPeriod}
                  onChangeText={setLastPeriod}
                />
              ) : (
                <Text style={[commonStyles.textLight, { fontSize: 16 }]}>
                  {formatDate(pregnancyData.lastPeriod)}
                </Text>
              )}
            </View>

            {isEditing && (
              <TouchableOpacity
                style={[buttonStyles.primary, { marginTop: 20 }]}
                onPress={handleSave}
              >
                <Text style={[commonStyles.text, { color: colors.text, fontWeight: '600' }]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Pregnancy Milestones */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Key Milestones</Text>
            <View style={{ marginTop: 16 }}>
              <View style={[commonStyles.row, { marginBottom: 12 }]}>
                <Icon name="checkmark-circle" size={20} color={colors.success} />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                  Pregnancy confirmed
                </Text>
              </View>
              
              {pregnancyData.currentWeek >= 12 && (
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <Icon name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                    First trimester completed
                  </Text>
                </View>
              )}
              
              {pregnancyData.currentWeek >= 20 && (
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <Icon name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                    Halfway point reached
                  </Text>
                </View>
              )}
              
              {pregnancyData.currentWeek >= 28 && (
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <Icon name="checkmark-circle" size={20} color={colors.success} />
                  <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                    Third trimester started
                  </Text>
                </View>
              )}
              
              {pregnancyData.currentWeek < 40 && (
                <View style={[commonStyles.row, { marginBottom: 12 }]}>
                  <Icon name="ellipse-outline" size={20} color={colors.textLight} />
                  <Text style={[commonStyles.textLight, { marginLeft: 8 }]}>
                    Full term (40 weeks)
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* App Settings */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>App Settings</Text>
            
            <TouchableOpacity style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={commonStyles.row}>
                <Icon name="notifications-outline" size={20} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Notifications
                </Text>
                <Icon name="chevron-forward" size={16} color={colors.textLight} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <View style={commonStyles.row}>
                <Icon name="shield-outline" size={20} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Privacy Settings
                </Text>
                <Icon name="chevron-forward" size={16} color={colors.textLight} />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={{ paddingVertical: 15 }}>
              <View style={commonStyles.row}>
                <Icon name="help-circle-outline" size={20} color={colors.text} />
                <Text style={[commonStyles.text, { marginLeft: 12, flex: 1 }]}>
                  Help & Support
                </Text>
                <Icon name="chevron-forward" size={16} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
