import React, { Component } from 'react';
import { StyleSheet, View, Button, Keyboard } from 'react-native';

import Input from '../components/Input';

interface LoginScreenProps {
  navigation: any;
}

interface LoginScreenState {
  email: string;
  password: string;
}

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  state = {
    email: '',
    password: '',
  };

  updateState = (attribute: string, value: any): void => {
    this.setState({ [attribute]: value });
  };

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render(): React.ReactNode {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <Input
          label="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(value: string) => this.updateState('email', value)}
          checkFunc={this.validateEmail}
        />
        <Input
          label="Password"
          value={password}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(value: string) => this.updateState('password', value)}
        />
        <View style={styles.buttonContainer}>
          <Button
            color="#FF0000"
            title="Console"
            onPress={() => {
              console.log('email:', this.state.email);
              console.log('password:', this.state.password);
              Keyboard.dismiss();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default LoginScreen;
