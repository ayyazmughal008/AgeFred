import React from 'react'
import { View, Text, ActivityIndicator, ScrollView, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity, SafeAreaView } from 'react-native'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue, lightBlue } from '../../Component/ColorCode'
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
//import Table from '../../Component/EpisTable3'
import { connect } from 'react-redux';
import { getEpisHistory } from '../../Redux/action'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import Icon from 'react-native-vector-icons/AntDesign';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image'
import { Table, Row, Rows } from 'react-native-table-component';

class EpisHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            isOpen: false,
            currentImage: "",
            tableHead: ['Epi', 'Fecha de entrega', 'Fecha de caducidad', 'Nº Serie', 'Talla', 'Comentario'],
            tableData:
                [["Tool 1", "2023-02-02", "2025-03-03", "5", "10", undefined]],

            myArray: []
        };

        this.fetchHistory();
    }
    fetchHistory = () => {
        const { login } = this.props.user;
        this.props.getEpisHistory(login.data.id)
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
    updateImage = (img) => {
        this.setState({
            currentImage: img,
            isOpen: true
        })
    }
    updateArray = () => {
        const { episHistory } = this.props.user
        let temArr = [];
        episHistory.data.forEach(item => {
            temArr.push([
                item.tool,
                item.delivery,
                item.expiration,
                item.serialNo,
                item.size,
                item.comment
            ])
        })
        this.setState({ myArray: temArr }, () => {
            console.log("test array =>>", this.state.myArray)
        })
    }
    render() {
        const { AuthLoading, episHistory, getEpisApeal } = this.props.user;
        const { myArray, tableData } = this.state
        return (
            <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                >
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
                                title="HISTÓRICO DE ENTREGADOS"
                            />
                        }
                        containerStyle={{
                            backgroundColor: darkBlue,
                        }}
                    />
                    <View style={styles.tableView2}>

                        <Table borderStyle={{ borderWidth: 1, borderColor: lightBlue }}>
                            <Row
                                data={this.state.tableHead}
                                style={styles.head}
                                textStyle={[styles.text, {
                                    fontSize: heightPercentageToDP(3),
                                    fontWeight: "bold",
                                    color: darkBlue
                                }]}
                                flexArr={[1, 2, 1, 1, 1, 2]}
                            />
                        </Table>
                        {!myArray || !myArray.length ?
                            <View />
                            : <Table
                                borderStyle={{
                                    borderWidth: widthPercentageToDP(0.1),
                                    borderColor: "#cccccc"
                                }}>
                                <Rows
                                    data={myArray}
                                    style={[styles.head, {
                                        backgroundColor: "#F8F8F8"
                                    }]}
                                    textStyle={[styles.text, {
                                        fontSize: heightPercentageToDP(3),
                                        fontWeight: "300",
                                        color: darkBlue
                                    }]}
                                    flexArr={[1, 2, 1, 1, 1, 2]}
                                />
                            </Table>

                        }
                        {/* <View style={styles.itemMainView}>
                        <View style={[styles.component, {
                            width: "20%",
                            //backgroundColor: "red"
                        }]}>
                            <Text style={styles.titleText}>{"EPI"}</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "12%",
                            //backgroundColor: "yellow"
                        }]}>
                            <Text style={styles.titleText}>F. Entrega</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "11%",
                            //backgroundColor: "green"
                        }]}>
                            <Text style={styles.titleText}>F.Caducidad</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "10%",
                            //backgroundColor: "orange"
                        }]}>
                            <Text style={styles.titleText}>Nº Pedido</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "8%",
                            // backgroundColor: "pink"
                        }]}>
                            <Text style={styles.titleText}>Nº Serie</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "8%",
                            // backgroundColor: "blue"
                        }]}>
                            <Text style={styles.titleText}>Talla</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "6%",
                            //backgroundColor: "grey"
                        }]}>
                            <Text style={styles.titleText}>C.Medico</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "14%",
                            // backgroundColor: "#fc5000"
                        }]}>
                            <Text style={styles.titleText}>Revisión</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "16%",
                            // backgroundColor: "#fc5000"
                        }]}>
                            <Text style={styles.titleText}>Fotografía</Text>
                        </View>
                    </View> */}
                        {/* {!episHistory ?
                        <View />
                        : <View style={styles.tableRenderingView3}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {episHistory.data.map((item, index) => {
                                    return (
                                        <Table
                                            key={"unique" + index}
                                            bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                            tool={item.tool}
                                            delivery={item.delivery}
                                            expiration={item.expiration}
                                            orderNo={item.orderNo}
                                            serialNo={item.serialNo}
                                            size={item.size}
                                            medical={item.medical}
                                            revision={item.revision}
                                            imgPred={() => this.updateImage(item.image)}
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    } */}

                    </View>
                    {AuthLoading &&
                        <ActivityIndicator
                            style={styles.loading}
                            size="large"
                            color="#000"
                        />
                    }
                    {this.state.isOpen &&
                        <Modal
                            transparent={true}
                            visible={this.state.isOpen}
                            animationType="slide"
                            supportedOrientations={['portrait', 'landscape']}
                            onRequestClose={() => {
                                console.log('alert close')
                            }}
                        >
                            <TouchableOpacity
                                style={styles.modalMain}
                                activeOpacity={1}
                            //onPressOut={() => this.setState({ isOpen: false })}
                            >
                                <View style={styles.innerModal}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            <TouchableOpacity
                                                style={styles.crossBtn}
                                                onPress={() => this.setState({ isOpen: false })}
                                            >
                                                <Icon
                                                    name="close"
                                                    color={darkBlue}
                                                    size={25}
                                                />
                                            </TouchableOpacity>
                                            <ImageZoom
                                                cropWidth={Dimensions.get('window').width - 50}
                                                cropHeight={Dimensions.get('window').height - 50}
                                                imageWidth={Dimensions.get('window').width - 50}
                                                imageHeight={Dimensions.get('window').height - 50}>
                                                <FastImage
                                                    style={{
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                    source={{
                                                        uri: this.state.currentImage,
                                                        priority: FastImage.priority.normal
                                                    }}
                                                    resizeMode={FastImage.resizeMode.contain}

                                                />
                                            </ImageZoom>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    }
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getEpisHistory })(EpisHistory);