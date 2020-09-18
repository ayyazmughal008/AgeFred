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

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.fetchDataPart()
    }
    render() {
        const { AuthLoading } = this.props.user;
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
                    <Text style={styles.topTitle}>{"Travis Newman"}</Text>
                    <Text style={styles.bottomTitle}>{"Empleado Nivel 1"}</Text>
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
                    <View style={styles.menuView2}>
                        <Card
                            iconName={require('./assets/7.png')}
                            title="Orden de trabajo"
                            clickHandler = {()=> this.props.navigation.navigate('Orden')}
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