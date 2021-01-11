import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue,
        alignItems: "center",
    },
    container2: {
        flex: 1,
        backgroundColor: lightBlue,
        //alignItems:"center",
    },
    menuView: {
        width: widthPercentageToDP(85),
        flexDirection: "row",
        flexWrap: "wrap",
        //alignItems:"center",
        justifyContent: "space-around",
        //alignSelf:"center",
        marginLeft: widthPercentageToDP(4.5),
        marginTop: widthPercentageToDP(5)
    },
    tableView: {
        flex: 1,
        alignItems: "center"
    },
    tableRenderingView: {
        width: heightPercentageToDP(95),
        height: widthPercentageToDP(50),
        alignItems: "center"
    },
    tableRenderingView2: {
        width: heightPercentageToDP(95),
        height: widthPercentageToDP(55)
    },
    tableRenderingView3: {
        width: heightPercentageToDP(95),
        height: widthPercentageToDP(60)
    },
    itemMainView: {
        width: heightPercentageToDP(95),
        height: widthPercentageToDP(10),
        //backgroundColor:"red",S
        flexDirection: "row",
        alignItems: "center",
        marginTop: widthPercentageToDP(3),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkBlue,
    },
    itemMainView2: {
        width: '100%',
        height: widthPercentageToDP(10),
        flexDirection: "row",
        alignItems: "center",
        marginTop: widthPercentageToDP(3),
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: darkBlue,
        //backgroundColor:"blue"
    },
    component: {
        height: widthPercentageToDP(10),
        alignItems: "center",
        justifyContent: "center"
    },
    bottomView: {
        position: "absolute",
        bottom: "2%",
    },
    bottom1: {
        position: "absolute",
        bottom: "2%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: heightPercentageToDP(2.5)
    },
    statusText: {
        fontSize: heightPercentageToDP(4),
        fontWeight: "500",
        color: darkBlue
    },
    btnText: {
        fontSize: heightPercentageToDP(2),
        fontWeight: "500",
        color: "#ffff"
    },
    confirmBtn: {
        width: heightPercentageToDP(20),
        height: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkBlue,
        borderRadius: widthPercentageToDP(2)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: widthPercentageToDP(2.5),
        color: darkBlue,
        fontWeight: "bold"
    },
    modalMain: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    crossBtn: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        borderRadius: widthPercentageToDP(10) / 2,
        backgroundColor: "#ffff",
        marginLeft: widthPercentageToDP(5),
        marginTop: widthPercentageToDP(5),
        alignItems: "center",
        justifyContent: "center"
    },
})