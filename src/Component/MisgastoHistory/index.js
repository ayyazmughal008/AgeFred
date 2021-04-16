import React from 'react'
import { View, TouchableOpacity, Text, StatusBar, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, grey } from '../ColorCode'
import Icon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'

export default class Header extends React.Component {

    render() {
        const {
            date,
            amount,
            bgColor,
            clickHandler,
            boxClickHandler,
            isTrue,
            status,
            type
        } = this.props
        return (
            <View style={[styles.container, {
                backgroundColor: bgColor
            }]}>
                <View style={styles.componet3}>
                    <Text style={styles.textStyle}>
                        {date}
                    </Text>
                </View>
                <View style={styles.componet2}>
                    <Text style={styles.textStyle}>
                        {amount}
                    </Text>
                </View>
                <View style={styles.componet3}>
                    <Text style={styles.textStyle}>
                        {type}
                    </Text>
                </View>
                <View style={styles.componet1}>
                    <Text style={styles.textStyle}>
                        {status}
                    </Text>
                </View>
                <View style={styles.componet4}>
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
                {status === 'Pendiente' &&
                    <TouchableOpacity
                        onPress={boxClickHandler}
                        style={styles.componet4}
                        disabled={isTrue === 'pending' ? true
                            : false}
                    >
                        <View style={styles.box}>
                            {isTrue === true ?
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                                : isTrue === 'pending' ?
                                    <Icon
                                        name="close"
                                        color="#000"
                                        size={10}
                                    />
                                    : <View />
                            }
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    textStyle: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "300",
        color: darkBlue,
        textAlign: 'center'
    },
    btn: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
    },
    componet1: {
        width: widthPercentageToDP(24.1),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: "#000"
        //backgroundColor:"red"
    },
    componet2: {
        width: widthPercentageToDP(15),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: "#000"
        //backgroundColor:"yellow"
    },
    componet3: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: "#000"
        //backgroundColor:"yellow"
    },
    componet4: {
        width: widthPercentageToDP(10),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column-reverse",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: "#000"
        //backgroundColor:"yellow"
    },
    box: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        borderWidth: widthPercentageToDP(0.5),
        borderColor: grey,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffff",
        borderRadius: widthPercentageToDP(1),
    },
    box2: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        borderWidth: widthPercentageToDP(0.5),
        borderColor: grey,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: widthPercentageToDP(1),
    },
    tick: {
        width: widthPercentageToDP(2),
        height: widthPercentageToDP(2)
    },
})
