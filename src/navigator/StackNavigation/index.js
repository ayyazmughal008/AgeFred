import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Login from '../../Screens/Login'
import Home from '../DrawerNavigator'
import Profile from '../../Screens/Profile'
import ParteDiario from '../../Screens/ParteDiario'
import Blog from '../../Screens/Blog'
import Documents from '../../Screens/Documents'
import PersonalDocuments from '../../Screens/PersonalDocument'
import DetailPage from '../../Screens/Blog/Detail'
import MisGastos from '../../Screens/MisGastos'
import DetailMisgasto from '../../Screens/MisGastos/Detail'
import Vocation from '../../Screens/Vocations'
import Orden from '../../Screens/Orden'
import Epis from '../../Screens/Epis'
import Option1 from '../../Screens/Epis/Option1'
import Option2 from '../../Screens/Epis/Option2'
import Option3 from '../../Screens/Epis/Option3'
import GDPR from '../../Screens/Profile/GDPR'
import TimeTracking from '../../Screens/TimeTracking'
import ChangePassword from '../../Screens/ChangePassword'

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
    GDPR: {
      screen: GDPR
    },
    TimeTracking: {
      screen: TimeTracking
    },
    Epis: {
      screen: Epis
    },
    Option1: {
      screen: Option1
    },
    Option2: {
      screen: Option2
    },
    Option3: {
      screen: Option3
    },
    PersonalDocuments: {
      screen: PersonalDocuments
    },
    ChangePassword: {
      screen: ChangePassword
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    ...TransitionPresets.ModalTransition
  }
);
