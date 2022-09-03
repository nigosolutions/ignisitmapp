import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ITMNav = createNativeStackNavigator();

function ITMWorkOrder(props) {
  return (
    <NavigationContainer independent={true}>
      <ITMNav.Navigator>
        <ITMNav.Screen></ITMNav.Screen>
      </ITMNav.Navigator>
    </NavigationContainer>
  );
}

export default ITMWorkOrder;
