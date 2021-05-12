import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux';
import { Header } from 'react-native-elements'
import HeaderImage from '../../Component/Header'
import MenuImage from '../../Component/MenuImage'
import FastImage from 'react-native-fast-image'
import { styles } from './styles';
import { darkBlue } from '../../Component/ColorCode'
import { data } from './data'
import HTML from 'react-native-render-html';
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const img = this.props.navigation.getParam('img', 'hdkhk');
        const title = this.props.navigation.getParam('title', 'hdkhk');
        const description = this.props.navigation.getParam('description', 'hdkhk');
        const htmlContent = `<img src="data:image/png;base64,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" />`
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
                            title="VISTA DEL POST"
                        />
                    }
                    containerStyle={{
                        backgroundColor: darkBlue,
                    }}
                />
                <View style={styles.detailView}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                        <FastImage
                            source={{ uri: img }}
                            style={styles.blogImg}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <View style={styles.detailMainTextView}>
                            <Text style={{
                                fontSize: widthPercentageToDP(4),
                                fontWeight: "bold",
                                color: "#000",
                                marginBottom:heightPercentageToDP(2)
                            }}>
                                {title}
                            </Text>
                            {/* <HTML
                                html={title}
                                tagsStyles={{
                                    p: {
                                        fontSize: widthPercentageToDP(4),
                                        fontWeight: "bold"
                                    }
                                }}
                            /> */}
                            <HTML
                                html={description}
                                tagsStyles={{
                                    p: {
                                        fontSize: widthPercentageToDP(2),
                                    }
                                }}
                                imagesMaxWidth={widthPercentageToDP(100)}
                            />
                            {/* <Text style={styles.mainTitle}>
                                {"This is a main title"}
                            </Text>
                            <Text style = {styles.titleTopDetail}>
                                {"Timeam prodesset qui ei, lucilius definiebas dissentiet ad pri, quas argumentum at eam."}
                            </Text>
                            <Text style={styles.titleDetail}>
                                {"Lorem ipsum dolor sit amet, vis probo iuvaret te. Ne mei oporteat lucilius. Mea brute interpretaris ad. Ad volutpat consulatu vis, ei sonet aperiri scriptorem nec, eu mei alia minim iusto. Duo id ullum vitae, ne cum option efficiendi. No eum quod cetero omittam." + "\n" +

                                    "Audire feugiat convenire ad mea. Sea congue latine ut, copiosae inimicus pro at, an ius inermis quaestio scribentur. An quodsi cotidieque mea, eam no dicta iusto equidem. Nemore referrentur et has, dicam affert sanctus vel ut, veritus antiopam principes eu his. Eu eum veniam persecuti. Brute novum est no, aliquid liberavisse sit eu, iusto alienum consulatu vel cu." + "\n" +

                                    "At debet partiendo ius, solet mucius melius pri an. Eos at essent scaevola accusamus. Ea ius aperiam sensibus. Cum iudicabit temporibus dissentiunt te. Ei recusabo mnesarchum cum, putant eligendi suscipit sit at, iisque nostrum vim eu. No eum fabulas detracto eloquentiam, ei atqui constituto eam. At debet partiendo ius, solet mucius melius pri an. Eos at essent scaevola accusamus. Ea ius aperiam sensibus. Cum iudicabit temporibus dissentiunt te. Ei recusabo mnesarchum cum, putant eligendi suscipit sit at, iisque nostrum vim eu. No eum fabulas detracto eloquentiam, ei atqui constituto eam. "}
                            </Text> */}

                        </View>
                        <View style={{ height: 20 }} />
                    </ScrollView>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(DetailPage);