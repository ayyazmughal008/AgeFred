import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { darkBlue, lightBlue, orangae, grey, darkGrey } from '../../Component/ColorCode'
export const styles = StyleSheet.create({
    container: {
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
        height: heightPercentageToDP(5),
        borderBottomWidth: widthPercentageToDP(0.2),
        borderBottomColor: darkGrey,
        color: darkGrey
    },
    dropStyle2: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(6),
        //marginTop: heightPercentageToDP(2),
        //backgroundColor:"#ffff"
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
        alignItems:"center"
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
    }
})