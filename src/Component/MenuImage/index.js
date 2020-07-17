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
            <TouchableOpacity
                onPress={leftClick}
            >
                <Icon
                    name="menu"
                    color="#ffff"
                    size={25}
                />
            </TouchableOpacity>
        )
    }
}
