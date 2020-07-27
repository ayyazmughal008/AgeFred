import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Entypo';


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
                            title="PERFIL"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />

                <View style={styles.mainContainer}>
                    <View style={styles.profileContainer}>
                        <FastImage
                            source={{uri : login.data.profilePicture}}
                            resizeMode={FastImage.resizeMode.cover}
                            style={styles.profileImg}
                        />
                        <View style={styles.topView}>
                            <Text style={styles.topTitle}>{login.data.name}</Text>
                            <Text style={styles.bottomTitle}>{login.data.level}</Text>
                        </View>
                    </View>
                    <View style={styles.profileBox}>
                        <View style={styles.profileTextView}>
                            <Text style={styles.boldText}>
                                {"Nº de empleado : "}
                            </Text>
                            <Text style={styles.noBoldText}>
                                {login.data.number}
                            </Text>
                        </View>
                        <View style={styles.profileTextView}>
                            <Text style={styles.boldText}>
                                {"Puesto de trabajo : "}
                            </Text>
                            <Text style={styles.noBoldText}>
                                {login.data.job}
                            </Text>
                        </View>
                        <View style={styles.profileTextView}>
                            <Text style={styles.boldText}>
                                {"Departamento : "}
                            </Text>
                            <Text style={styles.noBoldText}>
                                {login.data.department}
                            </Text>
                        </View>
                        <View style={styles.profileTextView}>
                            <Text style={styles.boldText}>
                                {"Fecha de alta : "}
                            </Text>
                            <Text style={styles.noBoldText}>
                                {login.data.dischargeDate}
                            </Text>
                        </View>
                        <View style={styles.profileTextViewLast}>
                            <Text style={styles.boldText}>
                                {"Responsable : "}
                            </Text>
                            <Text style={styles.noBoldText}>
                                {login.data.responsable}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bottomView}>
                        <View style={styles.profileTextView}>
                            <Text style={styles.boldText}>
                                {"GDPR :"}
                            </Text>
                            <FastImage
                                source = {require('../../images/tick.png')}
                                style = {styles.tick}
                                resizeMode = {FastImage.resizeMode.cover}
                                tintColor = "green"
                            />

                            <TouchableOpacity
                                //onPress={leftClick}
                                style={styles.eyeBtn}
                            >
                                <Icon
                                    name="eye"
                                    color= {darkBlue}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profileTextViewLast}>
                            <Text style={styles.boldText}>
                                {"Contrato :"}
                            </Text>
                            <FastImage
                                source = {require('../../images/tick.png')}
                                style = {styles.tick}
                                resizeMode = {FastImage.resizeMode.cover}
                                tintColor = "green"
                            />
                            <TouchableOpacity
                                //onPress={leftClick}
                                style={styles.eyeBtn}
                            >
                                <Icon
                                    name="eye"
                                    color= {darkBlue}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(Profile);