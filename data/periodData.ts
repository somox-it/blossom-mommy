
import { PeriodEntry } from '../types';

export const periodSymptoms = [
  'Cramps',
  'Bloating',
  'Mood swings',
  'Headache',
  'Breast tenderness',
  'Fatigue',
  'Back pain',
  'Nausea',
  'Food cravings',
  'Acne',
  'Irritability',
  'Sleep issues'
];

export const samplePeriodEntries: PeriodEntry[] = [
  {
    id: '1',
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    flow: 'medium',
    symptoms: ['Cramps', 'Bloating'],
    notes: 'Normal cycle'
  },
  {
    id: '2',
    startDate: '2024-02-12',
    endDate: '2024-02-17',
    flow: 'heavy',
    symptoms: ['Cramps', 'Mood swings', 'Fatigue'],
    notes: 'Heavier than usual'
  },
  {
    id: '3',
    startDate: '2024-03-10',
    endDate: '2024-03-15',
    flow: 'light',
    symptoms: ['Bloating', 'Headache'],
    notes: 'Light flow this month'
  }
];

export const calculateCycleData = (periods: PeriodEntry[]) => {
  if (periods.length < 2) {
    return {
      averageCycleLength: 28,
      averagePeriodLength: 5,
      lastPeriodDate: periods[0]?.startDate || '',
      nextPredictedPeriod: '',
      ovulationDate: ''
    };
  }

  const sortedPeriods = periods.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  
  // Calculate average cycle length
  let totalCycleDays = 0;
  for (let i = 0; i < sortedPeriods.length - 1; i++) {
    const current = new Date(sortedPeriods[i].startDate);
    const previous = new Date(sortedPeriods[i + 1].startDate);
    totalCycleDays += Math.abs(current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);
  }
  const averageCycleLength = Math.round(totalCycleDays / (sortedPeriods.length - 1));

  // Calculate average period length
  let totalPeriodDays = 0;
  let periodsWithEndDate = 0;
  sortedPeriods.forEach(period => {
    if (period.endDate) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      totalPeriodDays += Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      periodsWithEndDate++;
    }
  });
  const averagePeriodLength = periodsWithEndDate > 0 ? Math.round(totalPeriodDays / periodsWithEndDate) : 5;

  const lastPeriodDate = sortedPeriods[0].startDate;
  const lastPeriod = new Date(lastPeriodDate);
  const nextPredicted = new Date(lastPeriod.getTime() + (averageCycleLength * 24 * 60 * 60 * 1000));
  const ovulation = new Date(lastPeriod.getTime() + ((averageCycleLength - 14) * 24 * 60 * 60 * 1000));

  return {
    averageCycleLength,
    averagePeriodLength,
    lastPeriodDate,
    nextPredictedPeriod: nextPredicted.toISOString().split('T')[0],
    ovulationDate: ovulation.toISOString().split('T')[0]
  };
};
