"use strict";
import React from "react";
import {
  View,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import FastImage from 'react-native-fast-image'
import HistoryComponent from '../../Component/History'
import { data } from './data'
import MyScrollView from 'react-native-nested-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

export default class History extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    hours: ""
  };


  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.historyConatiner}>
        <MyScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              <View style={styles.componet7}>
                <Text style={styles.componetText}>
                  {"Pluses"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {Platform.OS === 'ios' ?
                <ScrollView
                  //horizontal
                  contentContainerStyle={{ flexGrow: 1 }}
                  showsVerticalScrollIndicator={false}
                  //directionalLockEnabled={false}
                  nestedScrollEnabled
                >
                  {data.map((item, index) => {
                    return (
                      <HistoryComponent
                        key={"unique" + index}
                        text1={item.text1}
                        text2={item.text2}
                        text3={item.text3}
                        text4={item.text4}
                        text5={item.text5}
                        text6={item.text6}
                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                      />
                    )
                  })}
                </ScrollView>
                : <MyScrollView
                  //horizontal
                  contentContainerStyle={{ flexGrow: 1 }}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                //directionalLockEnabled={false}
                >
                  {data.map((item, index) => {
                    return (
                      <HistoryComponent
                        key={"unique" + index}
                        text1={item.text1}
                        text2={item.text2}
                        text3={item.text3}
                        text4={item.text4}
                        text5={item.text5}
                        text6={item.text6}
                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                      />
                    )
                  })}
                </MyScrollView>
              }
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
            <View style={styles.bottomHourView}>
              <Text style={styles.hoursTitle}>
                {"Total Horas"}
              </Text>
              <Text style={styles.hoursTitle}>
                {"16 h"}
              </Text>
            </View>
            <DropDownPicker
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
            />
          </View>
          <View style = {{marginTop:45}}/>
        </MyScrollView>
      </View>
    );
  }
}