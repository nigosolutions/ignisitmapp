import {
  Box,
  Button,
  CheckIcon,
  FlatList,
  FormControl,
  HStack,
  IconButton,
  Input,
  Modal,
  ScrollView,
  Select,
  Spacer,
  Text,
  TextArea,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import * as React from "react";
import { Audio } from "expo-av";
import { Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

function Requests(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Tools" },
    { key: "second", title: "Spare Parts" },
    { key: "third", title: "Resources" },
  ]);
  const [tools, setTools] = React.useState([]);
  const [item, setItem] = React.useState({ tool: "", qty: 1 });
  const [qnty, setQty] = React.useState(1);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const data = [
    {
      id: "1",
      item: "Spanner",
      qty: 3,
    },
    {
      id: "2",
      item: "Wrench",
      qty: 2,
    },
  ];

  const [recording, setRecording] = React.useState();
  const [audioPath, setAudioPath] = React.useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioPath(uri);
    console.log("Recording stopped and stored at", uri);
  }

  //Playing audio
  const [sound, setSound] = React.useState();

  async function playSound() {
    try {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        // require('./assets/Hello.mp3')
        { uri: audioPath }
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
      // await sound.unloadAsync();
    } catch (error) {
      // An error occurred!
      console.error("Failed to start playing", err);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const FirstRoute = () => (
    <VStack space={7} padding={3}>
      <HStack alignItems={"center"} space={3}>
        <FormControl flex={3}>
          <FormControl.Label>Select Item</FormControl.Label>
          <Select
            accessibilityLabel="Select Item"
            placeholder="Select Item"
            selectedValue={item.tool}
            onValueChange={(value) => setItem({ ...item, tool: value })}
          >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl flex={3}>
          <FormControl.Label>Quantity</FormControl.Label>
          {/* <Input
            value={qnty}
            placeholder="Enter Quantity"
            onChangeText={(value) => {
              setQty(value), setItem({ ...item, qty: value });
            }}
          /> */}
          <HStack flex={1} justifyContent={"center"} space={2}>
            <Button isDisabled={(qnty == 1) ? true : false} onPress={() => {
              setQty(qnty-1), setItem({ ...item, qty: qnty-1 }); 
              if (qnty==2) {
                setIsDisabled(true);
            }}}>-</Button>
            <Text>{qnty}</Text>
            <Button onPress={() => {
              setQty(qnty+1), setItem({ ...item, qty: qnty+1 });
              if (qnty==1) {
                setIsDisabled(false);
              }}}>+</Button>
          </HStack>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please enter Quantity!
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl flex={1}>
          <FormControl.Label>   </FormControl.Label>
          <Button
            // flex={1}
            rounded={100}
            maxWidth={100}
            onPress={() => {
              if (item.tool == "") {
                alert("Please select an item")
              } else {
                setTools([...tools, { item: item.tool, qty: item.qty }]);
                setQty(1), setItem({ ...item, qty: 1 });
              }
            }}
          >
            Add
          </Button>
        </FormControl>
        
      </HStack>
      <VStack space={2}>
        <HStack paddingX={4} paddingY={2} rounded={10} bgColor={"gray.200"}>
          <Text bold>Item</Text>
          <Spacer/>
          <Text bold>Quantity</Text>
        </HStack>
        <ScrollView maxHeight={70}>
          {tools.map((item) => (
            <Box paddingY={1}>
              <HStack
                paddingX={4}
                // paddingY={1}
                alignItems={"center"}
                rounded={10}
                bgColor={"coolGray.50"}
              >
                <Text >{item.item}</Text>
                <Spacer/>
                <HStack  alignItems={"center"}>
                  <Text>{item.qty}</Text>
                  {/* <IconButton _icon={{ type:"material", name: "done"}}/> */}
                  <Button variant={"ghost"} size={"lg"} colorScheme={"secondary"} 
                  onPress={() => {
                    // const index = tools.indexOf(item);
                    const array = tools.filter(value => value !== item)
                    // tools.splice(index,1);
                    // console.log(tools);
                    // console.log(array);
                    setTools(array);
                  }}>X</Button>
                </HStack>
                
              </HStack>
            </Box>
          ))}
        </ScrollView>
      </VStack>

      <Box
        borderWidth={1}
        borderColor={"coolGray.300"}
        rounded={10}
        bgColor={"coolGray.100"}
        height={100}
      >
        <HStack justifyContent={"center"} alignItems={"center"}>
          <TextArea
            borderColor={"coolGray.100"}
            h={100}
            placeholder="Remarks"
            w="90%"
          />

          <VStack>
            <TouchableOpacity
              onPress={recording ? stopRecording : startRecording}
            >
              {recording ? (
                <Icon
                  size={30}
                  name="stop"
                  type="material-community"
                  color="grey"
                />
              ) : (
                <Icon
                  size={30}
                  name="microphone"
                  type="material-community"
                  color="grey"
                />
              )}
            </TouchableOpacity>
            {audioPath ? (
              <HStack justifyContent={"center"}>
                <TouchableOpacity onPress={playSound}>
                  <Icon
                    size={30}
                    name="play"
                    type="material-community"
                    color="grey"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAudioPath(undefined)}>
                  <Icon
                    size={30}
                    name="close"
                    type="material-community"
                    color="grey"
                  />
                </TouchableOpacity>
              </HStack>
            ) : undefined}
          </VStack>
        </HStack>
      </Box>
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
    <>
      <Modal.Content bgColor={"white"}>
        <Modal.CloseButton />
        <Modal.Header>Requests</Modal.Header>
        <Modal.Body>
          <Box minHeight={400} bgColor={"white"}>
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
    </>
  );
}

export default Requests;
