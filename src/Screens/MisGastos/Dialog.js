import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native'
import { styles } from './styles';
import FastImage from 'react-native-fast-image'
// import { dispatchFunc } from '../../Redux/action'

export default class DialogBox extends Component {

    render() {
        const { isDialogOpen, errorMessage, cameraButton, GalleryButton } = this.props
        return (
            <Modal
                transparent={true}
                visible={isDialogOpen}
                onRequestClose={() => {
                    console.log('alert close')
                }}
            >
                <View
                    style={styles.modalMain2}>
                    <View style={styles.innerModal}>
                        <View style={styles.quesBox}>
                            {/* <View style={styles.textView}> */}
                            <Text style={styles.text2}>
                                {errorMessage}
                            </Text>
                            {/* </View> */}
                            <View style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-around",
                                position:"absolute",
                                bottom:"4%"
                            }}>
                                <TouchableOpacity
                                    style={styles.confirmBtn}
                                    onPress={cameraButton}
                                >
                                    <Text style={styles.confirmText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.confirmBtn,{
                                        marginLeft:20
                                    }]}
                                    onPress={GalleryButton}
                                >
                                    <Text style={styles.confirmText}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}