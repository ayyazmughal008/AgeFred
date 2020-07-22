import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue, orangae } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'

class DrawerContent extends Component {
	state = {
		image: null,
	};

	render() {
		let { props } = this;
		return (
			<View style={{
				flex: 1,
			}}>
				<ScrollView
					contentContainerStyle={{
						backgroundColor: '#fff',
						flexGrow: 1
					}}
				>
					<FastImage
						style={{
							width: "100%",
							height: "25%",
							alignItems: "center",
						}}
						source={require('../../Screens/Home/assets/drawer-bg.png')}
						resizeMode={FastImage.resizeMode.stretch}
					>
						<FastImage
							source={require('../../Screens/Home/assets/logo-white.png')}
							style={{
								width: widthPercentageToDP(30),
								height: widthPercentageToDP(10),
								marginTop: heightPercentageToDP(5),
							}}
							resizeMode={FastImage.resizeMode.contain}
						/>
					</FastImage>
					<FastImage
						source={require('../../Screens/Home/assets/profile.png')}
						resizeMode={FastImage.resizeMode.cover}
						style={{
							width: widthPercentageToDP(30),
							height: widthPercentageToDP(30),
							borderRadius: widthPercentageToDP(30) / 2,
							position: "absolute",
							top: "17%",
							left: "29%"
						}}
					/>
					<View style={{
						width: "100%",
						height: "5%",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "22%",
						//backgroundColor:"red"
					}}>
						<Text
							style={{
								fontSize: widthPercentageToDP(4),
								color: darkBlue,
								fontWeight: "bold"
							}}>
							{"Travis Newman"}
						</Text>
						<Text style={{
							fontSize: widthPercentageToDP(3),
							color: darkBlue,
							fontWeight: "bold"
						}}>
							{"Empleado Nivel 1"}
						</Text>
					</View>
					<TouchableOpacity
						style={{
							width: "100%",
							height: "5%",
							marginTop: "10%",
							alignItems: "center",
							justifyContent: "center",
							borderBottomWidth: widthPercentageToDP(0.2),
							borderBottomColor: darkBlue
						}}
						onPress={() => this.props.navigation.navigate("Profile")}
					>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Perfil"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						width: "100%",
						height: "5%",
						marginTop: "2%",
						alignItems: "center",
						justifyContent: "center",
						borderBottomWidth: widthPercentageToDP(0.2),
						borderBottomColor: darkBlue,
					}}>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Acerca"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						width: "100%",
						height: "5%",
						marginTop: "2%",
						alignItems: "center",
						justifyContent: "center",
						borderBottomWidth: widthPercentageToDP(0.2),
						borderBottomColor: darkBlue
					}}>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Configuracion"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						width: "100%",
						height: "5%",
						marginTop: "2%",
						alignItems: "center",
						justifyContent: "center",
						borderBottomWidth: widthPercentageToDP(0.2),
						borderBottomColor: darkBlue
					}}>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Sair"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{
						width: "100%",
						height: "5%",
						marginTop: "2%",
						alignItems: "center",
						justifyContent: "center",
						borderBottomWidth: widthPercentageToDP(0.2),
						borderBottomColor: darkBlue
					}}>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Ajustes"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							position: "absolute",
							bottom: "2%",
							width: "100%",
							height: "5%",
							alignContent: "center",
							justifyContent: "center",
							//backgroundColor:"red"
						}}>
						<Text
							style={{
								fontSize: widthPercentageToDP(4),
								color: orangae,
								fontWeight: "300",
								textAlign: "center"
							}}>
							{"Logout"}
						</Text>
					</TouchableOpacity>
					<DrawerItems {...props} />
					{/* <View style={{ height: '30%' }}></View> */}
				</ScrollView>
			</View>
		);
	}
}

export default DrawerContent;