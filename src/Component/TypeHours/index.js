import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { name,value } = this.props
        return (
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: widthPercentageToDP(2),
                paddingRight: widthPercentageToDP(2),
                paddingTop:heightPercentageToDP(1)
                //alignItems:"center"
            }}>
                <Text
                    style={{
                        fontSize: widthPercentageToDP(3),
                        fontWeight: "300",
                        color: darkBlue,
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        fontSize: widthPercentageToDP(3),
                        fontWeight: "300",
                        color: darkBlue,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
}
