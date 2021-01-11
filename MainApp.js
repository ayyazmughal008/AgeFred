import React from "react";
import { View } from "react-native";
import NAVIGATOR, { navigationService } from "./src/navigator";
import MainNavigator from "./src/RootNavigator";
import PassNavigator from "./src/PassNavigator";
import { connect } from 'react-redux';

class MainApp extends React.Component {
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
                        />
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
export default connect(mapStateToProps)(MainApp);