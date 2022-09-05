import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WOScreen from "./WOScreen";
import AssetTagging from "../AssetTagging";
import ITMWorkOrder from "../ITMWorkOrder";

const WONav = createNativeStackNavigator();

function WorkOrder(props) {
  return (
    <NavigationContainer independent={true}>
      <WONav.Navigator>
        <WONav.Screen
          name="Home"
          component={WOScreen}
          options={{ title: "Work Orders", headerShown: false }}
        />
        <WONav.Screen
          name="AssetTagging"
          component={AssetTagging}
          options={{ title: "Asset Tagging" }}
        />
        <WONav.Screen
          name="ITM"
          component={ITMWorkOrder}
          options={{ title: "ITM Work Order" }}
        />
      </WONav.Navigator>
    </NavigationContainer>
  );
}

export default WorkOrder;
