import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import Home from '../DrawerNavigator'
import Profile from '../../Screens/Profile'
import ParteDiario from '../../Screens/ParteDiario'
import Blog from '../../Screens/Blog'
import Documents from '../../Screens/Documents'
import DetailPage from '../../Screens/Blog/Detail'
import MisGastos from '../../Screens/MisGastos'
import DetailMisgasto from '../../Screens/MisGastos/Detail'
import Vocation from '../../Screens/Vocations'
import Orden from '../../Screens/Orden'

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
    Blog: {
      screen: Blog
    },
    Documents: {
      screen: Documents
    },
    DetailPage: {
      screen: DetailPage
    },
    MisGastos: {
      screen: MisGastos
    },
    DetailMisgasto: {
      screen: DetailMisgasto
    },
    Vocation: {
      screen: Vocation
    },
    Orden: {
      screen: Orden
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);
