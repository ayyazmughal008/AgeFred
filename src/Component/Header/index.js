import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/AntDesign';

export default class Header extends React.Component {

    render() {
        const { iconName, leftClick, title } = this.props
        return (
            <View style={{
                width: widthPercentageToDP(100),
                height: heightPercentageToDP(6),
                alignItems: "center",
                //justifyContent:"center",
                flexDirection: "row",
                marginTop: heightPercentageToDP(5)
            }}>
                <TouchableOpacity
                    style={{
                        marginLeft: widthPercentageToDP(3),
                        alignItems: "center"
                    }}
                    onPress={leftClick}
                >
                    <Icon
                        name={iconName}
                        color="#707070"
                        size={widthPercentageToDP(6)}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: widthPercentageToDP(5.5),
                    fontFamily: "Montserrat-Regular",
                    color: "#707070",
                    marginLeft: widthPercentageToDP(2.5),
                    textAlign: "center",
                    marginTop: widthPercentageToDP(1.5)
                }}>
                    {title}
                </Text>
            </View>
        )
    }
}
