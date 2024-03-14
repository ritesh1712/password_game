import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RuleItem = ({ ruleNumber, rule }) => {
  return (
    <View style={[styles.container, rule.passed ? styles.green : styles.red]}>
      <Text style={{...styles.ruleText,borderBottomColor:'black',borderBottomWidth:1,width:'100%',textAlign:'left',paddingBottom:5,marginBottom:5}}>{`Rule ${ruleNumber}:`}</Text>
      <Text style={styles.ruleText}>{`${rule.message}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
    padding: 12
  },
  ruleText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    color:'black'
  },
  green: {
    backgroundColor: '#aef3ae',
    borderWidth:1,
    borderColor:'green'
  },
  red: {
    backgroundColor: '#ffc7c7',
    borderWidth:1,
    borderColor:'red'
  },
});

export default RuleItem;
