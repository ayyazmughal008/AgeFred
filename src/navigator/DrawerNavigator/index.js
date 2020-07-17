import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import DrawerFirstSCreen from "../../Screens/Home";
import DrawerContent from "./DrawerContent";
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
export default createDrawerNavigator(
    {
        DrawerFirstScreen: {
            screen: DrawerFirstSCreen,
            navigationOptions: {
                drawerLabel: () => null
            }
        }
    },
    {
        drawerWidth: widthPercentageToDP(70),
        drawerPosition: "left",
        initialRouteName: "DrawerFirstScreen",
        drawerType: "front",
        contentComponent: props => <DrawerContent {...props} />
    }
);
