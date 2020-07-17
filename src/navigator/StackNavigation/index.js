import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import Home from '../DrawerNavigator'
export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
