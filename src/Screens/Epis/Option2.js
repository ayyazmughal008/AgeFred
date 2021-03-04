import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
import Table from '../../Component/EpisTable2'
import { connect } from 'react-redux';
import { submitEpisData2 } from '../../Redux/action'

class Epis2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            testArray: []
        };
    }
    _onLayout = (e) => {
        console.log(e.nativeEvent.layout.height)
        let width = e.nativeEvent.layout.width
        let height = e.nativeEvent.layout.height
        this.setState({
            height: height,
            width: width
        })
    }
    UNSAFE_componentWillMount() {
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            Orientation.lockToLandscapeLeft()
            console.log("land")
            //do stuff
        } else {
            console.log("portrate")
        }
    }
    test = () => {
        Orientation.unlockAllOrientations()
        Orientation.lockToPortrait();
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
        }
    };
    componentDidMount() {
        this.updateArray();
        Orientation.lockToLandscapeLeft()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    updateArray = () => {
        const { episData2 } = this.props.user;
        let tempArr = [];
        tempArr = episData2.data
        this.setState({ testArray: tempArr })
    }
    updateMotivo = (index, value) => {
        const { episData2 } = this.props.user;
        const newArray = [...episData2.data];
        newArray[index].motivoValue = value
        this.setState({ testArray: newArray })
    }
    updateTala = (index, value) => {
        const { episData2 } = this.props.user;
        const newArray = [...episData2.data];
        newArray[index].tala = value
        this.setState({ testArray: newArray })
    }
    render() {
        const { login, AuthLoading } = this.props.user;
        const { testArray } = this.state
        return (
            <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => {
                                this.test();
                                this.props.navigation.goBack()
                            }}
                            rightIcon="chevron-thin-left"
                        />
                    }
                    centerComponent={
                        <HeaderImage
                            isText={true}
                            title="Nuevas Solicitudes"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.tableView}>
                    <View style={styles.itemMainView2}>
                        <View style={[styles.component, { width: "17%" }]}>
                            {/* <Text>Sample 1</Text> */}
                        </View>
                        <View style={[styles.component, { width: "10%" }]}>
                            <Text>Talla</Text>
                        </View>
                        <View style={[styles.component, { width: "16%" }]}>
                            <Text>Motivo V</Text>
                        </View>
                        <View style={[styles.component, { width: "48%" }]}>
                            <Text>Status</Text>
                        </View>
                    </View>
                    {!testArray.length ?
                        <View />
                        : <View style={styles.tableRenderingView2}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {testArray.map((item, index) => {
                                    return (
                                        <Table
                                            key={"unique" + index}
                                            bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                            tool={item.tool}
                                            dropdownHandler={item.motivi_v}
                                            dropDownValue={item.motivoValue}
                                            onChangeDropDown={text => this.updateMotivo(index, text)}
                                            onchangeTalaText={text => this.updateTala(index, text)}
                                            textValue={!item.tala ? "" : item.tala}
                                            isEditAbl={item.editAble}
                                            status={!item.status.accept_status ? "" : item.status.accept_status}
                                            reason={!item.status.reason ? "" : item.status.reason}
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    }
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={() =>
                                {
                                    this.test();
                                    this.props.submitEpisData2(login.data.id, testArray)
                                }
                                //console.log(testArray)
                            }
                        >
                            <Text style={styles.btnText}>
                                {"Submit"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {AuthLoading &&
                    <ActivityIndicator
                        style={styles.loading}
                        size="large"
                        color="#000"
                    />
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { submitEpisData2 })(Epis2);