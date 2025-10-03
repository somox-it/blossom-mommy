
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { periodSymptoms } from '../data/periodData';

export default function PeriodLogScreen() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (!startDate) {
      Alert.alert('Error', 'Please enter a start date');
      return;
    }

    // Here you would save to your data store
    console.log('Saving period entry:', {
      startDate,
      endDate,
      flow,
      symptoms: selectedSymptoms,
      notes
    });

    Alert.alert('Success', 'Period entry saved successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getFlowColor = (flowType: string) => {
    switch (flowType) {
      case 'light': return colors.highlight;
      case 'medium': return colors.secondary;
      case 'heavy': return colors.accent;
      default: return colors.primary;
    }
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Log Period</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Dates */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Period Dates</Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>Start Date *</Text>
              <TextInput
                style={commonStyles.input}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textLight}
              />
            </View>

            <View>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>End Date (optional)</Text>
              <TextInput
                style={commonStyles.input}
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          {/* Flow Intensity */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Flow Intensity</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {['light', 'medium', 'heavy'].map((flowType) => (
                <TouchableOpacity
                  key={flowType}
                  style={[
                    commonStyles.button,
                    { 
                      flex: 1, 
                      marginHorizontal: 4,
                      backgroundColor: flow === flowType ? getFlowColor(flowType) : colors.background,
                      borderWidth: 1,
                      borderColor: getFlowColor(flowType)
                    }
                  ]}
                  onPress={() => setFlow(flowType as 'light' | 'medium' | 'heavy')}
                >
                  <Text style={[
                    commonStyles.buttonText,
                    { color: flow === flowType ? 'white' : getFlowColor(flowType) }
                  ]}>
                    {flowType.charAt(0).toUpperCase() + flowType.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Symptoms */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Symptoms</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 }}>
              {periodSymptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    commonStyles.tag,
                    {
                      backgroundColor: selectedSymptoms.includes(symptom) ? colors.primary : colors.background,
                      borderColor: colors.primary,
                      borderWidth: 1,
                      margin: 4
                    }
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    commonStyles.tagText,
                    { color: selectedSymptoms.includes(symptom) ? 'white' : colors.primary }
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notes */}
          <View style={[commonStyles.card, { marginBottom: 100 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Notes</Text>
            <TextInput
              style={[commonStyles.input, { height: 100, textAlignVertical: 'top' }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Any additional notes about this period..."
              placeholderTextColor={colors.textLight}
              multiline
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
