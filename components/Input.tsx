import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Animated } from 'react-native';

interface InputProps {
  value: string;
  label: string;
  onChangeText: (value: string) => void;
  checkFunc?: (value: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
}

const Input: FC<InputProps> = ({
  value,
  label,
  onChangeText,
  checkFunc,
  secureTextEntry,
  autoCapitalize,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#DDDAE0');

  const _animatedIsFocused = new Animated.Value(value === '' ? 0 : 1);

  useEffect(() => {
    Animated.timing(_animatedIsFocused, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [_animatedIsFocused]);

  useEffect(() => {
    checkValue();
  }, [value]);

  const checkValue = (): void => {
    if (checkFunc && value) {
      const result = checkFunc(value);
      value && result ? setColor('#449250') : setColor('#EF4747');
    }
  };

  const handleFocus = (): void => {
    setIsFocused(true);
    if (
      (!checkFunc && (value === '' || value)) ||
      (checkFunc && value === '')
    ) {
      setColor('#4B00ED');
    }
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    if (!checkFunc || (checkFunc && value === '')) {
      setColor('#DDDAE0');
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
      outputRange: ['#575757', color],
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
