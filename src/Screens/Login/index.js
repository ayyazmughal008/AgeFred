import React, { Component } from "react";
import { Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { fetchHomePage } from "../../Redux/action";
import { connect } from "react-redux";
import { styles } from "./styles";
import { TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    this.props.fetchHomePage();
  }
  render() {
    const { AuthLoading } = this.props.user;
    console.log("My loading", AuthLoading);
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
            onChangeText={text => this.setState({ email: text })}
            theme={{ colors: { primary: 'grey' } }}
          />
          <TextInput
            label="Contrasena"
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            theme={{ colors: { primary: 'grey' } }}
          />
          <View style={styles.inlineText}>
            <Text style={styles.forgetPass}>{"Olvido su contrasena?"}</Text>
            <Text style={styles.forgetClick}> {"Haga clic aqui"} </Text>
          </View>
          <TouchableOpacity style={styles.btnBottom}>
            <Text style={styles.btnText}>{"Inciar sesion"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps, { fetchHomePage })(Home);