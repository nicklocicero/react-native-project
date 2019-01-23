/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceItems from './src/components/PlaceItems/PlaceItems';

type Props = {};
export default class App extends Component<Props> {
  state = {
    places: []
  }
  
  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat(placeName)
      }
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <PlaceInput 
          placeName={this.state.placeName}
          onPlaceAdded={this.placeAddedHandler}
          nameChangeHandler={this.placeNameChangedHander} />
        <PlaceItems places={this.state.places} />
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
