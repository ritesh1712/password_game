import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import RuleItem from './component/RuleItem';

const App = () => {
  const [password, setPassword] = useState('');
  const [rules, setRules] = useState([]);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  useEffect(() => {
    if (password) {
      checkRule(currentRuleIndex);
    }
  }, [password, currentRuleIndex]);

  const allRules = [
    { number: 1, passed: password.length >= 8, message: 'Your password must be at least 8 characters.' },
    { number: 2, passed: /[a-z]/.test(password), message: 'Your password must include a lowercase letter.' },
    { number: 3, passed: /[A-Z]/.test(password), message: 'Your password must include an uppercase letter.' },
    { number: 4, passed: /[0-9]/.test(password), message: 'Your password must include a number.' },
    { number: 5, passed: /[^a-zA-Z0-9]/.test(password), message: 'Your password must include a special character.' },
    { number: 6, passed: password.split('').reduce((sum, char) => sum + (parseInt(char) || 0), 0) === 25, message: 'The digits in your password must add up to 25.' },
    { number: 7, passed: /[IVXLCDM]+/.test(password), message: 'Your password must include a Roman numeral.' },
    { number: 8, passed: /(January|February|March|April|May|June|July|August|September|October|November|December)/i.test(password), message: 'Your password must include a month of the year.' }
  ];

  const checkRule = (index) => {
    const rule = allRules[index];

    if (!rule) {
      return;
    }

    const updatedRules = [...rules, rule];
    setRules(updatedRules);

    if (rule.passed) {
      setCurrentRuleIndex(index + 1); 
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setRules([]); 
    setCurrentRuleIndex(0); 
  };

  const passedRules = rules.filter(rule => rule.passed);
  const failedRules = rules.filter(rule => !rule.passed);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>The Password Game</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Please choose a password"
          onChangeText={text => handlePasswordChange(text)}
          multiline={true}
          value={password}
        />
        <View style={styles.rulesContainer}>
          {failedRules.map((rule, index) => (
            <RuleItem key={index}  ruleNumber={rule.number} rule={rule} />
          ))}
          {passedRules.reverse().map((rule, index) => (
            <RuleItem key={index}  ruleNumber={rule.number} rule={rule} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%'
  },
  heading: {
    fontSize: 30,
    textAlign: 'center'
  },
  inputStyle: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 50,
    padding: 10,
    borderRadius: 10,
    fontSize: 18
  },
  rulesContainer: {
    width: '100%',
    alignItems: 'center',
  }
});

export default App;
