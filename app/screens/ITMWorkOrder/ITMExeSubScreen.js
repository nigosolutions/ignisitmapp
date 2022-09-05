import { FAB, Text } from "@rneui/base";
import {
  Box,
  HStack,
  VStack,
  ScrollView,
  Image,
  TextArea,
  Button,
  Input,
  Spacer,
} from "native-base";
import * as React from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { ButtonGroup, Icon } from "@rneui/themed";
import { Audio } from "expo-av";

export default function ITMExeSubScreen() {
  const [index, setIndex] = React.useState(0);
  const [selectedButton, setSelectedButton] = React.useState();
  const [routes] = React.useState([
    { key: "first", title: "Inspection" },
    { key: "second", title: "Testing" },
    { key: "third", title: "Maintenance" },
  ]);

  // Uploading image
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = React.useState("");

  //Upload image
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  //Open Camera
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };
  //Uploading image -end

  //Voice Message
  //Audio recorder
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
  // Voice message -end

  const FirstRoute = () => (
    <Box flex={1} style={{ backgroundColor: "white" }}>
      <HStack flex={1}>
        <VStack flex={2}>
          <ScrollView>
            <VStack flex={1} padding={5} space={5}>
              <HStack space={1} alignItems={"center"}>
                <Text style={styles.title}>Instructions: </Text>
                <Text>Dummy text</Text>
              </HStack>
              <HStack space={1} alignItems={"center"}>
                <Text style={styles.title}>Satisfactory: </Text>
                <ButtonGroup
                  width={100}
                  buttons={["No", "Yes"]}
                  selectedIndex={selectedButton}
                  onPress={(value) => {
                    setSelectedButton(value);
                  }}
                  selectedButtonStyle={{ backgroundColor: "#377dff" }}
                  textStyle={{ color: "#8a94a6" }}
                  containerStyle={{ borderRadius: 10, marginBottom: 20 }}
                />
              </HStack>
              <HStack space={1} alignItems={"center"}>
                <Text style={styles.title}>Reading: </Text>
                <Box w={300}>
                  <Input
                    bgColor={"coolGray.100"}
                    mx="3"
                    placeholder="Input"
                    w="90%"
                  />
                </Box>
              </HStack>
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
                  {/* <Icon size={40} name="microphone" type="material-community" color="grey" /> */}
                  <VStack>
                    <TouchableOpacity
                      onPress={recording ? stopRecording : startRecording}
                    >
                      {recording ? (
                        <Icon
                          size={40}
                          name="stop"
                          type="material-community"
                          color="grey"
                        />
                      ) : (
                        <Icon
                          size={40}
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
                            size={40}
                            name="play"
                            type="material-community"
                            color="grey"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setAudioPath(undefined)}
                        >
                          <Icon
                            size={40}
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
          </ScrollView>
        </VStack>
        <Box flex={1} padding={5}>
          {pickedImagePath == "" ? (
            <Box
              flex={1}
              style={styles.card}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <TouchableOpacity onPress={openCamera}>
                <VStack space={10} alignItems={"center"}>
                  <Text style={styles.title}>Add Image</Text>
                  <Icon
                    size={100}
                    name="camera"
                    type="material-community"
                    color="grey"
                  />
                </VStack>
              </TouchableOpacity>
            </Box>
          ) : (
            <VStack flex={1} space={2}>
              <Box
                flex={1}
                style={styles.card}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  flex={1}
                  source={{ uri: pickedImagePath }}
                  style={{ width: "100%" }}
                />
              </Box>
              <FAB
                color="#4e5d78"
                bgColor="#4e5d78"
                title={"Retake"}
                onPress={openCamera}
              />
            </VStack>
          )}
        </Box>
      </HStack>
    </Box>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );

  const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />
  );

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
    <VStack space={5} padding={5} flex={1}>
      <HStack
        padding={2}
        alignItems={"center"}
        rounded={10}
        bgColor={"lightgrey"}
      >
        <Button variant={"ghost"} rounded={100}>
          Previous
        </Button>

        <Spacer />
        <Text>Device 1/30</Text>
        <Spacer />
        <Button variant={"ghost"} rounded={100}>
          Next
        </Button>
      </HStack>
      <HStack space={5}>
        <Box padding={5} rounded={10} bgColor={"white"} flex={3}>
          <HStack>
            <VStack flex={2} space={2}>
              <Text>Control Valve</Text>
              <Text>Location:</Text>
              <Text>Room No:</Text>
              <Text>Floor No:</Text>
              <Text>Room No:</Text>
              <Text>Building No:</Text>
            </VStack>
            <Box bgColor={"green.100"} flex={1}></Box>
          </HStack>
        </Box>
        <VStack justifyContent={"center"} space={5} padding={5} flex={1 / 2}>
          <Button rounded={100}>Save</Button>
          <Button rounded={100}>Skip</Button>
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
