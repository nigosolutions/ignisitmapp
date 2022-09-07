import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Modal,
  Select,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";

import { Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

function Requests(props) {
  const [showModal, setShowModal] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tools" },
    { key: "second", title: "Spare Parts" },
    { key: "third", title: "Resources" },
  ]);

  const FirstRoute = () => (
    <VStack padding={3}>
      <HStack alignItems={"center"} space={3}>
        <FormControl flex={1}>
          <FormControl.Label>Select Item</FormControl.Label>
          <Select accessibilityLabel="Select Item" placeholder="Select Item">
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label>Quantity</FormControl.Label>
          <Input />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please enter Quantity!
          </FormControl.ErrorMessage>
        </FormControl>
        <Button flex={1 / 4} rounded={100}>
          Add
        </Button>
      </HStack>
    </VStack>
  );
  const SecondRoute = () => <FirstRoute />;

  const ThirdRoute = () => <FirstRoute />;
  const initialLayout = { width: Dimensions.get("window").width };

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
    <Box flex={1}>
      <Button onPress={() => setShowModal(true)}>Open</Button>
      <Modal size={"lg"} isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Requests</Modal.Header>
          <Modal.Body>
            <Box bgColor={"white"} height={"500"}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

export default Requests;
