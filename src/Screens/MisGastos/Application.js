import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { connect } from 'react-redux';
import { getExpense, postExpenseData } from '../../Redux/action'
import { styles } from './styles';
import { darkBlue, grey, darkGrey } from '../../Component/ColorCode'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image'
import DocumentPicker from 'react-native-document-picker';
import ItemList from '../../Component/ItemList'
import { ActivityIndicator } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

class MisGastos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDate: "",
            project: "",
            comido: "",
            importe: "",
            endDate: "",
            imgData: [],
            isLoading: false
        };
        this.props.getExpense();
    }

    pickDocument = async () => {
        // try {
        //     const results = await DocumentPicker.pickMultiple({
        //         type: [DocumentPicker.types.images],
        //     });
        //     this.setState({ imgData: results }, () => {
        //         console.log(this.state.imgData)
        //     })
        // } catch (err) {
        //     if (DocumentPicker.isCancel(err)) {
        //         console.log(err)
        //     } else {
        //         throw err;
        //     }
        // }
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            this.setState({ imgData: images }, () => {
                console.log(this.state.imgData)
            })
        });
    }

    removeItem = (myValue) => {
        var { imgData } = this.state
        var arr = imgData.filter(item => item.path !== myValue)
        this.setState({ imgData: arr }, () => {
            //console.log(arr)
        })
    }

    handleSubmit = () => {
        const { login } = this.props.user;
        let path = "file:///data/user/0/com.agefred/cache/react-native-image-crop-picker/Agefred_gagfkgfggf_kwdkwekwehf_kgdwegfgfg_bdbwbwejwe_djwegj_lqkwdwqeejge_qjhwdjhgdkjgd_qhdqwjhgdjgwdkjwgd_qkjwhdkjqwhdkjwhgd1599818936843.jpg"
        let uriParts = path.split('.');
        let fileType = uriParts[uriParts.length - 1];
        var temp_array = [];
        this.state.imgData.map((item, index) => {
            temp_array.push({
                uri: item.path,
                type: 'image/jpg',
                name: index + Date.now() + 'image.jpg',
            })
        })
        console.log(temp_array)
        const fileData = {
            uri: path,
            name: `myFile.${fileType}`,
            type: `text/${fileType}`,
        }
        // if (this.state.toDate === "") {
        //     Alert.alert("Please select date")
        //     return
        // }
        // if (this.state.project === "") {
        //     Alert.alert("Please provide project")
        //     return
        // }
        // if (this.state.comido === "") {
        //     Alert.alert("Please provide Motivo")
        //     return
        // }
        // if (this.state.importe === "") {
        //     Alert.alert("Please provide Importe")
        //     return
        // }
        // if (this.state.endDate === "") {
        //     Alert.alert("Please provide endDate")
        //     return
        // }
        // if (this.state.imgData === undefined || this.state.imgData.length === 0) {
        //     Alert.alert("Please select Images")
        //     return
        // }
        this.setState({ isLoading: true })
        let body = new FormData();
        body.append('date', this.state.toDate);
        body.append('draft', this.state.project);
        body.append('reason', this.state.comido);
        body.append('amount', this.state.importe);
        body.append('madeDate', this.state.endDate);
        //body.append('images[]', temp_array);
        body.append('employId', login.data.id);
        fetch("https://95.179.209.186/api/expense-store", {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({ isLoading: false })
                if (json.status === "Success") {
                    alert(json.message)
                } else {
                    alert(json.message)
                }
            })
            .catch(error => {
                this.setState({ isLoading: false })
                console.log('uploadImage error:', error);
            });

        // this.props.postExpenseData(
        //     this.state.toDate,
        //     this.state.project,
        //     this.state.comido,
        //     this.state.importe,
        //     this.state.endDate,
        //     this.state.imgData,
        //     login.data.id
        // )
    }

    render() {
        const { getDataExpense, AuthLoading } = this.props.user
        const navigation = this.props.navigation;
        const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
        return (
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior="height"
            //keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <View style={styles.mainView}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, }}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                    >
                        <Text style={styles.inputTitle}>
                            {"Fecha"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.toDate}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                // minDate="2019-11-04"
                                // maxDate="2099-01-01"
                                customStyles={{
                                    datePicker: {
                                        backgroundColor: "#ffff"
                                    },
                                    dateInput: {
                                        borderBottomWidth: 1,
                                        borderBottomColor: grey,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        width: widthPercentageToDP(85),
                                    },
                                    placeholderText: {
                                        color: grey,
                                        position: "absolute",
                                        left: "2%"
                                    },
                                    dateText: {
                                        color: darkGrey,
                                        position: "absolute",
                                        left: "2%"
                                    }
                                }}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={endDate => {
                                    this.setState({ toDate: endDate });
                                }}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Proyecto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Proyecto / tarea"
                                placeholderTextColor={grey}
                                value={this.props.project}
                                style={styles.input}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ project: text })
                                }
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Motivo gasto"}
                        </Text>
                        <View style={{ alignItems: "center", }}>
                            <DropDownPicker
                                items={!getDataExpense.data ? [] : getDataExpense.data}
                                defaultValue={this.state.comido}
                                containerStyle={styles.dropStyle2}
                                zIndex={5000}
                                style={{
                                    backgroundColor: '#ffff',
                                    borderBottomWidth: 1,
                                    borderBottomColor: grey,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                }}
                                itemStyle={{
                                    //justifyContent: 'flex-start'
                                    borderTopWidth: 2,
                                    borderTopColor: grey,
                                }}
                                dropDownStyle={{
                                    borderWidth: 0,
                                    borderColor: "#ffff",

                                }}
                                onChangeItem={item => this.setState({
                                    comido: item.value
                                })}
                                placeholder="Comida"
                                placeholderStyle={{
                                    color: darkGrey,
                                    position: "absolute",
                                    //left: "-3%"
                                }}
                                labelStyle={{
                                    color: darkGrey,
                                }}
                                selectedLabelStyle={{
                                    color: darkGrey,
                                }}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Importe gasto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="importe"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.importe}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ importe: text })
                                }
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Fecha en la que se realizo el gasto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.endDate}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                // minDate="2019-11-04"
                                // maxDate="2099-01-01"
                                customStyles={{
                                    datePicker: {
                                        backgroundColor: "#ffff"
                                    },
                                    dateInput: {
                                        borderBottomWidth: 1,
                                        borderBottomColor: grey,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        width: widthPercentageToDP(85),
                                    },
                                    placeholderText: {
                                        color: grey,
                                        position: "absolute",
                                        left: "2%"
                                    },
                                    dateText: {
                                        color: darkGrey,
                                        position: "absolute",
                                        left: "2%"
                                    }
                                }}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={endDate => {
                                    this.setState({ endDate: endDate });
                                }}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Suba una imagen de su ticket"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.uploadBtn}
                                disabled={this.state.imgData === undefined || this.state.imgData.length === 0 ? false : true}
                                onPress={() => this.pickDocument()}
                            >
                                {this.state.imgData === undefined || this.state.imgData.length === 0 ?
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <FastImage
                                            source={require('../../images/download.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={styles.img}
                                        />
                                        <Text style={styles.uploadText}>
                                            {"Seleccionar una o varias imagenes"}
                                        </Text>
                                    </View>
                                    : <View style={{ flex: 1 }}>
                                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                            {
                                                this.state.imgData.map((item, index) => {
                                                    return (
                                                        <ItemList
                                                            key={"unique" + index}
                                                            name={"Image " + (index + 1)}
                                                            clickHandler={() => this.removeItem(item.path)}
                                                        />
                                                    )
                                                })
                                            }
                                            <View style={{ marginTop: 40 }} />
                                        </ScrollView>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.handleSubmit()}
                            >
                                <Text style={styles.submitText}>
                                    {"Guardar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                {this.state.isLoading &&
                    <ActivityIndicator
                        color="#000"
                        size="small"
                        style={styles.loading}
                    />}
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getExpense, postExpenseData })(MisGastos);