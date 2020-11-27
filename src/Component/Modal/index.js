import React, { Component } from 'react';
import { View, Modal, ScrollView, Text, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue, lightBlue } from '../ColorCode'

export default class DialogBox extends Component {

    render() {
        const {
            isDialogOpen,
            title,
            cancelClick,
            okClick,
        } = this.props
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                animationType='slide'
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <View style={styles.modalMain2}>
                    <View style={styles.quesBox}>
                        <View style={styles.toptile}>
                            <Text style={styles.toptext}>
                                {title}
                            </Text>
                        </View>
                        <View style={styles.bottomView}>
                            <Text
                                style={styles.btnText}
                                onPress={cancelClick}
                            >
                                {"Cancel"}
                            </Text>
                            <Text
                                style={styles.btnText}
                                onPress={okClick}
                            >
                                {"OK"}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}


export const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:"red"
    },
    quesBox: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(20),
        marginLeft: widthPercentageToDP(0),
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: lightBlue,
        borderRadius: widthPercentageToDP(5),
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    btnText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(4),
        fontWeight: "400"
    },
    bottomView: {
        width: "100%",
        height: "25%",
        flexDirection: "row",
        position: "absolute",
        bottom: "0%",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: darkBlue,
        borderBottomLeftRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5)
    },
    toptile: {
        width: "100%",
        height: "35%",
        justifyContent: "center",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#000"
    },
    toptext: {
        color: "#000",
        fontSize: widthPercentageToDP(4),
        fontWeight: "400",
        fontWeight: "200",
        paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1)
    },
    centerView: {
        flex: 1
    },
    radioStyle: {
        paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    }
})