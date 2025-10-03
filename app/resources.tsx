
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { pregnancyArticles } from '../data/pregnancyData';
import { Article } from '../types';

export default function ResourcesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', title: 'All', icon: 'library-outline' },
    { id: 'nutrition', title: 'Nutrition', icon: 'nutrition-outline' },
    { id: 'exercise', title: 'Exercise', icon: 'fitness-outline' },
    { id: 'prenatal', title: 'Prenatal', icon: 'medical-outline' },
    { id: 'childbirth', title: 'Childbirth', icon: 'heart-outline' },
    { id: 'postpartum', title: 'Postpartum', icon: 'home-outline' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? pregnancyArticles 
    : pregnancyArticles.filter(article => article.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      nutrition: colors.accent,
      exercise: colors.secondary,
      prenatal: colors.primary,
      childbirth: colors.highlight,
      postpartum: colors.success
    };
    return colorMap[category] || colors.primary;
  };

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={[commonStyles.container, { paddingHorizontal: 20 }]}>
        <View style={[commonStyles.row, { marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[commonStyles.title, { flex: 1, textAlign: 'center', marginBottom: 0 }]}>
            Resources
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Category Filter */}
          <View style={commonStyles.card}>
            <Text style={commonStyles.subtitle}>Categories</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 12 }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      marginRight: 8,
                      borderWidth: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                    selectedCategory === category.id
                      ? { backgroundColor: colors.primary, borderColor: colors.primary }
                      : { backgroundColor: 'transparent', borderColor: colors.border }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={16} 
                    color={selectedCategory === category.id ? colors.text : colors.textLight}
                  />
                  <Text style={[
                    commonStyles.textLight,
                    { marginLeft: 6 },
                    selectedCategory === category.id && { color: colors.text }
                  ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Articles */}
          {filteredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={commonStyles.card}
              onPress={() => router.push(`/article/${article.id}`)}
            >
              {article.imageUrl && (
                <Image
                  source={{ uri: article.imageUrl }}
                  style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 12,
                    marginBottom: 12,
                  }}
                  resizeMode="cover"
                />
              )}
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <View style={[
                  {
                    backgroundColor: getCategoryColor(article.category),
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }
                ]}>
                  <Text style={[commonStyles.textLight, { fontSize: 12, textTransform: 'capitalize' }]}>
                    {article.category}
                  </Text>
                </View>
                <Text style={[commonStyles.textLight, { fontSize: 12 }]}>
                  {article.readTime} min read
                </Text>
              </View>

              <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 8 }]}>
                {article.title}
              </Text>
              
              <Text style={[commonStyles.textLight, { lineHeight: 20 }]} numberOfLines={3}>
                {article.content}
              </Text>

              <View style={[commonStyles.row, { marginTop: 12, alignItems: 'center' }]}>
                <Text style={[commonStyles.textLight, { flex: 1 }]}>
                  Read more
                </Text>
                <Icon name="chevron-forward" size={16} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}

          {filteredArticles.length === 0 && (
            <View style={[commonStyles.card, commonStyles.center, { paddingVertical: 40 }]}>
              <Icon name="book-outline" size={48} color={colors.textLight} />
              <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                No articles found
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                Try selecting a different category
              </Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
