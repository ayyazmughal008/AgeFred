import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import { darkBlue, grey, darkGrey } from '../../Component/ColorCode'
import DatePicker from "react-native-datepicker";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image'
import DocumentPicker from 'react-native-document-picker';
import ItemList from '../../Component/ItemList'

class MisGastos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDate: "",
            project: "",
            comido: "",
            importe: "",
            endDate: "",
            imgData: []
        };
    }

    pickDocument = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            this.setState({ imgData: results }, () => {
                console.log(this.state.imgData)
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
            } else {
                throw err;
            }
        }
    }

    removeItem = (myValue) => {
        var { imgData } = this.state
        arr = imgData.filter(item => item.name !== myValue)
        this.setState({ imgData: arr }, () => {
            console.log(arr)
        })
    }

    render() {
        const navigation = this.props.navigation;
        const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
        return (
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior="height"
            //keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <View style={styles.mainView}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, }}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                    >
                        <Text style={styles.inputTitle}>
                            {"Fecha"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.toDate}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                // minDate="2019-11-04"
                                // maxDate="2099-01-01"
                                customStyles={{
                                    datePicker: {
                                        backgroundColor: "#ffff"
                                    },
                                    dateInput: {
                                        borderBottomWidth: 1,
                                        borderBottomColor: grey,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        width: widthPercentageToDP(85),
                                    },
                                    placeholderText: {
                                        color: grey,
                                        position: "absolute",
                                        left: "2%"
                                    },
                                    dateText: {
                                        color: darkGrey,
                                        position: "absolute",
                                        left: "2%"
                                    }
                                }}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}
                                onDateChange={endDate => {
                                    this.setState({ toDate: endDate });
                                }}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Proyecto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="Proyecto / tarea"
                                placeholderTextColor={grey}
                                value={this.props.project}
                                style={styles.input}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ project: text })
                                }
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Motivo gasto"}
                        </Text>
                        <View style={{ alignItems: "center", zIndex:5000 }}>
                            <DropDownPicker
                                items={[
                                    { label: 'UK', value: 'uk' },
                                    { label: 'France', value: 'france' },
                                    { label: 'England', value: 'england' },
                                ]}
                                defaultValue={this.state.comido}
                                containerStyle={styles.dropStyle2}
                                style={{
                                    backgroundColor: '#ffff',
                                    borderBottomWidth: 1,
                                    borderBottomColor: grey,
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                }}
                                itemStyle={{
                                    //justifyContent: 'flex-start'
                                    borderTopWidth: 2,
                                    borderTopColor: grey,
                                }}
                                dropDownStyle={{
                                    borderWidth: 0,
                                    borderColor: "#ffff",

                                }}
                                onChangeItem={item => this.setState({
                                    comido: item.value
                                })}
                                placeholder="Comida"
                                placeholderStyle={{
                                    color: darkGrey,
                                    position: "absolute",
                                    //left: "-3%"
                                }}
                                labelStyle={{
                                    color: darkGrey,
                                }}
                                selectedLabelStyle={{
                                    color: darkGrey,
                                }}
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Importe gasto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TextInput
                                placeholder="importe"
                                placeholderTextColor={grey}
                                style={styles.input}
                                value={this.props.importe}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                onChangeText={text =>
                                    this.setState({ importe: text })
                                }
                            />
                        </View>
                        <Text style={styles.inputTitle}>
                            {"Fecha en la que se realizo el gasto"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={this.state.endDate}
                                mode="date"
                                placeholder="YYYY-MM-DD"
                                format="YYYY-MM-DD"
                                // minDate="2019-11-04"
                                // maxDate="2099-01-01"
                                customStyles={{
                                    datePicker: {
                                        backgroundColor: "#ffff"
                                    },
                                    dateInput: {
                                        borderBottomWidth: 1,
                                        borderBottomColor: grey,
                                        borderTopWidth: 0,
                                        borderLeftWidth: 0,
                                        borderRightWidth: 0,
                                        width: widthPercentageToDP(85),
                                    },
                                    placeholderText: {
                                        color: grey,
                                        position: "absolute",
                                        left: "2%"
                                    },
                                    dateText: {
                                        color: darkGrey,
                                        position: "absolute",
                                        left: "2%"
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
                        <Text style={styles.inputTitle}>
                            {"Suba una imagen de su ticket"}
                        </Text>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.uploadBtn}
                                disabled={this.state.imgData === undefined || this.state.imgData.length === 0 ? false : true}
                                onPress={() => this.pickDocument()}
                            >
                                {this.state.imgData === undefined || this.state.imgData.length === 0 ?
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <FastImage
                                            source={require('../../images/download.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={styles.img}
                                        />
                                        <Text style={styles.uploadText}>
                                            {"Seleccionar una o varias imagenes"}
                                        </Text>
                                    </View>
                                    : <View style={{ flex: 1 }}>
                                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                            {
                                                this.state.imgData.map((item, index) => {
                                                    return (
                                                        <ItemList
                                                            index={"unique" + index}
                                                            name={item.name}
                                                            clickHandler={() => this.removeItem(item.name)}
                                                        />
                                                    )
                                                })
                                            }

                                        </ScrollView>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <TouchableOpacity
                                style={styles.submitBtn}
                            //onPress={() => this.props.navigate}
                            >
                                <Text style={styles.submitText}>
                                    {"Guardar"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps,)(MisGastos);