import { FAB, SearchBar } from "@rneui/themed";
import {
  Badge,
  Box,
  Button,
  ChevronRightIcon,
  Divider,
  FlatList,
  HStack,
  Modal,
  Progress,
  ScrollView,
  Select,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import React from "react";
import { getUser } from "../../auth/auth";

import Requests from "./Requests";
import { useWindowDimensions } from "react-native";

function ITMHome(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [assetLists, setAsset] = React.useState([
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
    {
      name: "Smoke Detector",
      mfr: "Ignis",
      location: "Floor 1, Room 102",
      Tag: "SD1102",
    },
  ]);

  React.useEffect(async () => {
    let user = await getUser();
    console.log("Final Data: ", user);
  }, []);

  const { WoID, wo } = props.route.params;
  // console.log(props.route.params)

  const FirstRoute = () => (
    <Box padding={3}>
      <FlatList
        data={assetLists}
        renderItem={({ item }) => {
          return (
            <Box paddingY={1.5}>
              <Box
                shadow={"0"}
                padding={3}
                rounded={10}
                bgColor={"coolGray.50"}
              >
                <HStack alignItems={"center"} space={5}>
                  <VStack>
                    <Text>
                      <Text bold>{item.name}</Text>
                    </Text>

                    <Text>
                      <Text bold>Location: </Text>
                      <Text>{item.location}</Text>
                    </Text>

                    <Text>
                      <Text bold>Tag: </Text>
                      <Text>{item.Tag}</Text>
                    </Text>
                    <Spacer />
                  </VStack>
                  <Spacer />
                  <HStack space={2}>
                    <Badge variant="outline">Inspection</Badge>
                    <Badge variant="outline">Testing</Badge>
                    <Badge variant="outline">Maintenance</Badge>
                  </HStack>
                  <Spacer />
                  <Button
                    colorScheme={"lightBlue"}
                    rightIcon={<ChevronRightIcon />}
                    variant={"link"}
                  >
                    Start
                  </Button>
                </HStack>
              </Box>
            </Box>
          );
        }}
        keyExtractor={(item) => item.Tag}
      />
    </Box>
  );

  const SecondRoute = () => FirstRoute;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Completed" },
  ]);
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
    <Box flex={1} padding={5}>
      <VStack space={5} flex={1}>
        <HStack
          rounded={15}
          bgColor={"white"}
          alignItems={"center"}
          height={175}
          padding={5}
        >
          <Box>
            <VStack space={3}>
              <Text
                style={{ color: "#4e5d78", fontWeight: "bold", fontSize: 20 }}
              >
                WO#: {WoID}
              </Text>
              <Text style={{ color: "#99879D", fontWeight: "normal" }}>
                Type: ITM
              </Text>
              <Text style={{ color: "#99879D", fontWeight: "normal" }}>
                Property: {wo.building_name}
              </Text>
            </VStack>
          </Box>
          <Spacer />
          <VStack space={5}>
            <Text>Progress</Text>
            <Progress colorScheme={"lightBlue"} width={200} value={45} />

            <Button
              colorScheme={"coolGray"}
              onPress={() => setShowModal(true)}
              variant={"outline"}
              rounded={100}
            >
              Requests
            </Button>
            <Modal
              size={"lg"}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            >
              <Requests />
            </Modal>
          </VStack>
          <Spacer />
          <VStack width={100} space={3}>
            <Button
              colorScheme={"coolGray"}
              onPress={() => props.navigation.navigate("ExecutionScreen")}
              rounded={100}
            >
              Start
            </Button>
            <Button colorScheme={"coolGray"} rounded={100} onPress={() => {
                props.navigation.navigate("WOHome");
              }}>
              Save & Exit
            </Button>
            <Button colorScheme={"lightBlue"} rounded={100}>
              Submit
            </Button>
          </VStack>
        </HStack>

        <Box padding={1} rounded={15} flex={1} bgColor={"white"}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
          />
        </Box>
      </VStack>
    </Box>
  );
}

export default ITMHome;
