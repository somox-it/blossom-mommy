
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { samplePeriodEntries, calculateCycleData } from '../data/periodData';
import { PeriodEntry } from '../types';

export default function PeriodsScreen() {
  const [periods, setPeriods] = useState<PeriodEntry[]>(samplePeriodEntries);
  const cycleData = calculateCycleData(periods);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilNext = () => {
    if (!cycleData.nextPredictedPeriod) return 0;
    const today = new Date();
    const nextPeriod = new Date(cycleData.nextPredictedPeriod);
    const diffTime = nextPeriod.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return colors.highlight;
      case 'medium': return colors.secondary;
      case 'heavy': return colors.accent;
      default: return colors.primary;
    }
  };

  const daysUntilNext = getDaysUntilNext();

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Period Tracking</Text>
        <TouchableOpacity onPress={() => router.push('/period-log')}>
          <Icon name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Cycle Overview */}
          <View style={[commonStyles.card, { backgroundColor: colors.primary, marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { color: 'white', marginBottom: 16 }]}>
              Cycle Overview
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.text, { color: 'white', fontSize: 24, fontWeight: 'bold' }]}>
                  {daysUntilNext}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.8)' }]}>
                  Days until next
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.text, { color: 'white', fontSize: 24, fontWeight: 'bold' }]}>
                  {cycleData.averageCycleLength}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.8)' }]}>
                  Avg cycle length
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={[commonStyles.text, { color: 'white', fontSize: 24, fontWeight: 'bold' }]}>
                  {cycleData.averagePeriodLength}
                </Text>
                <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.8)' }]}>
                  Avg period length
                </Text>
              </View>
            </View>
            {cycleData.nextPredictedPeriod && (
              <Text style={[commonStyles.textLight, { color: 'rgba(255,255,255,0.8)', textAlign: 'center' }]}>
                Next period predicted: {formatDate(cycleData.nextPredictedPeriod)}
              </Text>
            )}
          </View>

          {/* Quick Actions */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Quick Actions</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity 
                style={[commonStyles.button, { flex: 1, marginRight: 8, backgroundColor: colors.secondary }]}
                onPress={() => router.push('/period-log')}
              >
                <Icon name="add" size={20} color="white" />
                <Text style={[commonStyles.buttonText, { marginLeft: 8 }]}>Log Period</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[commonStyles.button, { flex: 1, marginLeft: 8, backgroundColor: colors.accent }]}
                onPress={() => router.push('/period-calendar')}
              >
                <Icon name="calendar" size={20} color="white" />
                <Text style={[commonStyles.buttonText, { marginLeft: 8 }]}>Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Periods */}
          <View style={[commonStyles.card, { marginBottom: 100 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Recent Periods</Text>
            {periods.map((period) => (
              <View key={period.id} style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border
              }}>
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: getFlowColor(period.flow),
                  marginRight: 12
                }} />
                <View style={{ flex: 1 }}>
                  <Text style={commonStyles.text}>
                    {formatDate(period.startDate)} - {period.endDate ? formatDate(period.endDate) : 'Ongoing'}
                  </Text>
                  <Text style={commonStyles.textLight}>
                    {period.flow.charAt(0).toUpperCase() + period.flow.slice(1)} flow
                    {period.symptoms.length > 0 && ` • ${period.symptoms.join(', ')}`}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon name="chevron-forward" size={20} color={colors.textLight} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
