import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae, darkGrey } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: "center",
        backgroundColor: lightBlue
    },
    container2: {
        flex: 1,
        backgroundColor: lightBlue,
        alignItems: "center"
    },
    startBtn: {
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(85),
        alignItems: "center",
        justifyContent: "center",
        marginTop: heightPercentageToDP(5),
        flexDirection: "row"
    },
    BtnText: {
        fontSize: widthPercentageToDP(6),
        //fontFamily: "NotoSansBold",
        color: "#fff",
        marginLeft: widthPercentageToDP(1.5)
    },
    endBtn: {
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(85),
        alignItems: "center",
        justifyContent: "center",
        marginTop: heightPercentageToDP(2),
        flexDirection: "row"
    },
    historyView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(44),
        borderWidth: widthPercentageToDP(0.1),
        marginTop: heightPercentageToDP(3),
        borderColor: "#0943af"
    },
    historyTitle: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(6),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: darkBlue,
        padding: widthPercentageToDP(2)
    },
    historyTitletext: {
        fontSize: widthPercentageToDP(4),
        //fontFamily: "NotoSansBold",
        color: "#fff"
    },
    historyLabel: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(6),
        alignItems: "center",
        flexDirection: "row",
        //backgroundColor: "yellow",
        //justifyContent:"center",
        //paddingLeft: widthPercentageToDP(2),
        // paddingRight: widthPercentageToDP(1),
        borderRightWidth: widthPercentageToDP(0.1),
        borderRightColor: "#0943af",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#0943af"
    },
    textWrap: {
        height: heightPercentageToDP(6),
        width: '20%',
        justifyContent:"center",
        alignItems:"center"
    },
    historyLabelText: {
        fontSize: widthPercentageToDP(3),
        //backgroundColor: "red",
        color: darkBlue,
        alignItems: "center"
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    dateView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(4),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: heightPercentageToDP(1)
    },
    datePickerStyle: {
        width: widthPercentageToDP(85)
    },
    selectDateView: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(4),
        backgroundColor: "#ffff",
        justifyContent: "center",
        alignItems: "center",
        //marginLeft: heightPercentageToDP(5)
    },
    selectDateView2: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(4),
        backgroundColor: "#ffff",
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtn:{
        width:widthPercentageToDP(55),
        height:heightPercentageToDP(5),
        borderRadius:widthPercentageToDP(10),
        backgroundColor:orangae,
        marginTop:heightPercentageToDP(2),
        justifyContent:"center",
        alignItems:"center"
    },
    submitText:{
        fontSize: widthPercentageToDP(4),
        fontWeight: "bold",
        color: "#ffff",
    },
    title:{
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        backgroundColor:"#ffff",
        justifyContent:"center",
        //alignItems:"center",
        paddingLeft:widthPercentageToDP(2),
        marginTop:heightPercentageToDP(3),
        borderBottomWidth:widthPercentageToDP(0.2),
        borderBottomColor:darkGrey
    },
    titleText:{
        fontSize:widthPercentageToDP(3.2),
        fontWeight:"500",
        color:darkBlue
    },
})