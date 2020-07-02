import React from "react";
import { View } from "react-native";
import NAVIGATOR, { navigationService } from "./src/navigator";
import { connect } from 'react-redux';

class MainApp extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NAVIGATOR
                    //uriPrefix={prefix}
                    ref={navigatorRef => {
                        navigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(MainApp);