import { StyleSheet, Platform } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae, grey, darkGrey } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue,
        //alignItems:"center"
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
    appConatiner: {
        flex: 1,
        backgroundColor: lightBlue,
        alignItems: "center"
    },
    historyConatiner: {
        flex: 1,
        backgroundColor: lightBlue,
        //alignItems:"center"
    },
    block: {
        position: "absolute",
        width: "90%",
        height: "7%",
        top: "1%",
        backgroundColor: "#ffff",
        borderRadius: widthPercentageToDP(2),
        marginTop: heightPercentageToDP(2),
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        //zIndex: 5
        //justifyContent:"center"
    },
    title: {
        fontSize: widthPercentageToDP(3.5),
        fontWeight: "300",
        color: darkBlue,
        marginLeft: widthPercentageToDP(2),
        textAlign: "center"
    },
    datePickerStyle: {
        //borderRadius:widthPercentageToDP(0)
    },
    dropStyle: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(6),
        marginTop: heightPercentageToDP(12),
        //zIndex : 4
        //backgroundColor:"#ffff"
    },
    dropStyle2: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(6),
        marginTop: heightPercentageToDP(3),
        //backgroundColor:"#ffff"
    },
    dropStyle3: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(3),
        //marginTop: heightPercentageToDP(1),
        //backgroundColor:"#ffff"
    },
    bottomView: {
        width: widthPercentageToDP(90),
        height: Platform.OS === 'ios' ?
            heightPercentageToDP(25)
            : heightPercentageToDP(23),
        marginTop: heightPercentageToDP(3),
        //backgroundColor:"red"
    },
    pluseTitle: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "bold",
        color: "#000",
    },
    itemView: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: heightPercentageToDP(1),
        alignItems: "center"
    },
    box: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        borderWidth: widthPercentageToDP(0.5),
        borderColor: grey,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: widthPercentageToDP(1)
    },
    boxTitle: {
        fontSize: widthPercentageToDP(2.5),
        fontWeight: "300",
        color: "#000",
        marginLeft: widthPercentageToDP(3)
    },
    tick: {
        width: widthPercentageToDP(2),
        height: widthPercentageToDP(2)
    },
    line: {
        width: widthPercentageToDP(35),
        height: widthPercentageToDP(0.1),
        backgroundColor: "#000",
        marginTop: heightPercentageToDP(3),
        marginBottom: heightPercentageToDP(1)
    },
    submitBtn: {
        width: widthPercentageToDP(45),
        height: heightPercentageToDP(5),
        marginTop:heightPercentageToDP(2),
        backgroundColor: orangae,
        borderRadius: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center"
    },
    btntext: {
        fontSize: widthPercentageToDP(2.5),
        fontWeight: "bold",
        color: "#ffff",
    },
    inpuView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(6),
        marginTop: heightPercentageToDP(3),
        backgroundColor: "#ffff"
    },
    input: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(6),
        textAlign: "center",
        color: darkBlue
    },
    dateView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(4),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: heightPercentageToDP(1)
    },
    selectDateView: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(4),
        backgroundColor: "#ffff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: heightPercentageToDP(5)
    },
    selectDateView2: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(4),
        backgroundColor: "#ffff",
        justifyContent: "center",
        alignItems: "center"
    },
    toDate: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "bold",
        color: darkBlue,
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
        width: widthPercentageToDP(23),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"green"
    },
    componet3: {
        width: widthPercentageToDP(15),
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
        width: widthPercentageToDP(11),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"grey"
    },
    componet6: {
        width: widthPercentageToDP(25.5),
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
        paddingRight:widthPercentageToDP(1)
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