import { FAB, SearchBar } from "@rneui/themed";
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
  FlatList,
  HamburgerIcon,
  HStack,
  Icon,
  InfoIcon,
  Menu,
  Popover,
  Pressable,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { getUser } from "../../auth/auth";
import axios from "axios";

function AssetHome(props) {
  React.useEffect(async () => {
    let user = await getUser();
    // console.log("Final Data: ", user);
  }, []);

  const [assetList, setAsset] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // const parentNavigator= props.navigation.getParent();
  // console.log(parentNavigator.getState())
  const { WoID, wo } = props.route.params;
  // console.log(WoID);

  const getAssets = async (WoID) => {
    setLoading(true);
    await axios({
      method: "get",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
    })
      .then((res) => {
        console.log(res.data.message);
        setAsset(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
        <HStack>
          <Text mx={3} my={3} bold fontSize={"lg"}>
            Assets
          </Text>
          <Spacer />
          <SearchBar
            placeholder="Enter Search Text"
            round
            containerStyle={{
              width: "40%",
              backgroundColor: "transparent",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
            inputContainerStyle={{
              backgroundColor: "white",
            }}
            lightTheme
          />
        </HStack>

        <Box flex={1} rounded={15} padding={1} bgColor={"white"}>
          {loading === true ? (
            <Center flex={1}>
              <Spinner size={"lg"} />
            </Center>
          ) : (
            <>
              {assetList.length === 0 ? (
                <Center flex={1}>
                  <Text color={"coolGray.500"}>No Assets to View!</Text>
                  <Text color={"coolGray.400"}>
                    Click + Add Asset to add a new asset
                  </Text>
                </Center>
              ) : (
                <Box padding={3}>
                  <FlatList
                    data={assetList}
                    keyExtractor={(item) => item.asset_tag}
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
                                  <Text bold>{item.device}</Text>
                                </Text>

                                <Text>
                                  <Text bold>Location: </Text>
                                  <Text>{item.floor_no}</Text>
                                </Text>

                                <Text>
                                  <Text bold>Tag: </Text>
                                  <Text>{item.asset_tag}</Text>
                                </Text>
                                <Spacer />
                              </VStack>
                              <Spacer />
                              <HStack space={2}>
                                <Button
                                  colorScheme={"coolGray"}
                                  variant={"ghost"}
                                >
                                  Edit
                                </Button>
                                <Button
                                  colorScheme={"danger"}
                                  variant={"ghost"}
                                >
                                  Delete
                                </Button>
                              </HStack>
                            </HStack>
                          </Box>
                        </Box>
                      );
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default AssetHome;
