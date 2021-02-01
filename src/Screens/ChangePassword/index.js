import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { changeUserPass } from "../../Redux/action";
import { connect } from "react-redux";
import { darkBlue } from '../../Component/ColorCode'
import { styles } from "./styles";
import { TextInput } from 'react-native-paper';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dni: "",
            password: "",
            confirm: "",
        };
    }
    onChange = password => this.setState({ password })
    onChangeConfirm = confirm => this.setState({ confirm })

    onSubmit = () => {
        const { password, confirm } = this.state;
        const { login } = this.props.user;
        if (!password.length === 8) {
            alert('Por favor ingrese contraseña')
            return;
        }
        if (!confirm.length === 8) {
            alert("Proporcione confirmación de contraseña")
            return;
        }
        if (password !== confirm) {
            alert("La contraseña y la confirmación de contraseña deben coincidir")
            return;
        }
        this.props.changeUserPass(
            login.data.id,
            password,
            confirm
        )
    }

    render() {
        const { AuthLoading } = this.props.user;
        const { password, confirm } = this.state
        console.log("My loading", AuthLoading);
        return (
            <View style={styles.container}>
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
                <View style={styles.container2}>

                    <View style={styles.mainView}>
                        <TextInput
                            label="Por favor introduzca su nueva contraseña"
                            style={styles.input}
                            secureTextEntry={true}
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
                            onChangeText={this.onChangeConfirm}
                            theme={{ colors: { primary: 'grey' } }}
                        />
                        <BarPasswordStrengthDisplay
                            password={confirm}
                            minLength={8}
                        />
                        <TouchableOpacity
                            style={styles.btnBottom}
                            onPress={() => this.onSubmit()
                                // this.props.fetchLoginDetail(
                                //     this.state.dni,
                                //     this.state.password
                                // )
                            }
                        >
                            <Text style={styles.btnText}>{"Cambia la contraseña"}</Text>
                        </TouchableOpacity>
                    </View>
                    {AuthLoading &&
                        <ActivityIndicator
                            size="large"
                            color="pink"
                            style={styles.loading}
                        />
                    }
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { changeUserPass })(Login);