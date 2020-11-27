import React from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, grey, darkGrey } from '../ColorCode'
import FastImage from 'react-native-fast-image'
import NestedScrollView from 'react-native-nested-scroll-view'
//import { ScrollView } from 'react-native-gesture-handler'
export default class Header extends React.Component {

    render() {
        const {
            text1,
            text2,
            text3,
            text4,
            text5,
            bgColor,
            mapClick
        } = this.props
        return (
            <View style={styles.container}>
                <View style={[styles.componet1, {
                    backgroundColor: bgColor
                }]}>
                    <Text style={styles.componetText}>
                        {text1}
                    </Text>
                </View>
                <View style={[styles.componet2, {
                    backgroundColor: bgColor
                }]}>
                    <Text style={styles.componetText}>
                        {text2}
                    </Text>
                </View>
                <View style={[styles.componet3, {
                    backgroundColor: bgColor
                }]}>
                    <Text style={styles.componetText}>
                        {text3}
                    </Text>
                </View>
                <View style={[styles.componet4, {
                    backgroundColor: bgColor
                }]}>
                    <Text style={styles.componetText}>
                        {text4}
                    </Text>
                </View>
                <View style={[styles.componet5, {
                    backgroundColor: bgColor
                }]}>
                    <TouchableOpacity
                        onPress={mapClick}
                    >
                        <Text style={styles.componetText}>
                            {text5}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        overflow: 'hidden'
    },
    componet1: {
        width: '20%',
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
        borderRightColor: darkBlue
        //backgroundColor:"red"
    },
    componetText: {
        fontSize: widthPercentageToDP(2.3),
        fontWeight: "400",
        color: darkBlue,
        textAlign: "center",
    },
    conceptoText: {
        fontSize: widthPercentageToDP(2.3),
        fontWeight: "400",
        color: darkBlue,
        textAlign: "center",
        padding: widthPercentageToDP(1.5)
    },
    componet2: {
        width: '20%',
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
    },
    componet3: {
        width: '20%',
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
    },
    componet4: {
        width: '20%',
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
    },
    componet5: {
        width: '19%',
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
    },
    componet6: {
        width: widthPercentageToDP(25),
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkGrey,
    },
    componet7: {
        width: widthPercentageToDP(8.5),
        height: heightPercentageToDP(7),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"purple"
    },
    box: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        borderWidth: widthPercentageToDP(0.5),
        borderColor: grey,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: widthPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
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
