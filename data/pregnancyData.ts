
import { Article, Milestone } from '../types';

export const pregnancyMilestones: Milestone[] = [
  {
    week: 4,
    title: "First Doctor Visit",
    description: "Schedule your first prenatal appointment",
    completed: false
  },
  {
    week: 8,
    title: "First Ultrasound",
    description: "Your first glimpse of your baby",
    completed: false
  },
  {
    week: 12,
    title: "End of First Trimester",
    description: "Risk of miscarriage significantly decreases",
    completed: false
  },
  {
    week: 16,
    title: "Gender Reveal",
    description: "You might be able to find out the baby's gender",
    completed: false
  },
  {
    week: 20,
    title: "Anatomy Scan",
    description: "Detailed ultrasound to check baby's development",
    completed: false
  },
  {
    week: 24,
    title: "Viability Milestone",
    description: "Baby has a good chance of survival if born",
    completed: false
  },
  {
    week: 28,
    title: "Third Trimester",
    description: "Final stretch of pregnancy begins",
    completed: false
  },
  {
    week: 32,
    title: "Baby Shower Time",
    description: "Perfect time to celebrate with friends and family",
    completed: false
  },
  {
    week: 36,
    title: "Full Term Soon",
    description: "Baby is almost ready to meet you",
    completed: false
  },
  {
    week: 40,
    title: "Due Date",
    description: "Your estimated due date arrives",
    completed: false
  }
];

export const pregnancyArticles: Article[] = [
  {
    id: '1',
    title: 'Essential Nutrients During Pregnancy',
    category: 'nutrition',
    content: 'During pregnancy, your body needs extra nutrients to support your growing baby. Focus on getting enough folic acid, iron, calcium, and protein. Folic acid helps prevent birth defects, iron prevents anemia, calcium builds strong bones, and protein supports growth.',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'
  },
  {
    id: '2',
    title: 'Safe Exercises During Pregnancy',
    category: 'exercise',
    content: 'Regular exercise during pregnancy can help reduce back pain, improve mood, and prepare your body for labor. Safe activities include walking, swimming, prenatal yoga, and low-impact aerobics. Always consult your doctor before starting any exercise routine.',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
  },
  {
    id: '3',
    title: 'Preparing for Labor and Delivery',
    category: 'childbirth',
    content: 'As your due date approaches, it&apos;s important to prepare for labor and delivery. Consider taking childbirth classes, creating a birth plan, and packing your hospital bag. Learn about different pain management options and discuss them with your healthcare provider.',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400'
  },
  {
    id: '4',
    title: 'First Trimester: What to Expect',
    category: 'prenatal',
    content: 'The first trimester is a time of rapid changes. You might experience morning sickness, fatigue, and breast tenderness. Your baby&apos;s major organs are forming during this time. Take prenatal vitamins and avoid alcohol, smoking, and certain medications.',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'
  },
  {
    id: '5',
    title: 'Postpartum Recovery Tips',
    category: 'postpartum',
    content: 'Recovery after childbirth takes time. Your body needs 6-8 weeks to heal. Get plenty of rest, eat nutritious foods, stay hydrated, and don&apos;t hesitate to ask for help. Watch for signs of postpartum depression and contact your healthcare provider if needed.',
    readTime: 4,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
  }
];

export const weeklyTips: { [key: number]: string } = {
  4: "Your baby is the size of a poppy seed! Start taking prenatal vitamins if you haven't already.",
  8: "Your baby is the size of a raspberry! Morning sickness might be at its peak.",
  12: "Your baby is the size of a lime! You might start feeling more energetic.",
  16: "Your baby is the size of an avocado! You might feel the first movements soon.",
  20: "Your baby is the size of a banana! This is usually when the anatomy scan happens.",
  24: "Your baby is the size of an ear of corn! Baby's hearing is developing rapidly.",
  28: "Your baby is the size of an eggplant! You're in the third trimester now!",
  32: "Your baby is the size of a squash! Baby's bones are hardening.",
  36: "Your baby is the size of a papaya! Baby is considered full-term soon.",
  40: "Your baby is the size of a watermelon! You could meet your little one any day now!"
};

export const commonSymptoms = [
  'Nausea',
  'Fatigue',
  'Breast tenderness',
  'Frequent urination',
  'Food aversions',
  'Mood swings',
  'Heartburn',
  'Back pain',
  'Swelling',
  'Braxton Hicks contractions'
];
