import React from "react";
import { View, Alert } from "react-native";
import NAVIGATOR, { navigationService } from "./src/navigator";
import MainNavigator from "./src/RootNavigator";
import PassNavigator from "./src/PassNavigator";
import { connect } from 'react-redux';
import { getFcmToken } from './src/Redux/action'
import messaging from '@react-native-firebase/messaging';

//import PushNotificationIOS from "@react-native-community/push-notification-ios";

class MainApp extends React.Component {
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
            console.log(remoteMessage.data.type)
            if (remoteMessage.data.type == "holiday") {
                navigationService.navigate("Vocation")
            }
            else if (remoteMessage.data.type == "part") {
                navigationService.navigate("ParteDiario")
            }
            else if (remoteMessage.data.type == "expense") {
                navigationService.navigate("MisGastos")
            }
            else if (remoteMessage.data.type == "blog") {
                navigationService.navigate("Blog")
            }
            else if (remoteMessage.data.type == "document") {
                navigationService.navigate("Documents")
            }
            else if (remoteMessage.data.type == "epi") {
                navigationService.navigate("Epis")
            } else if (remoteMessage.data.type == "personal") {
                navigationService.navigate("PersonalDocuments")
            }
            else {
                alert("No data")
            }
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage.data);
            if (remoteMessage.data.type == "holiday") {
                navigationService.navigate("Vocation")
            }
            else if (remoteMessage.data.type == "part") {
                navigationService.navigate("ParteDiario")
            }
            else if (remoteMessage.data.type == "expense") {
                navigationService.navigate("MisGastos")
            }
            else if (remoteMessage.data.type == "blog") {
                navigationService.navigate("Blog")
            }
            else if (remoteMessage.data.type == "document") {
                navigationService.navigate("Documents")
            }
            else if (remoteMessage.data.type == "epi") {
                navigationService.navigate("Epis")
            } else if (remoteMessage.data.type == "personal") {
                navigationService.navigate("PersonalDocuments")
            }
            else {
                alert("No data")
            }
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.data,
            );
            if (remoteMessage.data.type == "holiday") {
                navigationService.navigate("Vocation")
            }
            else if (remoteMessage.data.type == "part") {
                navigationService.navigate("ParteDiario")
            }
            else if (remoteMessage.data.type == "expense") {
                navigationService.navigate("MisGastos")
            }
            else if (remoteMessage.data.type == "blog") {
                navigationService.navigate("Blog")
            }
            else if (remoteMessage.data.type == "document") {
                navigationService.navigate("Documents")
            }
            else if (remoteMessage.data.type == "epi") {
                navigationService.navigate("Epis")
            } else if (remoteMessage.data.type == "personal") {
                navigationService.navigate("PersonalDocuments")
            }
            else {
                alert("No data")
            }
            // navigation.navigate(remoteMessage.data.type);
        });
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.data,
                );
                if (remoteMessage.data.type == "holiday") {
                    navigationService.navigate("Vocation")
                }
                else if (remoteMessage.data.type == "part") {
                    navigationService.navigate("ParteDiario")
                }
                else if (remoteMessage.data.type == "expense") {
                    navigationService.navigate("MisGastos")
                }
                else if (remoteMessage.data.type == "blog") {
                    navigationService.navigate("Blog")
                }
                else if (remoteMessage.data.type == "document") {
                    navigationService.navigate("Documents")
                }
                else if (remoteMessage.data.type == "epi") {
                    navigationService.navigate("Epis")
                } else if (remoteMessage.data.type == "personal") {
                    navigationService.navigate("PersonalDocuments")
                }
                else {
                    alert("No data")
                }
                //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        });
    }

    getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log("Your Firebase Token is:", fcmToken);
            this.props.getFcmToken(fcmToken)
        } else {
            console.log("Failed", "No token received");
        }
    }

    render() {
        const { login } = this.props.user
        return (
            <View style={{ flex: 1 }}>
                {!login ?
                    <MainNavigator
                        ref={navigatorRef => {
                            navigationService.setTopLevelNavigator(navigatorRef);
                        }}
                    />
                    : login.data.pwd === "yes" ?
                        <NAVIGATOR
                            //uriPrefix={prefix}
                            ref={navigatorRef => {
                                navigationService.setTopLevelNavigator(navigatorRef);
                            }}
                        >

                        </NAVIGATOR>
                        : <PassNavigator
                            ref={navigatorRef => {
                                navigationService.setTopLevelNavigator(navigatorRef);
                            }}
                        />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getFcmToken })(MainApp);