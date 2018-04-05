import React from 'react';
import firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import { StackNavigator, navigationOptions } from 'react-navigation'
import Home from './src/screens/home/index'
import Login from './src/screens/login/index'
import Title from './src/components/title'
import FinishProfile from './src/screens/finishProfile';
import LoadingScreen from './src/screens/loadingScreen/index'

firebase.initializeApp(firebaseConfig)

const App = StackNavigator(
  {
      LoadingScreen: {screen: LoadingScreen},
      Login: { screen: Login },
      FinishProfile: { screen: FinishProfile},
      Home: {screen: Home},
  },
  { navigationOptions: {
      header: <Title />
    },
  },
  {
      initialRouteName: 'LoadingScreen',
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
