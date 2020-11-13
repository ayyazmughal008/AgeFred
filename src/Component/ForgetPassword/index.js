import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'


export default class DialogBox extends Component {

    render() {
        const { isDialogOpen, handleMessage, cancelClick, okClick } = this.props
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                animationType = 'slide'
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <View
                    style={styles.modalMain2}>
                    <View style={styles.innerModal}>
                        <View style={styles.quesBox}
                        >
                            <TextInput
                                placeholder="Please write something"
                                placeholderTextColor = "#000"
                                style={styles.input}
                                onChangeText={handleMessage}
                            />
                            <View style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                position: "absolute",
                                bottom: "4%",
                                //backgroundColor: "red"
                            }}>
                                <TouchableOpacity
                                    style={styles.confirmBtn}
                                    onPress={cancelClick}
                                >
                                    <Text style={styles.confirmText}>
                                        CANCEL
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.confirmBtn, {
                                        marginLeft: widthPercentageToDP(10)
                                    }]}
                                    onPress={okClick}
                                >
                                    <Text style={styles.confirmText}>
                                        OK
                                </Text>
                                </TouchableOpacity>
                            </View>
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
    innerModal2: {
        width: "100%",
        height: "100%",
        marginBottom: widthPercentageToDP(10),
        marginLeft: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(5)
    },
    quesBox: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        marginLeft: widthPercentageToDP(2),
        borderRadius:widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: "#fff"
    },
    textView: {
        //alignItems: 'flex-start',
        //marginTop: widthPercentageToDP(3),
    },
    text2: {
        color: "#000",
        fontSize: widthPercentageToDP(4.5),
        //textAlign:"center",
        width: widthPercentageToDP(78),
        paddingLeft: widthPercentageToDP(3),
        marginTop: widthPercentageToDP(7)

    },
    confirmBtn: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(4),
        borderRadius:widthPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3D6DCC"
    },
    confirmStyle: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(10),
    },
    confirmText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(3.5),
    },
    input: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(7),
        padding: widthPercentageToDP(1),
        color:"#000",
        fontSize:widthPercentageToDP(4),
        borderBottomWidth:widthPercentageToDP(0.2),
        borderBottomColor:"#000"
    }
})
