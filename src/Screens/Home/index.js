import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import { fetchDataPart, submitGDPRDocument, logOut, getAllTools, getAllUsers, clearCache } from '../../Redux/action'
import { Header } from 'react-native-elements'
import Pdf from 'react-native-pdf';
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Card from '../../Component/Card'
import Orientation from 'react-native-orientation';
import FastImage from 'react-native-fast-image'
import { NavigationEvents } from 'react-navigation';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
        this.getData();
    }
    getData = () => {
        const { login } = this.props.user;
        if (login) {
            if (login.condition === false) {
                this.props.getAllTools(login.data.employRoleId, login.data.id, "yes");
                this.props.clearCache();
            } else {
                Orientation.lockToPortrait();
                Orientation.addOrientationListener(this._onOrientationDidChange);
                this.props.getAllUsers(login.data.id, "yes");
                this.props.clearCache();
            }
            // if (login.condition !== false) {
            //     this.props.getAllUsers(login.data.id, "yes")
            //     //this.props.fetchDataPart(login.data.id);
            // } else {
            //     this.props.getAllUsers(login.data.id, "yes")
            // }
        }
    }
    toggleCheck = () => {
        this.setState({ isChecked: !this.state.isChecked })
    }
    _onLayout = (e) => {
        console.log(e.nativeEvent.layout.height)
        let width = e.nativeEvent.layout.width
        let height = e.nativeEvent.layout.height
        this.setState({
            height: height,
            width: width
        })
    }
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE') {
            Orientation.lockToPortrait()
        }
    };
    componentDidMount() {
        const { login } = this.props.user;
        if (login) {
            if (login.condition === false) {
                this.props.getAllTools(login.data.employRoleId, login.data.id, "yes");
                this.props.clearCache();
            } else {
                Orientation.lockToPortrait();
                Orientation.addOrientationListener(this._onOrientationDidChange);
                this.props.getAllUsers(login.data.id, "yes");
                this.props.clearCache();
            }
        }
    }
    componentWillUnmount() {
        Orientation.unlockAllOrientations()
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }

    render() {
        const { AuthLoading, login, getGdpr } = this.props.user;
        console.log("My loading", AuthLoading);
        if (!getGdpr) {
            return (
                <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                    <Header
                        centerComponent={
                            <HeaderImage
                                isText={false}
                            />
                        }
                        containerStyle={{
                            backgroundColor: darkBlue,
                        }}
                    />
                </View>
            )
        } else {
            if (getGdpr.user.gdpr === null) {
                return (
                    <View style={styles.container2} >
                        <Header
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
                        <View style={{
                            position: "absolute",
                            bottom: "10%",
                            left: "4%",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity
                                onPress={() => this.toggleCheck()}
                                //disabled={this.state.isChecked ? true : false}
                                style={styles.checkBox}>
                                {this.state.isChecked &&
                                    <FastImage
                                        source={require('../../images/tick.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={styles.tick2}
                                    />
                                }
                            </TouchableOpacity>
                            <Text style={[styles.btntext, { color: darkBlue, marginLeft: 10 }]}>{"Marcar como leído"}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.submitBtn, {
                                opacity: this.state.isChecked ? 1 : 0.7
                            }]}
                            onPress={() => { this.props.submitGDPRDocument(login.data.id, getGdpr.docId) }}
                            disabled={this.state.isChecked ? false : true}
                        >
                            <Text style={styles.btntext}>
                                {"Confirmar"}
                            </Text>
                        </TouchableOpacity>
                        {AuthLoading &&
                            <ActivityIndicator
                                size="large"
                                color="pink"
                                style={styles.loading}
                            />
                        }
                    </View>
                )
            } else {
                return (
                    <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                        <NavigationEvents onDidFocus={() => this.getData()} />
                        <Header
                            leftComponent={
                                <MenuImage
                                    leftClick={() => this.props.navigation.openDrawer()}
                                    rightIcon="menu"
                                />
                            }
                            centerComponent={
                                <HeaderImage
                                    isText={false}
                                />
                            }
                            containerStyle={{
                                backgroundColor: darkBlue,
                            }}
                        />
                        <View style={styles.topView}>
                            <Text style={styles.topTitle}>{login.data.name}</Text>
                            <Text style={styles.bottomTitle}>{login.data.level}</Text>
                        </View>
                        <View style={styles.middleView}>
                            <View style={styles.menuView}>
                                <Card
                                    iconName={require('./assets/1.png')}
                                    title="Parte diario"
                                    clickHandler={() => this.props.navigation.navigate('ParteDiario')}
                                />
                                <Card
                                    iconName={require('./assets/2.png')}
                                    title="Mis gastos"
                                    clickHandler={() => this.props.navigation.navigate('MisGastos')}
                                />
                            </View>
                            <View style={styles.menuView}>
                                <Card
                                    iconName={require('./assets/3.png')}
                                    title="Documentos"
                                    clickHandler={() => this.props.navigation.navigate('Documents')}
                                />
                                <Card
                                    iconName={require('./assets/4.png')}
                                    title="EPIS"
                                    clickHandler={() => this.props.navigation.navigate('Epis')}
                                />
                            </View>
                            <View style={styles.menuView}>
                                <Card
                                    iconName={require('../../images/icon-news-28.jpg')}
                                    title="Noticias"
                                    tinit={darkBlue}
                                    clickHandler={() => this.props.navigation.navigate('Blog')}
                                />
                                <Card
                                    iconName={require('./assets/6.png')}
                                    title="Solicitar vacaciones / Permisos"
                                    clickHandler={() => this.props.navigation.navigate('Vocation')}
                                />
                            </View>
                            <View style={styles.menuView}>
                                <Card
                                    iconName={require('./assets/7.png')}
                                    title="Parte de trabajo"
                                    clickHandler={() => this.props.navigation.navigate('Orden')}
                                />
                                <Card
                                    iconName={require('../../images/clock.png')}
                                    title="Registro de jornada"
                                    tinit={darkBlue}
                                    clickHandler={() => this.props.navigation.navigate('TimeTracking')}
                                />
                            </View>
                        </View>
                        {AuthLoading &&
                            <ActivityIndicator
                                size="large"
                                color="pink"
                                style={styles.loading}
                            />
                        }
                    </View>
                );
            }
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {
    fetchDataPart,
    submitGDPRDocument,
    logOut,
    getAllTools,
    getAllUsers,
    clearCache
})(HomePage);