import React from 'react'
import { View, Alert, ActivityIndicator, Text, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import { lightBlue, darkBlue, grey, darkGrey } from '../../Component/ColorCode'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import DropDownPicker from 'react-native-dropdown-picker';
import { getDataHolidays, postHolidayData } from '../../Redux/action'
import TimePicker from 'react-native-simple-time-picker';
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            motivo: "",
            type: "",
            selectedHours: "00",
            selectedMinutes: "00",
        };
        this.props.getDataHolidays();
    }

    handleSubmit = () => {
        const { login } = this.props.user;
        if (this.state.type === 'days') {
            if (this.state.startDate === "") {
                Alert.alert("Please select start date")
                return
            }
            if (this.state.motivo === "") {
                Alert.alert("Please select motivo")
                return
            }
            if (this.state.endDate === "") {
                Alert.alert("Please provide end date")
                return
            }

            this.props.postHolidayData(
                this.state.type,
                this.state.motivo,
                this.state.startDate,
                this.state.endDate,
                null,
                login.data.id
            )

        } else if (this.state.type === 'hours') {
            if (this.state.startDate === "") {
                Alert.alert("Please select date")
                return
            }
            // if (this.state.selectedHours === "00") {
            //     Alert.alert("Please provide time")
            //     return
            // }
            if (this.state.motivo === "") {
                Alert.alert("Please select motivo")
                return
            }
            this.props.postHolidayData(
                this.state.type,
                this.state.motivo,
                this.state.startDate,
                this.state.startDate,
                ('0' + this.state.selectedHours).slice(-2) + ':' + ('0' + this.state.selectedMinutes).slice(-2),
                login.data.id
            )

        }


    }

    render() {
        const { AuthLoading, getHolidaysData, login } = this.props.user;
        const { selectedHours, selectedMinutes } = this.state;
        console.log(selectedMinutes)
        return (
            <View style={styles.container2}>
                <View style={styles.topView}>
                    <View style={{
                        justifyContent: "center", width: "100%"
                    }}>
                        <Text style={styles.toDate}>{"Seleccionar tipo"}</Text>
                    </View>
                    {Platform.OS === "ios" ?
                        <View style={{
                            alignItems: "center",
                            zIndex: 5000
                        }}>
                            <DropDownPicker
                                items={[
                                    { label: 'Hours', value: 'hours' },
                                    { label: 'Days', value: 'days' },
                                ]}
                                defaultValue={this.state.type}
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
                                    backgroundColor: darkGrey

                                }}
                                onChangeItem={item => this.setState({
                                    type: item.value
                                })}
                                placeholder="SELECCIONAR TIPO"
                                placeholderStyle={{
                                    color: darkGrey,
                                    position: "absolute",
                                    fontSize: widthPercentageToDP(3.5)
                                }}
                                labelStyle={{
                                    color: "#fff",
                                    fontSize: widthPercentageToDP(3.5),
                                    fontWeight: "bold"
                                }}
                                selectedLabelStyle={{
                                    color: darkGrey,
                                    fontSize: widthPercentageToDP(3.5)
                                }}
                            />
                        </View>
                        :
                        <View style={{
                            alignItems: "center",
                            //zIndex: 5000
                        }}>
                            <DropDownPicker
                                items={[
                                    { label: 'Hours', value: 'hours' },
                                    { label: 'Days', value: 'days' },
                                ]}
                                defaultValue={this.state.type}
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
                                    backgroundColor: darkGrey

                                }}
                                onChangeItem={item => this.setState({
                                    type: item.value
                                })}
                                placeholder="SELECCIONAR TIPO"
                                placeholderStyle={{
                                    color: darkGrey,
                                    position: "absolute",
                                    fontSize: widthPercentageToDP(3.5)
                                }}
                                labelStyle={{
                                    color: "#ffff",
                                    fontSize: widthPercentageToDP(3.5),
                                    fontWeight: "bold"
                                }}
                                selectedLabelStyle={{
                                    color: darkGrey,
                                    fontSize: widthPercentageToDP(3.5)
                                }}
                            />
                        </View>
                    }
                    {this.state.type === "days" ?
                        <View style={styles.topView}>
                            <View style={{ justifyContent: "center", width: "100%" }}>
                                <Text style={styles.toDate}>{"MOTIVO"}</Text>
                            </View>
                            {Platform.OS === "ios" ?
                                <View style={{
                                    alignItems: "center",
                                    zIndex: 5000
                                }}>
                                    <DropDownPicker
                                        items={!getHolidaysData ? [] : getHolidaysData.data}
                                        defaultValue={this.state.motivo}
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
                                            motivo: item.value
                                        })}
                                        placeholder="VACACIONES"
                                        placeholderStyle={{
                                            color: darkGrey,
                                            position: "absolute",
                                            fontSize: widthPercentageToDP(3.5)
                                        }}
                                        labelStyle={{
                                            color: darkGrey,
                                            fontSize: widthPercentageToDP(3.5),
                                            fontWeight: "bold"
                                        }}
                                        selectedLabelStyle={{
                                            color: darkGrey,
                                            fontSize: widthPercentageToDP(3.5)
                                        }}
                                    />
                                </View>
                                : <View style={{
                                    alignItems: "center",
                                    //zIndex: 5000
                                }}>
                                    <DropDownPicker
                                        items={!getHolidaysData ? [] : getHolidaysData.data}
                                        defaultValue={this.state.motivo}
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
                                            motivo: item.value
                                        })}
                                        placeholder="VACACIONES"
                                        placeholderStyle={{
                                            color: darkGrey,
                                            position: "absolute",
                                            fontSize: widthPercentageToDP(3.5)
                                        }}
                                        labelStyle={{
                                            color: darkGrey,
                                            fontSize: widthPercentageToDP(3.5),
                                            fontWeight: "bold"
                                        }}
                                        selectedLabelStyle={{
                                            color: darkGrey,
                                            fontSize: widthPercentageToDP(3.5)
                                        }}
                                    />
                                </View>
                            }
                            <View style={styles.dateView}>
                                <View>
                                    <Text style={styles.toDate}>{"DESDE"}</Text>
                                    <View style={styles.selectDateView}>
                                        <DatePicker
                                            style={[styles.datePickerStyle,
                                            { width: widthPercentageToDP(30) }
                                            ]}
                                            date={this.state.startDate}
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
                                                    color: darkBlue,
                                                    fontSize: widthPercentageToDP(3)
                                                },
                                                dateText: {
                                                    color: darkBlue
                                                }
                                            }}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            onDateChange={startDate => {
                                                this.setState({ startDate: startDate });
                                            }}
                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.toDate}>{"HASTA"}</Text>
                                    <View style={styles.selectDateView}>
                                        <DatePicker
                                            style={[styles.datePickerStyle,
                                            { width: widthPercentageToDP(30) }
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
                                                    color: darkBlue,
                                                    fontSize: widthPercentageToDP(3)
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
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={() => this.handleSubmit()}
                            >
                                <Text style={styles.submitText}>
                                    {"ENVIAR PETICIÒN"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : this.state.type === "hours" ?
                            <View style={styles.topView}>
                                <View style={{ justifyContent: "center", width: "100%" }}>
                                    <Text style={styles.toDate}>{"MOTIVO"}</Text>
                                </View>
                                {Platform.OS === "ios" ?
                                    <View style={{
                                        alignItems: "center",
                                        zIndex: 5000
                                    }}>
                                        <DropDownPicker
                                            items={!getHolidaysData ? [] : getHolidaysData.data}
                                            defaultValue={this.state.motivo}
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
                                                motivo: item.value
                                            })}
                                            placeholder="VACACIONES"
                                            placeholderStyle={{
                                                color: darkGrey,
                                                position: "absolute",
                                                fontSize: widthPercentageToDP(3.5)
                                            }}
                                            labelStyle={{
                                                color: darkGrey,
                                                fontSize: widthPercentageToDP(3.5),
                                                fontWeight: "bold"
                                            }}
                                            selectedLabelStyle={{
                                                color: darkGrey,
                                                fontSize: widthPercentageToDP(3.5)
                                            }}
                                        />
                                    </View>
                                    : <View style={{
                                        alignItems: "center",
                                        //zIndex: 5000
                                    }}>
                                        <DropDownPicker
                                            items={!getHolidaysData ? [] : getHolidaysData.data}
                                            defaultValue={this.state.motivo}
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
                                                motivo: item.value
                                            })}
                                            placeholder="VACACIONES"
                                            placeholderStyle={{
                                                color: darkGrey,
                                                position: "absolute",
                                                fontSize: widthPercentageToDP(3.5)
                                            }}
                                            labelStyle={{
                                                color: darkGrey,
                                                fontSize: widthPercentageToDP(3.5),
                                                fontWeight: "bold"
                                            }}
                                            selectedLabelStyle={{
                                                color: darkGrey,
                                                fontSize: widthPercentageToDP(3.5)
                                            }}
                                        />
                                    </View>
                                }
                                <View style={{ width: "100%", justifyContent: "center" }}>
                                    <Text style={styles.toDate}>{"DESDE"}</Text>
                                    <View style={styles.selectDateView}>
                                        <DatePicker
                                            style={[styles.datePickerStyle,
                                            { width: widthPercentageToDP(25) }
                                            ]}
                                            date={this.state.startDate}
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
                                                    color: darkBlue,
                                                    fontSize: widthPercentageToDP(3)
                                                },
                                                dateText: {
                                                    color: darkBlue
                                                }
                                            }}
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            showIcon={false}
                                            onDateChange={startDate => {
                                                this.setState({ startDate: startDate });
                                            }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.toDate, {
                                    marginTop: 15
                                }]}>
                                    {"Total Hours: "}{('0' + selectedHours).slice(-2) + ':' + ('0' + selectedMinutes).slice(-2)}
                                </Text>
                                <TimePicker
                                    selectedHours={selectedHours}
                                    selectedMinutes={selectedMinutes}
                                    hoursUnit = " Hours"
                                    minutesUnit = " Minutes"
                                    onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
                                />
                                {/* <View style={{
                                    width: widthPercentageToDP(100),
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: "space-around"
                                }}>
                                    <Text style={[styles.toDate, {
                                        padding: widthPercentageToDP(3),
                                        fontSize: widthPercentageToDP(4)
                                    }]}>{"Hours"}</Text>
                                    <Text style={[styles.toDate, {
                                        padding: widthPercentageToDP(3),
                                        fontSize: widthPercentageToDP(4)
                                    }]}>{"Minutes"}</Text>
                                </View> */}
                                <TouchableOpacity
                                    style={styles.submitBtn}
                                    onPress={() => this.handleSubmit()}
                                >
                                    <Text style={styles.submitText}>
                                        {"ENVIAR PETICIÓN"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            : <View />
                    }
                </View>
                {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color="#000"
                        style={styles.loading}
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getDataHolidays, postHolidayData })(History);