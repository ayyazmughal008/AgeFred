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
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import FastImage from 'react-native-fast-image'
import HistoryComponent from '../../Component/History'
import { data } from './data'

export default class History extends React.Component {
  state = {
    startDate: "",
    endDate: ""
  };


  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.historyConatiner}>
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
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
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
          </View>
        </View>
      </View>
    );
  }
}