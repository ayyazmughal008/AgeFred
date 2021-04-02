import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import ForgetPass from '../../Screens/ForgetPassword'

export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    ForgetPass: {
      screen: ForgetPass
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);
