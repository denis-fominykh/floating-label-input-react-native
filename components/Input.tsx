import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Animated, Text } from 'react-native';

interface InputProps {
  value: string;
  label: string;
  onChangeText: (value: string) => void;
  checkFunc?: (value: string) => boolean;
  error?: boolean;
  resetError?: () => void;
  errorText?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const Input: FC<InputProps> = ({
  value,
  label,
  onChangeText,
  checkFunc,
  error,
  resetError,
  errorText,
  secureTextEntry,
  autoCapitalize,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#DDDAE0');

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const _animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [_animatedIsFocused]);

  useEffect(() => {
    error ? showError() : checkValue();
  }, [value, error]);

  const showError = (): void => {
    setColor('#EF4747');

    if (value === '') {
      setErrorMessage('Should not be empty');
      setShowErrorMessage(true);
    } else {
      if (errorText) {
        setErrorMessage(errorText);
        setShowErrorMessage(true);
      }
    }
  };

  const checkValue = (): void => {
    if (checkFunc && value) {
      const checkResult: boolean = checkFunc(value);

      if (checkResult) {
        setColor('#449250');
        setErrorMessage('');
        setShowErrorMessage(false);
      } else if (!checkResult) {
        setColor('#EF4747');
        setErrorMessage(`${label} is not valid!`);
        setShowErrorMessage(true);
      }
    }

    if (!checkFunc && !isFocused && value) {
      setShowErrorMessage(false);
      setColor('#DDDAE0');
    }
  };

  const handleFocus = (): void => {
    setIsFocused(true);

    if (resetError) {
      resetError();
    }

    if (
      (!checkFunc && (value === '' || value)) ||
      (checkFunc && value === '')
    ) {
      setShowErrorMessage(false);
      setColor('#4B00ED');
    }
  };

  const handleBlur = (): void => {
    setIsFocused(false);

    if (!error) {
      if (
        (!checkFunc && (value === '' || value)) ||
        (checkFunc && value === '')
      ) {
        setShowErrorMessage(false);
        setColor('#DDDAE0');
      }
    }
  };

  const animatedLabelStyle = {
    top: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 0],
    }),
    fontSize: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 14],
    }),
    color: _animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [color === '#DDDAE0' ? '#575757' : color, color],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Animated.Text style={{ ...styles.label, ...animatedLabelStyle }}>
          {label}
        </Animated.Text>
        <TextInput
          style={{ ...styles.input, borderBottomColor: color }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          blurOnSubmit
        />
        {showErrorMessage ? (
          <Text style={{ color: '#EF4747' }}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 2,
  },
  inputContainer: {
    paddingTop: 18,
  },
  label: {
    position: 'absolute',
    left: 0,
  },
  input: {
    height: 42,
    fontSize: 18,
    color: '#000000',
    borderBottomWidth: 1,
  },
});

export default Input;
