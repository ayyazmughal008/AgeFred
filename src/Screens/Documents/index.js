import React from 'react'
import { View, ScrollView, PermissionsAndroid, Alert, ActivityIndicator, Platform, Modal, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import { getDocuments, postDownloadStatus } from '../../Redux/action'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { styles } from './styles';
import RNFetchBlob from 'rn-fetch-blob'
import { darkBlue } from '../../Component/ColorCode'
import PDFDownload from '../../Component/Downloads'
import { data } from './data'
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import RNUrlPreview from 'react-native-url-preview';
import WebView from 'react-native-webview'
import Dialog from '../MisGastos/Dialog'

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdate: false,
            isDialogOpen: false,
            name: "",
            path: ""
        };
        this.props.getDocuments()
    }

    // ios main download status ka kam krna hai...!

    toggleModal = () => {
        this.setState({ isDialogOpen: !this.state.isDialogOpen })
    }
    iosDownload(fileUrl) {
        this.setState({ isUpdate: true })
        var date = new Date();
        var url = fileUrl;
        var encoded = encodeURI(url)
        var ext = this.extention(encoded);
        ext = "." + ext[0];
        const localFile = RNFS.DocumentDirectoryPath + "/Agefred_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext;

        const options = {
            fromUrl: encoded,
            toFile: localFile
        };
        RNFS.downloadFile(options).promise
            .then(() => FileViewer.open(localFile, { showOpenWithDialog: true }))
            .then(susscess => {
                console.log("Download Successfull => ", susscess)
                this.setState({ isUpdate: false })
            })
            .catch(error => {
                this.setState({ isUpdate: false })
                console.log(error)
            });
    }
    download(fileUrl, id) {
        const { login } = this.props.user;
        this.setState({ isUpdate: true })
        var date = new Date();
        var url = fileUrl;
        var ext = this.extention(url);
        ext = "." + ext[0];
        const { config, fs } = RNFetchBlob
        let DownloadDir = fs.dirs.DownloadDir
        //this.setState({ isOpen: true })
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: DownloadDir + "/Agefred_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Agefred'
            }
        }
        config(options).fetch('GET', url).then((res) => {
            //console.log("my download response ==>", res)
            this.setState({ isUpdate: false })
            this.props.postDownloadStatus(login.data.id, id)
            //this.setState({ isOpen: false })
            // this.props.dispatchText();
            // this.props.dispatchFuncOn();
        });
    }
    extention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }
    requestPermission = async (url, id) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Agefred',
                    message:
                        'Agefred App needs access to your Storage ' +
                        'so you can download and save any files.',
                    //buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.download(url, id)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const { getDocuments, AuthLoading } = this.props.user
        console.log(this.state.isUpdate)
        return (
            <View style={styles.container}>
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
                            title="DOCUMENTOS"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.listView}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {!getDocuments ?
                            <View />
                            : getDocuments.ios.map((item, index) => {
                                return (
                                    <PDFDownload
                                        key={"unique" + index}
                                        title={item.name}
                                        name={item.fileTypeName}
                                        date={item.date}
                                        clickHandler={() => Platform.OS === "ios" ?
                                            this.iosDownload(item.path, item.id)
                                            : this.requestPermission(item.path, item.id)
                                        }
                                        previewHandler={() =>
                                            // this.setState({
                                            //     name: item.name,
                                            //     path: item.path
                                            // }, () => this.toggleModal())
                                            this.iosDownload(item.path)
                                        }
                                    />
                                )
                            })}
                    </ScrollView>
                </View>
                {this.state.isUpdate &&
                    <ActivityIndicator
                        size="large"
                        color="#000"
                        style={styles.loading}
                    //animating = {true}
                    />
                }
                {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color="#000"
                        style={styles.loading}
                    />
                }
                {/* {this.state.isDialogOpen &&
                    <Modal
                        transparent={true}
                        visible={this.state.isDialogOpen}
                        onRequestClose={() => {
                            console.log('alert close')
                        }}
                    >
                        <View style={this.modalMain2}>
                            <TouchableWithoutFeedback onPress={() => this.toggleModal()}>
                                <View style={styles.innerModal2}>

                                    <View style={styles.quesBox}>
                                        <WebView
                                            source={{ uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=` + this.state.path }}
                                        />

                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
                } */}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps, { getDocuments, postDownloadStatus })(Documents);