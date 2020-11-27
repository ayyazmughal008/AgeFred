import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae , darkGrey } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue
    },
    container2: {
        flex: 1,
        backgroundColor: lightBlue,
        alignItems:"center"
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
    topView:{
        width:widthPercentageToDP(100),
        height:heightPercentageToDP(5),
        justifyContent:"center",
        alignItems:"center",
        marginTop:heightPercentageToDP(1.5)
        //backgroundColor:"red"
    },
    topTitle:{
        fontSize:widthPercentageToDP(4),
        color: darkBlue,
        fontWeight: "bold"
    },
    bottomTitle:{
        fontSize:widthPercentageToDP(3),
        color: darkBlue,
        fontWeight: "bold"
    },
    middleView:{
        width:widthPercentageToDP(95),
        marginTop:heightPercentageToDP(3),
        alignItems:"center"
    },
    menuView:{
        width:widthPercentageToDP(85),
        flexDirection:"row",
        flexWrap:"wrap",
        //alignItems:"center",
        justifyContent:"space-around",
        alignSelf:"center",
        marginLeft:widthPercentageToDP(4.5),
        marginTop:widthPercentageToDP(5)
    },
    menuView2:{
        width:widthPercentageToDP(85),
        //alignItems:"center",
        justifyContent:"space-around",
        alignSelf:"center",
        marginLeft:widthPercentageToDP(7),
        marginTop:widthPercentageToDP(5)
    },
    mainView:{
        marginTop:heightPercentageToDP(2),
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(67),
        //backgroundColor:"#ffff"
    },
    checkBox:{
        width:widthPercentageToDP(6),
        height:widthPercentageToDP(6),
        borderWidth:widthPercentageToDP(0.3),
        borderRadius: widthPercentageToDP(2),
        borderColor: darkGrey,
        justifyContent:"center",
        alignContent:"center",
        position:"absolute",
        bottom:"10%",
        left:"4%"
    },
    tick2:{
        width:widthPercentageToDP(3.5),
        height:widthPercentageToDP(3.5),
        marginLeft:widthPercentageToDP(1),
    },
    submitBtn: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(5.5),
        marginTop:heightPercentageToDP(2),
        backgroundColor: orangae,
        borderRadius: widthPercentageToDP(10),
        justifyContent: "center",
        alignItems: "center",
        position:"absolute",
        bottom:"2%"
    },
    btntext: {
        fontSize: widthPercentageToDP(3),
        fontWeight: "bold",
        color: "#ffff",
    },
})