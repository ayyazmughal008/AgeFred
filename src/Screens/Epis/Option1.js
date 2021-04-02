import React from 'react'
import { View, Text, PermissionsAndroid, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Card from '../../Component/Card'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue, lightBlue } from '../../Component/ColorCode'
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
import Table from '../../Component/EpisTable'
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Dialog from '../MisGastos/Dialog'
import { connect } from 'react-redux';
import { getAllTools, submitEpisData1, postEpis1 } from '../../Redux/action'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { StackActions, NavigationActions } from "react-navigation";


class Epis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            testArray: [],
            dilaogStatus: false,
            index: 0,
            loading: false,
            isBtnEnable: true,
            firstRadio: false,
            secondRadio: false
        };
    }
    toggleRadio = () => {
        const { firstRadio, secondRadio } = this.state
        if (!firstRadio && !secondRadio) {
            this.setState({ secondRadio: false, firstRadio: true })
        } else if (!firstRadio) {
            this.setState({ secondRadio: false, firstRadio: true })
        }
    }
    toggleRadio2 = () => {
        const { firstRadio, secondRadio } = this.state
        if (!firstRadio && !secondRadio) {
            this.setState({ secondRadio: true, firstRadio: false })
        } else if (!secondRadio) {
            this.setState({ secondRadio: true, firstRadio: false })
        }
    }
    test = () => {
        Orientation.unlockAllOrientations()
        Orientation.lockToPortrait();
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    toggleDiloge = () => {
        this.setState({ dilaogStatus: !this.state.dilaogStatus })
    }
    pickDocument = async (index) => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            //console.log(results);
            this.toggleDiloge();
            this.updateFoto(index, results)

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
            this.toggleDiloge();
            this.updateCameraFoto(index, image)
            //console.log(image)
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
        if (initial === 'LANDSCAPE') {
            Orientation.lockToPortrait();
            console.log("land")
            //do stuff
        } else {
            console.log("portrate")
        }
    }
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE') {
            Orientation.lockToPortrait();
        }
    };
    componentDidMount() {
        //this.updateArray()
        Orientation.lockToPortrait()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    updateArray = () => {
        const { getToolType } = this.props.user;
        let temparr = [];
        temparr = getToolType.data
        this.setState({ testArray: temparr }, () => {
            const { testArray } = this.state
            for (var i = 0; i < testArray.length; i++) {
                if (testArray[i].editAble) {
                    this.setState({ isBtnEnable: false })
                }
            }
        })
    }
    updateCheckBox = (index, whichCheck, value) => {
        const { getToolType } = this.props.user;
        const newArray = [...getToolType.data];
        if (whichCheck === "1") {
            newArray[index].checkBox1 = value
        } else if (whichCheck === "2") {
            newArray[index].checkBox2 = value
        } else if (whichCheck === "3") {
            newArray[index].checkBox3 = value
        }
        this.setState({ testArray: newArray })
    }
    updateMotivo = (index, value) => {
        const { getToolType } = this.props.user;
        const newArray = [...getToolType.data];
        newArray[index].motivoValue = value
        this.setState({ testArray: newArray })
    }
    updateFoto = (index, value) => {
        const { getToolType } = this.props.user;
        const newArray = [...getToolType.data];
        let temFotoArray = [];
        value.forEach((item, index) => {
            temFotoArray.push({
                'uri': item.uri,
                'type': item.type,
                'name': item.name,
            })
        });
        newArray[index].image = temFotoArray
        newArray[index].isUpload = true
        this.setState({ testArray: newArray }, () => {
            this.uploadImages(index)
        })
    }
    updateCameraFoto = (index, value) => {
        const { getToolType } = this.props.user;
        const newArray = [...getToolType.data];
        let temFotoArray = [];
        temFotoArray.push({
            'uri': value.path,
            'type': value.mime,
            'name': Date.now() + '_Agefred.png',
        })
        newArray[index].image = temFotoArray
        newArray[index].isUpload = true
        this.setState({ testArray: newArray }, () => {
            this.uploadImages(index)
        })
    }
    uploadImages = (index) => {
        const { testArray } = this.state;
        this.setState({ loading: true })
        const body = new FormData();
        body.append('toolId', testArray[index].toolId)
        testArray[index].image.forEach((item, index) => {
            body.append("images[]", {
                'uri': item.uri,
                'type': item.type,
                'name': item.name,
            });
        })
        fetch('http://95.179.209.186/api/images', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "Success") {
                    console.log("khell shoro howa aub (-_-)")
                    let temArr = [...testArray];
                    let temFotoArray = [];
                    json.images.forEach((item, index) => {
                        temFotoArray.push(item)
                    })
                    temArr[index].image = temFotoArray;
                    this.setState({ testArray: temArr, loading: false }, () => {
                        console.log("khel khatam ===>(-_-)", this.state.testArray)
                    })
                }
            })
            .catch(error => this.setState({ loading: false }))
    }
    submitData = () => {
        const { testArray } = this.state;
        const { login } = this.props.user
        this.props.submitEpisData1(
            login.data.id,
            testArray,
            login.data.employRoleId
        )
    }
    _submitButton = () => {
        const { login } = this.props.user;
        const { firstRadio, secondRadio } = this.state
        if (!firstRadio && !secondRadio) {
            alert("Please select any epis option")
            return
        }
        if (firstRadio) {
            this.test()
            this.props.postEpis1('no', login.data.id)
        } else {
            this.test()
            this.props.postEpis1('yes', login.data.id)
            
        }

    }
    render() {
        const { AuthLoading, getToolType, login } = this.props.user
        const isHome = this.props.navigation.getParam('isHome', "no")
        //console.log("===>>", getToolType)
        return (
            <View style={[styles.container, { alignItems: "center" }]} onLayout={(e) => { this._onLayout(e) }}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => {
                                isHome === "yes" ?
                                    (this.test(),
                                        this.props.navigation.dispatch(
                                            StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: "Home" })]
                                            })
                                        ))
                                    : (
                                        this.test(),
                                        this.props.navigation.goBack()
                                    )
                            }}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="ESTADO / CONTROL EPI’S"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                {/* <View style={styles.tableView}>
                    <View style={styles.itemMainView}>
                        <View style={[styles.component, { width: "15%", }]}>
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Buen estado</Text>
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Mal Estado</Text>
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Caducidad</Text>
                        </View>
                        <View style={[styles.component, { width: "10%" }]}>
                            <Text>Solicito</Text>
                        </View>
                        <View style={[styles.component, { width: "15%" }]}>
                            <Text>Motivo V</Text>
                        </View>
                        <View style={[styles.component, { width: "18%" }]}>
                            <Text>Foto</Text>
                        </View>
                    </View>
                    <View style={styles.tableRenderingView}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                            {!this.state.testArray ?
                                <View />
                                : this.state.testArray.map((item, index) => {
                                    return (
                                        <Table
                                            key={"unique" + index}
                                            bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                            imagePicker={() => this.setState({ index: index }, () => {
                                                this.toggleDiloge()
                                            })}
                                            type={item.type}
                                            date={item.date}
                                            dropDownValue={item.motivoValue}
                                            onChangeDropDown={text => this.updateMotivo(index, text)}
                                            dropdownHandler={item.motives}
                                            isCheckBox1={item.checkBox1}
                                            isCheckBox2={item.checkBox2}
                                            isCheckBox3={item.checkBox3}
                                            checkBoxClick1={() => this.updateCheckBox(index, "1", item.checkBox1 ? false : true)}
                                            checkBoxClick2={() => this.updateCheckBox(index, "2", item.checkBox2 ? false : true)}
                                            checkBoxClick3={() => this.updateCheckBox(index, "3", item.checkBox3 ? false : true)}
                                            isUpload={item.isUpload}
                                            isEnable={item.editAble}
                                        />
                                    )
                                })}
                        </ScrollView>
                    </View>
                    {!this.state.isBtnEnable &&
                        <View style={styles.bottom1}>
                            <TouchableOpacity
                                style={styles.confirmBtn}
                                onPress={() => { 
                                    this.test()
                                    this.submitData() 
                                }}
                            >
                                <Text style={styles.btnText}>{"Save"}</Text>
                            </TouchableOpacity>

                        </View>
                    }
                </View> 
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
                */}
                <View style={myStyles.centerView}>
                    <View style={[myStyles.titleView, { backgroundColor: darkBlue }]}>
                        <Text style={[myStyles.titleText, { color: "#fff" }]}>
                            {"EPI Solicitado"}
                        </Text>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {!getToolType || !getToolType.epis.length ?
                            <View />
                            : getToolType.epis.map((item, index) => {
                                return (
                                    <View
                                        key={"unique" + index}
                                        style={[myStyles.titleView, {
                                            backgroundColor: index % 2 ? "#F8F8F8" : "#E8E8E8"
                                        }]}>
                                        <Text style={[myStyles.titleText, { color: "#000", fontWeight: "300" }]}>
                                            {item.name}
                                        </Text>
                                    </View>
                                )
                            })}
                    </ScrollView>
                </View>
                <View style={myStyles.bottomView}>
                    <View style={myStyles.radioView}>
                        <View style={myStyles.left}>
                            <Text style={[myStyles.titleText, { fontSize: widthPercentageToDP(3.5) }]}>
                                {"Los equipos de Protección Individual se encuentran en buen estado de conservación"}
                            </Text>
                        </View>
                        <View style={myStyles.right}>
                            <TouchableOpacity
                                onPress={() => this.toggleRadio()}
                                style={myStyles.outerRadiou}
                            >
                                {this.state.firstRadio &&
                                    <View style={myStyles.innerRadiou} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={myStyles.radioView}>
                        <View style={myStyles.left}>
                            <Text style={[myStyles.titleText, { fontSize: widthPercentageToDP(3.5) }]}>
                                {"Solicito el suministro / reposición de un Equipo de Protección Individual"}
                            </Text>
                        </View>
                        <View style={myStyles.right}>
                            <TouchableOpacity
                                onPress={() => this.toggleRadio2()}
                                style={myStyles.outerRadiou}
                            >
                                {this.state.secondRadio &&
                                    <View style={myStyles.innerRadiou} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={myStyles.btn}
                        onPress={() => this._submitButton()}
                    >
                        <Text style={[myStyles.titleText, { fontSize: widthPercentageToDP(3.5), color: "#fff" }]}>
                            {"REGISTRAR"}
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
                {/* {this.state.loading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                } */}
            </View>
        )
    }
}

const myStyles = StyleSheet.create({
    centerView: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(42),
        //backgroundColor:"red",
        marginTop: heightPercentageToDP(2)
    },
    titleView: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(6),
        justifyContent: "center",
        backgroundColor: "#F8F8F8"
    },
    titleText: {
        fontSize: widthPercentageToDP(3),
        color: darkBlue,
        fontWeight: "bold",
        padding: 5
    },
    bottomView: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(35),
        //backgroundColor:"red",
        marginTop: heightPercentageToDP(2)
    },
    radioView: {
        width: widthPercentageToDP(95),
        height: heightPercentageToDP(8),
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        width: "80%",
        height: "100%",
        //backgroundColor: "red",
        justifyContent: "center",
        //padding: 9
    },
    right: {
        width: "20%",
        height: "100%",
        //backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center"
    },
    outerRadiou: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        borderRadius: widthPercentageToDP(4) / 2,
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: widthPercentageToDP(0.1),
        borderColor: darkBlue
    },
    innerRadiou: {
        width: widthPercentageToDP(2),
        height: widthPercentageToDP(2),
        borderRadius: widthPercentageToDP(2) / 2,
        backgroundColor: darkBlue
    },
    btn: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(6),
        backgroundColor: darkBlue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightPercentageToDP(3)
    }
})

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getAllTools, submitEpisData1, postEpis1 })(Epis);