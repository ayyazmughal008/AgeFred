import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
import {fetchDataPart} from '../../Redux/action'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Card from '../../Component/Card'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.fetchDataPart()
    }
    render() {
        const { AuthLoading, login } = this.props.user;
        console.log("My loading", AuthLoading);
        return (
            <View style={styles.container}>
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
                            clickHandler = {()=> this.props.navigation.navigate('ParteDiario')}
                        />
                        <Card
                            iconName={require('./assets/2.png')}
                            title="Mis gastos"
                            clickHandler = {()=> this.props.navigation.navigate('MisGastos')}
                        />
                    </View>
                    <View style={styles.menuView}>
                        <Card
                            iconName={require('./assets/3.png')}
                            title="Documentos"
                            clickHandler = {()=> this.props.navigation.navigate('Documents')}
                        />
                        <Card
                            iconName={require('./assets/4.png')}
                            title="EPIS"
                            clickHandler = {()=> this.props.navigation.navigate('Epis')}
                        />
                    </View>
                    <View style={styles.menuView}>
                        <Card
                            iconName={require('./assets/5.png')}
                            title="Blog"
                            clickHandler = {()=> this.props.navigation.navigate('Blog')}
                        />
                        <Card
                            iconName={require('./assets/6.png')}
                            title="Solicitar vacaciones / Permisos"
                            clickHandler = {()=> this.props.navigation.navigate('Vocation')}
                        />
                    </View>
                    <View style={styles.menuView}>
                        <Card
                            iconName={require('./assets/7.png')}
                            title="Orden de trabajo"
                            clickHandler = {()=> this.props.navigation.navigate('Orden')}
                        />
                        <Card
                            iconName={require('../../images/clock.png')}
                            title="Registro de jornada"
                            tinit= {darkBlue}
                            clickHandler = {()=> this.props.navigation.navigate('TimeTracking')}
                        />
                    </View>
                </View>
                {AuthLoading && 
                <ActivityIndicator
                    size = "large"
                    color = "pink"
                    style = {styles.loading}
                />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {fetchDataPart})(HomePage);