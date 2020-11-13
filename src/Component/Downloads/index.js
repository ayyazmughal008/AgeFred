import React from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { title, clickHandler, previewHandler } = this.props
        return (
            <View style={{
                width: widthPercentageToDP(90),
                height: widthPercentageToDP(10),
                backgroundColor: "#ffff",
                borderRadius: widthPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
                //alignItems: "center",
                justifyContent: "center",
                paddingLeft: widthPercentageToDP(1),
                paddingRight: widthPercentageToDP(1),
                shadowColor: '#000000',
                elevation: 5,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 3,
                shadowOpacity: 0.5
            }}>
                <View style={{
                    borderRadius: widthPercentageToDP(1),
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <View style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        width: widthPercentageToDP(60)
                    }}>
                        <View style={{
                            width: widthPercentageToDP(5),
                            height: widthPercentageToDP(5),
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "red"
                        }}>
                            <Text style={{
                                fontSize: widthPercentageToDP(2.2),
                                fontWeight: "bold",
                                color: "#ffff"
                            }}>
                                {"PDF"}
                            </Text>
                        </View>

                        <Text style={{
                            fontSize: widthPercentageToDP(3),
                            fontWeight: "300",
                            color: darkBlue,
                            marginLeft: widthPercentageToDP(2)
                        }}>
                            {title}
                        </Text>
                    </View>
                    {Platform.OS === "ios" ?
                        <TouchableOpacity
                            onPress={clickHandler}>
                            <FastImage
                                source={require('../../images/pdf.png')}
                                style={{
                                    width: widthPercentageToDP(4),
                                    height: widthPercentageToDP(4)
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        : <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center"
                        }}>
                            <TouchableOpacity
                                style ={{marginRight:widthPercentageToDP(5)}}
                                onPress={clickHandler}>
                                <FastImage
                                    source={require('../../images/pdf.png')}
                                    style={{
                                        width: widthPercentageToDP(4),
                                        height: widthPercentageToDP(4)
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={previewHandler}>
                                <FastImage
                                    source={require('../../images/eye.png')}
                                    style={{
                                        width: widthPercentageToDP(4),
                                        height: widthPercentageToDP(4)
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        )
    }
}
