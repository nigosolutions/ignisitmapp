import { FAB, SearchBar } from "@rneui/themed";
import {
  AddIcon,
  Box,
  Button,
  Center,
  Fab,
  FlatList,
  HStack,
  Popover,
  Spacer,
  Spinner,
  Text,
  VStack,
  Modal,
} from "native-base";

import React from "react";
import { getUser } from "../../auth/auth";
import axios from "axios";
import ViewAssets from "./ViewAssets";

import { useFocusEffect } from "@react-navigation/native";

function AssetHome(props) {
  React.useEffect(async () => {
    let user = await getUser();
    // console.log("Final Data: ", user);
  }, []);

  const [assetList, setAsset] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState({
    device: "",
    system: "",
    mfr_name: "",
    mfr_pn: "",
    specification: "",
    drawing_no: "",
    floor_no: "",
    room_no: "",
    asset_tag: "",
  });
  // const parentNavigator= props.navigation.getParent();
  // console.log(parentNavigator.getState())
  const { WoID, wo } = props.route.params;
  const [search, setSearch] = React.useState("");
  // console.log(WoID);

  const getAssets = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: `https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets?id=${WoID}`,
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

  const deleteAsset = async (id) => {
    await axios({
      method: "delete",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
      data: { asset_id: id },
    })
      .then((res) => {
        console.log(res.status);
        getAssets();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  React.useEffect(async () => {
    getAssets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // let isActive = true;

      // if (isActive) {
      getAssets();
      // };

      // return () => {
      //   isActive = false;
      // };
    }, [])
  );

  // Component for an item/asset in assets list
  const ListItem = ({ item }) => (
    <Box paddingY={1.5}>
      <Box shadow={"0"} padding={3} rounded={10} bgColor={"coolGray.50"}>
        <HStack alignItems={"center"} space={5}>
          <VStack>
            <Text>
              <Text bold>{item.device}</Text>
            </Text>

            <Text>
              <Text bold>Location: </Text>
              <Text>
                Room {item.room_no}, Floor {item.floor_no}
              </Text>
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
              onPress={() => {
                setSelectedAsset(item);
                setIsDisabled(true);
                setShowModal(true);
              }}
            >
              View
            </Button>
            <Button
              colorScheme={"coolGray"}
              variant={"ghost"}
              onPress={() => {
                setSelectedAsset(item);
                setIsDisabled(false);
                setShowModal(true);
              }}
            >
              Edit
            </Button>
            {/* <Button
                colorScheme={"danger"}
                variant={"ghost"}
                onPress={()=>{deleteAsset(item.asset_id)}}
              >
                Delete
              </Button> */}
            <Popover
              placement={"left top"}
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps} colorScheme="danger">
                    Delete
                  </Button>
                );
              }}
            >
              <Popover.Content accessibilityLabel="Delete Asset" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>Delete Asset</Popover.Header>
                <Popover.Body>
                  This will remove all data relating to this asset. This action
                  cannot be reversed. Deleted data can not be recovered.
                </Popover.Body>
                <Popover.Footer justifyContent="center">
                  {/* <Button.Group space={2}> */}
                  {/* <Button colorScheme="coolGray" variant="ghost">
                        Cancel
                      </Button> */}
                  <Button
                    colorScheme="danger"
                    onPress={() => {
                      deleteAsset(item.asset_id);
                    }}
                  >
                    Confirm
                  </Button>
                  {/* </Button.Group> */}
                </Popover.Footer>
              </Popover.Content>
            </Popover>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );

  return (
    <Box flex={1} padding={5}>
      <Fab
        colorScheme={"lightBlue"}
        renderInPortal={false}
        onPress={() =>
          props.navigation.navigate("DetailScreen", { WoID: WoID, wo: wo })
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
            placeholder="Enter asset name or tag"
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
            value={search}
            onChangeText={(search) => {
              setSearch(search);
            }}
          />
        </HStack>
        <Modal
          size={"xl"}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <ViewAssets asset={selectedAsset} isDisabled={isDisabled} />
        </Modal>
        <Box flex={1} rounded={15} padding={1} bgColor={"white"}>
          {loading === true ? (
            <Center flex={1}>
              <Spinner size={"lg"} />
            </Center>
          ) : assetList.length === 0 ? (
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
                  if (search === "") {
                    return <ListItem item={item} />;
                  }

                  //filter of asset name
                  if (
                    item.device
                      .toUpperCase()
                      .includes(search.toUpperCase().trim().replace(/\s/g, ""))
                  ) {
                    return <ListItem item={item} />;
                  }

                  //filter of asset tag
                  if (
                    item.asset_tag
                      .toUpperCase()
                      .includes(search.toUpperCase().trim().replace(/\s/g, ""))
                  ) {
                    return <ListItem item={item} />;
                  }

                  // return (
                  //   <Box paddingY={1.5}>
                  //     <Box
                  //       shadow={"0"}
                  //       padding={3}
                  //       rounded={10}
                  //       bgColor={"coolGray.50"}
                  //     >
                  //       <HStack alignItems={"center"} space={5}>
                  //         <VStack>
                  //           <Text>
                  //             <Text bold>{item.device}</Text>
                  //           </Text>

                  //           <Text>
                  //             <Text bold>Location: </Text>
                  //             <Text>Room {item.room_no}, Floor {item.floor_no}</Text>
                  //           </Text>

                  //           <Text>
                  //             <Text bold>Tag: </Text>
                  //             <Text>{item.asset_tag}</Text>
                  //           </Text>
                  //           <Spacer />
                  //         </VStack>
                  //         <Spacer />
                  //         <HStack space={2}>
                  //           <Button
                  //             colorScheme={"coolGray"}
                  //             variant={"ghost"}
                  //             onPress={()=>{setSelectedAsset(item);
                  //                           setIsDisabled(true);
                  //                           setShowModal(true);}}
                  //           >
                  //             View
                  //           </Button>
                  //           <Button
                  //             colorScheme={"coolGray"}
                  //             variant={"ghost"}
                  //             onPress={()=>{setSelectedAsset(item);
                  //                           setIsDisabled(false);
                  //                           setShowModal(true);}}
                  //           >
                  //             Edit
                  //           </Button>
                  //           {/* <Button
                  //             colorScheme={"danger"}
                  //             variant={"ghost"}
                  //             onPress={()=>{deleteAsset(item.asset_id)}}
                  //           >
                  //             Delete
                  //           </Button> */}
                  //           <Popover placement={'left top'} trigger={triggerProps => {
                  //           return <Button {...triggerProps} colorScheme="danger">
                  //                   Delete
                  //                 </Button>;
                  //         }}>
                  //             <Popover.Content accessibilityLabel="Delete Asset" w="56">
                  //               <Popover.Arrow />
                  //               <Popover.CloseButton />
                  //               <Popover.Header>Delete Asset</Popover.Header>
                  //               <Popover.Body>
                  //                 This will remove all data relating to this asset. This action cannot be
                  //                 reversed. Deleted data can not be recovered.
                  //               </Popover.Body>
                  //               <Popover.Footer justifyContent="center">
                  //                 {/* <Button.Group space={2}> */}
                  //                   {/* <Button colorScheme="coolGray" variant="ghost">
                  //                     Cancel
                  //                   </Button> */}
                  //                   <Button colorScheme="danger" onPress={()=>{deleteAsset(item.asset_id)}}>Confirm</Button>
                  //                 {/* </Button.Group> */}
                  //               </Popover.Footer>
                  //             </Popover.Content>
                  //           </Popover>
                  //         </HStack>
                  //       </HStack>
                  //     </Box>
                  //   </Box>
                  // );
                }}
              />
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default AssetHome;
