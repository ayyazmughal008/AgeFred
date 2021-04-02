import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, PermissionsAndroid, Alert } from 'react-native'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue, lightBlue } from '../../Component/ColorCode'
import RNPickerSelect from 'react-native-picker-select';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image'
import Dialog from '../MisGastos/Dialog'
import SelectMultiple from 'react-native-select-multiple'
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
import Table from '../../Component/EpisTable2'
import { connect } from 'react-redux';
import { submitEpisData2, getEpisApealData, postEpisApeal } from '../../Redux/action'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'

class Epis2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            testArray: [],
            epis: [],
            motivo: "",
            size: "",
            comment: "",
            dilaogStatus: false,
            imgData: [],
            singleImage: "",
        };
        this.fetchData();
    }
    fetchData = () => {
        const { login } = this.props.user;
        this.props.getEpisApealData(login.data.id)
    }
    toggleDiloge = () => {
        this.setState({ dilaogStatus: !this.state.dilaogStatus })
    }
    pickDocument = async (index) => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            console.log(results);
            await this.toggleDiloge();
            await this.setState({ imgData: results })

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err),
                    this.toggleDiloge()
            } else {
                throw err;
            }
        }
    }
    openCamera = (index) => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image)
            this.toggleDiloge();
            this.setState({ singleImage: image })

        })
            .catch(err => {
                console.log(err);
                this.toggleDiloge();
            })
    }
    requestCameraPermission = async (index) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Agefred',
                    'message': 'Agefred App needs access to your camera ' +
                        'so you can take pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.openCamera(index);
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    _onLayout = (e) => {
        console.log(e.nativeEvent.layout.height)
        let width = e.nativeEvent.layout.width
        let height = e.nativeEvent.layout.height
        this.setState({
            height: height,
            width: width
        })
    }
    UNSAFE_componentWillMount() {
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            Orientation.lockToLandscapeLeft()
            console.log("land")
            //do stuff
        } else {
            console.log("portrate")
        }
    }
    test = () => {
        Orientation.unlockAllOrientations()
        Orientation.lockToPortrait();
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
        }
    };
    componentDidMount() {
        //this.updateArray();
        Orientation.lockToLandscapeLeft()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    _handleSubmit = () => {
        const { login } = this.props.user;
        const { epis, motivo, size, comment, singleImage, imgData } = this.state

        if (!epis.length) {
            Alert.alert("Primero seleccione Solicitado")
            return
        }
        if (!motivo) {
            Alert.alert("Primero seleccione Motivo de la solicitud")
            return
        }
        if (!size) {
            Alert.alert("Por favor mencione el Talla")
            return
        }
        if (!comment) {
            Alert.alert("Por favor escriba un comentario")
            return
        }
        if (motivo == 46) {
            if ((imgData === undefined ||
                imgData.length === 0) &&
                !singleImage
            ) {
                Alert.alert("Seleccione Imágenes")
                return
            }
        }
        let data = "";
        if (!singleImage) {
            data = null;
        } else {
            data = {
                'uri': singleImage.path,
                'type': singleImage.mime,
                'name': Date.now() + '_Agefred.png',
            }
        }
        this.props.postEpisApeal(
            login.data.id,
            JSON.stringify(epis),
            motivo,
            size,
            comment,
            imgData,
            data

        )
    }
    // updateArray = () => {
    //     const { episData2 } = this.props.user;
    //     let tempArr = [];
    //     tempArr = episData2.data
    //     this.setState({ testArray: tempArr })
    // }
    // updateMotivo = (index, value) => {
    //     const { episData2 } = this.props.user;
    //     const newArray = [...episData2.data];
    //     newArray[index].motivoValue = value
    //     this.setState({ testArray: newArray })
    // }
    // updateTala = (index, value) => {
    //     const { episData2 } = this.props.user;
    //     const newArray = [...episData2.data];
    //     newArray[index].tala = value
    //     this.setState({ testArray: newArray })
    // }
    render() {
        const { login, AuthLoading, getEpisApeal } = this.props.user;
        const { testArray, epis, motivo, singleImage, imgData } = this.state
        return (
            <View style={[styles.container, { alignItems: "center" }]} onLayout={(e) => { this._onLayout(e) }}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => {
                                this.test();
                                this.props.navigation.goBack()
                            }}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="Nuevas Solicitudes"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />

                <View style={styles.itemMainView2}>
                    <View style={[styles.component, { width: "20%" }]}>
                        <Text>Epi Solicitado</Text>
                    </View>
                    <View style={[styles.component, { width: "20%" }]}>
                        <Text>Talla</Text>
                    </View>
                    <View style={[styles.component, { width: "20%" }]}>
                        <Text>Motivo de la solicitud</Text>
                    </View>
                    <View style={[styles.component, { width: "10%" }]}>
                        <Text>Foto</Text>
                    </View>
                    <View style={[styles.component, { width: "30%" }]}>
                        <Text>Comentario</Text>
                    </View>
                </View>
                <View style={[styles.itemMainView3, { height: widthPercentageToDP(10) }]}>
                    <View style={[styles.component2, { width: "20%", borderLeftWidth: widthPercentageToDP(0.1) }]}>
                        {!getEpisApeal || !getEpisApeal.epis.length ?
                            <View />
                            :
                            // <RNPickerSelect
                            //     placeholder={{
                            //         label: 'Epi Solicitado',
                            //         value: epis,
                            //         color: "#000"
                            //     }}
                            //     style={pickerStyle}
                            //     onValueChange={(value) => this.setState({ epis: value })}
                            //     items={getEpisApeal.epis}
                            // />
                            <SelectMultiple
                                items={getEpisApeal.epis}
                                selectedItems={epis}
                                style={{ backgroundColor: lightBlue }}
                                rowStyle={{ backgroundColor: lightBlue }}
                                onSelectionsChange={(value) => this.setState({ epis: value })} />
                        }

                    </View>
                    <View style={[styles.component2, { width: "20%" }]}>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder="Tala"
                            placeholderTextColor={darkBlue}
                            onChangeText={(value) => this.setState({ size: value })}
                            keyboardType="decimal-pad"
                        />
                    </View>
                    <View style={[styles.component2, { width: "20%", }]}>
                        {!getEpisApeal || !getEpisApeal.motives.length ?
                            <View />
                            : <RNPickerSelect
                                placeholder={{
                                    label: 'Motivo de la solicitud',
                                    value: motivo,
                                    color: "#000"
                                }}
                                style={pickerStyle}
                                onValueChange={(value) => this.setState({ motivo: value })}
                                items={getEpisApeal.motives}
                            />
                        }
                    </View>
                    <View style={[styles.component2, { width: "10%" }]}>
                        <TouchableOpacity
                            disabled={motivo == '46' ? false : true}
                            onPress={() => this.toggleDiloge()}
                        >
                            <FastImage
                                source={
                                    (imgData.length || singleImage) ?
                                        require('../../images/tick.png')
                                        : require('../../images/download.png')
                                }
                                style={{ width: 30, height: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.component2, { width: "30%" }]}>
                        <TextInput
                            style={styles.input}
                            multiline
                            placeholder="Comentario"
                            onChangeText={(value) => this.setState({ comment: value })}
                            placeholderTextColor={darkBlue}
                        />
                    </View>
                </View>
                {/* {!testArray.length ?
                        <View />
                        : <View style={styles.tableRenderingView2}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {testArray.map((item, index) => {
                                    return (
                                        <Table
                                            key={"unique" + index}
                                            bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                            tool={item.tool}
                                            dropdownHandler={item.motivi_v}
                                            dropDownValue={item.motivoValue}
                                            onChangeDropDown={text => this.updateMotivo(index, text)}
                                            onchangeTalaText={text => this.updateTala(index, text)}
                                            textValue={!item.tala ? "" : item.tala}
                                            isEditAbl={item.editAble}
                                            status={!item.status.accept_status ? "" : item.status.accept_status}
                                            reason={!item.status.reason ? "" : item.status.reason}
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    } */}
                <View style={styles.bottomView}>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={() => {
                            //this.test();
                            this._handleSubmit()
                            //this.props.submitEpisData2(login.data.id, testArray)
                        }
                            //console.log(testArray)
                        }
                    >
                        <Text style={styles.btnText}>
                            {"Continuar"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {AuthLoading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
                {this.state.dilaogStatus &&
                    <Dialog
                        isDialogOpen={this.state.dilaogStatus}
                        errorMessage={"Choose image from Camera or Gallery"}
                        cameraButton={() => Platform.OS === 'android' ?
                            this.requestCameraPermission(this.state.index)
                            : this.openCamera(this.state.index)
                        }
                        GalleryButton={() => {
                            //this.toggleDiloge();
                            this.pickDocument(this.state.index);
                        }}
                        btnText1={"Camera"}
                        btnText2={"Gallery"}
                        cancelBox={() => this.toggleDiloge()}
                    />
                }
            </View>
        )
    }
}
const pickerStyle = {
    inputIOS: {
        color: darkBlue,
        //fontSize: heightPercentageToDP(2),
        paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    placeholder: {
        color: darkBlue,
    },
    inputAndroid: {
        color: darkBlue,
        paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "grey"
    }
    // viewContainer:{
    //     backgroundColor:"red"
    // },
    // chevronContainer:{
    //     backgroundColor:"red"
    // },
    // inputIOSContainer:{
    //     backgroundColor:"red"
    // }
};

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { submitEpisData2, getEpisApealData, postEpisApeal })(Epis2);