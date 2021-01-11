import { createStackNavigator } from 'react-navigation-stack';
import ChangePassword from '../../Screens/ChangePassword'

export default createStackNavigator(
  {
    ChangePassword: {
      screen: ChangePassword
    },
  },
  {
    initialRouteName: 'ChangePassword',
    headerMode: 'none'
  }
);
