import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { logOut, logoutNotify } from '../../Redux/action'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue, orangae } from '../../Component/ColorCode'
import FastImage from 'react-native-fast-image'
import { connect } from "react-redux";
import Package from '../../../package.json'

class DrawerContent extends Component {
	state = {
		image: null,
	};

	render() {
		let { props } = this;
		const { login } = this.props.user;
		//console.log(login)
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
						source={{ uri: login.data.profilePicture }}
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
							{login.data.name}
						</Text>
						<Text style={{
							fontSize: widthPercentageToDP(3),
							color: darkBlue,
							fontWeight: "bold"
						}}>
							{login.data.level}
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
						onPress={() => {
							this.props.navigation.closeDrawer();
							this.props.navigation.navigate("Profile")
						}}
					>
						<Text style={{
							fontSize: widthPercentageToDP(5),
							color: darkBlue,
							fontWeight: "300"
						}}>
							{"Perfil"}
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity style={{
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
					</TouchableOpacity> */}

					<TouchableOpacity
						style={{
							position: "absolute",
							bottom: "4%",
							width: "100%",
							height: "5%",
							alignContent: "center",
							justifyContent: "center",
							//backgroundColor:"red"
						}}
						onPress={() => {
							this.props.logoutNotify(login.data.id),
								this.props.logOut(),
								this.props.navigation.navigate('Login')
						}}
					>
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
					<Text
						style={{
							fontSize: widthPercentageToDP(3.5),
							color: darkBlue,
							fontWeight: "300",
							position: "absolute",
							bottom: "1.5%",
							alignSelf: "center"
						}}
					>
						{"app version: "}{Package.version}
					</Text>
					<DrawerItems {...props} />
					{/* <View style={{ height: '30%' }}></View> */}
				</ScrollView>
			</View>
		);
	}
}

//export default DrawerContent;
const mapStateToProps = state => ({
	user: state.user
});
export default connect(mapStateToProps, { logOut, logoutNotify })(DrawerContent);