import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const TransitionLoader = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default TransitionLoader;