"use strict";
import React from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import { postPartStoreData } from '../../Redux/action'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast'
import FastImage from 'react-native-fast-image'
import SelectMultiple from 'react-native-select-multiple'
import validate from 'validator'

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endDate: "",
            task: '',
            hours: "",
            concepts: "",
            noHours: "",
            firstCheck: false,
            secondCheck: false,
            thirdCheck: false,
            fourthCheck: false,
            fifthCheck: false,
            selectedFruits: "",
            isFirst: false,
            isSecond: false,
            myDate: new Date(),
            isLoading: false
        };
        this.controller;
    }
    onCheckBoxHandler1 = () => {
        this.setState({ firstCheck: !this.state.firstCheck })
    }
    onCheckBoxHandler2 = () => {
        this.setState({ secondCheck: !this.state.secondCheck })
    }
    onCheckBoxHandler3 = () => {
        this.setState({ thirdCheck: !this.state.thirdCheck })
    }
    onCheckBoxHandler4 = () => {
        this.setState({ fourthCheck: !this.state.fourthCheck })
    }
    onCheckBoxHandler5 = () => {
        this.setState({ fifthCheck: !this.state.fifthCheck })
    }

    handleSubmit = () => {
        const { login } = this.props.user
        if (this.state.endDate === "") {
            Alert.alert("Por favor seleccione la fecha primero")
            return
        }
        if (this.state.task === "") {
            Alert.alert("Por favor seleccione una tarea de la lista")
            return;
        }
        // if (this.state.hours === "") {
        //     Alert.alert("Por favor seleccione el tipo de hora de la lista")
        //     return;
        // }
        if (!validate.isNumeric(this.state.noHours)) {
            Alert.alert("Por favor ingrese el número de horas")
            return;
        }
        if (validate.isEmpty(this.state.selectedFruits)) {
            Alert.alert("Por favor seleccione conceptos de la lista")
            return;
        }
        const myConceptos = [];
        myConceptos.push({
            label: this.state.selectedFruits,
            value: this.state.selectedFruits
        })
        console.log(myConceptos)
        this._submitApi(
            this.state.endDate,
            this.state.task,
            this.state.hours,
            this.state.noHours,
            myConceptos,
            login.data.id,
            styles.list
        )
        // this.props.postPartStoreData(
        //     this.state.endDate,
        //     this.state.task,
        //     this.state.hours,
        //     this.state.noHours,
        //     myConceptos,
        //     // this.state.fifthCheck,
        //     // this.state.secondCheck,
        //     // this.state.thirdCheck,
        //     // this.state.fourthCheck,
        //     // this.state.fifthCheck,
        //     login.data.id,
        //     styles.list
        // )
    }
    _submitApi = (date, project, hourType, hours, concept, employId, list) => {
        this.setState({ isLoading: true })
        console.log(project)
        const { dataPart } = this.props.user
        fetch('http://95.179.209.186/api/part-store', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                project: project,
                hourType: hourType,
                hours: hours,
                concept: concept,
                employId: employId
            }),
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ isLoading: false })
                // //console.log(json)
                if (json.status === "Success") {
                    Toast.show(json.message, Toast.LONG, [
                        'UIAlertController',
                    ]);
                    this.setState({
                        endDate: "",
                        task: '',
                        hours: "",
                        noHours: "",
                        concepts: "",
                    })
                    // console.log(dataPart.data.projects)
                } else {
                    Alert.alert("", json.message)
                }
            }).catch(error => {
                this.setState({ isLoading: false })
                console.log(error)
            })
    }
    onSelectionsChange = (selectedFruits) => {
        // selectedFruits is array of { label, value }
        this.setState({ selectedFruits })
    }

    render() {
        const navigation = this.props.navigation;
        const { myDate, isLoading } = this.state
        const { dataPart, AuthLoading, login } = this.props.user
        let date = myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();
        //console.log(date)
        //console.log(login)
        return (
            <View style={styles.appConatiner}>
                <View style={styles.block}>
                    <Text style={styles.title}>{"Elegir fecha: "}</Text>
                    <DatePicker
                        style={[styles.datePickerStyle,
                        {
                            width: widthPercentageToDP(30),
                        }
                        ]}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="DD-MM-YYYY"
                        format="DD-MM-YYYY"
                        // minDate="2019-11-04"
                        maxDate={date}
                        customStyles={{
                            datePicker: {
                                backgroundColor: "#98AFC7",
                                justifyContent: 'center'
                            },
                            dateInput: {
                                borderWidth: 0
                            },
                            placeholderText: {
                                color: darkBlue
                            },
                            dateText: {
                                color: darkBlue
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
                {this.state.isSecond ?
                    <View />
                    : <DropDownPicker
                        searchable={true}
                        searchablePlaceholder="Buscar proyecto"
                        searchablePlaceholderTextColor="gray"
                        onOpen={() => this.setState({
                            isFirst: true,
                        })}
                        onClose={() => this.setState({
                            isFirst: false,
                        })}
                        searchableError={() => <Text>Not Found</Text>}
                        zIndex={5000}
                        items={!dataPart ? [] : dataPart.data.projects}
                        defaultValue={this.state.task}
                        containerStyle={styles.dropStyle}
                        style={{
                            backgroundColor: '#ffff',
                            borderWidth: 0,
                            borderColor: "#ffff",
                            zIndex: 4
                        }}
                        itemStyle={{
                            //justifyContent: 'flex-start'
                            borderTopWidth: 2,
                            borderTopColor: grey,
                            zIndex: 4
                        }}
                        dropDownStyle={{
                            borderWidth: 0,
                            borderColor: "#ffff",
                            zIndex: 4,
                            backgroundColor: lightBlue
                        }}
                        onChangeItem={item => this.setState({
                            task: item.value
                        })}
                        placeholder="Proyecto / Tarea"
                        placeholderStyle={{
                            color: darkBlue
                        }}
                        labelStyle={{
                            color: darkBlue
                        }}
                        selectedLabelStyle={{
                            color: darkBlue,
                        }}
                    />
                }
                {/* <DropDownPicker
                    zIndex={4000}
                    items={dataPart.data.hours}
                    defaultValue={this.state.hours}
                    containerStyle={styles.dropStyle2}
                    style={{
                        backgroundColor: '#ffff',
                        borderWidth: 0,
                        borderColor: "#ffff",
                        height: 6
                    }}
                    itemStyle={{
                        //justifyContent: 'flex-start'
                        borderTopWidth: 2,
                        borderTopColor: grey
                    }}
                    dropDownStyle={{
                        borderWidth: 0,
                        borderColor: "#ffff",
                    }}
                    onChangeItem={item => this.setState({
                        hours: item.value
                    })}
                    placeholder="Tipo de horas"
                    placeholderStyle={{
                        color: darkBlue
                    }}
                    labelStyle={{
                        color: darkBlue
                    }}
                    selectedLabelStyle={{
                        color: darkBlue,
                    }}
                /> */}
                <View style={styles.inpuView}>
                    <TextInput
                        placeholder="Cantidad"
                        placeholderTextColor={darkBlue}
                        style={styles.input}
                        maxLength={2}
                        value={this.state.noHours}
                        keyboardType="email-address"
                        onChangeText={text => this.setState({ noHours: text })}
                    />
                </View>
                {/* <View style={styles.conceptosTitle}>
                    <Text style={styles.conceptosText}>{"Conceptos"}</Text>
                </View> */}
                {/* <View style={styles.conceptos}>
                    <SelectMultiple
                        items={dataPart.data.concepts}
                        selectedItems={this.state.selectedFruits}
                        onSelectionsChange={this.onSelectionsChange} />
                </View> */}

                {this.state.isFirst ?
                    <View />
                    : <DropDownPicker
                        zIndex={3000}
                        items={dataPart.data.concepts}
                        defaultValue={this.state.concepts}
                        containerStyle={[styles.dropStyle2, {
                            marginTop: 30
                        }]}
                        onOpen={() => this.setState({
                            isSecond: true,
                        })}
                        onClose={() => this.setState({
                            isSecond: false,
                        })}
                        style={{
                            backgroundColor: '#ffff',
                            borderWidth: 0,
                            borderColor: "#ffff",
                        }}
                        itemStyle={{
                            //justifyContent: 'flex-start'
                            borderTopWidth: 2,
                            borderTopColor: grey
                        }}
                        dropDownStyle={{
                            borderWidth: 0,
                            borderColor: "#ffff",
                        }}
                        onChangeItem={item => this.setState({
                            selectedFruits: item.value
                        })}
                        placeholder="Conceptos"
                        placeholderStyle={{
                            color: darkBlue
                        }}
                        labelStyle={{
                            color: darkBlue
                        }}
                        selectedLabelStyle={{
                            color: darkBlue,
                        }}
                    />
                }
                {/* <View style={styles.bottomView}>
                    <Text style={styles.pluseTitle}>
                        {"PLUSES"}
                    </Text>
                    <View style={styles.itemView}>
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => this.onCheckBoxHandler1()}
                        >
                            {this.state.firstCheck &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            }

                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus sala darwin (HSJD)"}
                        </Text>
                    </View>
                    <View style={styles.line}>

                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => this.onCheckBoxHandler2()}
                            >
                                {this.state.secondCheck &&
                                    <FastImage
                                        source={require('../../images/tick.png')}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={styles.tick}
                                    />
                                }

                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Toxicided y peligrosidad (jornda complete)"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => this.onCheckBoxHandler3()}
                        >
                            {this.state.thirdCheck &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            }

                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Toxicided y peligrosidad (1/2jornada)"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => this.onCheckBoxHandler4()}
                        >
                            {this.state.fourthCheck &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            }
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus Fastividad Fairmont"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity
                            style={styles.box}
                            onPress={() => this.onCheckBoxHandler5()}
                        >
                            {this.state.fifthCheck &&
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            }

                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus Fastividad Fairmont(25,26 dic. y 1 Enero)"}
                        </Text>
                    </View>
                </View> */}
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => this.handleSubmit()}
                >
                    <Text style={styles.btntext}>
                        {"Presentar para aprobación"}
                    </Text>
                </TouchableOpacity>
                {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={darkBlue}
                        style={styles.loading}
                    />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { postPartStoreData })(Application);