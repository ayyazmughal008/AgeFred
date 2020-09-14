import React from 'react'
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import { lightBlue, darkBlue, grey } from '../../Component/ColorCode'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import HistoryItem from '../../Component/MisgastoHistory'
import { data } from './data'
import { getAllExpense } from '../../Redux/action'
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
                <View style={styles.title}>
                    <Text style={styles.titleText}>{"Entradas Enviadas"}</Text>
                </View>
                {!getAllExpense ?
                    <View />
                    : <View style={styles.middleView}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            {getAllExpense.data.map((item, index) => {
                                return (
                                    <HistoryItem
                                        key={"unique" + index}
                                        date={item.date}
                                        amount={item.amount}
                                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                        clickHandler={() => this.props.navigate("DetailMisgasto", {
                                            array: item.image,
                                            amount: item.amount,
                                            date: item.date,
                                            draft: item.draft
                                        })}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                }
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