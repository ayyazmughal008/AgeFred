import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae } from '../../Component/ColorCode'

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
    mainContainer: {
        flex:5,
        alignItems:"center"
    },
    profileContainer:{
        width:widthPercentageToDP(100),
        alignItems:"center",
        height:heightPercentageToDP(22),
        marginTop:heightPercentageToDP(2),
        //backgroundColor:"green"
    },
    profileImg:{
        width:widthPercentageToDP(30),
        height:widthPercentageToDP(30),
        borderRadius: widthPercentageToDP(30) / 2,
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
    profileBox: {
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(30),
        backgroundColor:"#ffff",
        borderRadius: widthPercentageToDP(1),
        marginTop:heightPercentageToDP(2),
        alignItems:"center",
    },
    profileTextView:{
        width:widthPercentageToDP(85),
        height:heightPercentageToDP(6),
        borderBottomWidth: widthPercentageToDP(0.3),
        borderBottomColor: darkBlue,
        flexDirection:"row",
        flexWrap : "wrap",
        alignItems:"center",
        //backgroundColor : "red"
    },
    profileTextViewLast:{
        width:widthPercentageToDP(85),
        height:heightPercentageToDP(6),
        flexDirection:"row",
        flexWrap : "wrap",
        alignItems:"center",
    },
    boldText:{
        fontSize: widthPercentageToDP(3.5),
        marginTop:heightPercentageToDP(3.5),
        fontWeight:"bold",
        color: darkBlue
    },
    noBoldText:{
        fontSize: widthPercentageToDP(3),
        fontWeight:"300",
        color: darkBlue
    },
    bottomView:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(12),
        backgroundColor:"#ffff",
        borderRadius: widthPercentageToDP(1),
        marginTop:heightPercentageToDP(2),
        alignItems:"center",
    },
    eyeBtn:{
        position:"absolute",
        right:"3%"
    },
    tick:{
        width:widthPercentageToDP(3),
        height:widthPercentageToDP(3),
        marginLeft:widthPercentageToDP(2),
        marginBottom:heightPercentageToDP(1)
    }
})