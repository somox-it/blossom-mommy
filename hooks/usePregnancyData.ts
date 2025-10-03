
import { useState, useEffect } from 'react';
import { PregnancyData, SymptomEntry, WeightEntry, Appointment } from '../types';

export const usePregnancyData = () => {
  const [pregnancyData, setPregnancyData] = useState<PregnancyData>({
    currentWeek: 20,
    dueDate: '2024-08-15',
    lastPeriod: '2023-11-08',
    babyName: 'Baby'
  });

  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Regular Checkup',
      date: '2024-03-15',
      time: '10:00 AM',
      doctor: 'Dr. Smith',
      notes: 'Monthly prenatal checkup'
    },
    {
      id: '2',
      title: 'Ultrasound',
      date: '2024-03-22',
      time: '2:00 PM',
      doctor: 'Dr. Johnson',
      notes: 'Anatomy scan'
    }
  ]);

  const addSymptomEntry = (entry: Omit<SymptomEntry, 'id'>) => {
    const newEntry: SymptomEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setSymptoms(prev => [newEntry, ...prev]);
  };

  const addWeightEntry = (entry: Omit<WeightEntry, 'id'>) => {
    const newEntry: WeightEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setWeightEntries(prev => [newEntry, ...prev]);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const updatePregnancyData = (data: Partial<PregnancyData>) => {
    setPregnancyData(prev => ({ ...prev, ...data }));
  };

  return {
    pregnancyData,
    symptoms,
    weightEntries,
    appointments,
    addSymptomEntry,
    addWeightEntry,
    addAppointment,
    updatePregnancyData
  };
};
