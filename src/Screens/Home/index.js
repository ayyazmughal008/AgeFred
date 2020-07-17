import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, } from "react-native";
import { connect } from "react-redux";
import { styles } from "./styles";
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
    }
    render() {
        const { AuthLoading } = this.props.user;
        console.log("My loading", AuthLoading);
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={
                        <MenuImage
                        leftClick = {()=> this.props.navigation.openDrawer()} 
                        />
                    }
                    centerComponent={<HeaderImage />}
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
                        />
                        <Card
                            iconName={require('./assets/2.png')}
                            title="Mis gastos"
                        />
                    </View>
                    <View style={styles.menuView}>
                        <Card
                            iconName={require('./assets/3.png')}
                            title="Documentos"
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
                        />
                        <Card
                            iconName={require('./assets/6.png')}
                            title="Solicitar vacaciones / Permisos"
                        />
                    </View>
                    <View style={styles.menuView2}>
                        <Card
                            iconName={require('./assets/7.png')}
                            title="Orden de trabajo"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(HomePage);