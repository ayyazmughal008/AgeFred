import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'

class DrawerContent extends Component {
	state = {
		image: null,
	};

	render() {
		let { props } = this;
		return (
			<ScrollView
				style={{
					width: '100%',
					height: '100%'
				}}
				contentContainerStyle={{
					backgroundColor: '#fff',
				}}
			>
				<View
					style={{
						width: widthPercentageToDP(100),
						height: heightPercentageToDP(25),
						backgroundColor: darkBlue,
						alignItems: "center",
					}}>
					<FastImage
						source={require('../../Screens/Login/assets/Logo.png')}
						style={{
							width: widthPercentageToDP(30),
							height: widthPercentageToDP(10),
							marginTop: heightPercentageToDP(3),
							marginRight: widthPercentageToDP(35)
						}}
						resizeMode={FastImage.resizeMode.contain}
					/>
				</View>
				<FastImage
					source={require('../../Screens/Home/assets/profile.png')}
					resizeMode={FastImage.resizeMode.cover}
					style={{
						width: widthPercentageToDP(30),
						height: widthPercentageToDP(30),
						borderRadius: widthPercentageToDP(30) / 2,
						position: "absolute",
						top: "60%",
						left: "25%"
					}}
				/>
				<DrawerItems {...props} />
				{/* <View style={{ height: '30%' }}></View> */}
			</ScrollView>
		);
	}
}

export default DrawerContent;