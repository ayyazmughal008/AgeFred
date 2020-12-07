import React from 'react'
import { View, Text, PermissionsAndroid, ScrollView, ActivityIndicator } from 'react-native'
import Card from '../../Component/Card'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Orientation from 'react-native-orientation';
import Table from '../../Component/EpisTable'
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import Dialog from '../MisGastos/Dialog'
import { connect } from 'react-redux';
import { getAllTools, submitEpisData1 } from '../../Redux/action'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { TouchableOpacity } from 'react-native-gesture-handler'
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
            isBtnEnable: true
        };
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
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
        }
    };
    componentDidMount() {
        this.updateArray()
        Orientation.lockToLandscapeLeft()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.unlockAllOrientations()
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
    render() {
        const { AuthLoading, getToolType } = this.props.user
        const isHome = this.props.navigation.getParam('isHome', "no")
        return (
            <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => {
                                isHome === "yes" ?
                                    this.props.navigation.dispatch(
                                        StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: "Home" })]
                                        })
                                    )
                                    : this.props.navigation.goBack()
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
                <View style={styles.tableView}>
                    <View style={styles.itemMainView}>
                        <View style={[styles.component, { width: "15%", }]}>
                            {/* <Text>Sample 1</Text> */}
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
                                onPress={() => { this.submitData() }}
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
                {AuthLoading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
                {this.state.loading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getAllTools, submitEpisData1 })(Epis);