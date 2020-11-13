import React from 'react'
import { View, Text, PermissionsAndroid, ScrollView } from 'react-native'
import { styles } from './styles'
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { darkBlue } from '../../Component/ColorCode'
import Orientation from 'react-native-orientation';
import Table from '../../Component/EpisTable2'

export default class Epis extends React.Component {
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
                            title="Nuevas Solicitudes"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.tableView}>
                    <View style={styles.itemMainView}>
                        <View style={[styles.component, { width: "15%" }]}>
                            {/* <Text>Sample 1</Text> */}
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Buen estado</Text>
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Mal Estado</Text>
                        </View>
                        <View style={[styles.component, { width: "13%" }]}>
                            <Text>Caducidad</Text>
                        </View>
                        <View style={[styles.component, { width: "10%" }]}>
                            <Text>Solicito</Text>
                        </View>
                        <View style={[styles.component, { width: "15%" }]}>
                            <Text>Motivo V</Text>
                        </View>
                        <View style={[styles.component, { width: "18%" }]}>
                            <Text>Foto</Text>
                        </View>
                    </View>
                    <View style={styles.tableRenderingView2}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            {[0, 1, 2, 3,4,5,6,7,8].map((item, index) => {
                                return (
                                    <Table
                                        key={"unique" + index}
                                        bgColor={index % 2 ? "#cccccc" : "#ffff"}
                                        //data={data}
                                        //imagePicker={() => this.toggleDiloge()}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style = {styles.bottomView}>
                            <Text style = {styles.statusText}>{"Status: Accepted"}</Text>
                    </View>
                </View>
            </View>
        )
    }
}