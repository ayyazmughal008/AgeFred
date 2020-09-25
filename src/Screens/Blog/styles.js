import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { orangae, darkBlue, lightBlue, grey } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue
    },
    listView:{
        flex:1,
        marginTop:heightPercentageToDP(2),
        alignItems:"center",
        marginBottom:heightPercentageToDP(2)
    },
    detailView:{
        flex:1,
        //alignItems:"center"
    },
    blogImg:{
        width:widthPercentageToDP(100),
        height:heightPercentageToDP(45)
    },
    detailMainTextView:{
        marginLeft:widthPercentageToDP(10),
        marginRight:widthPercentageToDP(10),
        marginTop:heightPercentageToDP(2),
    },
    mainTitle:{
        fontSize:widthPercentageToDP(4),
        fontWeight:"400",
        color: darkBlue
    },
    titleTopDetail:{
        marginTop:heightPercentageToDP(1),
        fontSize:widthPercentageToDP(3.5),
        fontWeight:"400",
        color: darkBlue
    },
    titleDetail:{
        marginTop:heightPercentageToDP(1),
        fontSize:widthPercentageToDP(3),
        fontWeight:"400",
        color: darkBlue
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})