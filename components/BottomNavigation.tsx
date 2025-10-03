
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface NavItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  active?: boolean;
}

interface BottomNavigationProps {
  items: NavItem[];
}

export default function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <View style={commonStyles.bottomNavigation}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={commonStyles.navItem}
          onPress={item.onPress}
        >
          <Icon 
            name={item.icon as any} 
            size={24} 
            color={item.active ? colors.primary : colors.text}
          />
          <Text style={[
            styles.navText,
            { color: item.active ? colors.primary : colors.text }
          ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  navText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: 'OpenSans_500Medium',
  },
});
