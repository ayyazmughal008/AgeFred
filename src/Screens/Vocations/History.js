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
// import { data } from './data'
// import MyScrollView from 'react-native-nested-scroll-view'
// import DropDownPicker from 'react-native-dropdown-picker';
import TypeHours from '../../Component/TypeHours'

class HistoryClass extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    hours: ""
  };

  handleSubmit = () => {
    const { login } = this.props.user
    if (this.state.startDate === "") {
      Alert.alert("Por favor seleccione la fecha primero")
      return
    }
    if (this.state.endDate === "") {
      Alert.alert("Por favor seleccione la fecha primero")
      return
    }
    this.props.getHolidaysdata(
      this.state.startDate,
      this.state.endDate,
      login.data.id
    )
  }

  render() {
    const navigation = this.props.navigation;
    const { getAllPart,getAllHolidays, AuthLoading } = this.props.user
    return (
      <View style={styles.historyConatiner}>
        {/* <MyScrollView
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}> */}
        <View style = {{alignItems:"center"}}>
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
            <View style={styles.selectDateView}>
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
          </View>
          <View style={styles.bottomBtnView}>
            <TouchableOpacity
              style={[styles.bottomBtn, {
                marginTop: 10
              }]}
              onPress={() => this.handleSubmit()}>
              <Text style={styles.bottomBtnText}>
                {"Submit"}
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
              {"Historia"}
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
                  {"Dias"}
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
              </View>
              {/* <View style={styles.componet7}>
                  <Text style={styles.componetText}>
                    {"Pluses"}
                  </Text>
                </View> */}
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView
                bounces={false}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {!getAllHolidays ?
                  <View />
                  : getAllHolidays.data.map((item, index) => {
                    return (
                      <HistoryComponent
                        key={"unique" + index}
                        type={item.type}
                        text1={item.from}
                        date2 = {item.to}
                        text2={item.reason}
                        text3={item.days}
                        text4={item.hours}
                        text5={item.status}
                        text6={item.concept}
                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                      />
                    )
                  })}
              </ScrollView>
            </View>
          </View>

          <TouchableOpacity style={styles.checkBox}>
            <FastImage
              source={require('../../images/tick.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.tick2}
            />
          </TouchableOpacity>
          <View style={styles.bottomBtnView}>
            <TouchableOpacity style={styles.bottomBtn}>
              <Text style={styles.bottomBtnText}>
                {"Eliminar"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lastView}>
            {!getAllHolidays.data2.Total_Horas ?
              <View />
              : <View style={styles.bottomHourView}>
                <Text style={[styles.hoursTitle,{
                  fontWeight:"bold",
                  paddingLeft:6
                }]}>
                  {"Total Horas"}
                </Text>
                <Text style={styles.hoursTitle}>
                  {getAllHolidays.data2.Total_Horas}
                </Text>
              </View>
            }
            {!getAllHolidays.data2.Total_Dias ?
              <View />
              : <View style={styles.bottomHourView}>
                <Text style={[styles.hoursTitle,{
                  fontWeight:"bold",
                  paddingLeft:6
                }]}>
                  {"Total Dias"}
                </Text>
                <Text style={styles.hoursTitle}>
                  {getAllHolidays.data2.Total_Dias}
                </Text>
              </View>
            }
          </View>
          <View style={{ marginTop: 45 }} />
        {/* </MyScrollView> */}
        {AuthLoading &&
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
export default connect(mapStateToProps, { getHolidaysdata })(HistoryClass);