import React from 'react';
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import { StackNavigator, navigationOptions } from 'react-navigation'
import Home from './src/screens/home/index'
import Landing from './src/screens/landing/index'
import Title from './src/components/title'
import FinishProfile from './src/screens/finishProfile';

firebase.initializeApp(firebaseConfig)

const App = StackNavigator(
  {
      Landing: { screen: Landing },
      FinishProfile: { screen: FinishProfile}
  },
  { navigationOptions: {
      header: <Title />
    },
  },
  {
      initialRouteName: 'Landing',
      headerMode: 'none'
  }
)

export default class Main extends React.Component {
  render() {
    return (
      <App />
    )
  }
}
