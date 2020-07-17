import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue
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
    }
})