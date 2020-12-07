"use strict";
import React from "react";
import {
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { styles } from "./styles";
import { connect } from "react-redux";
import { getAllParts, deleteDailyPart } from '../../Redux/action'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, grey } from "../../Component/ColorCode";
import FastImage from 'react-native-fast-image'
import HistoryComponent from '../../Component/History'
import TypeHours from '../../Component/TypeHours'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

class HistoryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      hours: "",
      loading: false,
      dataSource: [],
      totalSelected: 0
    };
    this.getMonthlyHistory(null, null);
  }

  getMonthlyHistory = (from, to) => {
    const { login } = this.props.user;
    this.setState({ loading: true })
    fetch('http://95.179.209.186/api/parts-get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from,
        to: to,
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

  deleteMonthlyHistory = (ids) => {
    const { login } = this.props.user;
    const { dataSource } = this.state
    let myIds = [];
    for (var i = 0; i < dataSource.length; i++) {
      if (dataSource[i].deleteStatus) {
        myIds.push(dataSource[i].id)
      }
    }
    this.setState({ loading: true, totalSelected: 0 })
    fetch('http://95.179.209.186/api/parts-delete', {
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
    this.getMonthlyHistory(
      this.state.startDate,
      this.state.endDate
    )
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
    console.log(dataSource)
    return (
      <View style={styles.historyConatiner}>
        {/* <MyScrollView
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}> */}
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
        <View style={styles.bottomBtnView}>
          <TouchableOpacity
            style={[styles.bottomBtn, {
              marginTop: 10
            }]}
            onPress={() => this.handleSubmit()}>
            <Text style={styles.bottomBtnText}>
              {"Enviar"}
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
                {"Concepto"}
              </Text>
            </View>
            <View style={styles.componet4}>
              <Text style={styles.componetText}>
                {"Cantidad"}
              </Text>
            </View>
            <View style={styles.componet5}>
              <Text style={styles.componetText}>
                {"Estado"}
              </Text>
            </View>
            {/* <View style={styles.componet6}>
              <Text style={styles.componetText}>
                {"Conceptos"}
              </Text>
            </View> */}
            <View style={styles.componet7}>
              <EvilIcons
                size = {25}
                color = {darkBlue}
                name = "trash"
              />
            </View>
            {/* <View style={styles.componet7}>
                  <Text style={styles.componetText}>
                    {"Pluses"}
                  </Text>
                </View> */}
          </View>
          <View style={{ flex: 1 }}>
            {!dataSource ?
              <View />
              : <FlatList
                data={dataSource}
                style={styles.flatStyle}
                enableEmptySections={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <HistoryComponent
                    key={"unique" + index}
                    text1={item.date}
                    text2={item.project}
                    text3={item.concept}
                    text4={item.hours}
                    text5={item.status}
                    isTrue={item.deleteStatus}
                    bgColor={index % 2 ? "#cccccc" : "#ffff"}
                    boxClickHandler={() => this.updateArray(index)}
                  />
                )}
              />
            }
          </View>
        </View>

        {/* {this.state.totalSelected > 0 &&
          <TouchableOpacity style={styles.checkBox}>
            <FastImage
              source={require('../../images/tick.png')}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.tick2}
            />
          </TouchableOpacity>
        } */}
        {this.state.totalSelected > 0 &&
          <View style={styles.bottomBtnView}>
            <TouchableOpacity
              onPress={() => this.deleteMonthlyHistory()}
              style={styles.bottomBtn}>
              <Text style={styles.bottomBtnText}>
                {"Eliminar"}
              </Text>
            </TouchableOpacity>
          </View>
        }
        <View style={styles.lastView}>
          {!dataSource.totalHours ?
            <View />
            : <View style={styles.bottomHourView}>
              <Text style={[styles.hoursTitle, {
                fontWeight: "bold",
                paddingLeft: 6
              }]}>
                {"Total Horas"}
              </Text>
              <Text style={styles.hoursTitle}>
                {dataSource.totalHours}
              </Text>
            </View>
          }
          {!dataSource.multiHours ?
            <View />
            : <View style={styles.typeOfHoursView}>
              <View style={styles.myText}>
                <Text style={styles.historyText}>
                  {"Tipo de horas"}
                </Text>
              </View>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {dataSource.multiHours.map((item, index) => {
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
        {this.state.loading &&
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
export default connect(mapStateToProps, { getAllParts, deleteDailyPart })(HistoryClass);