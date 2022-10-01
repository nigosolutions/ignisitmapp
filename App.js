import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NativeBaseProvider, Icon } from "native-base";

import LoginScreen from "./app/screens/Login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkOrder from "./app/screens/WorkOrder";

import DashboardScreen from "./app/screens/Dashboard";
import ScheduleScreen from "./app/screens/Schedule";
import Requests from "./app/screens/ITMWorkOrder/Requests";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar } from "react-native";

const MainNav = createNativeStackNavigator();
const sideMenuDisabledScreens = ["AssetTagging"];

const Tab = createBottomTabNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "Dashboard":
      return "apps";
    case "Work Orders":
      return "tools";
    case "Schedule":
      return "calendar";
    case "Requests":
      return "inbox";
    default:
      return undefined;
  }
};

function MyTab() {
  return (
    <Tab.Navigator
      id="MyTab"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Work Orders") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "Schedule") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Requests") {
            iconName = focused ? "mail-open" : "mail-open-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Work Orders" component={WorkOrder} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Requests" component={Requests} />
    </Tab.Navigator>
  );
}
export default function Example() {
  return (
    <SafeAreaView style={{ backgroundColor: "lightgray", flex: 1 }}>
      <StatusBar />
      <NavigationContainer>
        <NativeBaseProvider>
          <MainNav.Navigator>
            <MainNav.Screen
              name="Tab"
              component={MyTab}
              options={{ headerShown: false }}
            />
            <MainNav.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </MainNav.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
