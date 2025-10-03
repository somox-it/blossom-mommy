
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { products, categories } from '../data/shopData';
import { Product } from '../types';

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const renderProduct = (product: Product) => (
    <View key={product.id} style={[commonStyles.card, { marginBottom: 16 }]}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 12 }}
        resizeMode="cover"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
            {product.name}
          </Text>
          <Text style={[commonStyles.textLight, { fontSize: 12, marginBottom: 4 }]}>
            {product.subcategory}
          </Text>
          <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
            {product.description}
          </Text>
        </View>
        <Text style={[commonStyles.text, { fontWeight: 'bold', color: colors.primary, fontSize: 18 }]}>
          ${product.price}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="star" size={16} color={colors.highlight} />
          <Text style={[commonStyles.textLight, { marginLeft: 4, fontSize: 12 }]}>
            {product.rating} ({product.reviews})
          </Text>
        </View>
        
        <TouchableOpacity
          style={[commonStyles.button, { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8 }]}
          onPress={() => addToCart(product.id)}
        >
          <Icon name="add" size={16} color="white" />
          <Text style={[commonStyles.buttonText, { marginLeft: 4, fontSize: 14 }]}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Shop Essentials</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <View>
            <Icon name="bag-outline" size={24} color={colors.text} />
            {getCartItemCount() > 0 && (
              <View style={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: colors.accent,
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                  {getCartItemCount()}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Search */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="search" size={20} color={colors.textLight} />
              <TextInput
                style={[commonStyles.input, { flex: 1, marginLeft: 12, marginBottom: 0 }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search products..."
                placeholderTextColor={colors.textLight}
              />
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            <View style={{ flexDirection: 'row', paddingHorizontal: 4 }}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    commonStyles.tag,
                    {
                      backgroundColor: selectedCategory === category.id ? colors.primary : colors.background,
                      borderColor: colors.primary,
                      borderWidth: 1,
                      marginHorizontal: 4,
                      paddingHorizontal: 16,
                      paddingVertical: 8
                    }
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={16} 
                    color={selectedCategory === category.id ? 'white' : colors.primary}
                  />
                  <Text style={[
                    commonStyles.tagText,
                    { 
                      color: selectedCategory === category.id ? 'white' : colors.primary,
                      marginLeft: 8
                    }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Products */}
          <View style={{ marginBottom: 100 }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(renderProduct)
            ) : (
              <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
                <Icon name="search" size={48} color={colors.textLight} />
                <Text style={[commonStyles.text, { marginTop: 16, textAlign: 'center' }]}>
                  No products found
                </Text>
                <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                  Try adjusting your search or category filter
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
