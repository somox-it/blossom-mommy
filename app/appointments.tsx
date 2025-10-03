
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { usePregnancyData } from '../hooks/usePregnancyData';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

export default function AppointmentsScreen() {
  const { appointments, addAppointment } = usePregnancyData();
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!title.trim() || !date.trim() || !time.trim() || !doctor.trim()) {
      Alert.alert('Please fill in all required fields');
      return;
    }

    addAppointment({
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      doctor: doctor.trim(),
      notes: notes.trim() || undefined
    });

    // Reset form
    setTitle('');
    setDate('');
    setTime('');
    setDoctor('');
    setNotes('');
    setIsAddingAppointment(false);

    Alert.alert('Success', 'Appointment added successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  };

  const upcomingAppointments = appointments.filter(apt => isUpcoming(apt.date));
  const pastAppointments = appointments.filter(apt => !isUpcoming(apt.date));

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Appointments
          </Text>
          <TouchableOpacity onPress={() => setIsAddingAppointment(true)}>
            <Icon name="add" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {upcomingAppointments.length > 0 && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Upcoming Appointments</Text>
              {upcomingAppointments.map((appointment) => (
                <View key={appointment.id} style={{ 
                  paddingVertical: 16, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border 
                }}>
                  <View style={[commonStyles.row, { marginBottom: 4 }]}>
                    <Text style={[commonStyles.text, { fontWeight: '600', flex: 1 }]}>
                      {appointment.title}
                    </Text>
                    <View style={[
                      { 
                        backgroundColor: colors.accent, 
                        paddingHorizontal: 8, 
                        paddingVertical: 2, 
                        borderRadius: 12 
                      }
                    ]}>
                      <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                        Upcoming
                      </Text>
                    </View>
                  </View>
                  <Text style={commonStyles.textLight}>
                    {formatDate(appointment.date)} at {appointment.time}
                  </Text>
                  <Text style={commonStyles.textLight}>
                    with {appointment.doctor}
                  </Text>
                  {appointment.notes && (
                    <Text style={[commonStyles.textLight, { marginTop: 4, fontStyle: 'italic' }]}>
                      {appointment.notes}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {pastAppointments.length > 0 && (
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Past Appointments</Text>
              {pastAppointments.map((appointment) => (
                <View key={appointment.id} style={{ 
                  paddingVertical: 16, 
                  borderBottomWidth: 1, 
                  borderBottomColor: colors.border,
                  opacity: 0.7
                }}>
                  <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                    {appointment.title}
                  </Text>
                  <Text style={commonStyles.textLight}>
                    {formatDate(appointment.date)} at {appointment.time}
                  </Text>
                  <Text style={commonStyles.textLight}>
                    with {appointment.doctor}
                  </Text>
                  {appointment.notes && (
                    <Text style={[commonStyles.textLight, { marginTop: 4, fontStyle: 'italic' }]}>
                      {appointment.notes}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {appointments.length === 0 && (
            <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 40 }]}>
              <Icon name="calendar-outline" size={48} color={colors.textLight} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No appointments yet
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                Tap the + button to add your first appointment
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <SimpleBottomSheet
        isVisible={isAddingAppointment}
        onClose={() => setIsAddingAppointment(false)}
      >
        <View style={{ padding: 20 }}>
          <Text style={commonStyles.subtitle}>Add New Appointment</Text>
          
          <View style={{ marginTop: 20 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Title *</Text>
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
              placeholder="e.g., Regular Checkup"
              placeholderTextColor={colors.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Date *</Text>
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
              value={date}
              onChangeText={setDate}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Time *</Text>
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
              placeholder="e.g., 10:00 AM"
              placeholderTextColor={colors.textLight}
              value={time}
              onChangeText={setTime}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Doctor *</Text>
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
              placeholder="e.g., Dr. Smith"
              placeholderTextColor={colors.textLight}
              value={doctor}
              onChangeText={setDoctor}
            />
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[commonStyles.text, { marginBottom: 8 }]}>Notes</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                fontFamily: 'OpenSans_400Regular',
                color: colors.text,
                minHeight: 80,
                textAlignVertical: 'top',
              }}
              placeholder="Additional notes..."
              placeholderTextColor={colors.textLight}
              multiline
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          <TouchableOpacity
            style={[buttonStyles.primary, { marginTop: 20 }]}
            onPress={handleSave}
          >
            <Text style={[commonStyles.text, { color: colors.text, fontWeight: '600' }]}>
              Save Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}
