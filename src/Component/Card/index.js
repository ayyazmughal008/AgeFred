import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { iconName, clickHandler, title, tinit } = this.props
        return (
            <TouchableOpacity style={{
                width: widthPercentageToDP(40),
                height: widthPercentageToDP(20),
                backgroundColor: "#ffff",
                borderRadius: widthPercentageToDP(1),
                justifyContent: "center",
                alignItems: "center",
                shadowColor: '#000000',
                elevation: 5,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 3,
                shadowOpacity: 0.5
            }}
                onPress={clickHandler}
            >
                <FastImage
                    source={iconName}
                    style={{
                        width: widthPercentageToDP(8),
                        height: widthPercentageToDP(8),
                    }}
                    tintColor={tinit}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                    style={{
                        fontSize: widthPercentageToDP(3),
                        fontWeight: "bold",
                        color: darkBlue,
                        marginTop: heightPercentageToDP(0.5),
                        textAlign: "center"
                    }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}
