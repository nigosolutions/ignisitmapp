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
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { getUser } from "../../auth/auth";
import axios from "axios";
import { set } from "react-native-reanimated";

function AssetHome(props) {
  React.useEffect(async () => {
    let user = await getUser();
    // console.log("Final Data: ", user);
  }, []);

  const [assetList, setAsset] = React.useState([]);

  // const parentNavigator= props.navigation.getParent();
  // console.log(parentNavigator.getState())
  const { WoID, wo } = props.route.params;
  // console.log(WoID);

  const getAssets = async (WoID) => {
    await axios({
      method: "get",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
    })
      .then((res) => {
        console.log(res.data.message);
        setAsset([...assetList, ...res.data.message]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(async () => {
    getAssets(WoID);
  }, []);

  return (
    <Box flex={1} padding={5}>
      <Fab
        colorScheme={"lightBlue"}
        renderInPortal={false}
        onPress={() =>
          props.navigation.navigate("PhotoScreen", { WoID: WoID, wo: wo })
        }
        icon={<AddIcon />}
        label={"Add Asset"}
      />
      <VStack space={3} flex={1}>
        <HStack
          rounded={15}
          bgColor={"white"}
          alignItems={"center"}
          height={150}
          padding={5}
        >
          <VStack space={3}>
            <Text
              style={{ color: "#4e5d78", fontWeight: "bold", fontSize: 20 }}
            >
              Work Order
            </Text>
            <Text style={{ color: "#99879D", fontWeight: "normal" }}>
              WO#: {WoID}
            </Text>
            <Text style={{ color: "#99879D", fontWeight: "normal" }}>
              Type: {wo.type}
            </Text>
            <Text style={{ color: "#99879D", fontWeight: "normal" }}>
              Property: {wo.building_name}
            </Text>
          </VStack>
          <Spacer />
          <VStack space={3}>
            <Button colorScheme={"lightBlue"} width={150} rounded={100}>
              Submit
            </Button>
            <Button
              colorScheme={"coolGray"}
              width={150}
              rounded={100}
              onPress={() => {
                props.navigation.navigate("WOHome");
              }}
            >
              Save & Exit
            </Button>
          </VStack>
        </HStack>
        <Text mx={3} my={3} bold fontSize={"lg"}>
          Assets
        </Text>

        <Box flex={1} rounded={15} padding={1} bgColor={"white"}>
          {assetList.length === 0 ? (
            <Center flex={1}>
              <Text color={"coolGray.500"}>No Assets to View!</Text>
              <Text color={"coolGray.400"}>
                Click + Add Asset to add a new asset
              </Text>
            </Center>
          ) : (
            <ScrollView>
              <HStack justifyContent={"center"} flexWrap={"wrap"}>
                {assetList.map((item) => (
                  <Box padding={3}>
                    <Box padding={4} rounded={10} bgColor={"coolGray.100"}>
                      <HStack alignItems={"center"} space={5}>
                        {/* <Avatar
                        bg="green.500"
                        source={{
                          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                        }}
                      /> */}
                        <VStack>
                          <Text>
                            <Text bold>Device: </Text>
                            <Text>{item.device}</Text>
                          </Text>

                          <Text>
                            <Text bold>Location: </Text>
                            <Text>
                              Floor {item.floor_no}, Room {item.room_no}
                            </Text>
                          </Text>

                          <Text>
                            <Text bold>Tag: </Text>
                            <Text>{item.asset_tag}</Text>
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
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default AssetHome;
