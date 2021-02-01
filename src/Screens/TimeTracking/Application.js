import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    FlatList,
    PermissionsAndroid,
    ActivityIndicator,
    TextInput,
    Platform
} from 'react-native'
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    timeStatus,
    startTimeTracking,
    endTimeTracking,
    submitTimeTracking,
    getTimeCounter
} from '../../Redux/action'
import { styles } from "./atyles";
import {
    heightPercentageToDP,
    widthPercentageToDP
} from "../../Component/MakeMeResponsive";
import Geolocation from '@react-native-community/geolocation';
import Moment from "moment";
import Feather from 'react-native-vector-icons/Feather'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HistoryComponent from "../../Component/TrackingHistory";
import Modal1 from '../../Component/Modal'
import { darkBlue, darkGrey } from "../../Component/ColorCode";
import { colors } from "react-native-elements";
import { color } from "react-native-reanimated";


class TimeTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: "00",
            startTime2: "00",
            endTime: "00",
            endTime2: "00",
            location: "",
            loading: false,
            isEdit: false,
            promptVisible: false,
            mapModal: false,
            lat: "",
            long: "",
            timer: null
        };
    }

    toggleDialog = () => {
        this.setState({ promptVisible: !this.state.promptVisible })
    }
    toggleMap = () => {
        this.setState({ mapModal: !this.state.mapModal })
    }
    toggleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }
    async componentDidMount() {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            this.setState({ loading: true })
            Geolocation.getCurrentPosition(info => this.setState({
                location: info,
                loading: false
            }), error => {
                this.setState({ loading: false }, () => {
                    alert("Please enable your location, it's required for this section and reopen the application", error)
                }),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 3000
                } //removed this
            });
            Geolocation.watchPosition(info => this.setState({
                location: info,
                loading: false
            }), error => {
                this.setState({ loading: false }, () => {
                    alert("Please enable your location, it's required for this section and reopen the application", error)
                }),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 3000
                } //removed this
            });
        } else {
            try {
                //this.updateTimer()
                this.timer = setInterval(() => this.display_c(), 60000)
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Agefred',
                        message: 'Agefred App access to your location ',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.setState({ loading: true })
                    Geolocation.getCurrentPosition(info => this.setState({
                        location: info,
                        loading: false
                    }), error => {
                        this.setState({ loading: false }, () => {
                            alert("Please enable your location, it's required for this section and reopen the application", error)
                        }),
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 3000
                        } //removed this
                    });
                    Geolocation.watchPosition(info => this.setState({
                        location: info,
                        loading: false
                    }), error => {
                        this.setState({ loading: false }, () => {
                            alert("Please enable your location, it's required for this section and reopen the application", error)
                        }),
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 3000
                        } //removed this
                    });
                } else {
                    console.log("location permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }
    checkPermission = async () => {
        const { login } = this.props.user
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            this.props.startTimeTracking(
                this.state.location.coords.latitude,
                this.state.location.coords.longitude,
                login.data.id
            )
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Agefred',
                        message: 'Agefred App need to access to your location ',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.props.startTimeTracking(
                        this.state.location.coords.latitude,
                        this.state.location.coords.longitude,
                        login.data.id
                    )
                } else {
                    console.log("location permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }
    onchangeStartTime = (text) => {
        this.setState({ startTime: text })
    }
    onchangeStartTime2 = (text) => {
        this.setState({ startTime2: text })
    }
    onchangeEndTime = (text) => {
        this.setState({ endTime: text })
    }
    onchangeEndTime2 = (text) => {
        this.setState({ endTime2: text })
    }
    handleUpdateData = async () => {
        const { login } = this.props.user;
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            this.props.submitTimeTracking(
                this.state.startTime + ":" + this.state.startTime2,
                this.state.endTime + ":" + this.state.endTime2,
                this.state.location.coords.latitude,
                this.state.location.coords.longitude,
                login.data.id
            );
            this.toggleEdit();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Agefred',
                        message: 'Agefred App need to access to your location ',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.props.submitTimeTracking(
                        this.state.startTime + ":" + this.state.startTime2,
                        this.state.endTime + ":" + this.state.endTime2,
                        this.state.location.coords.latitude,
                        this.state.location.coords.longitude,
                        login.data.id
                    );
                    this.toggleEdit();
                } else {
                    console.log("location permission denied")
                }
            } catch (err) {
                console.warn(err)
            }
        }
    }

    display_c = () => {
        const { timeTracking, timerStatus } = this.props.user;
        if (!timerStatus)
            this.props.getTimeCounter(timeTracking.time.id)
    }

    // display_ct = () => {
    //     var x = new Date();
    //     // time part //

    //     var hour = x.getHours();
    //     var minute = x.getMinutes();
    //     var second = x.getSeconds();
    //     if (hour < 10) { hour = '0' + hour; }
    //     if (minute < 10) { minute = '0' + minute; }
    //     if (second < 10) { second = '0' + second; }
    //     var x3 = hour + ':' + minute + ':' + second
    //     this.setState({ timer: x3 })
    //     this.display_c()
    // }

    _keyExtractor = (item, index) => "MyKey" + index;
    render() {
        const { timeTracking, timerStatus, AuthLoading, login, counter } = this.props.user;
        console.log(timerStatus)
        return (
            <View style={styles.container2}>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={[
                            styles.endBtn,
                            {
                                backgroundColor:
                                    timerStatus === true ? "#0943af" : "#6495ED"
                            }
                        ]}
                        disabled={timerStatus === true ? false : true}
                        onPress={() => {
                            this.checkPermission()
                        }}
                    >
                        <Text style={styles.BtnText}>{"Empezar"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.endBtn,
                            {
                                backgroundColor:
                                    timerStatus === true ? "#6495ED" : "#0943af"
                            }
                        ]}
                        disabled={timerStatus === true ? true : false}
                        onPress={() => {
                            this.toggleDialog()
                        }}
                    >
                        <Text style={styles.BtnText}>{"Finalizar"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: widthPercentageToDP(100), alignItems: "center" }}>
                    <View style={styles.buttonView}>
                        <Text style={styles.historyLabelText}>Hora de inicio</Text>
                        {timerStatus ?
                            this.state.isEdit ?
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TextInput
                                            onChangeText={this.onchangeStartTime}
                                            keyboardType="numeric"
                                            value={this.state.startTime}
                                            maxLength={2}
                                            editable={this.state.isEdit}
                                            textAlign={'center'}
                                            style={styles.input}
                                        />
                                        <Text>{" : "}</Text>
                                        <TextInput
                                            onChangeText={this.onchangeStartTime2}
                                            keyboardType="numeric"
                                            value={this.state.startTime2}
                                            maxLength={2}
                                            editable={this.state.isEdit}
                                            textAlign={'center'}
                                            style={styles.input}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={styles.historyLabelText}>{"hora"}</Text>
                                        <Text style={[styles.historyLabelText, {
                                            marginLeft: 15
                                        }]}>{"min"}</Text>
                                    </View>

                                </View>
                                : <Text style={styles.historyLabelText}>{!timeTracking.time ? "" : timeTracking.time.startTime}</Text>
                            : <Text style={styles.historyLabelText}>{!timeTracking.time ? "" : timeTracking.time.startTime}</Text>
                        }
                    </View>
                    <View style={styles.buttonView}>
                        <Text style={styles.historyLabelText}>Hora de finalizacion</Text>
                        {timerStatus ?
                            this.state.isEdit ?
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <TextInput
                                            onChangeText={this.onchangeEndTime}
                                            keyboardType="numeric"
                                            value={this.state.endTime}
                                            maxLength={2}
                                            editable={this.state.isEdit}
                                            textAlign={'center'}
                                            style={styles.input}
                                        />
                                        <Text>{" : "}</Text>
                                        <TextInput
                                            onChangeText={this.onchangeEndTime2}
                                            keyboardType="numeric"
                                            value={this.state.endTime2}
                                            maxLength={2}
                                            editable={this.state.isEdit}
                                            textAlign={'center'}
                                            style={styles.input}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Text style={styles.historyLabelText}>{"hora"}</Text>
                                        <Text style={[styles.historyLabelText, {
                                            marginLeft: 15
                                        }]}>{"min"}</Text>
                                    </View>
                                </View>
                                : <Text style={styles.historyLabelText}>{
                                    !timeTracking.time ? "" :
                                        !timeTracking.time.endTime ? "" :
                                            timeTracking.time.endTime}</Text>
                            : <Text style={styles.historyLabelText}>{
                                !timeTracking.time ? "" :
                                    !timeTracking.time.endTime ? "" :
                                        timeTracking.time.endTime
                            }</Text>
                        }
                    </View>
                    {timerStatus ?
                        !this.state.isEdit ?
                            <TouchableOpacity
                                style={{
                                    position: "absolute",
                                    right: "2%",
                                    top: "10%"
                                }}
                                onPress={() => this.toggleEdit()}
                            >
                                <Feather
                                    name="edit"
                                    size={widthPercentageToDP(5)}
                                    color={darkBlue}
                                />
                            </TouchableOpacity>
                            : <View />
                        : <View />
                    }
                </View>
                { this.state.isEdit &&
                    <TouchableOpacity
                        onPress={() => {
                            this.handleUpdateData();
                        }}
                        style={{
                            width: widthPercentageToDP(30),
                            height: heightPercentageToDP(5),
                            borderRadius: widthPercentageToDP(3),
                            backgroundColor: darkBlue,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Text style={[styles.historyLabelText, {
                            color: "#ffff",
                            fontSize: widthPercentageToDP(4)
                        }]}> {"Actualizar"}
                        </Text>
                    </TouchableOpacity>
                }
                <Text style={[styles.historyLabelText, {
                    marginTop: heightPercentageToDP(1)
                }]}>{"Tiempo total: "}{!timeTracking.time ? "" :
                    !timeTracking.time.totalTime ? ""
                        : timeTracking.time.totalTime
                    }
                </Text>

                {!timerStatus &&
                    <Text style={{
                        fontSize: widthPercentageToDP(3.5),
                        color: darkBlue,
                        fontWeight: "300",
                        alignSelf: "flex-end",
                        marginRight: widthPercentageToDP(3)
                    }}>
                        {!counter ? "" : !counter.data ? "" : counter.data}
                    </Text>
                }

                <View style={styles.historyView}>
                    <View style={styles.historyTitle}>
                        <Text style={styles.historyTitletext}>{"Historial de hoy"}</Text>
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
                            <Text style={styles.historyLabelText}>Ubicación</Text>
                        </View>
                    </View>
                    {!timeTracking.times.length ?
                        <View />
                        : <FlatList
                            data={timeTracking.times}
                            keyExtractor={this._keyExtractor}
                            renderItem={({ item, index }) => (
                                <HistoryComponent
                                    text1={item.date}
                                    text2={item.startTime}
                                    text3={item.endTime}
                                    text4={item.totalTime}
                                    mapClick={() => {
                                        this.setState({
                                            lat: item.latitude,
                                            long: item.longitude
                                        }, () => {
                                            this.toggleMap();
                                        })

                                    }}
                                    text5={"Mostrar" + '\n' + "ubicación"}
                                    bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                />
                            )}
                        />
                    }

                </View>
                {this.state.loading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
                {AuthLoading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
                {this.state.promptVisible &&
                    <Modal1
                        isDialogOpen={this.state.promptVisible}
                        cancelClick={() => this.toggleDialog()}
                        okClick={() => {
                            this.toggleDialog();
                            this.props.endTimeTracking(login.data.id)
                        }}
                        title="¿De verdad quieres terminar tu trabajo?"
                    />
                }
                {this.state.mapModal &&
                    <Modal
                        animationType={"slide"}
                        transparent={true}
                        visible={this.state.mapModal}
                        onRequestClose={() => { console.log("Modal has been closed.") }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.map}>
                                <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map2}
                                    region={{
                                        latitude: parseFloat(this.state.lat),
                                        longitude: parseFloat(this.state.long),
                                        latitudeDelta: 0.0043,
                                        longitudeDelta: 0.0034
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: parseFloat(this.state.lat),
                                            longitude: parseFloat(this.state.long),
                                        }}
                                    />
                                </MapView>
                                <TouchableOpacity
                                    style={styles.mapCloseBtn}
                                    onPress={() => this.toggleMap()}
                                >
                                    <EvilIcons
                                        name="close"
                                        color="#fff"
                                        size={20}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, {
    startTimeTracking,
    timeStatus,
    endTimeTracking,
    submitTimeTracking,
    getTimeCounter
})(TimeTracking);