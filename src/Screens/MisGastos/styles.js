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
        marginTop: heightPercentageToDP(4),
        width: widthPercentageToDP(90),
        backgroundColor: "#ffff",
        flex: 1,
    },
    inputTitle: {
        fontSize: widthPercentageToDP(4),
        fontWeight: "bold",
        color: darkGrey,
        paddingLeft: widthPercentageToDP(4),
        paddingTop: widthPercentageToDP(2),
        textAlign: "left"
    },
    datePickerStyle: {
        width: widthPercentageToDP(85)
    },
    input: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(6),
        borderBottomWidth: widthPercentageToDP(0.2),
        borderBottomColor: darkGrey,
        color: darkGrey,
        //backgroundColor:"red"
    },
    dropStyle2: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(6),
    },
    uploadBtn: {
        width:widthPercentageToDP(85),
        height: heightPercentageToDP(15), 
        borderWidth: widthPercentageToDP(0.5),
        borderStyle: 'dashed',
        borderColor: darkGrey,
        borderRadius: widthPercentageToDP(0.1),
        marginTop:heightPercentageToDP(2),
        justifyContent:"center",
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
    img:{
        width:widthPercentageToDP(7),
        height:widthPercentageToDP(7)
    },
    uploadText:{
        fontSize: widthPercentageToDP(4),
        fontWeight: "300",
        color: darkGrey,
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
    selectImages:{
        width:widthPercentageToDP(15),
        height:widthPercentageToDP(15)
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
        //marginLeft: heightPercentageToDP(5)
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
    title:{
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5),
        backgroundColor:"#ffff",
        justifyContent:"center",
        alignItems:"center",
        marginTop:heightPercentageToDP(3),
        borderBottomWidth:widthPercentageToDP(0.2),
        borderBottomColor:darkGrey
    },
    titleText:{
        fontSize:widthPercentageToDP(3.2),
        fontWeight:"500",
        color:darkBlue
    },
    middleView:{
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(57),
        backgroundColor:"#ffff"
    },
    sliderContainer:{
        width:widthPercentageToDP(100),
        height:heightPercentageToDP(40),
        //backgroundColor:"red"
    },
    bottomBox:{
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(30),
        backgroundColor:"#ffff",
        borderRadius:widthPercentageToDP(2),
        marginTop:heightPercentageToDP(3)
    },
    bottomTop:{
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(5),
        backgroundColor:"#ffff",
        justifyContent:"center",
        borderBottomWidth:widthPercentageToDP(0.2),
        borderBottomColor:darkGrey
    },
    // Dialog styles 
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:"red"
    },
    innerModal2: {
        width: "100%",
        height: "100%",
        marginBottom: widthPercentageToDP(10),
        marginLeft: widthPercentageToDP(5),
        marginRight: widthPercentageToDP(5)
    },
    quesBox: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        marginLeft: widthPercentageToDP(2),
        alignItems: "center",
        backgroundColor: lightBlue,
        borderWidth: widthPercentageToDP(0.1),
        borderColor: darkBlue,
        borderRadius:widthPercentageToDP(2)
        // justifyContent: "center",
    },
    textView: {
        //alignItems: 'flex-start',
        //marginTop: widthPercentageToDP(3),
    },
    text2: {
        color: "#000",
        fontSize: widthPercentageToDP(4.5),
        //textAlign:"center",
        width: widthPercentageToDP(78),
        paddingLeft: widthPercentageToDP(3),
        marginTop: widthPercentageToDP(7)

    },
    confirmBtn: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkBlue,
        borderRadius:widthPercentageToDP(2)
    },
    confirmStyle: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(10),
    },
    confirmText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(3.5),
        fontWeight:"300"
    },
})