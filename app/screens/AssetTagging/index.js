import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssetHome from "./AssetHome";
import AssetTaggingPhotoScreen from "./AssetTaggingPhotoScreen";

const ATNav = createNativeStackNavigator();

function AssetTagging(props) {
  return (
    <NavigationContainer independent={true}>
      <ATNav.Navigator>
        <ATNav.Screen
          name="Home"
          component={AssetHome}
          options={{ title: "Work Orders", headerShown: false }}
        />
        <ATNav.Screen
          name="PhotoScreen"
          component={AssetTaggingPhotoScreen}
          options={{ title: "Work Orders" }}
        />
      </ATNav.Navigator>
    </NavigationContainer>
  );
}

export default AssetTagging;
