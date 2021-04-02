import React from 'react'
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { styles } from './styles';
import { darkBlue, darkGrey, grey } from '../../Component/ColorCode'
import { imgData } from './imgData'
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image'
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from 'react-native-vector-icons/AntDesign';

class DetailMisgasto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            isOpen: false,
        };
    }
    render() {
        const { AuthLoading } = this.props.user
        const images = this.props.navigation.getParam('array', "kdjkj");
        const amount = this.props.navigation.getParam('amount', "kdjkj");
        const date = this.props.navigation.getParam('date', "kdjkj");
        const draft = this.props.navigation.getParam('draft', "kdjkj");
        return (
            <View style={styles.container2}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => this.props.navigation.goBack()}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="DETALLES  MISGASTOS"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.sliderContainer}>
                    {images &&
                        <SliderBox
                            ImageComponent={FastImage}
                            images={images}
                            sliderBoxHeight={300}
                            onCurrentImagePressed={index => this.setState({ currentIndex: index, isOpen: true })}
                            //currentImageEmitter={index => console.log(index)}
                            dotColor="#ffff"
                            inactiveDotColor="#90A4AE"
                            dotStyle={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                marginHorizontal: 10,
                                padding: 0,
                                margin: 0
                            }}
                        />
                    }
                </View>
                <View style={styles.bottomBox}>
                    <View style={styles.bottomTop}>
                        <Text style={[styles.titleText, {
                            paddingLeft: 10
                        }]}>
                            {"Detalles de gastos"}
                        </Text>
                    </View>
                    <View style={[styles.bottomTop, {
                        borderBottomWidth: 0,
                    }]}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                            }]}>
                                {"Importe:"}
                            </Text>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                                fontWeight: '300',
                                color: darkGrey
                            }]}>
                                {amount}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.bottomTop, {
                        borderBottomWidth: 0,
                    }]}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                            }]}>
                                {"Fecha del servico:"}
                            </Text>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                                fontWeight: '300',
                                color: darkGrey
                            }]}>
                                {date}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.bottomTop, {
                        borderBottomWidth: 0,
                    }]}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                            }]}>
                                {"Motivo:"}
                            </Text>
                            <Text style={[styles.titleText, {
                                paddingLeft: 10,
                                fontWeight: '300',
                                color: darkGrey
                            }]}>
                                {draft}
                            </Text>
                        </View>
                    </View>
                </View>
                {this.state.isOpen &&
                    <Modal
                        transparent={true}
                        visible={this.state.isOpen}
                        animationType="slide"
                        supportedOrientations={['portrait', 'landscape']}
                        onRequestClose={() => {
                            console.log('alert close')
                        }}
                    >
                        <TouchableOpacity
                            style={styles.modalMain}
                            activeOpacity={1}
                        //onPressOut={() => this.setState({ isOpen: false })}
                        >
                            <View style={styles.innerModal}>
                                <TouchableWithoutFeedback>
                                    <View>
                                        <TouchableOpacity
                                            style={styles.crossBtn}
                                            onPress={() => this.setState({ isOpen: false })}
                                        >
                                            <Icon
                                                name="close"
                                                color={darkBlue}
                                                size={25}
                                            />
                                        </TouchableOpacity>
                                        <ImageZoom
                                            cropWidth={Dimensions.get('window').width - 20}
                                            cropHeight={Dimensions.get('window').height - 50}
                                            imageWidth={Dimensions.get('window').width - 20}
                                            imageHeight={Dimensions.get('window').height - 20}>
                                            <FastImage
                                                style={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                                source={{
                                                    uri: images[this.state.currentIndex],
                                                    priority: FastImage.priority.normal
                                                }}
                                                resizeMode={FastImage.resizeMode.contain}

                                            />
                                        </ImageZoom>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(DetailMisgasto);