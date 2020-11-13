import React from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, darkGrey, grey } from '../ColorCode'
import FastImage from 'react-native-fast-image'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';

export default class List extends React.Component {

    render() {
        const { bgColor, dropDownHandler, imagePicker, data } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={[styles.component, { width: "15%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>CASCO</Text>
                    </View>
                    <View style={[styles.component, { width: "12%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>01/02/2020</Text>
                    </View>
                    <View style={[styles.component, { width: "11%", backgroundColor: bgColor }]}>
                    <Text style = {styles.text}>01/02/2024</Text>
                    </View>
                    <View style={[styles.component, { width: "10%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>5215462</Text>
                    </View>
                    <View style={[styles.component, { width: "13%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>12</Text>
                    </View>
                    <View style={[styles.component, { width: "13%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>XL</Text>
                    </View>
                    <View style={[styles.component, { width: "12%", backgroundColor: bgColor }]}>
                        <TouchableOpacity style={styles.checkBox}>
                            <FastImage
                                source={require('../../images/tick.png')}
                                style={styles.tick}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component, { width: "14%", backgroundColor: bgColor }]}>
                        <Text style = {styles.text}>02/06/2020</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        width: heightPercentageToDP(100),
        height: widthPercentageToDP(10),
    },
    mainView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        //justifyContent:"center"
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
    text:{
        fontSize:widthPercentageToDP(3),
        fontWeight:"300",
        color: darkBlue
    }
})