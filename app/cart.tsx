
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import { products } from '../data/shopData';
import { CartItem } from '../types';

export default function CartScreen() {
  // Mock cart data - in a real app this would come from state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      productId: '1',
      quantity: 2,
      product: products.find(p => p.id === '1')!
    },
    {
      productId: '6',
      quantity: 1,
      product: products.find(p => p.id === '6')!
    },
    {
      productId: '8',
      quantity: 3,
      product: products.find(p => p.id === '8')!
    }
  ]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCartItems(prev => prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99; // Free shipping over $50
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping();
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'This would normally redirect to a payment processor. For this demo, we&apos;ll simulate a successful order.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Place Order', 
          onPress: () => {
            Alert.alert('Success!', 'Your order has been placed successfully!', [
              { text: 'OK', onPress: () => router.back() }
            ]);
          }
        }
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={commonStyles.wrapper}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>Shopping Cart</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Icon name="bag-outline" size={64} color={colors.textLight} />
          <Text style={[commonStyles.subtitle, { marginTop: 20, marginBottom: 8 }]}>
            Your cart is empty
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', marginBottom: 32 }]}>
            Add some products to get started
          </Text>
          <TouchableOpacity
            style={[commonStyles.button, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/shop')}
          >
            <Text style={commonStyles.buttonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Shopping Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
        <View style={commonStyles.content}>
          {/* Cart Items */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Items ({cartItems.length})</Text>
            
            {cartItems.map((item) => (
              <View key={item.productId} style={{
                flexDirection: 'row',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.border
              }}>
                <Image 
                  source={{ uri: item.product.imageUrl }} 
                  style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
                  resizeMode="cover"
                />
                
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                    {item.product.name}
                  </Text>
                  <Text style={[commonStyles.textLight, { fontSize: 12, marginBottom: 8 }]}>
                    {item.product.subcategory}
                  </Text>
                  <Text style={[commonStyles.text, { color: colors.primary, fontWeight: 'bold' }]}>
                    ${item.product.price.toFixed(2)}
                  </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.background,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: colors.border
                      }}
                      onPress={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <Icon name="remove" size={16} color={colors.text} />
                    </TouchableOpacity>
                    
                    <Text style={[commonStyles.text, { marginHorizontal: 16, fontWeight: 'bold' }]}>
                      {item.quantity}
                    </Text>
                    
                    <TouchableOpacity
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: colors.primary,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      onPress={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <Icon name="add" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={[commonStyles.text, { fontWeight: 'bold' }]}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Order Summary */}
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Order Summary</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={commonStyles.text}>Subtotal</Text>
              <Text style={commonStyles.text}>${getSubtotal().toFixed(2)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={commonStyles.text}>Tax</Text>
              <Text style={commonStyles.text}>${getTax().toFixed(2)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text style={commonStyles.text}>Shipping</Text>
              <Text style={commonStyles.text}>
                {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: colors.border
            }}>
              <Text style={[commonStyles.text, { fontWeight: 'bold', fontSize: 18 }]}>Total</Text>
              <Text style={[commonStyles.text, { fontWeight: 'bold', fontSize: 18, color: colors.primary }]}>
                ${getTotal().toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={[commonStyles.button, { backgroundColor: colors.primary, marginBottom: 100 }]}
            onPress={handleCheckout}
          >
            <Text style={commonStyles.buttonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
