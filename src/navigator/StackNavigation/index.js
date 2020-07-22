import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import Home from '../DrawerNavigator'
import Profile from '../../Screens/Profile'
export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    Profile: {
      screen: Profile
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
