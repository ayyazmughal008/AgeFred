import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'
import HTML from 'react-native-render-html';
import {widthPercentageToDP} from '../../Component/MakeMeResponsive'


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { AuthLoading, login } = this.props.user;
        console.log("My loading", AuthLoading);
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
                    <HTML
                        html='<p>this is just text this is just text this is just text this is just text</p>'
                        tagsStyles={{
                            p: {
                                fontSize: widthPercentageToDP(4),
                                textAlign:"justify",
                                padding:widthPercentageToDP(1)
                            }
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.checkBox}>
                    <FastImage
                        source={require('../../images/tick.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.tick2}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.btntext}>
                        {"Proximo"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(Profile);