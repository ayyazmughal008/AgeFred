import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { lightBlue, darkBlue, orangae } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        //alignItems: "center",
        backgroundColor: lightBlue
    },
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    mainView: {
        width: widthPercentageToDP(80),
        justifyContent: "center",
        alignContent: "center"
    },
    input: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(5.5),
        borderBottomWidth: widthPercentageToDP(0.2),
        fontSize: widthPercentageToDP(3),
        borderBottomColor: darkBlue,
        color: darkBlue
    },
    inlineText: {
        flexDirection: 'row',
        marginTop: heightPercentageToDP(2),
        alignItems: "center"
    },
    forgetPass: {
        fontSize: widthPercentageToDP(4),
        color: "grey",
        fontWeight: "300"
    },
    forgetClick: {
        fontSize: widthPercentageToDP(4),
        color: darkBlue,
        fontWeight: "300"
    },
    btnBottom: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(7),
        borderRadius: widthPercentageToDP(10),
        backgroundColor: orangae,
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightPercentageToDP(2)
    },
    btnText: {
        fontSize: widthPercentageToDP(5),
        color: "#ffff",
        fontWeight: "300"
    },
    logo: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(10)
    }
})