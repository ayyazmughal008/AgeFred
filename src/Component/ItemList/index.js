import React from 'react'
import { View, TouchableOpacity, Text, StatusBar } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import { darkGrey } from '../ColorCode'
import Icon from 'react-native-vector-icons/AntDesign';

export default class List extends React.Component {

    render() {
        const { name, clickHandler } = this.props
        return (
            <View
                style={{
                    width: widthPercentageToDP(100),
                    height: heightPercentageToDP(5),
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    //backgroundColor:"green"
                }}>
                <View style={{
                    width:widthPercentageToDP(60),
                    height:heightPercentageToDP(4)
                }}>
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(3),
                            fontWeight: "bold",
                            color: darkGrey,
                            textAlign: "left",
                            paddingLeft: widthPercentageToDP(2)
                        }}>{name}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={clickHandler}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                        //backgroundColor:"red"
                    }}
                >
                    <Icon
                        name="close"
                        color="#000"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

        )
    }
}
