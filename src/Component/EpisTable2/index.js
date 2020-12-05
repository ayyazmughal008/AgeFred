import React from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkBlue, darkGrey, grey } from '../ColorCode'
import NestedScrollView from 'react-native-nested-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';

export default class List extends React.Component {

    render() {
        const {
            bgColor,
            tool,
            dropdownHandler,
            dropDownValue,
            onChangeDropDown,
            onchangeTalaText,
            textValue,
            isEditAble,
            status,
            reason
        } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.mainView}>
                    <View style={[styles.component, { width: "15%", backgroundColor: bgColor }]}>
                        <Text>{tool}</Text>
                    </View>
                    <View style={[styles.component, { width: "10%", backgroundColor: bgColor }]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Tala"
                            placeholderTextColor={darkGrey}
                            onChangeText={onchangeTalaText}
                            value={textValue}
                            keyboardType='email-address'
                            textAlign={'center'}
                            editable={isEditAble}
                        />
                    </View>
                    <View style={[styles.component, { width: "16%", backgroundColor: bgColor }]}>
                        {/* {!dropDownValue ? */}
                        <Dropdown
                            containerStyle={styles.dropStyle2}
                            label='Motivo'
                            data={dropdownHandler}
                            value={dropDownValue}
                            onChangeText={onChangeDropDown}
                        />
                        {/* : <Text>{dropDownValue}</Text> */}
                        {/* } */}
                    </View>
                    <View style={[styles.component2, { width: "46%", backgroundColor: bgColor }]}>
                        <View style={{ width: "30%", height: "100%" }}>
                            <Text style={styles.statusTile}>{"PRL"}</Text>
                            <Text style={styles.statusTile}>{status}</Text>
                            {/* <Text style={styles.statusTile}>{"Rechazado"}</Text> */}
                        </View>
                        <View style={{ width: "60%", height: "100%" }}>
                            <Text style={styles.statusTile}>{"Motivo"}</Text>
                            {/* <Text style={styles.statusTileResult}>{status}</Text> */}
                            {Platform.OS === 'android' ?
                                <NestedScrollView
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={styles.statusTileResult}>{reason}</Text>
                                </NestedScrollView>
                                : <ScrollView
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={styles.statusTileResult}>{reason}</Text>
                                </ScrollView>
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: widthPercentageToDP(20),
        alignItems: "center"
    },
    input: {
        width: "100%",
        height: "60%",
        color: darkBlue,
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkBlue
    },
    mainView: {
        flexDirection: "row",
        //justifyContent:"center"
    },
    statusTile: {
        width: '100%',
        flex: 1,
        fontSize: heightPercentageToDP(2),
        fontWeight: 'bold',
        color: darkBlue,
        paddingLeft: widthPercentageToDP(2),
    },
    statusTileResult: {
        width: '100%',
        flex: 1,
        fontSize: heightPercentageToDP(2),
        fontWeight: '300',
        color: darkBlue,
        paddingLeft: widthPercentageToDP(2),
    },
    component: {
        height: widthPercentageToDP(20),
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: darkGrey
    },
    component2: {
        height: widthPercentageToDP(20),
        alignItems: "center",
        flexDirection: "row",
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