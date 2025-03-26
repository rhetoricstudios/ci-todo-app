import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { initializeStore, StoreType } from './src/store';
import { RootNavigator } from './src/navigation';
import { colors } from './src/constants';

export default function App() {
  const [store, setStore] = useState<StoreType>();

  useEffect(() => {
    const init = async () => {
      const initializedStore = await initializeStore();
      setStore(initializedStore);
    };
    init();
  }, []);

  if (!store) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.secondary} size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
