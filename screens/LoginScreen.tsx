import React, { Component } from 'react';
import { StyleSheet, View, Button, Keyboard } from 'react-native';

import Input from '../components/Input';

interface LoginScreenProps {
  navigation: any;
}

interface LoginScreenState {
  email: string;
  password: string;
  error: {
    loginError: boolean;
    passwordError: boolean;
  };
}

class LoginScreen extends Component<LoginScreenProps, LoginScreenState> {
  state = {
    email: '',
    password: '',
    error: {
      loginError: false,
      passwordError: false,
    },
  };

  updateState = (attribute: string, value: any): void => {
    this.setState({ [attribute]: value });
  };

  resetLoginError = (): void => {
    this.setState((prevState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        loginError: false,
      },
    }));
  };

  resetPasswordError = (): void => {
    this.setState((prevState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        passwordError: false,
      },
    }));
  };

  validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  render(): React.ReactNode {
    const { email, password, error } = this.state;

    return (
      <View style={styles.container}>
        <Input
          label="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={(value) => this.updateState('email', value)}
          checkFunc={this.validateEmail}
          error={error.loginError}
          resetError={this.resetLoginError}
          errorText="The email address doesn't match any account "
        />
        <Input
          label="Password"
          value={password}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(value) => this.updateState('password', value)}
          error={error.passwordError}
          resetError={this.resetPasswordError}
          errorText="Incorrect password"
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={() => {
              this.setState({
                error: {
                  loginError: false,
                  passwordError: false,
                },
              });
              Keyboard.dismiss();
            }}
          />
          <Button
            color="#FF0000"
            title="Submit with Error"
            onPress={() => {
              this.setState({
                error: {
                  loginError: true,
                  passwordError: true,
                },
              });
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
