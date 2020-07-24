"use strict";
import React from "react";
import {
    View,
    ScrollView,
    ImageBackground,
    Text,
    TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image'


class Application extends React.Component {
    state = {
        endDate: "",
        task: '',
        hours: "",
        concepts: ""
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.appConatiner}>
                <View style={styles.block}>
                    <Text style={styles.title}>{"Elegir fecha: "}</Text>
                    <DatePicker
                        style={[styles.datePickerStyle,
                        { width: widthPercentageToDP(25) }
                        ]}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                        // minDate="2019-11-04"
                        // maxDate="2099-01-01"
                        customStyles={{
                            datePicker: {
                                backgroundColor: lightBlue
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
                <View style={{ zIndex: 4 }}>
                    <DropDownPicker
                        items={[
                            { label: 'UK', value: 'uk', },
                            { label: 'France', value: 'france', },
                        ]}
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
                            zIndex: 4
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
                </View>
                <View style={{ zIndex: 3 }}>
                    <DropDownPicker
                        items={[
                            { label: 'UK', value: 'uk', },
                            { label: 'France', value: 'france', },
                        ]}
                        defaultValue={this.state.hours}
                        containerStyle={styles.dropStyle2}
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
                    />
                </View>
                <View style={{ zIndex: 2 }}>
                    <View style={styles.inpuView}>

                    </View>
                </View>
                <View style={{ zIndex: 2 }}>
                    <DropDownPicker
                        items={[
                            { label: 'UK', value: 'uk', },
                            { label: 'France', value: 'france', },
                        ]}
                        defaultValue={this.state.concepts}
                        containerStyle={styles.dropStyle2}
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
                            concepts: item.value
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
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.pluseTitle}>
                        {"PLUSES"}
                    </Text>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <FastImage
                                source={require('../../images/tick.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.tick}
                            />
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus sala darwin (HSJD)"}
                        </Text>
                    </View>
                    <View style={styles.line}>

                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <TouchableOpacity style={styles.box}>
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Toxicided y peligrosidad (jornda complete)"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <TouchableOpacity style={styles.box}>
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Toxicided y peligrosidad (1/2jornada)"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <TouchableOpacity style={styles.box}>
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus Fastividad Fairmont"}
                        </Text>
                    </View>
                    <View style={styles.itemView}>
                        <TouchableOpacity style={styles.box}>
                            <TouchableOpacity style={styles.box}>
                                <FastImage
                                    source={require('../../images/tick.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={styles.tick}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <Text style={styles.boxTitle}>
                            {"Plus Fastividad Fairmont(25,26 dic. y 1 Enero)"}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.submitBtn}
                >
                    <Text style={styles.btntext}>
                        {"Presentar para aprobacion"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(Application);