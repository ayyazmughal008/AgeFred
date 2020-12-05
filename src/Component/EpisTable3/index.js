import React from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, darkGrey, grey } from '../ColorCode'
import FastImage from 'react-native-fast-image'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';

export default class List extends React.Component {

    render() {
        const {
            bgColor,
            tool,
            delivery,
            expiration,
            orderNo,
            serialNo,
            size,
            medical,
            revision
        } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={[styles.component, { width: "15%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{tool}</Text>
                    </View>
                    <View style={[styles.component, { width: "12%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{delivery}</Text>
                    </View>
                    <View style={[styles.component, { width: "11%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{expiration}</Text>
                    </View>
                    <View style={[styles.component, { width: "10%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{orderNo}</Text>
                    </View>
                    <View style={[styles.component, { width: "8%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{serialNo}</Text>
                    </View>
                    <View style={[styles.component, { width: "8%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{size}</Text>
                    </View>
                    <View style={[styles.component, { width: "6%", backgroundColor: bgColor }]}>
                        <TouchableOpacity style={styles.checkBox}>
                            {medical === "on" &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    style={styles.tick}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component, { width: "14%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{revision}</Text>
                    </View>
                    <View style={[styles.component, { width: "16%", backgroundColor: bgColor }]}>
                        <Text style={styles.text}>{"Photo"}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        width: heightPercentageToDP(95),
        height: widthPercentageToDP(10),
        alignItems: "center"
    },
    mainView: {
        flexDirection: "row",
    },
    component: {
        height: widthPercentageToDP(10),
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkGrey
    },
    checkBox: {
        width: widthPercentageToDP(5),
        height: widthPercentageToDP(5),
        borderWidth: widthPercentageToDP(0.2),
        borderColor: darkBlue,
        borderRadius: widthPercentageToDP(0.2),
        justifyContent: "center",
        alignItems: "center"
    },
    tick: {
        width: widthPercentageToDP(3.5),
        height: widthPercentageToDP(3.5),
    },
    upload: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    uploadImg: {
        width: widthPercentageToDP(5),
        height: widthPercentageToDP(5)
    },
    dropStyle2: {
        width: "100%",
    },
    text: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "300",
        color: darkBlue
    }
})