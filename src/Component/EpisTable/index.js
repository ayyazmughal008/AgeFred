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
            imagePicker,
            isCheckBox1,
            isCheckBox2,
            isCheckBox3,
            checkBoxClick1,
            checkBoxClick2,
            checkBoxClick3,
            dropdownHandler,
            dropDownValue,
            onChangeDropDown,
            type,
            isUpload,
            date

        } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={[styles.component, { width: "15%", backgroundColor: bgColor }]}>
                        <Text>{type}</Text>
                    </View>
                    <View style={[styles.component, { width: "13%", backgroundColor: bgColor }]}>
                        <TouchableOpacity
                            style={styles.checkBox}
                            onPress={checkBoxClick1}
                        >
                            {isCheckBox1 &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    style={styles.tick}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component, { width: "13%", backgroundColor: bgColor }]}>
                        <TouchableOpacity
                            style={styles.checkBox}
                            onPress={checkBoxClick2}
                        >
                            {isCheckBox2 &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    style={styles.tick}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component, { width: "13%", backgroundColor: bgColor }]}>
                        <Text>{date}</Text>
                    </View>
                    <View style={[styles.component, { width: "10%", backgroundColor: bgColor }]}>
                        <TouchableOpacity
                            style={styles.checkBox}
                            onPress={checkBoxClick3}
                        >
                            {isCheckBox3 &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    style={styles.tick}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component, { width: "15%", backgroundColor: bgColor, borderRightWidth: widthPercentageToDP(0.2) }]}>
                        <Dropdown
                            containerStyle={styles.dropStyle2}
                            label='Favorite Fruit'
                            data={dropdownHandler}
                            value={dropDownValue}
                            onChangeText={onChangeDropDown}
                        />
                    </View>
                    <View style={[styles.component, { width: "18%", backgroundColor: bgColor }]}>
                        <TouchableOpacity
                            style={styles.upload}
                            onPress={imagePicker}
                            disabled={isUpload ? true : false}
                        >
                            <FastImage
                                source={isUpload ? require('../../images/tick.png')
                                    : require('../../images/download.png')
                                }
                                style={styles.uploadImg}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
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
        //alignItems: "center",
        marginLeft: heightPercentageToDP(4)
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
})