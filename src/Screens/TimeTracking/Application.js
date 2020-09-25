import React, { Component } from "react";
import { View, TouchableOpacity, Text, Alert, FlatList } from 'react-native'
import { connect } from "react-redux";
import { styles } from "./atyles";
import {
    heightPercentageToDP,
    widthPercentageToDP
} from "../../Component/MakeMeResponsive";
import Moment from "moment";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HistoryComponent from "../../Component/TrackingHistory";
import { data } from './data'


class TimeTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: null,
            endTime: "",
            toggleState: "true",
        };
    }
    _keyExtractor = (item, index) => "MyKey" + index;
    render() {
        return (
            <View style={styles.container2}>
                <TouchableOpacity
                    style={[
                        styles.endBtn,
                        {
                            backgroundColor:
                                this.state.toggleState === "true" ? "#0943af" : "#6495ED"
                        }
                    ]}
                    disabled={this.state.toggleState === "true" ? false : true}
                    onPress={() => {
                        //this.Toggle("false");
                        //this.saveTime(Moment().format("HH:mm"));
                        Alert.alert("Hora de inicio",
                            "Tu tiempo ha comenzado. Al finalizar obtendrás tus Horas de trabajo totales"
                        );
                    }}
                >
                    <MaterialIcons name="timer" size={30} color="#fff" />
                    <Text style={styles.BtnText}>Grabar entrada</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.endBtn,
                        {
                            backgroundColor:
                                this.state.toggleState === "true" ? "#6495ED" : "#0943af"
                        }
                    ]}
                    disabled={this.state.toggleState === "true" ? true : false}
                //onPress={() => }
                >
                    <MaterialCommunityIcons name="pause" size={30} color="#fff" />
                    <Text style={styles.BtnText}>Pausa</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: widthPercentageToDP(85),
                        marginTop: heightPercentageToDP(3)
                    }}
                >
                    <Text
                        style={{
                            fontSize: widthPercentageToDP(3),
                            color: "#0943af",
                            textAlign: "right"
                        }}
                    >
                        Hora de Inicio: {this.state.startTime}
                        {/* Start Time: {Moment(dt).format('HH:MM:SS')} */}
                        {/* Start Time: {Moment().format('YYYY.MM.DD')} */}
                        {/* Start Time: {Moment().format('hh:mm:ss')} */}
                    </Text>
                </View>
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps)(TimeTracking);