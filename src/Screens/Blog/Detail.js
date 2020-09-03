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
import {heightPercentageToDP,widthPercentageToDP} from '../../Component/MakeMeResponsive'

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
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                        <View style={styles.detailMainTextView}>
                            <HTML
                                html={title}
                                tagsStyles={{
                                    p: {
                                        fontSize: widthPercentageToDP(4),
                                    }
                                }}
                            />
                            <HTML
                                html={description}
                                tagsStyles={{
                                    p: {
                                        fontSize: widthPercentageToDP(2),
                                    }
                                }}
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