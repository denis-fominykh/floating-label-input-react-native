import React, { FC } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface StartScreenProps {
  navigation: any;
}

const StartScreen: FC<StartScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>StartScreen</Text>
      <Button
        title="SIGN IN"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default StartScreen;
