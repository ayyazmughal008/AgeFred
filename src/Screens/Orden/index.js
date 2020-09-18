import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import { connect } from 'react-redux';
import { getExpense, postExpenseData } from '../../Redux/action'
import { styles } from './styles';
import { darkBlue, grey, darkGrey } from '../../Component/ColorCode'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image'
import DocumentPicker from 'react-native-document-picker';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { ActivityIndicator } from 'react-native-paper';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'

class Orden extends React.Component {
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
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            this.setState({ imgData: results }, () => {
                console.log(this.state.imgData)
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
            } else {
                throw err;
            }
        }
        // ImagePicker.openPicker({
        //     multiple: true
        // }).then(images => {
        //     this.setState({ imgData: images }, () => {
        //         console.log(this.state.imgData)
        //     })
        // });
    }

    removeItem = (myValue) => {
        var { imgData } = this.state
        var arr = imgData.filter(item => item.uri !== myValue)
        this.setState({ imgData: arr }, () => {
            //console.log(arr)
        })
    }

    handleSubmit = () => {
        const { login } = this.props.user;
        if (this.state.toDate === "") {
            Alert.alert("Please select date")
            return
        }
        if (this.state.project === "") {
            Alert.alert("Please provide project")
            return
        }
        if (this.state.comido === "") {
            Alert.alert("Please provide Motivo")
            return
        }
        if (this.state.importe === "") {
            Alert.alert("Please provide Importe")
            return
        }
        if (this.state.endDate === "") {
            Alert.alert("Please provide endDate")
            return
        }
        if (this.state.imgData === undefined || this.state.imgData.length === 0) {
            Alert.alert("Please select Images")
            return
        }

        this.props.postExpenseData(
            this.state.toDate,
            this.state.project,
            this.state.comido,
            this.state.importe,
            this.state.endDate,
            this.state.imgData,
            login.data.id
        )
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
                            title="ORDEN DE TRABAJO"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.mainView}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, }}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                    >
                        <Text style={styles.inputTitle}>
                            {"N Orden de trabajo"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="N Orden de trabajo"
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
                            {"Fecha de inicio"}
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
                            {"Fecha de finalizacion"}
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
                            {"Draft"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Horario final"
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
                            {"Nombre de clients"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Nombre de clients"
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
                            {"Email del clients"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="ingrese correo electronico"
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
                            {"Hora de clients"}
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
                            {"Hora de salida"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Detalle del trabajo realizado"
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
                            {"No de horas"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="No de horas"
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
                            {"Tipo"}
                        </Text>
                        <View style={{ alignItems: "center", zIndex: Platform.OS === "ios" ? 5000 : 0 }}>
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
                                placeholder="tipo"
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
                            {"Dieta"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Anadir numeros de dieta"
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
                            {"Desplazamiento"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="introducir resumen de Km."
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
                            {"Observaciones"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Texto para introducir"
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
                            {"Tarbajo finalizado / en accesorio"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Frimar"
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
                        <View style={styles.drawmainView}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <RNSketchCanvas
                                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    onStrokeEnd={data => {
                                    }}
                                    // closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                                    // onClosePressed={() => {
                                    //     this.setState({ example: 0 })
                                    // }}
                                    undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                                    onUndoPressed={(id) => {
                                         Alert.alert('do something')
                                    }}
                                    clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
                                    onClearPressed={() => {
                                        // Alert.alert('do something')
                                    }}
                                    eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                                    // strokeComponent={color => (
                                    //     <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                                    // )}
                                    strokeSelectedComponent={(color, index, changed) => {
                                        return (
                                            <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                                        )
                                    }}
                                    // strokeWidthComponent={(w) => {
                                    //     return (<View style={styles.strokeWidthButton}>
                                    //         <View style={{
                                    //             backgroundColor: 'white', marginHorizontal: 2.5,
                                    //             width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    //         }} />
                                    //     </View>
                                    //     )
                                    // }}
                                    defaultStrokeIndex={0}
                                    defaultStrokeWidth={5}
                                    saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                                    savePreference={() => {
                                        return {
                                            folder: "RNSketchCanvas",
                                            filename: String(Math.ceil(Math.random() * 100000000)),
                                            transparent: false,
                                            imageType: "png"
                                        }
                                    }}
                                    onSketchSaved={(success, path) => {
                                        Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                                        console.log(path)
                                    }}
                                    onPathsChange={(pathsCount) => {
                                        console.log('pathsCount', pathsCount)
                                    }}
                                />
                            </View>
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
                {AuthLoading &&
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
export default connect(mapStateToProps, { getExpense, postExpenseData })(Orden);