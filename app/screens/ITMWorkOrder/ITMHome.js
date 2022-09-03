import { FAB } from "@rneui/themed";
import {
  AddIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  DeleteIcon,
  Divider,
  Fab,
  HamburgerIcon,
  HStack,
  Icon,
  InfoIcon,
  Menu,
  Popover,
  Pressable,
  Progress,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { getUser } from "../../auth/auth";

function ITMHome(props) {
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

  return (
    <Box flex={1} padding={5}>
      <VStack space={5} flex={1}>
        <HStack
          rounded={15}
          bgColor={"white"}
          alignItems={"center"}
          height={150}
          padding={5}
        >
          <Box>
            <VStack space={3}>
              <Text
                style={{ color: "#4e5d78", fontWeight: "bold", fontSize: 20 }}
              >
                Work Order
              </Text>
              <Text style={{ color: "#99879D", fontWeight: "normal" }}>
                Type: Asset Tagging
              </Text>
              <Text style={{ color: "#99879D", fontWeight: "normal" }}>
                Property: Building XYZ
              </Text>
            </VStack>
          </Box>
          <Spacer />
          <VStack space={5}>
            <Text>Progress</Text>
            <Progress width={200} value={45} />
            <Button variant={"outline"} rounded={100}>
              Requests
            </Button>
          </VStack>
          <Spacer />
          <VStack width={100} space={3}>
            <Button rounded={100}>Start</Button>
            <Button rounded={100}>Submit</Button>
          </VStack>
        </HStack>
        <Text bold fontSize={"lg"}>
          Assets
        </Text>

        <Divider></Divider>
        <Box>
          <ScrollView>
            <HStack justifyContent={"center"} flexWrap={"wrap"}>
              {assetLists.map((item) => (
                <Box padding={3}>
                  <Box padding={4} rounded={10} bgColor={"white"}>
                    <HStack alignItems={"center"} space={5}>
                      <Avatar
                        bg="green.500"
                        source={{
                          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                      />
                      <VStack>
                        <Text>
                          <Text bold>Device: </Text>
                          <Text>{item.name}</Text>
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
                      <Menu
                        w="190"
                        trigger={(triggerProps) => {
                          return (
                            <Pressable
                              accessibilityLabel="More options menu"
                              {...triggerProps}
                            >
                              <Icon
                                size={4}
                                as={
                                  <MaterialCommunityIcons name="dots-vertical" />
                                }
                              />
                            </Pressable>
                          );
                        }}
                      >
                        <Menu.Item>Edit</Menu.Item>
                        <Menu.Item>Delete</Menu.Item>
                      </Menu>
                    </HStack>
                  </Box>
                </Box>
              ))}
            </HStack>
          </ScrollView>
        </Box>
      </VStack>
    </Box>
  );
}

export default ITMHome;
