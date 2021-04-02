import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Card from '../../Component/Card'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
import { connect } from 'react-redux';
import { getAllTools, getEpisData2, getEpisHistory } from '../../Redux/action'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

class Epis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
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
    test = () => {
        Orientation.unlockAllOrientations()
        Orientation.lockToPortrait()
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }
    UNSAFE_componentWillMount() {
        //The getOrientation method is async. It happens sometimes that
        //you need the orientation at the moment the js starts running on device.
        //getInitialOrientation returns directly because its a constant set at the
        //beginning of the js code.
        var initial = Orientation.getInitialOrientation();
        if (initial === 'LANDSCAPE') {
            Orientation.lockToPortrait()
            console.log("hii")
            //do stuff
        } else {
            console.log("hii 2")
        }
    }
    _onOrientationDidChange = (orientation) => {
        if (orientation == 'LANDSCAPE') {
            Orientation.lockToPortrait();
        }
    };
    componentDidMount() {
        Orientation.lockToPortrait()
        Orientation.addOrientationListener(this._onOrientationDidChange);
    }
    componentWillUnmount() {
        Orientation.removeOrientationListener(this._onOrientationDidChange);
    }

    render() {
        const { login, AuthLoading } = this.props.user;
        console.log(login.data.employRoleId)
        return (
            <View style={styles.container2} onLayout={(e) => { this._onLayout(e) }}>
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
                            title="EPIS"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.menuView}>
                    <Card
                        iconName={require('../Home/assets/4.png')}
                        title="Estado / Control EPI’s"
                        clickHandler={() => {
                            this.test();
                            this.props.getAllTools(login.data.employRoleId, login.data.id)
                        }}
                    />
                    <Card
                        iconName={require('../Home/assets/4.png')}
                        title="Nuevas Solicitudes"
                        clickHandler={() => {
                            this.test();
                            //this.props.getEpisData2(login.data.employRoleId, login.data.id)
                            this.props.navigation.navigate('Option2')
                        }}
                    />

                </View>
                <View style={{
                    width: widthPercentageToDP(85),
                    marginLeft: widthPercentageToDP(6),
                    marginTop: widthPercentageToDP(5)
                }}>
                    <Card
                        iconName={require('../Home/assets/4.png')}
                        title="Histórico de entregados"
                        clickHandler={() => {
                            this.test()
                            this.props.getEpisHistory(login.data.id)
                            //this.props.navigation.navigate('Option3')
                        }}
                    />
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
export default connect(mapStateToProps, { getAllTools, getEpisData2, getEpisHistory })(Epis);