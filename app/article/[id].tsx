
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import { pregnancyArticles } from '../../data/pregnancyData';

export default function ArticleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = pregnancyArticles.find(a => a.id === id);

  if (!article) {
    return (
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={[commonStyles.container, commonStyles.center]}>
          <Text style={commonStyles.title}>Article not found</Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => router.back()}
          >
            <Text style={[commonStyles.text, { color: colors.primary }]}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
      <View style={commonStyles.container}>
        <View style={[commonStyles.row, { paddingHorizontal: 20, marginBottom: 20, marginTop: 10 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Icon name="bookmark-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            {article.imageUrl && (
              <Image
                source={{ uri: article.imageUrl }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 16,
                  marginBottom: 20,
                }}
                resizeMode="cover"
              />
            )}

            <View style={[commonStyles.row, { marginBottom: 16 }]}>
              <View style={[
                {
                  backgroundColor: getCategoryColor(article.category),
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }
              ]}>
                <Text style={[commonStyles.textLight, { fontSize: 12, textTransform: 'capitalize' }]}>
                  {article.category}
                </Text>
              </View>
              <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                {article.readTime} min read
              </Text>
            </View>

            <Text style={[commonStyles.title, { marginBottom: 20 }]}>
              {article.title}
            </Text>

            <View style={commonStyles.card}>
              <Text style={[commonStyles.text, { lineHeight: 28, fontSize: 16 }]}>
                {article.content}
              </Text>
            </View>

            {/* Related Articles */}
            <View style={commonStyles.card}>
              <Text style={commonStyles.subtitle}>Related Articles</Text>
              {pregnancyArticles
                .filter(a => a.category === article.category && a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <TouchableOpacity
                    key={relatedArticle.id}
                    style={{
                      paddingVertical: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    }}
                    onPress={() => router.push(`/article/${relatedArticle.id}`)}
                  >
                    <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                      {relatedArticle.title}
                    </Text>
                    <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                      {relatedArticle.readTime} min read
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>

            <View style={{ height: 100 }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
