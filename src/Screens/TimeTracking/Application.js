import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    FlatList,
    PermissionsAndroid,
    ActivityIndicator,
    TextInput
} from 'react-native'
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
    timeStatus,
    startTimeTracking,
    endTimeTracking,
    submitTimeTracking
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


class TimeTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: "00:00",
            endTime: "00:00",
            location: "",
            loading: false,
            isEdit: false,
            promptVisible: false,
            mapModal: false,
            lat: "",
            long: ""
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
        try {
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
                }));
                Geolocation.watchPosition(info => this.setState({
                    location: info,
                    loading: false
                }));
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    checkPermission = async () => {
        const { login } = this.props.user
        try {
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
                this.props.startTimeTracking(
                    this.state.location.coords.latitude,
                    this.state.location.coords.longitude,
                    login.data.id
                )
            } else {
                console.log("location permission denied")
                alert("You can't use geolocation services in your app");
            }
        } catch (err) {
            console.warn(err)
        }
    }
    onchangeStartTime = (text) => {
        this.setState({ startTime: text })
    }
    onchangeEndTime = (text) => {
        this.setState({ endTime: text })
    }


    _keyExtractor = (item, index) => "MyKey" + index;
    render() {
        const { timeTracking, timerStatus, AuthLoading, login } = this.props.user;
        //console.log(this.state.location)
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
                        <Text style={styles.BtnText}>Start</Text>
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
                        <Text style={styles.BtnText}>Stop</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: widthPercentageToDP(100), alignItems: "center" }}>
                    <View style={styles.buttonView}>
                        <Text style={styles.historyLabelText}>Start Time</Text>
                        {timerStatus ?
                            this.state.isEdit ?
                                <TextInput
                                    onChangeText={this.onchangeStartTime}
                                    keyboardType="numeric"
                                    value={this.state.startTime}
                                    maxLength={5}
                                    editable={this.state.isEdit}
                                    textAlign={'center'}
                                    style={styles.input}
                                />
                                : <Text style={styles.historyLabelText}>{!timeTracking.time ? "" : timeTracking.time.startTime}</Text>
                            : <Text style={styles.historyLabelText}>{!timeTracking.time ? "" : timeTracking.time.startTime}</Text>
                        }
                    </View>
                    <View style={styles.buttonView}>
                        <Text style={styles.historyLabelText}>End Time</Text>
                        {timerStatus ?
                            this.state.isEdit ?
                                <TextInput
                                    onChangeText={this.onchangeEndTime}
                                    keyboardType="numeric"
                                    value={this.state.endTime}
                                    maxLength={5}
                                    editable={this.state.isEdit}
                                    textAlign={'center'}
                                    style={styles.input}
                                />
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
                            this.toggleEdit();
                            this.props.submitTimeTracking(
                                this.state.startTime,
                                this.state.endTime,
                                this.state.location.coords.latitude,
                                this.state.location.coords.longitude,
                                login.data.id
                            );
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
                        }]}> {"Update"}
                        </Text>
                    </TouchableOpacity>
                }
                <Text style={[styles.historyLabelText, {
                    marginTop: heightPercentageToDP(1)
                }]}>{"Total Time: "}{!timeTracking.time ? "" :
                    !timeTracking.time.totalTime ? ""
                        : timeTracking.time.totalTime
                    }</Text>

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
                                    text5={"Show" + '\n' + "Location"}
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
                        title="Do you really want to finish your work?"
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
                                    style={styles.map}
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
    submitTimeTracking
})(TimeTracking);