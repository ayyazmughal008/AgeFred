import React from 'react'
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import { lightBlue, darkBlue, grey } from '../../Component/ColorCode'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import HistoryItem from '../../Component/MisgastoHistory'
import { data } from './data'
import { getAllExpense } from '../../Redux/action'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            loading: false,
            dataSource: [],
            totalSelected: 0
        };
    }

    getDetail = () => {
        const { login } = this.props.user
        this.setState({ loading: true })
        fetch('http://95.179.209.186/api/expenses-get', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: this.state.startDate,
                to: this.state.endDate,
                employId: login.data.id
            }),
        })
            .then(res => res.json())
            .then(json => {
                console.log(json.data)
                if (json.status === "Success") {
                    this.setState({
                        loading: false,
                        dataSource: json.data,
                    });
                } else {
                    alert(json.message)
                }
            }).catch(error => { console.log(error) })
    }

    deleteDetail = () => {
        const { login } = this.props.user;
        const { dataSource } = this.state
        let myIds = [];
        for (var i = 0; i < dataSource.length; i++) {
            if (dataSource[i].deleteStatus) {
                myIds.push(dataSource[i].id)
            }
        }
        this.setState({ loading: true, totalSelected: 0 })
        fetch('http://95.179.209.186/api/expenses-delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ides: myIds,
                employId: login.data.id,
            }),
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.status === "Success") {
                    this.setState({
                        loading: false,
                        dataSource: json.data,
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                    alert(json.message)
                }
            }).catch(error => { console.log(error) })
    }

    updateArray = (index) => {
        const { dataSource } = this.state
        let temparr = [];
        temparr = dataSource
        if (temparr[index].deleteStatus === false) {
            temparr[index].deleteStatus = true
        } else {
            temparr[index].deleteStatus = false
        }
        const itemNumber = temparr.filter(item => item.deleteStatus === true).length;
        this.setState({
            testArray: temparr,
            totalSelected: itemNumber
        })
    }

    render() {
        const { dataSource } = this.state
        console.log(this.state.totalSelected)
        return (
            <View style={styles.container2}>
                <View style={styles.dateView}>
                    <View style={styles.selectDateView}>
                        <DatePicker
                            style={[styles.datePickerStyle,
                            { width: widthPercentageToDP(30) }
                            ]}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="DD-MM-YYYY"
                            format="DD-MM-YYYY"
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
                        {"a"}
                    </Text>
                    <View style={styles.selectDateView2}>
                        <DatePicker
                            style={[styles.datePickerStyle,
                            { width: widthPercentageToDP(30) }
                            ]}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="DD-MM-YYYY"
                            format="DD-MM-YYYY"
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
                        {"Filtrar"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.historyComponent}>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(20),
                        
                    }]}>
                        <Text style={styles.componetText}>
                            {"Fecha"}
                        </Text>
                    </View>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(15),
                        //backgroundColor:"red"
                    }]}>
                        <Text style={styles.componetText}>
                            {"Gasto"}
                        </Text>
                    </View>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(20),
                        //backgroundColor:"red"
                    }]}>
                        <Text style={styles.componetText}>
                            {"M. de Gasto"}
                        </Text>
                    </View>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(24.1),
                    }]}>
                        <Text style={styles.componetText}>
                            {"Estado"}
                        </Text>
                    </View>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(10),
                    }]}>
                        <EvilIcons
                            size={25}
                            color={darkBlue}
                            name="eye"
                        />
                    </View>
                    <View style={[styles.componet1, {
                        width: widthPercentageToDP(10),
                    }]}>
                        <EvilIcons
                            size={25}
                            color={darkBlue}
                            name="trash"
                        />
                    </View>
                </View>
                {!dataSource ?
                    <View />
                    : <View style={styles.middleView}>
                        <FlatList
                            data={dataSource}
                            style={styles.flatStyle}
                            enableEmptySections={true}
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <HistoryItem
                                    key={"unique" + index}
                                    date={item.date}
                                    amount={item.amount}
                                    status={item.status}
                                    type = {item.reason}
                                    boxClickHandler={() => this.updateArray(index)}
                                    isTrue={item.deleteStatus}
                                    bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                    clickHandler={() => this.props.navigate("DetailMisgasto", {
                                        array: item.image,
                                        amount: item.amount,
                                        date: item.date,
                                        draft: item.draft
                                    })}
                                />
                            )}
                        />

                    </View>
                }
                {this.state.totalSelected > 0 &&
                    <View style={styles.bottomBtnView}>
                        <TouchableOpacity
                            style={styles.bottomBtn}
                            onPress={() => this.deleteDetail()}
                        >
                            <Text style={styles.bottomBtnText}>
                                {"Eliminar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
                {this.state.loading &&
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