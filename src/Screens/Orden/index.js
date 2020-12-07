import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, Image, Alert, Platform } from 'react-native'
import { connect } from 'react-redux';
import { getOrderNumber, postWorkStore, getAutoProjectDetail } from '../../Redux/action'
import { styles } from './styles';
import { darkBlue, grey, darkGrey, lightBlue } from '../../Component/ColorCode'
import DatePicker from "react-native-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import DropDownPicker from 'react-native-dropdown-picker';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { ActivityIndicator } from 'react-native-paper';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import moment from 'moment'

class Orden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordrerNo: 0,
            draft: "",
            customerName: "",
            customerEmail: "",
            customerAddress: "",
            customerVat: "",
            customerPhone: "",
            reportDate: "",
            time: "",
            departureTime: "",
            workDetails: "",
            materials: "",
            hours: "",
            hourTypo: "",
            hourType: "",
            diet: "",
            displacement: "",
            workers: "",
            observations: "",
            job: "",
            image: "",
            isLoading: false,
            TimePickerModal: false,
            TimePickerModal2: false,
        };
        this.getWorkOrder()
    }
    getWorkOrder = () => {
        const { login } = this.props.user;
        this.props.getOrderNumber(login.data.id)
    }
    handleSubmit = () => {
        const { login, getWorkOrderNumber, projectDetail } = this.props.user;
        if (!this.state.image) {
            Alert.alert("Please create signature and save")
            return
        }
        let data = {
            'uri': this.state.image,
            'type': 'image/png',
            'name': Date.now() + '_Agefred.png',
        }

        console.log(data)
        if (!this.state.draft) {
            alert("please choose project first")
            return;
        }
        this.props.postWorkStore(
            !getWorkOrderNumber ? "" : getWorkOrderNumber.data,
            this.state.draft,
            projectDetail.data.clientName,
            projectDetail.data.clientEmail,
            projectDetail.data.clientAddress,
            projectDetail.data.customerVat,
            projectDetail.data.customerPhone,
            this.state.reportDate,
            this.state.time,
            this.state.departureTime,
            this.state.workDetails,
            this.state.materials,
            this.state.hours,
            this.state.hourTypo,
            this.state.diet,
            this.state.displacement,
            this.state.workers,
            this.state.observations,
            this.state.job,
            data,
            login.data.id
        )
    }
    updateOrderNo = (text) => {
        const { getWorkOrderNumber } = this.props.user;
        let myNo = getWorkOrderNumber.data
        myNo = text;
        this.setState({ ordrerNo: newArray })
    }
    handleTimePicker = () => {
        this.setState({ TimePickerModal: !this.state.TimePickerModal })
    }
    handleTimePicker2 = () => {
        this.setState({ TimePickerModal2: !this.state.TimePickerModal2 })
    }

    render() {
        const { dataPart, AuthLoading, getWorkOrderNumber, login, projectDetail } = this.props.user
        console.log("my number =>", login.data.id)
        // var timestamp = 1601234432961 * 1000;
        // console.log(new Date(timestamp).toTimeString());
        console.log("===>>>>>", dataPart.data.projects);
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
                            title="PARTE DE TRABAJO"
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
                                editable={false}
                                value={!getWorkOrderNumber ? "" : getWorkOrderNumber.data}
                                style={styles.input}
                                autoCapitalize="none"
                            //secureTextEntry={true}
                            //onChangeText={text => this.updateOrderNo(text)}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Proyecto – tarea "}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            {Platform.OS === "ios" ?
                                <View style={{ alignItems: "center", zIndex: 5000 }}>
                                    <DropDownPicker
                                        items={dataPart.data.projects}
                                        defaultValue={this.state.draft}
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
                                            backgroundColor: lightBlue

                                        }}
                                        onChangeItem={item => this.setState({
                                            draft: item.value
                                        })}
                                        placeholder="Proyecto – Tarea"
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
                                : <View style={{ alignItems: "center", }}>
                                    <DropDownPicker
                                        items={dataPart.data.projects}
                                        defaultValue={this.state.draft}
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
                                            backgroundColor: lightBlue

                                        }}
                                        onChangeItem={item => this.setState({
                                            draft: item.value
                                        }, () => {
                                            this.props.getAutoProjectDetail(this.state.draft)
                                        })}
                                        placeholder="Proyecto – Tarea"
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
                            }
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Nombre del cliente"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Nombre de clients"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={!projectDetail ? "" : projectDetail.data.clientName}
                                autoCapitalize="none"
                                editable={false}
                            //secureTextEntry={true}
                            // onChangeText={text =>
                            //     this.setState({ customerName: text })
                            // }
                            />
                        </View>
                        {/* new field */}
                        <Text style={styles.inputTitle}>
                            {"Dirección del cliente"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Dirección del cliente"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={!projectDetail ? "" : projectDetail.data.clientAddress}
                                autoCapitalize="none"
                                editable={false}
                            //secureTextEntry={true}
                            // onChangeText={text =>
                            //     this.setState({ customerAddress: text })
                            // }
                            />
                        </View>
                        {/* new field */}
                        <Text style={styles.inputTitle}>
                            {"CIF del cliente"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="CIF del cliente"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.customerVat}
                                autoCapitalize="none"
                                value={!projectDetail ? "" : projectDetail.data.customerVat}
                                editable={false}
                            //secureTextEntry={true}
                            // onChangeText={text =>
                            //     this.setState({ customerVat: text })
                            // }
                            />
                        </View>
                        {/* new Field */}
                        <Text style={styles.inputTitle}>
                            {"Teléfono del cliente"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Teléfono del cliente"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={!projectDetail ? "" : projectDetail.data.customerPhone}
                                autoCapitalize="none"
                                editable={false}
                            //secureTextEntry={true}
                            // onChangeText={text =>
                            //     this.setState({ customerPhone: text })
                            // }
                            />
                        </View>
                        {/* new Field */}
                        <Text style={styles.inputTitle}>
                            {"Email del cliente"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Email del cliente"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={!projectDetail ? "" : projectDetail.data.clientEmail}
                                autoCapitalize="none"
                                editable={false}
                            //secureTextEntry={true}
                            // onChangeText={text =>
                            //     this.setState({ customerEmail: text })
                            // }
                            />
                        </View>
                        {/* new field */}

                        <Text style={styles.inputTitle}>
                            {"Fecha del parte de trabajo"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.reportDate}
                                mode="date"
                                placeholder="DD-MM-YYYY"
                                format="DD-MM-YYYY"
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
                                    this.setState({ reportDate: endDate });
                                }}
                            />
                        </View>

                        <Text style={styles.inputTitle}>
                            {"Hora de entrada"}
                        </Text>
                        <View
                            style={{
                                width: "95%",
                                height: "3%",
                                borderBottomWidth: widthPercentageToDP(0.3),
                                borderBottomColor: "#cccccc"
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.handleTimePicker()}
                            >
                                <Text style={[styles.inputTitle, {
                                    fontWeight: "300"
                                }]}>
                                    {!this.state.time ? "HH-MM" : this.state.time}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Hora de salida"}
                        </Text>
                        <View
                            style={{
                                width: "95%",
                                height: "3%",
                                borderBottomWidth: widthPercentageToDP(0.3),
                                borderBottomColor: "#cccccc"
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.handleTimePicker2()}
                            >
                                <Text style={[styles.inputTitle, {
                                    fontWeight: "300"
                                }]}>
                                    {!this.state.departureTime ? "HH-MM" : this.state.departureTime}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* new field */}
                        <Text style={styles.inputTitle}>
                            {"Detalle del trabajo realizado"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Detalle del trabajo realizado"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.workDetails}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ workDetails: text })
                                }
                            />
                        </View>
                        {/* new field */}
                        <Text style={styles.inputTitle}>
                            {"Materiales"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Materiales"
                                placeholderTextColor={grey}
                                style={[styles.input, {
                                    height: heightPercentageToDP(10)
                                }]}
                                value={this.props.materials}
                                autoCapitalize="none"
                                multiline={true}
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ materials: text })
                                }
                            />
                        </View>
                        {/* end */}
                        <Text style={styles.inputTitle}>
                            {"Nº de horas realizadas"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="No de horas"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.hours}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ hours: text })
                                }
                            />
                        </View>

                        <Text style={styles.inputTitle}>
                            {"Tipo de hora"}
                        </Text>
                        {Platform.OS === "ios" ?
                            <View style={{ alignItems: "center", zIndex: 5000 }}>
                                <DropDownPicker
                                    items={dataPart.data.hours}
                                    defaultValue={this.state.hourTypo}
                                    containerStyle={styles.dropStyle2}
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
                                        backgroundColor: lightBlue

                                    }}
                                    onChangeItem={item => this.setState({
                                        hourTypo: item.value
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
                            : <View style={{ alignItems: "center", }}>
                                <DropDownPicker
                                    items={dataPart.data.hours}
                                    defaultValue={this.state.hourTypo}
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
                                        backgroundColor: lightBlue

                                    }}
                                    onChangeItem={item => this.setState({
                                        hourTypo: item.value
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
                        }
                        <Text style={styles.inputTitle}>
                            {"Dieta"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Anadir numeros de dieta"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.diet}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ diet: text })
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
                                value={this.props.displacement}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ displacement: text })
                                }
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Trabajadores"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Frimar"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.workers}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ workers: text })
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
                                value={this.props.observations}
                                autoCapitalize="none"
                                //secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ observations: text })
                                }
                            />
                        </View>
                        {/* new field */}
                        <Text style={styles.inputTitle}>
                            {"Trabajo"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            {Platform.OS === "ios" ?
                                <View style={{ alignItems: "center", zIndex: 5000 }}>
                                    <DropDownPicker
                                        items={[{ 'label': "finalizado", 'value': "finalizado" }, { 'label': "en curso", 'value': "en curso" }]}
                                        defaultValue={this.state.hourType}
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
                                            backgroundColor: lightBlue

                                        }}
                                        onChangeItem={item => this.setState({
                                            job: item.value
                                        })}
                                        placeholder="trabajo"
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
                                : <View style={{ alignItems: "center", }}>
                                    <DropDownPicker
                                        items={[{ 'label': "finalizado", 'value': "finalizado" }, { 'label': "en curso", 'value': "en curso" }]}
                                        defaultValue={this.state.hourType}
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
                                            backgroundColor: lightBlue

                                        }}
                                        onChangeItem={item => this.setState({
                                            job: item.value
                                        })}
                                        placeholder="trabajo"
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
                            }
                        </View>
                        {/* end */}
                        <View style={styles.drawmainView}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <RNSketchCanvas
                                    containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                                    onStrokeEnd={data => {
                                        console.log(data)
                                    }}
                                    // closeComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Close</Text></View>}
                                    // onClosePressed={() => {
                                    //     this.setState({ example: 0 })
                                    // }}
                                    // undoComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Undo</Text></View>}
                                    // onUndoPressed={(id) => {
                                    //      //Alert.alert('do something')
                                    // }}
                                    clearComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Clear</Text></View>}
                                    onClearPressed={() => {
                                        // Alert.alert('do something')
                                    }}
                                    // eraseComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Eraser</Text></View>}
                                    // strokeComponent={color => (
                                    //     <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
                                    // )}
                                    // strokeSelectedComponent={(color, index, changed) => {
                                    //     return (
                                    //         <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                                    //     )
                                    // }}
                                    // strokeWidthComponent={(w) => {
                                    //     return (<View style={styles.strokeWidthButton}>
                                    //         <View style={{
                                    //             backgroundColor: 'white', marginHorizontal: 2.5,
                                    //             width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
                                    //         }} />
                                    //     </View>
                                    //     )
                                    // }}
                                    strokeWidth={0.5}
                                    defaultStrokeIndex={0}
                                    //defaultStrokeWidth={5}
                                    saveComponent={<View style={styles.functionButton}><Text style={{ color: 'white' }}>Save</Text></View>}
                                    savePreference={() => {
                                        return {
                                            folder: "AgefredSignature",
                                            filename: String(Math.ceil(Math.random() * 100000000)),
                                            transparent: true,
                                            imageType: "png"
                                        }
                                    }}
                                    onSketchSaved={(success, path) => {
                                        //Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                                        this.setState({ image: 'file://' + path }, () => {
                                            console.log(this.state.image)
                                        })
                                    }}
                                    onPathsChange={(pathsCount) => {
                                        console.log('pathsCount', pathsCount)
                                    }}
                                    onStrokeStart={data => {
                                        console.log("start =>", data)
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
                                    {"Enviar"}
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
                {this.state.TimePickerModal &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        mode='time'
                        value={new Date().getTime()}
                        is24Hour={true}
                        display="default"
                        onConfirm={this.handleTimePicker()}
                        onCancel={this.handleTimePicker()}
                        onChange={(event, date) => {
                            this.setState({
                                time: moment(date).format('HH:mm')
                            }, () => {
                                console.log(this.state.time)
                            })
                            //console.log(moment(date).format('hh:mm:ss'))
                            //this.setTime()
                        }}
                    />
                }
                {this.state.TimePickerModal2 &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        mode='time'
                        value={new Date().getTime()}
                        is24Hour={true}
                        display="default"
                        onConfirm={this.handleTimePicker2()}
                        onCancel={this.handleTimePicker2()}
                        onChange={(event, date) => {
                            this.setState({
                                departureTime: moment(date).format('HH:mm')
                            }, () => {
                                console.log(this.state.departureTime)
                            })
                            //console.log(moment(date).format('hh:mm:ss'))
                            //this.setTime()
                        }}
                    />
                }
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, {
    getOrderNumber,
    postWorkStore,
    getAutoProjectDetail
})(Orden);