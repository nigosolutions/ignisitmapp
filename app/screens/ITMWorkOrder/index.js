import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ITMHome from "./ITMHome";
import ITMExecutionScreen from "./ITMExecutionScreen";
import ITMExeSubScreen from "./ITMExeSubScreen";

const ITMNav = createNativeStackNavigator();

function ITMWorkOrder({navigation,route}) {
  React.useLayoutEffect(() => {
    if (!navigation || !route) return

    // Get parent by id
    const drawerNavigator = navigation.getParent('Drawer')

    if (drawerNavigator) {
      // Make sure the route name is ITM before turn header off
      if (route.name === 'ITM') { 
        drawerNavigator.setOptions({
          headerShown: false,
          swipeEnabled: false,
        })
      }
    }

    // Turn header back on when unmount
    return drawerNavigator
      ? () => {
          drawerNavigator.setOptions({
            headerShown: true,
            swipeEnabled: true,
          })
        }
      : undefined
  }, [navigation, route])


  return (
    // <NavigationContainer independent={true}>
      <ITMNav.Navigator>
        <ITMNav.Screen
          name="ITMHome"
          component={ITMHome}
          options={{ title: "ITM Work Order", headerShown: false }}
        />
        <ITMNav.Screen
          name="VerifyScreen"
          component={ITMExecutionScreen}
          options={{ title: "Verify Device" }}
        />
        <ITMNav.Screen
          name="ExecutionScreen"
          component={ITMExeSubScreen}
          options={{ title: "Execute Work Order" }}
        />
      </ITMNav.Navigator>
    // </NavigationContainer>
  );
}

export default ITMWorkOrder;
