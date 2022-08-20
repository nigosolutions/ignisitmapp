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
  HStack,
  InfoIcon,
  Popover,
  Pressable,
  ScrollView,
  Spacer,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";

function AssetHome(props) {
  const [assetLists, setAsset] = React.useState([
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
    { name: "Hello" },
  ]);
  return (
    <Box flex={1} padding={10}>
      <VStack space={5} flex={1}>
        <HStack flex={1}>
          <Box flex={4} padding={5} rounded={10} bgColor={"white"}>
            <Text fontSize="lg">Work Order</Text>
          </Box>
          <Center padding={10} flex={1}>
            <VStack width={"100%"} space={4}>
              <Button colorScheme={"secondary"}>Cancel</Button>
              <Button>Submit</Button>
            </VStack>
          </Center>
        </HStack>
        <Text bold fontSize={"lg"}>
          Assets
        </Text>

        <Divider></Divider>
        <Box flex={3}>
          <ScrollView>
            <VStack space={3}>
              <Fab
                onPress={() => props.navigation.navigate("PhotoScreen")}
                icon={<AddIcon />}
                label={"Add Asset"}
              />
              {assetLists.map((item) => (
                <Box padding={4} rounded={10} bgColor={"white"}>
                  <HStack alignItems={"center"} space={10}>
                    <Avatar
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    />
                    <Text>
                      <Text bold>Device: </Text>
                      <Text>{item.name}</Text>
                    </Text>
                    <Text>
                      <Text bold>Location: </Text>
                      <Text>{item.name}</Text>
                    </Text>

                    <Text>
                      <Text bold>Tag: </Text>
                      <Text>{item.name}</Text>
                    </Text>
                    <Spacer />
                    <HStack space={2}>
                      <Button
                        leftIcon={<InfoIcon />}
                        variant={"outline"}
                        size="xs"
                      >
                        Edit
                      </Button>
                      <Popover
                        trigger={(triggerProps) => {
                          return (
                            <Button
                              size="xs"
                              leftIcon={<DeleteIcon />}
                              {...triggerProps}
                              colorScheme={"danger"}
                              variant={"outline"}
                            >
                              Delete
                            </Button>
                          );
                        }}
                      >
                        <Popover.Content
                          accessibilityLabel="Delete Asset"
                          w="56"
                        >
                          <Popover.Arrow />
                          <Popover.CloseButton />
                          <Popover.Header>Confirm Delete Asset</Popover.Header>
                          <Popover.Body>
                            Do you want to delete {item.name + "?"}
                            This action cannot be reversed. Deleted data cannot
                            be recovered.
                          </Popover.Body>
                          <Popover.Footer justifyContent="flex-end">
                            <Button.Group space={2}>
                              <Button colorScheme="coolGray" variant="ghost">
                                Cancel
                              </Button>
                              <Button
                                colorScheme="danger"
                                onPress={() => {
                                  onDelete("AT3224");
                                }}
                              >
                                Delete
                              </Button>
                            </Button.Group>
                          </Popover.Footer>
                        </Popover.Content>
                      </Popover>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      </VStack>
    </Box>
  );
}

export default AssetHome;
