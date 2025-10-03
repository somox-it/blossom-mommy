
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import ProgressRing from './ProgressRing';

interface WeeklyProgressProps {
  currentWeek: number;
  dueDate: string;
  babyName?: string;
}

export default function WeeklyProgress({ currentWeek, dueDate, babyName = 'Baby' }: WeeklyProgressProps) {
  const progress = (currentWeek / 40) * 100;
  const weeksLeft = 40 - currentWeek;
  
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <View style={[commonStyles.card, styles.container]}>
      <Text style={commonStyles.subtitle}>Your Pregnancy Journey</Text>
      
      <View style={styles.progressSection}>
        <ProgressRing progress={progress} size={140}>
          <Text style={styles.weekNumber}>{currentWeek}</Text>
          <Text style={styles.weekLabel}>weeks</Text>
        </ProgressRing>
        
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Due Date</Text>
            <Text style={styles.infoValue}>{formatDueDate(dueDate)}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Weeks to Go</Text>
            <Text style={styles.infoValue}>{weeksLeft} weeks</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Baby&apos;s Name</Text>
            <Text style={styles.infoValue}>{babyName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  weekNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'OpenSans_700Bold',
  },
  weekLabel: {
    fontSize: 14,
    color: colors.textLight,
    fontFamily: 'OpenSans_400Regular',
  },
  infoSection: {
    marginLeft: 30,
    flex: 1,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textLight,
    fontFamily: 'OpenSans_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
    marginTop: 2,
  },
});
