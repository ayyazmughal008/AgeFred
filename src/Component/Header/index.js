import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { iconName, leftClick, title } = this.props
        return (
            <FastImage
                source={require('../../Screens/Login/assets/Logo.png')}
                style={{
                    width: widthPercentageToDP(30),
                    height: widthPercentageToDP(25)
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        )
    }
}
