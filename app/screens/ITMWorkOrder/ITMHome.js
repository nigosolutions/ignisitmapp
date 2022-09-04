import { FAB, SearchBar } from "@rneui/themed";
import {
  AddIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  CheckIcon,
  Container,
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
  Select,
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
            <Button
              onPress={() => props.navigation.navigate("ExecutionScreen")}
              rounded={100}
            >
              Start
            </Button>
            <Button rounded={100}>Submit</Button>
          </VStack>
        </HStack>

        <Box padding={1} rounded={15} flex={1} bgColor={"white"}>
          <VStack space={2}>
            <HStack paddingY={1} paddingX={3} alignItems={"center"}>
              <SearchBar
                placeholder="Enter Search Text"
                round
                containerStyle={{
                  width: 300,
                  borderTopColor: "white",
                  borderBottomColor: "white",
                  backgroundColor: "white",
                }}
                inputContainerStyle={{
                  height: 40,
                  backgroundColor: "#e5e5e5",
                }}
                lightTheme
              />

              <Spacer />
              <HStack space={3}>
                <Select width={200} placeholder="Choose Service">
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                <Select width={200} placeholder="Choose Service">
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
              </HStack>
            </HStack>
            <Divider />

            <ScrollView>
              <Box
                justifyContent={"space-around"}
                flexDirection={"row"}
                flexWrap={"wrap"}
              >
                {assetLists.map((item) => (
                  <Box minWidth={"25%"} padding={3}>
                    <Box padding={4} rounded={10} bgColor={"blueGray.100"}>
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
                      </HStack>
                    </Box>
                  </Box>
                ))}
              </Box>
            </ScrollView>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default ITMHome;
