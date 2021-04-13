"use strict";
import React from "react";
import {
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import { getHolidaysdata } from '../../Redux/action'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import FastImage from 'react-native-fast-image'
import HistoryComponent from '../../Component/VocationHistory'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import { data } from './data'
import MyScrollView from 'react-native-nested-scroll-view'
// import DropDownPicker from 'react-native-dropdown-picker';
import TypeHours from '../../Component/TypeHours'

class HistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      hours: "",
      totalSelected: 0,
      vocation: "",
      loading: false,
      dataSource: [],
    }
    this.getDetail();
  }

  getDetail = () => {
    const { login } = this.props.user
    this.setState({ loading: true })
    fetch('http://95.179.209.186/api/holidays-get', {
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
        console.log("misgesto data===>", json)
        if (json.status === "Success") {
          this.setState({
            loading: false,
            dataSource: json.data,
            vocation: json
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
    fetch('http://95.179.209.186/api/holidays-delete', {
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
    const navigation = this.props.navigation;
    const { dataSource, vocation } = this.state
    const { getAllPart, getAllHolidays, AuthLoading } = this.props.user
    return (
      <View style={styles.historyConatiner}>
        <MyScrollView
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: "center" }}>
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
                  onDateChange={startDate => {
                    this.setState({ startDate: startDate });
                  }}
                />
              </View>
              <Text style={styles.toDate}>
                {"a"}
              </Text>
              <View style={styles.selectDateView}>
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
            </View>
          </View>
          <View style={styles.bottomBtnView}>
            <TouchableOpacity
              style={[styles.bottomBtn, {
                marginTop: 10
              }]}
              onPress={() => this.getDetail()}>
              <Text style={styles.bottomBtnText}>
                {"Filtrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyTitle}>
            <FastImage
              source={require('../../images/history.png')}
              style={styles.historyIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.historyText}>
              {"Historial"}
            </Text>
          </View>
          <View style={styles.mainView}>
            <View style={styles.historyComponent}>
              <View style={styles.componet1}>
                <Text style={styles.componetText}>
                  {"Fecha"}
                </Text>
              </View>
              <View style={styles.componet2}>
                <Text style={styles.componetText}>
                  {"Motivo"}
                </Text>
              </View>
              <View style={styles.componet3}>
                <Text style={styles.componetText}>
                  {"Días"}
                </Text>
              </View>
              <View style={styles.componet4}>
                <Text style={styles.componetText}>
                  {"Horas"}
                </Text>
              </View>
              <View style={styles.componet5}>
                <Text style={styles.componetText}>
                  {"Estado"}
                </Text>
              </View>
              <View style={styles.componet6}>
                {/* <Text style={styles.componetText}>
                  {"Conceptos"}
                </Text> */}
                <EvilIcons
                  size={25}
                  color={darkBlue}
                  name="trash"
                />
              </View>
              {/* <View style={styles.componet7}>
                  <Text style={styles.componetText}>
                    {"Pluses"}
                  </Text>
                </View> */}
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView
                bounces={true}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {!dataSource || !dataSource.length ?
                  <View />
                  : dataSource.map((item, index) => {
                    return (
                      <HistoryComponent
                        key={"unique" + index}
                        type={item.type}
                        text1={item.from}
                        date2={item.to}
                        text2={item.reason}
                        text3={item.days}
                        text4={item.hours}
                        text5={item.status}
                        text6={item.concept}
                        boxClickHandler={() => this.updateArray(index)}
                        isTrue = {item.deleteStatus}
                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                      />
                    )
                  })}
              </ScrollView>
            </View>
          </View>

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
          <View style={styles.lastView}>
            <View style={[styles.bottomHourView, { backgroundColor: darkBlue }]}>
              <Text style={[styles.hoursTitle, {
                fontWeight: "bold",
                paddingLeft: 6,
                color: "#fff"
              }]}>
                {"Motivo"}
              </Text>
              <Text style={[styles.hoursTitle, {
                fontWeight: "bold",
                paddingLeft: 6,
                color: "#fff"
              }]}>
                {"Horas"}
              </Text>
            </View>
            {!vocation || !vocation.multiHours ?
              <View />
              : vocation.multiHours.map((item, index) => {
                return (
                  <View
                    key={"unique" + index}
                    style={styles.bottomHourView}>
                    <Text style={[styles.hoursTitle, {
                      fontWeight: "bold",
                      paddingLeft: 6
                    }]}>
                      {item.name}
                    </Text>
                    <Text style={styles.hoursTitle}>
                      {item.hours}
                    </Text>
                  </View>
                )
              })
            }
            <View style={[styles.bottomHourView, { backgroundColor: darkBlue }]}>
              <Text style={[styles.hoursTitle, {
                fontWeight: "bold",
                paddingLeft: 6,
                color: "#fff"
              }]}>
                {"Motivo"}
              </Text>
              <Text style={[styles.hoursTitle, {
                fontWeight: "bold",
                paddingLeft: 6,
                color: "#fff"
              }]}>
                {"Dias"}
              </Text>
            </View>
            {!vocation || !vocation.multiDays ?
              <View />
              : vocation.multiDays.map((item, index) => {
                return (
                  <View
                    key={"unique" + index}
                    style={styles.bottomHourView}>
                    <Text style={[styles.hoursTitle, {
                      fontWeight: "bold",
                      paddingLeft: 6
                    }]}>
                      {item.name}
                    </Text>
                    <Text style={styles.hoursTitle}>
                      {item.days}
                    </Text>
                  </View>
                )
              })
            }

          </View>
          <View style={{ marginTop: 45 }} />
        </MyScrollView>
        {AuthLoading &&
          <ActivityIndicator
            size="large"
            color={darkBlue}
            style={styles.loading}
          />
        }
        {this.state.loading &&
          <ActivityIndicator
            size="large"
            color="#000"
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
export default connect(mapStateToProps, { getHolidaysdata })(HistoryClass);