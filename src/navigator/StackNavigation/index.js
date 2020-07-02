import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
