
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import Icon from '../components/Icon';
import { commonSymptoms } from '../data/pregnancyData';

export default function SymptomsScreen() {
  const { symptoms, addSymptomEntry } = usePregnancyData();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState(3);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('Please select at least one symptom');
      return;
    }

    addSymptomEntry({
      date: new Date().toISOString().split('T')[0],
      symptoms: selectedSymptoms,
      severity,
      notes: notes.trim() || undefined
    });

    Alert.alert('Success', 'Symptoms logged successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Track Symptoms
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>How are you feeling today?</Text>
            <Text style={commonStyles.textLight}>Select all symptoms you&apos;re experiencing</Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
              {commonSymptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      margin: 4,
                      borderWidth: 1,
                    },
                    selectedSymptoms.includes(symptom)
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: 'transparent', borderColor: colors.border }
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    commonStyles.textLight,
                    selectedSymptoms.includes(symptom) && { color: colors.text }
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Severity Level</Text>
            <Text style={commonStyles.textLight}>Rate your overall discomfort (1-5)</Text>
            
            <View style={[commonStyles.row, { marginTop: 16, justifyContent: 'space-around' }]}>
              {[1, 2, 3, 4, 5].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    {
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 2,
                    },
                    severity === level
                      ? { backgroundColor: colors.secondary, borderColor: colors.secondary }
                      : { backgroundColor: 'transparent', borderColor: colors.border }
                  ]}
                  onPress={() => setSeverity(level)}
                >
                  <Text style={[
                    commonStyles.text,
                    { fontWeight: '600' },
                    severity === level && { color: colors.text }
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={[commonStyles.row, { marginTop: 8 }]}>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Mild</Text>
              <Text style={[commonStyles.textLight, { fontSize: 12 }]}>Severe</Text>
            </View>
          </View>

          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Additional Notes</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                marginTop: 8,
                minHeight: 80,
                textAlignVertical: 'top',
                fontFamily: 'OpenSans_400Regular',
                fontSize: 16,
                color: colors.text,
              }}
              placeholder="Any additional details about your symptoms..."
              placeholderTextColor={colors.textLight}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {symptoms.length > 0 && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Recent Entries</Text>
              {symptoms.slice(0, 3).map((entry) => (
                <View key={entry.id} style={{ 
                  paddingVertical: 12, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border 
                }}>
                  <Text style={commonStyles.text}>{entry.date}</Text>
                  <Text style={commonStyles.textLight}>
                    {entry.symptoms.join(', ')} • Severity: {entry.severity}/5
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
              Save Symptoms
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
