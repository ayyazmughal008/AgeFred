import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import Home from '../DrawerNavigator'
import Profile from '../../Screens/Profile'
import ParteDiario from '../../Screens/ParteDiario'

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
    ParteDiario: {
      screen: ParteDiario
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);
