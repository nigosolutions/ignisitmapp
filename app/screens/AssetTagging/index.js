import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssetHome from "./AssetHome";
import AssetTaggingPhotoScreen from "./AssetTaggingPhotoScreen";
import AssetDetails from "./AssetDetails";

const ATNav = createNativeStackNavigator();

function AssetTagging(props) {
  return (
    <NavigationContainer independent={true}>
      <ATNav.Navigator>
        <ATNav.Screen
          name="Home"
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
    </NavigationContainer>
  );
}

export default AssetTagging;
