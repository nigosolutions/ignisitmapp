import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ITMHome from "./ITMHome";
import ITMExecutionScreen from "./ITMExecutionScreen";
import ITMExeSubScreen from "./ITMExeSubScreen";

const ITMNav = createNativeStackNavigator();

function ITMWorkOrder({ navigation, route }) {
  return (
    // <NavigationContainer independent={true}>
    <ITMNav.Navigator>
      <ITMNav.Screen
        name="ITMHome"
        component={ITMHome}
        options={{ title: "ITM Work Order", headerShown: false, gestureEnabled: false}}
      />
      <ITMNav.Screen
        name="VerifyScreen"
        component={ITMExecutionScreen}
        options={{ title: "Verify Device" }}
      />
      <ITMNav.Screen
        name="ExecutionScreen"
        component={ITMExeSubScreen}
        options={{ title: "Execute Work Order", headerShown: false }}
      />
    </ITMNav.Navigator>
    // </NavigationContainer>
  );
}

export default ITMWorkOrder;
