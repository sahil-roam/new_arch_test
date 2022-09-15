/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight
} from 'react-native';

import { useState } from 'react';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Roam from 'roam-reactnative';



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [userId, setUserId] = useState('')

  const createUser = () => {
    Roam.createUser('test', success => {
      console.log(JSON.stringify(success))
      setUserId(success.userId)
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  const toggleListener = () => {
    Roam.toggleListener(true, true, success => {
      console.log(JSON.stringify(success))
      Roam.subscribe('LOCATION', userId)
      Roam.startListener('location', locations => {
        JSON.stringify(locations)
      })
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  const startTracking = () => {
    Roam.startTrackingCustom(
      true,
      false,
      Roam.ActivityType.FITNESS,
      Roam.DesiredAccuracyIOS.BEST,
      true,
      0,
      50,
      5
    )
  }

  const stopTracking = () => {
    Roam.stopTracking()
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableHighlight
      style={styles.button}
      onPress={() => createUser()}>
        <Text>Create User</Text>
      </TouchableHighlight>

      <TouchableHighlight
      style={styles.button}
      onPress={() => toggleListener()}>
        <Text>Toggle Listener</Text>
      </TouchableHighlight>

      <TouchableHighlight
      style={styles.button}
      onPress={() => startTracking()}>
        <Text>Start Tracking</Text>
      </TouchableHighlight>

      <TouchableHighlight
      style={styles.button}
      onPress={() => stopTracking()}>
        <Text>Stop Tracking</Text>
      </TouchableHighlight>
      

          </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'blue',
    height: 40
  },
});

export default App;
