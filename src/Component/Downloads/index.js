import React from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { title, clickHandler, previewHandler, name, date } = this.props
        return (
            <View style={{
                width: widthPercentageToDP(90),
                height: widthPercentageToDP(14),
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
                            width: widthPercentageToDP(7),
                            height: widthPercentageToDP(7),
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: name === "PDF" ? "red" :
                            name === "DOC" ? darkBlue : "orange"
                        }}>
                            <Text style={{
                                fontSize: widthPercentageToDP(3),
                                fontWeight: "bold",
                                color: "#ffff"
                            }}>
                                {name}
                            </Text>
                        </View>
                        <View>


                            <Text style={{
                                fontSize: widthPercentageToDP(4),
                                fontWeight: "300",
                                color: darkBlue,
                                marginLeft: widthPercentageToDP(2)
                            }}>
                                {title}
                            </Text>
                            <Text style={{
                                fontSize: widthPercentageToDP(4),
                                fontWeight: "300",
                                color: darkBlue,
                                paddingTop: 3,
                                marginLeft: widthPercentageToDP(2)
                            }}>
                                {date}
                            </Text>
                        </View>
                    </View>
                    {Platform.OS === "ios" ?
                        <TouchableOpacity
                            onPress={clickHandler}>
                            <FastImage
                                source={require('../../images/pdf.png')}
                                style={{
                                    width: widthPercentageToDP(6),
                                    height: widthPercentageToDP(6)
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
                                style={{ marginRight: widthPercentageToDP(5) }}
                                onPress={clickHandler}>
                                <FastImage
                                    source={require('../../images/pdf.png')}
                                    style={{
                                        width: widthPercentageToDP(6),
                                        height: widthPercentageToDP(6)
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={previewHandler}>
                                <FastImage
                                    source={require('../../images/eye.png')}
                                    style={{
                                        width: widthPercentageToDP(6),
                                        height: widthPercentageToDP(6)
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
