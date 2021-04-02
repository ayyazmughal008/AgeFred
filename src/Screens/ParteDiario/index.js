import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue, lightBlue } from '../../Component/ColorCode'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import FastImage from 'react-native-fast-image'
import Application from './Application'
import History from './History'

const initialLayout = {
    height: 0,
    width: Dimensions.get("window").width
};

class ParteDiario extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     };
    // }

    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled={true}
            style={{ backgroundColor: lightBlue }}
            tabStyle={{
                width: widthPercentageToDP(50),
                height: heightPercentageToDP(6)
            }}
            indicatorStyle={{ backgroundColor: "#2857bd" }}
            activeBackgroundColor="#000"
            inActiveBackgroundColor="#000"
            inactiveColor="#cccccc"
            activeColor="#000"
            labelStyle={{ backgroundColor: "#2857bd" }}
            renderLabel={({ route }) => (
                <View>
                    <FastImage
                        style={{
                            width: widthPercentageToDP(5),
                            height: widthPercentageToDP(5),
                        }}
                        tintColor=
                        {route.key ===
                            props.navigationState.routes[props.navigationState.index].key
                            ? "#2857bd"
                            : "#000"}
                        resizeMode={FastImage.resizeMode.cover}
                        source={route.image}
                    >
                    </FastImage>
                </View>
            )}
        />
    );

    state = {
        index: 0,
        routes: [
            { key: "first", image: require('../../images/application.png') },
            { key: "second", image: require('../../images/history.png') },
        ]
    };

    ApplicationRoute = () => <Application navigate={this.props.navigation.navigate} />;
    HistoryRoute = () => <History navigate={this.props.navigation.navigate} />;


    render() {
        const { AuthLoading } = this.props.user;
        //console.log("My loading", AuthLoading);
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => this.props.navigation.goBack()}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="PARTE DIARIO"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <TabView
                    swipeEnabled={true}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: this.ApplicationRoute,
                        second: this.HistoryRoute,
                    })}
                    renderTabBar={this._renderTabBar}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={initialLayout}
                />

            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(ParteDiario);