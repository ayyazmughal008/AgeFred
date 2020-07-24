"use strict";
import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";


export default class History extends React.Component {
  _isMounted = false;

  state = {
  };


  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.historyConatiner}>

      </View>
    );
  }
}