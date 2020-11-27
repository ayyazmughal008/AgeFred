import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Card from '../../Component/Card'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { getAllTools, getEpisData2 } from '../../Redux/action'
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
        Orientation.unlockAllOrientations()
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
                        clickHandler={() => this.props.getAllTools(login.data.employRoleId, login.data.id)}
                    />
                    <Card
                        iconName={require('../Home/assets/4.png')}
                        title="Nuevas Solicitudes"
                        clickHandler={() => this.props.getEpisData2(login.data.employRoleId, login.data.id)}
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
                        clickHandler={() => this.props.navigation.navigate('Option3')}
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
export default connect(mapStateToProps, { getAllTools, getEpisData2 })(Epis);