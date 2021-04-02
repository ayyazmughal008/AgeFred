import { StyleSheet } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { orangae, darkBlue, lightBlue, grey } from '../../Component/ColorCode'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightBlue,
    },
    listView: {
        flex: 1,
        marginTop: heightPercentageToDP(2),
        alignItems: "center",
        marginBottom: heightPercentageToDP(2)
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
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent:"center"
    },
    innerModal2: {
        width: "100%",
        height: "100%",
        // marginBottom: widthPercentageToDP(10),
        // marginLeft: widthPercentageToDP(5),
        // marginRight: widthPercentageToDP(5),
        //backgroundColor:"yellow",
        justifyContent:"center"
    },
    quesBox: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        marginLeft: widthPercentageToDP(5),
        alignItems: "center",
        backgroundColor: "red",
        // borderWidth: widthPercentageToDP(0.1),
        // borderColor: darkBlue,
        // borderRadius: widthPercentageToDP(2),
        justifyContent: "center",
    },
})