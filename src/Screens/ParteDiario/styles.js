import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae, grey } from '../../Component/ColorCode'

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
    appConatiner:{
        flex: 1,
        backgroundColor: lightBlue,
        alignItems:"center"
    },
    historyConatiner:{
        flex: 1,
        backgroundColor: orangae,
    },
    block:{
        position:"absolute",
        width: "90%",
        height:"7%",
        top:"1%",
        backgroundColor:"#ffff",
        borderRadius:widthPercentageToDP(2),
        marginTop:heightPercentageToDP(2),
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        //zIndex: 5
        //justifyContent:"center"
    },
    title:{
        fontSize:widthPercentageToDP(3.5),
        fontWeight: "300",
        color: darkBlue,
        marginLeft:widthPercentageToDP(2),
        textAlign:"center"
    },
    datePickerStyle:{
        //borderRadius:widthPercentageToDP(0)
    },
    dropStyle:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(6),
        marginTop:heightPercentageToDP(12),
        //zIndex : 4
        //backgroundColor:"#ffff"
    },
    dropStyle2:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(6),
        marginTop:heightPercentageToDP(3),
        //backgroundColor:"#ffff"
    },
    bottomView:{
        width: widthPercentageToDP(90),
        height:heightPercentageToDP(23),
        marginTop:heightPercentageToDP(3),
        //backgroundColor:"red"
    },
    pluseTitle:{
        fontSize:widthPercentageToDP(3),
        fontWeight: "bold",
        color: "#000",
    },
    itemView:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginTop:heightPercentageToDP(1),
        alignItems:"center"
    },
    box:{
        width:widthPercentageToDP(4),
        height:widthPercentageToDP(4),
        borderWidth:widthPercentageToDP(0.5),
        borderColor: grey,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius:widthPercentageToDP(1)
    },
    boxTitle:{
        fontSize:widthPercentageToDP(2.5),
        fontWeight: "300",
        color: "#000",
        marginLeft: widthPercentageToDP(3)
    },
    tick:{
        width:widthPercentageToDP(2),
        height: widthPercentageToDP(2)
    },
    line:{
        width:widthPercentageToDP(35),
        height: widthPercentageToDP(0.1),
        backgroundColor: "#000",
        marginTop: heightPercentageToDP(3),
        marginBottom: heightPercentageToDP(1)
    },
    submitBtn:{
        width:widthPercentageToDP(45),
        height:heightPercentageToDP(5),
        backgroundColor: orangae,
        borderRadius: widthPercentageToDP(10),
        justifyContent:"center",
        alignItems:"center"
    },
    btntext:{
        fontSize:widthPercentageToDP(2.5),
        fontWeight: "bold",
        color: "#ffff",
    },
    inpuView:{
        width:widthPercentageToDP(90),
        height:heightPercentageToDP(6),
        marginTop:heightPercentageToDP(3),
        backgroundColor: "#ffff"
    },
})