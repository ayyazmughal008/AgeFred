import React from 'react'
import { View, TouchableOpacity, Text, StatusBar, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, grey } from '../ColorCode'
import FastImage from 'react-native-fast-image'

export default class Header extends React.Component {

    render() {
        const {
            date,
            amount,
            bgColor,
            clickHandler
        } = this.props
        return (
            <View style={[styles.container, {
                backgroundColor: bgColor
            }]}>
                <View style={styles.componet1}>
                    <Text style={styles.textStyle}>
                        {date}
                    </Text>
                </View>
                <View style={styles.componet1}>
                    <Text style={styles.textStyle}>
                        {amount}
                    </Text>
                </View>
                <View style={styles.componet2}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={clickHandler}
                >
                    <FastImage
                        source={require('../../images/eye.png')}
                        style={styles.img}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    textStyle: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "300",
        color: darkBlue,
        paddingLeft: widthPercentageToDP(3),
        textAlign: "center"
    },
    btn: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        justifyContent: "center",
        alignItems: "center",
        marginLeft:widthPercentageToDP(20)
    },
    img: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
    },
    componet1: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red"
    },
    componet2: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column-reverse"
        //backgroundColor:"red"
    },
})
