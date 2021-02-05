import React from "react";
import { View, Alert } from "react-native";
import { Provider } from "react-redux";
import MAINAPP from "./MainApp";
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import RemotePushController from './src/services/RemotePushController'
//import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Store, persistor } from "./src/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
//======================================================
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  async componentDidMount() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getFcmToken();
      console.log('Authorization status:', authStatus);
    }
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage)
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log("Your Firebase Token is:", fcmToken);
    } else {
      console.log("Failed", "No token received");
    }
  }

  // test = () => {
  //   // Must be outside of any component LifeCycle (such as `componentDidMount`).
  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function (token) {
  //       console.log("TOKEN:", token);
  //     },

  //     // (required) Called when a remote is received or opened, or local notification is opened
  //     onNotification: function (notification) {
  //       console.log("NOTIFICATION:", notification);

  //       // process the notification

  //       // (required) Called when a remote is received or opened, or local notification is opened
  //       //notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },


  //     // Should the initial notification be popped automatically
  //     // default: true
  //     popInitialNotification: true,

  //     /**
  //      * (optional) default: true
  //      * - Specified if permissions (ios) and token (android and ios) will requested or not,
  //      * - if not, you must call PushNotificationsHandler.requestPermissions() later
  //      * - if you are not using remote notification or do not have Firebase installed, use this:
  //      *     requestPermissions: Platform.OS === 'ios'
  //      */
  //     requestPermissions: true,
  //   });
  //   PushNotification.createChannel(
  //     {
  //       channelId: "agefred-id", // (required)
  //       channelName: "My Agefred", // (required)
  //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //       playSound: true, // (optional) default: true
  //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  //   PushNotification.localNotification({
  //     playSound: true,
  //     soundName: 'default',
  //     autoCancel: true,
  //     vibrate: true,
  //     vibration: 300,
  //     actions: '["Yes", "No"]',
  //     onlyAlertOnce: true,
  //   });
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <MAINAPP />
            <RemotePushController />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}
