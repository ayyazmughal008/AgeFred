import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import Icon from 'react-native-vector-icons/Entypo';
import { darkBlue, orangae } from '../ColorCode'
import FastImage from 'react-native-fast-image'
import HTML from 'react-native-render-html';
export default class BlogCard extends React.Component {

    render() {
        const { urlImag, clickHandler, title, description } = this.props
        return (
            <TouchableOpacity style={{
                width: widthPercentageToDP(90),
                height: widthPercentageToDP(30),
                backgroundColor: "#ffff",
                borderRadius: widthPercentageToDP(1),
                marginTop: heightPercentageToDP(2),
                flexDirection: "row",
                flexWrap: "wrap",
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
                <FastImage
                    source={{ uri: urlImag }}
                    style={{
                        width: widthPercentageToDP(25),
                        height: widthPercentageToDP(30)
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View
                    style={{
                        width: "72%",
                        height: "100%",
                        //backgroundColor: "red",
                        padding: widthPercentageToDP(2)
                    }}>
                    <HTML
                        html={title}
                        tagsStyles={{
                            p: {
                                fontSize: widthPercentageToDP(4),
                            }
                        }}
                    />
                    <HTML
                        html={description}
                        tagsStyles={{
                            p: {
                                fontSize: widthPercentageToDP(2.5),
                                width: "100%",
                                height: "40%",
                                //backgroundColor: "red",
                                textAlign: "justify",
                                paddingRight: widthPercentageToDP(2)
                            }
                        }}
                    />

                    {/* <TouchableOpacity style={{
                        width: "100%",
                        height: "35%",
                        borderRadius: widthPercentageToDP(10),
                        marginTop: heightPercentageToDP(1.5),
                        backgroundColor: orangae,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        bottom: "5%",
                        left: "4%"
                    }}
                        onPress={clickHandler}
                    >
                        <Text style={{
                            fontSize: widthPercentageToDP(3),
                            fontWeight: "300",
                            color: darkBlue,
                        }}>
                            {"Ver post"}
                        </Text>
                    </TouchableOpacity> */}
                </View>

            </TouchableOpacity>
        )
    }
}