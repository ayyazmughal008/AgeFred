import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'
import Pdf from 'react-native-pdf';
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }
    toggleCheck = () => {
        this.setState({ isChecked: !this.state.isChecked })
    }
    render() {
        const { AuthLoading, getGdpr } = this.props.user;
        console.log(getGdpr.gdpr)
        return (
            <View style={styles.container2}>
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
                            title="GDPR DOCUMENTOS"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.mainView}>
                    <Pdf
                        source={{ uri: getGdpr.gdpr }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link presse: ${uri}`)
                        }}
                        style={{
                            flex: 1,
                        }}
                    />
                </View>
                {/* <TouchableOpacity
                    onPress={() => this.toggleCheck()}
                    disabled={this.state.isChecked ? true : false}
                    style={styles.checkBox}>
                    {this.state.isChecked &&
                        <FastImage
                            source={require('../../images/tick.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.tick2}
                        />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => { }}
                    disabled={this.state.isChecked ? true : false}
                >
                    <Text style={styles.btntext}>
                        {"Proximo"}
                    </Text>
                </TouchableOpacity> */}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(Profile);