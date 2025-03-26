import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { useFilterContext } from '../hooks';
import { colors } from '../constants';

export const FilterSelector: React.FC = () => {
  const { selectedFilter, setSelectedFilter } = useFilterContext();
  return (
    <View style={styles.container}>
      <Button
        title="All"
        onPress={() => setSelectedFilter('all')}
        style={[
          styles.button,
          styles.left,
          {
            backgroundColor:
              selectedFilter === 'all' ? colors.primary : colors.disabled,
            borderColor: colors.border,
          },
        ]}
      />
      <Button
        title="Active"
        onPress={() => setSelectedFilter('active')}
        style={[
          styles.button,
          {
            backgroundColor:
              selectedFilter === 'active' ? colors.primary : colors.disabled,
            borderColor: colors.border,
          },
        ]}
      />
      <Button
        title="Completed"
        onPress={() => setSelectedFilter('completed')}
        style={[
          styles.right,
          styles.button,
          {
            backgroundColor:
              selectedFilter === 'completed' ? colors.primary : colors.disabled,
            borderColor: colors.border,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 0,
    borderWidth: 1,
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
  },
  left: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  right: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
