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
import { getAllParts } from '../../Redux/action'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import FastImage from 'react-native-fast-image'
import HistoryComponent from '../../Component/History'
import { data } from './data'
import MyScrollView from 'react-native-nested-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
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
    this.props.getAllParts(
      this.state.startDate,
      this.state.endDate,
      login.data.id
    )
  }

  render() {
    const navigation = this.props.navigation;
    const { getAllPart, AuthLoading } = this.props.user
    return (
      <View style={styles.historyConatiner}>
        {/* <MyScrollView
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}> */}
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
                  {"Proyectos"}
                </Text>
              </View>
              <View style={styles.componet3}>
                <Text style={styles.componetText}>
                  {"Tipo de horas"}
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
                <Text style={styles.componetText}>
                  {"Conceptos"}
                </Text>
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
                {!getAllPart ?
                  <View />
                  : getAllPart.data.map((item, index) => {
                    return (
                      <HistoryComponent
                        key={"unique" + index}
                        text1={item.date}
                        text2={item.project}
                        text3={item.hourType}
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
            {!getAllPart.totalHours ?
              <View />
              : <View style={styles.bottomHourView}>
                <Text style={[styles.hoursTitle,{
                  fontWeight:"bold",
                  paddingLeft:6
                }]}>
                  {"Total Horas"}
                </Text>
                <Text style={styles.hoursTitle}>
                  {getAllPart.totalHours}
                </Text>
              </View>
            }
            {!getAllPart.multiHours ?
              <View />
              : <View style={styles.typeOfHoursView}>
                <View style={styles.myText}>
                  <Text style={styles.historyText}>
                    {"Tipo de horas"}
                  </Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  {getAllPart.multiHours.map((item, index) => {
                    return (
                      <TypeHours
                        name={item.name}
                        value={item.hours}
                      />
                    )
                  })}
                </ScrollView>
              </View>
            }
            {/* <DropDownPicker
              zIndex={5000}
              items={[
                { label: 'UK', value: 'uk' },
                { label: 'France', value: 'france' },
                { label: 'England', value: 'england' },
              ]}
              defaultValue={this.state.hours}
              containerStyle={styles.dropStyle2}
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
                hours: item.value
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
            /> */}
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
export default connect(mapStateToProps, { getAllParts })(HistoryClass);