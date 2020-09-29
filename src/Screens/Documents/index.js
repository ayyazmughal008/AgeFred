import React from 'react'
import { View, ScrollView, PermissionsAndroid, Alert, ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import { getDocuments } from '../../Redux/action'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import { styles } from './styles';
import RNFetchBlob from 'rn-fetch-blob'
import { darkBlue } from '../../Component/ColorCode'
import PDFDownload from '../../Component/Downloads'
import { data } from './data'
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDwonloading: false
        };
        this.props.getDocuments()
    }

    iosDownload(fileUrl) {
        this.setState({ isDwonloading: true })
        var date = new Date();
        var url = fileUrl;
        var encoded = encodeURI(url)
        var ext = this.extention(url);
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
                this.setState({ isDwonloading: false })
            })
            .catch(error => {
                this.setState({ isDwonloading: false })
                Alert.alert("Error", error)
                console.log(error)
            });
    }
    download(fileUrl) {
        this.setState({ isDwonloading: true })
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
            this.setState({ isDwonloading: false })
            this.iosDownload(fileUrl)
            //this.setState({ isOpen: false })
            // this.props.dispatchText();
            // this.props.dispatchFuncOn();
        });
    }
    extention(filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }
    requestPermission = async (url) => {
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
                this.download(url)
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        const { getDocuments } = this.props.user
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
                                        clickHandler={() => Platform.OS === "ios" ?
                                            this.iosDownload(item.path)
                                            : this.requestPermission(item.path)
                                        }
                                    />
                                )
                            })}
                    </ScrollView>
                </View>
                {this.props.isDwonloading &&
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
export default connect(mapStateToProps, { getDocuments })(Documents);