import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssetHome from "./AssetHome";
import AssetTaggingPhotoScreen from "./AssetTaggingPhotoScreen";
import AssetDetails from "./AssetDetails";

const ATNav = createNativeStackNavigator();

function AssetTagging({ navigation, route }) {
  React.useLayoutEffect(() => {
    if (!navigation || !route) return;

    // Get parent by id
    const drawerNavigator = navigation.getParent("Drawer");

    if (drawerNavigator) {
      // Make sure the route name is AssetTagging before turn header off
      if (route.name === "AssetTagging") {
        drawerNavigator.setOptions({
          headerShown: false,
          swipeEnabled: false,
        });
      }
    }

    // Turn header back on when unmount
    return drawerNavigator
      ? () => {
          drawerNavigator.setOptions({
            headerShown: true,
            swipeEnabled: true,
          });
        }
      : undefined;
  }, [navigation, route]);

  // const {WoID} = route.params;
  // const [woid, setWoID] = React.useState(WoID);
  // console.log(WoID)
  return (
    // <NavigationContainer independent={true}>
    <ATNav.Navigator>
      <ATNav.Screen
        name="ATHome"
        component={AssetHome}
        options={{ title: "Asset Tagging", headerShown: false }}
      />
      <ATNav.Screen
        name="PhotoScreen"
        component={AssetTaggingPhotoScreen}
        options={{ title: "Device Photo" }}
      />
      <ATNav.Screen
        name="DetailScreen"
        component={AssetDetails}
        options={{ title: "Asset Details" }}
      />
    </ATNav.Navigator>
    // </NavigationContainer>
  );
}

export default AssetTagging;
