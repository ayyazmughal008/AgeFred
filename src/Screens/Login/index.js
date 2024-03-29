import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { fetchLoginDetail } from "../../Redux/action";
import { connect } from "react-redux";
import { styles } from "./styles";
import { TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import ForgetPassword from '../../Component/ForgetPassword'
import { darkBlue } from "../../Component/ColorCode";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      password: "",
      promptVisible: false
    };
  }
  toggleDialog = () => {
    this.setState({ promptVisible: !this.state.promptVisible })
  }

  render() {
    const { AuthLoading, fcmToken } = this.props.user;
    //console.log("My Token is ===>", fcmToken);
    return (
      <View
        style={styles.container}
      >
        <View style={styles.mainView}>
          <FastImage
            source={require('./assets/Logo.png')}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.logo}
          />
          <TextInput
            label="DNI"
            style={styles.input}
            onChangeText={text => this.setState({ dni: text })}
            theme={{ colors: { primary: 'grey' } }}
          />
          <TextInput
            label="Contraseña"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            theme={{ colors: { primary: 'grey' } }}
          />
          <View style={styles.inlineText}>
            <Text style={styles.forgetPass}>{"Olvidó su contraseña? "}</Text>
            <Text
              style={styles.forgetClick}
              onPress={() => this.props.navigation.navigate('ForgetPass')}
            >
              {"Haga clic aquí."} </Text>
          </View>
          <TouchableOpacity
            style={styles.btnBottom}
            onPress={() =>
              this.props.fetchLoginDetail(
                this.state.dni,
                this.state.password,
                fcmToken
              )
            }
          >
            <Text style={styles.btnText}>{"Iniciar sesión"}</Text>
          </TouchableOpacity>
        </View>
        {AuthLoading &&
          <ActivityIndicator
            size="large"
            color= {darkBlue}
            style={styles.loading}
          />
        }
        {this.state.promptVisible &&
          <ForgetPassword
            isDialogOpen={this.state.promptVisible}
            handleMessage={text => this.setState({ text: text })}
            cancelClick={() => this.toggleDialog()}
          // okClick={() => {
          //   this.add(this.state.text);
          //   this.toggleDialog();
          // }}
          />
        }
      </View>
    );
  }

}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { fetchLoginDetail })(Login);