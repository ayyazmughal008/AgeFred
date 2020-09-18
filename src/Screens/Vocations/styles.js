import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue, lightBlue, orangae, grey, darkGrey } from '../../Component/ColorCode'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: "center",
        backgroundColor: lightBlue
    },
    container2: {
        flex: 1,
        alignItems: "center",
        backgroundColor: lightBlue
    },
    keyboardView: {
        flex: 1,
        backgroundColor: lightBlue,
        alignItems: "center",
    },
    mainView: {
        // marginTop: heightPercentageToDP(4),
        width: widthPercentageToDP(90),
        backgroundColor: "#ffff",
        //flex: 1,
    },
    datePickerStyle: {
        width: widthPercentageToDP(85)
    },
    dropStyle2: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(6),
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
    submitBtn: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(7),
        borderRadius: widthPercentageToDP(10),
        backgroundColor: orangae,
        marginTop: heightPercentageToDP(3),
        justifyContent: "center",
        alignItems: "center"
    },
    submitText: {
        fontSize: widthPercentageToDP(4),
        fontWeight: "bold",
        color: "#ffff",
    },
    dateView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(10),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        //backgroundColor:"red"
    },
    topView: {
        width: widthPercentageToDP(80),
        flex: 1,
        alignItems:"center"
        //marginTop: heightPercentageToDP(2)
    },
    selectDateView: {
        width: widthPercentageToDP(39),
        height: heightPercentageToDP(5),
        backgroundColor: "#ffff",
        justifyContent: "center",
    },
    toDate: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "bold",
        color: darkBlue,
        //backgroundColor:"red",
        marginTop:heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(0.5)
    },
    historyConatiner: {
        flex: 1,
        backgroundColor: lightBlue,
        //alignItems:"center"
    },
    bottomBtnView:{
        width:widthPercentageToDP(100),
        height:heightPercentageToDP(6),
        marginTop:heightPercentageToDP(1),
        justifyContent:"center",
        alignItems:"center"
    },
    bottomBtn:{
        width:widthPercentageToDP(45),
        height:heightPercentageToDP(5),
        borderRadius:widthPercentageToDP(10),
        backgroundColor: orangae,
        justifyContent:"center",
        alignItems:"center"
    },
    bottomBtnText:{
        fontSize:widthPercentageToDP(3),
        fontWeight:"300",
        color: "#ffff"
    },
    historyTitle: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        backgroundColor: "#ffff",
        justifyContent: "flex-start",
        marginTop: heightPercentageToDP(2),
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: widthPercentageToDP(0.4),
        borderBottomColor: grey
    },
    historyIcon: {
        width: widthPercentageToDP(5),
        height: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(3)
    },
    mainView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(25),
        //backgroundColor: "red"
    },
    historyText: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "bold",
        color: darkBlue,
        marginLeft: widthPercentageToDP(3)
    },
    historyComponent: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(5),
        backgroundColor: "#ffff",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottomWidth: widthPercentageToDP(0.4),
        borderBottomColor: grey
    },
    componet1: {
        width: widthPercentageToDP(15),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"red"
    },
    componetText: {
        fontSize: widthPercentageToDP(2.5),
        fontWeight: "400",
        color: darkBlue,
        textAlign: "center"
    },
    componet2: {
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"green"
    },
    componet3: {
        width: widthPercentageToDP(10),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"yellow"
    },
    componet4: {
        width: widthPercentageToDP(10),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"orange"
    },
    componet5: {
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"grey"
    },
    componet6: {
        width: widthPercentageToDP(12),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"pink"
    },
    componet7: {
        width: widthPercentageToDP(8.5),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"purple"
    },
    checkBox:{
        width:widthPercentageToDP(5),
        height:widthPercentageToDP(5),
        borderWidth:widthPercentageToDP(0.3),
        borderColor: grey,
        justifyContent:"center",
        alignContent:"center",
        marginTop:heightPercentageToDP(2),
        marginLeft:widthPercentageToDP(4)
    },
    tick2:{
        width: widthPercentageToDP(3.5),
        height: widthPercentageToDP(3.5)
    },
    bottomBtnView:{
        width:widthPercentageToDP(100),
        height:heightPercentageToDP(6),
        marginTop:heightPercentageToDP(1),
        justifyContent:"center",
        alignItems:"center"
    },
    bottomBtn:{
        width:widthPercentageToDP(45),
        height:heightPercentageToDP(5),
        borderRadius:widthPercentageToDP(10),
        backgroundColor: orangae,
        justifyContent:"center",
        alignItems:"center"
    },
    bottomBtnText:{
        fontSize:widthPercentageToDP(3),
        fontWeight:"300",
        color: "#ffff"
    },
    lastView:{
        width:widthPercentageToDP(100),
        alignItems:"center",
        marginTop:heightPercentageToDP(1)
    },
    bottomHourView:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(4),
        backgroundColor: "#ffff",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:widthPercentageToDP(1),
        paddingRight:widthPercentageToDP(1),
        marginBottom:heightPercentageToDP(1)
    },
    hoursTitle:{
        fontSize:widthPercentageToDP(3),
        fontWeight: "300",
        color: darkBlue,
        textAlign:"center"
    },
    conceptos:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(25),
        //marginTop:heightPercentageToDP(1)
    },
    conceptosTitle:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(5),
        backgroundColor:"#ffff",
        marginTop:heightPercentageToDP(2),
        //marginBottom:heightPercentageToDP(1),
        justifyContent:"center"
    },
    conceptosText:{
        fontSize:widthPercentageToDP(3.3),
        fontWeight: "500",
        color:darkBlue,
        paddingLeft:widthPercentageToDP(4)
    },
    typeOfHoursView:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(15),
        backgroundColor:"#ffff",
        marginTop:heightPercentageToDP(1)
    },
    myText:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(3),
        backgroundColor:"#ffff",
        //marginTop:heightPercentageToDP(1),
        justifyContent:"center" ,
        borderBottomWidth:widthPercentageToDP(0.2),
        borderBottomColor: darkGrey
    }

})