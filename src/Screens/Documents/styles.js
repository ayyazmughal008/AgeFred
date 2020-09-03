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
    }
})