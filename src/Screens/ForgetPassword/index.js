import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { changeUserPass, updateForgetPass } from "../../Redux/action";
import { connect } from "react-redux";
import { darkBlue } from '../../Component/ColorCode'
import { styles } from "./styles";
import Validate from 'validator'
// import { TextInput } from 'react-native-paper';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dni: "",
            email: "",
            password: "",
            confirm: "",
        };
    }
    onChange = password => this.setState({ password })
    onChangeConfirm = confirm => this.setState({ confirm })

    onSubmit = () => {
        const { password, confirm, dni, email } = this.state;
        if (!dni) {
            alert('Por favor proporcione su DNI')
            return;
        }
        if (!Validate.isEmail(email)) {
            alert('Proporcione un correo electrónico válido')
            return;
        }
        // if (!confirm.length === 8) {
        //     alert("Proporcione confirmación de contraseña")
        //     return;
        // }
        // if (password !== confirm) {
        //     alert("La contraseña y la confirmación de contraseña deben coincidir")
        //     return;
        // }
        this.props.updateForgetPass(
            dni,
            email,
        )
    }

    render() {
        const { AuthLoading } = this.props.user;
        const { password, confirm, dni, email } = this.state
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0
        //console.log("My loading", AuthLoading);
        return (
            // <KeyboardAvoidingView
            //     style={{ flex: 1 }}
            //     behavior='padding'
            // //keyboardVerticalOffset={keyboardVerticalOffset}
            // >
                <View style={styles.container}>
                    <Header
                        leftComponent={
                            <MenuImage
                                leftClick={() => {
                                    this.props.navigation.goBack()
                                }}
                                rightIcon="chevron-thin-left"
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
                    <View style={styles.container2}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.mainView}>
                                <TextInput
                                    placeholder="DNI"
                                    placeholderTextColor={darkBlue}
                                    value={dni}
                                    style={styles.input}
                                    autoCapitalize = "none"
                                    //secureTextEntry={true}
                                    onChangeText={value => this.setState({ dni: value })}
                                />
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor={darkBlue}
                                    value={email}
                                    style={styles.input}
                                    autoCapitalize = "none"
                                    //secureTextEntry={true}
                                    //password = {true}
                                    onChangeText={value => this.setState({ email: value })}
                                />
                                {/* <TextInput
                                    placeholder="Por favor introduzca su nueva contraseña"
                                    placeholderTextColor={darkBlue}
                                    value={password}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    //password = {true}
                                    onChangeText={value => this.setState({ password: value })}
                                />
                                <TextInput
                                    placeholder="Repita su nueva contraseña"
                                    placeholderTextColor={darkBlue}
                                    value={confirm}
                                    style={styles.input}
                                    secureTextEntry={true}
                                    //password = {true}
                                    onChangeText={value => this.setState({ confirm: value })}
                                /> */}
                                {/* <TextInput
                                    label="Por favor introduzca su nueva contraseña"
                                    style={styles.input}
                                    secureTextEntry={true}
                                    password = {true}
                                    onChangeText={this.onChange}
                                    theme={{ colors: { primary: 'grey' } }}
                                />
                                <BarPasswordStrengthDisplay
                                password={password}
                                minLength={8}
                            />
                                <TextInput
                                    label="Repita su nueva contraseña"
                                    style={styles.input}
                                    secureTextEntry={true}
                                    password = {true}
                                    onChangeText={this.onChangeConfirm}
                                    theme={{ colors: { primary: 'grey' } }}
                                />
                                <BarPasswordStrengthDisplay
                                password={confirm}
                                minLength={8}
                            /> */}
                                <TouchableOpacity
                                    style={styles.btnBottom}
                                    onPress={() => this.onSubmit()
                                        // this.props.fetchLoginDetail(
                                        //     this.state.dni,
                                        //     this.state.password
                                        // )
                                    }
                                >
                                    <Text style={styles.btnText}>{"Enviar"}</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                        {AuthLoading &&
                            <ActivityIndicator
                                size="large"
                                color= {darkBlue}
                                style={styles.loading}
                            />
                        }
                    </View>
                </View>
            // </KeyboardAvoidingView>
        );
    }

}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { changeUserPass, updateForgetPass })(Login);