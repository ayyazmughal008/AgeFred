import React from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Orientation from 'react-native-orientation';
import Table from '../../Component/EpisTable3'
import { connect } from 'react-redux';
import { getEpisHistory } from '../../Redux/action'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'

class EpisHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
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
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
        }
    };
    componentDidMount() {
        Orientation.lockToLandscapeLeft()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.unlockAllOrientations()
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    render() {
        const { AuthLoading, episHistory } = this.props.user;
        return (
            <View style={styles.container} onLayout={(e) => { this._onLayout(e) }}>
                <Header
                    leftComponent={
                        <MenuImage
                            leftClick={() => this.props.navigation.goBack()}
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
                <View style={styles.tableView}>
                    <View style={styles.itemMainView}>
                        <View style={[styles.component, {
                            width: "15%",
                            //backgroundColor: "red"
                        }]}>
                            <Text style = {styles.titleText}>{"EPI"}</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "12%",
                            //backgroundColor: "yellow"
                        }]}>
                            <Text style = {styles.titleText}>F. Entrega</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "11%",
                            //backgroundColor: "green"
                        }]}>
                            <Text style = {styles.titleText}>F.Caducidad</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "10%",
                            //backgroundColor: "orange"
                        }]}>
                            <Text style = {styles.titleText}>Nº Pedido</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "8%",
                            // backgroundColor: "pink"
                        }]}>
                            <Text style = {styles.titleText}>Nº Serie</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "8%",
                            // backgroundColor: "blue"
                        }]}>
                            <Text style = {styles.titleText}>Talla</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "6%",
                            //backgroundColor: "grey"
                        }]}>
                            <Text style = {styles.titleText}>C.Medico</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "14%",
                            // backgroundColor: "#fc5000"
                        }]}>
                            <Text style = {styles.titleText}>Revisión</Text>
                        </View>
                        <View style={[styles.component, {
                            width: "16%",
                            // backgroundColor: "#fc5000"
                        }]}>
                            <Text style = {styles.titleText}>Fotografía</Text>
                        </View>
                    </View>
                    {!episHistory ?
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
                                        />
                                    )
                                })}
                            </ScrollView>
                        </View>
                    }
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
export default connect(mapStateToProps, { getEpisHistory })(EpisHistory);