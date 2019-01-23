import React from 'react';

import {View, TextInput, Button, StyleSheet} from 'react-native';

const inputView = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.placeInput}
        placeholder='An awesome place!'
        value={props.placeName}
        onChangeText={props.nameChangeHandler} />
      <Button title="Add" style={styles.placeButton} onPress={props.submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  }
});

export default
  inputView;