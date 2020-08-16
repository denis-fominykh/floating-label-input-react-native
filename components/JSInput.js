import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Animated, Text } from 'react-native';

const Input = ({
  value,
  label,
  checkFunc,
  error,
  resetError,
  errorText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [color, setColor] = useState('#DDDAE0');

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const showError = () => {
    if (error) {
      setColor('#EF4747');

      if (value === '') {
        setErrorMessage('Should not be empty');
        setShowErrorMessage(true);
      } else {
        setErrorMessage(errorText);
        setShowErrorMessage(true);
      }
    }
  };

  const checkValue = () => {
    if (checkFunc && value) {
      const checkResult = checkFunc(value);

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

  const handleFocus = () => {
    setIsFocused(true);
    resetError();

    if (
      (!checkFunc && (value === '' || value)) ||
      (checkFunc && value === '')
    ) {
      setShowErrorMessage(false);
      setColor('#4B00ED');
    }
  };

  const handleBlur = () => {
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
          {...props}
          style={{ ...styles.input, borderBottomColor: color }}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
