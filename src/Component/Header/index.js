import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { title, isText } = this.props
        return (isText ?
            <Text
                style={{
                    fontSize: widthPercentageToDP(3),
                    fontWeight: "bold",
                    color: "#ffff",
                }}>
                {title}
            </Text>
            : <FastImage
                source={require('../../Screens/Home/assets/logo-white.png')}
                style={{
                    width: widthPercentageToDP(30),
                    height: widthPercentageToDP(25)
                }}
                resizeMode={FastImage.resizeMode.contain}
            />

        )
    }
}
