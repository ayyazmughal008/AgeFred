import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native'
import { styles } from './styles';
import FastImage from 'react-native-fast-image'

export default class DialogBox extends Component {

    render() {
        const { isDialogOpen, errorMessage, cameraButton, GalleryButton, btnText1, btnText2, cancelBox } = this.props
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <TouchableOpacity
                    style={styles.modalMain2}
                    activeOpacity={1}
                    onPressOut={cancelBox}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.innerModal}>

                            <View style={styles.quesBox}>
                                {/* <View style={styles.textView}> */}
                                <Text style={styles.text2}>
                                    {errorMessage}
                                </Text>
                                <View style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    position: "absolute",
                                    bottom: "4%"
                                }}>
                                    <TouchableOpacity
                                        style={styles.confirmBtn}
                                        onPress={cameraButton}
                                    >
                                        <Text style={styles.confirmText}>{btnText1}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.confirmBtn, {
                                            marginLeft: 20
                                        }]}
                                        onPress={GalleryButton}
                                    >
                                        <Text style={styles.confirmText}>{btnText2}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        )
    }
}