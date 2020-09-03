import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue } from '../ColorCode'
import FastImage from 'react-native-fast-image'
export default class Header extends React.Component {

    render() {
        const { title, clickHandler } = this.props
        return (
            <TouchableOpacity style={{
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
            }}
                onPress={clickHandler}
            >
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
                    }}>
                        <View style={{
                            width: widthPercentageToDP(4.5),
                            height: widthPercentageToDP(4.5),
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "red"
                        }}>
                            <Text style={{
                                fontSize: widthPercentageToDP(2),
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
                    <FastImage
                        source={require('../../images/pdf.png')}
                        style={{
                            width: widthPercentageToDP(4),
                            height: widthPercentageToDP(4)
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}
