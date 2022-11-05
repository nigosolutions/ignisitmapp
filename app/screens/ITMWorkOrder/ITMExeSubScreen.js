import {
  Text,
  Box,
  HStack,
  VStack,
  Button,
  Spacer,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "native-base";
import * as React from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import ExecutionComponent from "./ExecutionComponent";

export default function ITMExeSubScreen(props) {

  const {asset} = props.route.params;

  const [index, setIndex] = React.useState(0);

  const [routes, setRoutes] = React.useState([
    // { key: "first", title: "Inspection" },
    // { key: "second", title: "Testing" },
    // { key: "third", title: "Maintenance" },
  ]);

  React.useEffect(() => {
    let rts = [];
    if (asset.types.includes('I')){
      rts = [...rts, { key: "first", title: "Inspection" }];
    } 
    if (asset.types.includes('T')){
      rts = [...rts, { key: "second", title: "Testing" }];
    } 
    if (asset.types.includes('M')){
      rts = [...rts, { key: "third", title: "Maintenance" }];
    } 
    setRoutes(rts);
  },[]);

  //Upload image

  const FirstRoute = () => <ExecutionComponent />;

  const SecondRoute = () => <FirstRoute />;

  const ThirdRoute = () => <FirstRoute />;

  const initialLayout = { width: Dimensions.get("window").width };

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  //   third: ThirdRoute,
  // });

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"#377dff"}
      indicatorStyle={{ backgroundColor: "#377dff" }}
      inactiveColor={"#8a94a6"}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );

  return (
    <VStack space={5} padding={3} flex={1}>
      <HStack
        padding={2}
        alignItems={"center"}
        rounded={10}
        bgColor={"gray.200"}
      >
        <Button
          colorScheme={"blue"}
          width={100}
          leftIcon={<ChevronLeftIcon />}
          variant={"ghost"}
          rounded={100}
        >
          Previous
        </Button>

        <Spacer />
        <Text>Device 1/30</Text>
        <Spacer />
        <Button
          colorScheme={"blue"}
          width={100}
          endIcon={<ChevronRightIcon />}
          variant={"ghost"}
          rounded={100}
          onPress={()=>{console.log(asset)}}
        >
          Next
        </Button>
      </HStack>
      <HStack space={5}>
        <Box padding={5} rounded={10} bgColor={"white"} flex={3}>
          <HStack>
            <VStack flex={2} space={2}>
              <Text bold>{asset.device}</Text>
              {/* <Text>Location:</Text> */}
              <Text>Room No: {asset.room_no}</Text>
              <Text>Floor No: {asset.floor_no}</Text>
              {/* <Text>Room No:</Text> */}
              <Text>Building No:</Text>
            </VStack>
            <Box bgColor={"green.100"} flex={1}></Box>
          </HStack>
        </Box>
        <VStack justifyContent={"center"} space={5} padding={5} flex={1 / 2}>
          <Button colorScheme={"lightBlue"} rounded={100}>
            Save
          </Button>
          <Button colorScheme={"blueGray"} rounded={100}>
            Skip
          </Button>
        </VStack>
      </HStack>
      <Box rounded={10} bgColor={"white"} flex={3}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={styles.container}
        />
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    borderRadius: 10,
  },
  card: {
    borderRadius: 5,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    maxHeight: 350,
  },
  scene: {
    flex: 1,
  },
  title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 18,
  },
});
