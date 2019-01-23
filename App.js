/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import InputView from './src/components/InputView/InputView';
import ListItems from './src/components/ListItems/ListItems';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for devasdfasdf menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    placeName: "",
    places: []
  }
  
  placeNameChangedHander = val => {
    this.setState({
      placeName: val
    });
  }
  
  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    
    this.setState(prevState => {
      return {
        places: prevState.places.concat(prevState.placeName)
      }
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <InputView 
          placeName={this.state.placeName}
          nameChangeHandler={this.placeNameChangedHander}
          submitHandler={this.placeSubmitHandler} />
        <ListItems places={this.state.places} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
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
