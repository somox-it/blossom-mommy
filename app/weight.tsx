
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import Icon from '../components/Icon';

export default function WeightScreen() {
  const { weightEntries, addWeightEntry } = usePregnancyData();
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

  const handleSave = () => {
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      Alert.alert('Please enter a valid weight');
      return;
    }

    addWeightEntry({
      date: new Date().toISOString().split('T')[0],
      weight: weightValue,
      unit
    });

    Alert.alert('Success', 'Weight logged successfully!', [
      { text: 'OK', onPress: () => {
        setWeight('');
        router.back();
      }}
    ]);
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

  const trend = getWeightTrend();

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Weight Tracker
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Log Your Weight</Text>
            <Text style={commonStyles.textLight}>Track your weight gain throughout pregnancy</Text>
            
            <View style={{ marginTop: 20 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Weight</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 18,
                  fontFamily: 'OpenSans_400Regular',
                  color: colors.text,
                }}
                placeholder="Enter your weight"
                placeholderTextColor={colors.textLight}
                value={weight}
                onChangeText={setWeight}
                keyboardType="decimal-pad"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Unit</Text>
              <View style={commonStyles.row}>
                <TouchableOpacity
                  style={[
                    {
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: 'center',
                      marginRight: 8,
                      borderWidth: 1,
                    },
                    unit === 'kg'
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: 'transparent', borderColor: colors.border }
                  ]}
                  onPress={() => setUnit('kg')}
                >
                  <Text style={[
                    commonStyles.text,
                    { fontWeight: '600' },
                    unit === 'kg' && { color: colors.text }
                  ]}>
                    Kilograms (kg)
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    {
                      flex: 1,
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: 'center',
                      marginLeft: 8,
                      borderWidth: 1,
                    },
                    unit === 'lbs'
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: 'transparent', borderColor: colors.border }
                  ]}
                  onPress={() => setUnit('lbs')}
                >
                  <Text style={[
                    commonStyles.text,
                    { fontWeight: '600' },
                    unit === 'lbs' && { color: colors.text }
                  ]}>
                    Pounds (lbs)
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {trend && (
            <View style={[commonStyles.card, { backgroundColor: colors.highlight }]}>
              <Text style={commonStyles.subtitle}>Weight Trend</Text>
              <View style={[commonStyles.row, { alignItems: 'center', marginTop: 8 }]}>
                <Icon 
                  name={trend.direction === 'up' ? 'trending-up' : trend.direction === 'down' ? 'trending-down' : 'remove'} 
                  size={20} 
                  color={trend.direction === 'up' ? colors.success : trend.direction === 'down' ? colors.danger : colors.textLight}
                />
                <Text style={[commonStyles.text, { marginLeft: 8 }]}>
                  {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                  {trend.change.toFixed(1)} {trend.unit} from last entry
                </Text>
              </View>
            </View>
          )}

          {weightEntries.length > 0 && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Recent Entries</Text>
              {weightEntries.slice(0, 5).map((entry) => (
                <View key={entry.id} style={{ 
                  paddingVertical: 12, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={commonStyles.text}>{entry.date}</Text>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {entry.weight} {entry.unit}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[buttonStyles.primary, { marginVertical: 20 }]}
            onPress={handleSave}
          >
            <Text style={[commonStyles.text, { color: colors.text, fontWeight: '600' }]}>
              Save Weight
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
