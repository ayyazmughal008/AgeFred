import React from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import { lightBlue, darkBlue, grey } from '../../Component/ColorCode'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import HistoryItem from '../../Component/MisgastoHistory'
import { data } from './data'
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { AuthLoading, getBlogs } = this.props.user
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
                <View style={styles.title}>
                    <Text style={styles.titleText}>{"Entradas Enviadas"}</Text>
                </View>
                <View style={styles.middleView}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {data.map((item, index) => {
                            return (
                                <HistoryItem
                                    key={"unique" + index}
                                    date={item.date}
                                    amount={item.amount}
                                    bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                    clickHandler = {()=> this.props.navigate("DetailMisgasto")}
                                />
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(History);