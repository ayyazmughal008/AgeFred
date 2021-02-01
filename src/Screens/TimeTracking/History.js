import React from 'react'
import { View, FlatList, ActivityIndicator, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './atyles';
import { lightBlue, darkBlue, grey } from '../../Component/ColorCode'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import DatePicker from "react-native-datepicker";
import HistoryComponent from "../../Component/TrackingHistory";
import { data } from './data'
import { getTrackingHistory } from '../../Redux/action'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: "",
            endDate: "",
            mapModal: false,
            lat: "",
            long: ""
        };
        this.getMyDetail();
    }
    toggleMap = () => {
        this.setState({ mapModal: !this.state.mapModal })
    }
    getDetail = () => {
        const { login } = this.props.user
        this.props.getTrackingHistory(
            login.data.id,
            this.state.startDate,
            this.state.endDate,
        )
    }
    getMyDetail = () => {
        const { login } = this.props.user
        this.props.getTrackingHistory(
            login.data.id,
            null,
            null,
        )
    }

    render() {
        const { AuthLoading, trackingHistory } = this.props.user
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
                        {"Enviar"}
                    </Text>
                </TouchableOpacity>
                <View style={[styles.historyView, {
                    height: heightPercentageToDP(60),
                    //backgroundColor:"red"
                }]}>
                    <View style={styles.historyTitle}>
                        <Text style={styles.historyTitletext}>{"Historial"}</Text>
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
                    {!trackingHistory ?
                        <View />
                        : <FlatList
                            data={trackingHistory.date}
                            keyExtractor={this._keyExtractor}
                            renderItem={({ item, index }) => (
                                <HistoryComponent
                                    text1={item.date}
                                    text2={item.startTime}
                                    text3={item.endTime}
                                    mapClick={() => {
                                        this.setState({
                                            lat: item.latitude,
                                            long: item.longitude
                                        }, () => {
                                            this.toggleMap();
                                        })

                                    }}
                                    text4={item.totalTime}
                                    text5={"Mostrar" + '\n' + "ubicación"}
                                    bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                />
                            )}
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

                {AuthLoading &&
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
export default connect(mapStateToProps, { getTrackingHistory })(History);