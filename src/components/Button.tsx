import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  loading?: boolean;
  style?: object;
  textStyle?: TextStyle;
  iconName?: typeof Ionicons.prototype.name;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  style,
  textStyle,
  iconName,
}) => {
  return (
    <Pressable
      style={[styles.button, { backgroundColor: colors.primary }, style]}
      onPress={onPress}
    >
      {!loading && title && (
        <Text
          style={[styles.text, textStyle, { color: colors.textLight }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )}
      <>
        {loading && (
          <ActivityIndicator color={textStyle?.color || colors.text} />
        )}
        {!loading && iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color={textStyle?.color || colors.text}
          />
        )}
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
