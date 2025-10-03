
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { samplePeriodEntries, calculateCycleData } from '../data/periodData';

export default function PeriodCalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const periods = samplePeriodEntries;
  const cycleData = calculateCycleData(periods);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isPeriodDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return periods.some(period => {
      const start = new Date(period.startDate);
      const end = period.endDate ? new Date(period.endDate) : start;
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const isPredictedPeriod = (day: number) => {
    if (!cycleData.nextPredictedPeriod) return false;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const predicted = new Date(cycleData.nextPredictedPeriod);
    const current = new Date(dateStr);
    const diffDays = Math.abs(current.getTime() - predicted.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= cycleData.averagePeriodLength;
  };

  const isOvulationDay = (day: number) => {
    if (!cycleData.ovulationDate) return false;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === cycleData.ovulationDate;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={{ flex: 1, height: 40 }} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPeriod = isPeriodDay(day);
      const isPredicted = isPredictedPeriod(day);
      const isOvulation = isOvulationDay(day);
      const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();

      let backgroundColor = 'transparent';
      let textColor = colors.text;

      if (isPeriod) {
        backgroundColor = colors.accent;
        textColor = 'white';
      } else if (isPredicted) {
        backgroundColor = colors.secondary + '40';
        textColor = colors.secondary;
      } else if (isOvulation) {
        backgroundColor = colors.highlight;
        textColor = 'white';
      }

      days.push(
        <TouchableOpacity
          key={day}
          style={{
            flex: 1,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor,
            borderRadius: 20,
            margin: 2,
            borderWidth: isToday ? 2 : 0,
            borderColor: colors.primary
          }}
        >
          <Text style={{ color: textColor, fontWeight: isToday ? 'bold' : 'normal' }}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    // Group days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(
        <View key={i} style={{ flexDirection: 'row', marginBottom: 4 }}>
          {days.slice(i, i + 7)}
        </View>
      );
    }

    return weeks;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Period Calendar</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Month Navigation */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <TouchableOpacity onPress={() => navigateMonth('prev')}>
                <Icon name="chevron-back" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={[commonStyles.subtitle, { fontSize: 18 }]}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth('next')}>
                <Icon name="chevron-forward" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              {dayNames.map(day => (
                <View key={day} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[commonStyles.textLight, { fontSize: 12 }]}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendar grid */}
            {renderCalendar()}
          </View>

          {/* Legend */}
          <View style={[commonStyles.card, { marginBottom: 100 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Legend</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 8 }}>
                <View style={{ width: 16, height: 16, backgroundColor: colors.accent, borderRadius: 8, marginRight: 8 }} />
                <Text style={commonStyles.textLight}>Period</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20, marginBottom: 8 }}>
                <View style={{ width: 16, height: 16, backgroundColor: colors.secondary + '40', borderRadius: 8, marginRight: 8 }} />
                <Text style={commonStyles.textLight}>Predicted</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 16, height: 16, backgroundColor: colors.highlight, borderRadius: 8, marginRight: 8 }} />
                <Text style={commonStyles.textLight}>Ovulation</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
