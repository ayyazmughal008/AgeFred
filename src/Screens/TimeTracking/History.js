import React from 'react'
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './atyles';
import { lightBlue, darkBlue, grey } from '../../Component/ColorCode'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import HistoryComponent from "../../Component/TrackingHistory";
import { data } from './data'
import { getAllExpense } from '../../Redux/action'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: ""
        };
    }

    getDetail = () => {
        const { login } = this.props.user
        this.props.getAllExpense(
            this.state.startDate,
            this.state.endDate,
            login.data.id
        )
    }

    render() {
        const { AuthLoading, getAllExpense } = this.props.user
        return (
            <View style={styles.container2}>
                <View style={styles.dateView}>
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
                                    color: darkBlue
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
                    <Text style={styles.toDate}>
                        {"To"}
                    </Text>
                    <View style={styles.selectDateView2}>
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
                </View>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => this.getDetail()}
                >
                    <Text style={styles.submitText}>
                        {"Submit"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.historyView}>
                    <View style={styles.historyTitle}>
                        <Text style={styles.historyTitletext}>Hoy Historia</Text>
                        <MaterialIcons name="history" size={30} color="#fff" />
                    </View>
                    <View style={styles.historyLabel}>
                        <View style={styles.textWrap}>
                            <Text style={styles.historyLabelText}>Fecha</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.historyLabelText}>Comienzo</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.historyLabelText}>Fin</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.historyLabelText}>Tiempo Total</Text>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.historyLabelText}>Location</Text>
                        </View>
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item, index }) => (
                            <HistoryComponent
                                text1={item.date}
                                text2={item.startTime}
                                text3={item.endTime}
                                text4={item.totalTime}
                                text5={item.location}
                                bgColor={index % 2 ? "#cccccc" : "#ffff"}
                            />
                        )}
                    />
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
export default connect(mapStateToProps, { getAllExpense })(History);