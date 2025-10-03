
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import Icon from '../components/Icon';
import ProgressRing from '../components/ProgressRing';

export default function TrackingScreen() {
  const { pregnancyData, symptoms, weightEntries, appointments } = usePregnancyData();

  const getRecentSymptoms = () => {
    const recent = symptoms.slice(0, 5);
    const symptomCounts: { [key: string]: number } = {};
    
    recent.forEach(entry => {
      entry.symptoms.forEach(symptom => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
      });
    });

    return Object.entries(symptomCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  const getWeightTrend = () => {
    if (weightEntries.length < 2) return null;
    
    const latest = weightEntries[0];
    const previous = weightEntries[1];
    const diff = latest.weight - previous.weight;
    
    return {
      change: Math.abs(diff),
      direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
      unit: latest.unit
    };
  };

  const getNextAppointment = () => {
    const upcoming = appointments.filter(apt => {
      const appointmentDate = new Date(apt.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return appointmentDate >= today;
    });
    
    return upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  const recentSymptoms = getRecentSymptoms();
  const weightTrend = getWeightTrend();
  const nextAppointment = getNextAppointment();
  const progress = (pregnancyData.currentWeek / 40) * 100;

  const trackingCards = [
    {
      id: 'symptoms',
      title: 'Symptoms',
      icon: 'medical-outline',
      color: colors.secondary,
      onPress: () => router.push('/symptoms')
    },
    {
      id: 'weight',
      title: 'Weight',
      icon: 'scale-outline',
      color: colors.accent,
      onPress: () => router.push('/weight')
    },
    {
      id: 'appointments',
      title: 'Appointments',
      icon: 'calendar-outline',
      color: colors.highlight,
      onPress: () => router.push('/appointments')
    }
  ];

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Tracking Overview
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Progress Overview */}
          <View style={[commonStyles.card, { alignItems: 'center' }]}>
            <Text style={commonStyles.subtitle}>Pregnancy Progress</Text>
            <ProgressRing progress={progress} size={120}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: colors.primary }}>
                {pregnancyData.currentWeek}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textLight }}>
                weeks
              </Text>
            </ProgressRing>
            <Text style={[commonStyles.textLight, { marginTop: 12, textAlign: 'center' }]}>
              {40 - pregnancyData.currentWeek} weeks to go
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Track Today</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
              {trackingCards.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={[
                    {
                      flex: 1,
                      aspectRatio: 1,
                      backgroundColor: card.color,
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 4,
                    }
                  ]}
                  onPress={card.onPress}
                >
                  <Icon name={card.icon as any} size={24} color={colors.text} />
                  <Text style={[commonStyles.textLight, { marginTop: 8, fontSize: 12 }]}>
                    {card.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Symptoms */}
          {recentSymptoms.length > 0 && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Most Common Symptoms</Text>
              <Text style={[commonStyles.textLight, { marginBottom: 12 }]}>
                Based on your recent entries
              </Text>
              {recentSymptoms.map(([symptom, count]) => (
                <View key={symptom} style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={[commonStyles.text, { flex: 1 }]}>{symptom}</Text>
                  <View style={{
                    backgroundColor: colors.secondary,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 12,
                  }}>
                    <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                      {count} times
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Weight Trend */}
          {weightTrend && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Weight Trend</Text>
              <View style={[commonStyles.row, { alignItems: 'center', marginTop: 8 }]}>
                <Icon 
                  name={weightTrend.direction === 'up' ? 'trending-up' : weightTrend.direction === 'down' ? 'trending-down' : 'remove'} 
                  size={20} 
                  color={weightTrend.direction === 'up' ? colors.success : weightTrend.direction === 'down' ? colors.danger : colors.textLight}
                />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                  {weightTrend.direction === 'up' ? '+' : weightTrend.direction === 'down' ? '-' : ''}
                  {weightTrend.change.toFixed(1)} {weightTrend.unit} from last entry
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { marginTop: 4 }]}>
                Current: {weightEntries[0]?.weight} {weightEntries[0]?.unit}
              </Text>
            </View>
          )}

          {/* Next Appointment */}
          {nextAppointment && (
            <View style={[commonStyles.card, { backgroundColor: colors.highlight }]}>
              <Text style={commonStyles.subtitle}>Next Appointment</Text>
              <Text style={[commonStyles.text, { fontWeight: '600', marginTop: 8 }]}>
                {nextAppointment.title}
              </Text>
              <Text style={commonStyles.textLight}>
                {nextAppointment.date} at {nextAppointment.time}
              </Text>
              <Text style={commonStyles.textLight}>
                with {nextAppointment.doctor}
              </Text>
            </View>
          )}

          {/* Statistics */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Your Stats</Text>
            <View style={[commonStyles.row, { marginTop: 16 }]}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.primary }]}>
                  {symptoms.length}
                </Text>
                <Text style={commonStyles.textLight}>Symptom Entries</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.accent }]}>
                  {weightEntries.length}
                </Text>
                <Text style={commonStyles.textLight}>Weight Records</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[commonStyles.text, { fontSize: 24, fontWeight: '700', color: colors.secondary }]}>
                  {appointments.length}
                </Text>
                <Text style={commonStyles.textLight}>Appointments</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
