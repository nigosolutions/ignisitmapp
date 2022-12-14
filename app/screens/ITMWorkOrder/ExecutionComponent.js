import { ButtonGroup, Icon } from "@rneui/themed";
import {
  Box,
  HStack,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
  Image,
  Button
} from "native-base";
import { FAB } from '@rneui/base';
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import axios from "axios";

function ExecutionComponent(props) {
  // const getSystems = async (stat) => {
  //   setLoading(true);
  //   await axios
  //     .get(
  //       "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/workorders",
  //       { params: { status: stat } }
  //     )
  //     .then((res) => {
  //       if (stat == "Pending") {
  //         setPWO(res.data.message);
  //       } else {
  //         setCWO(res.data.message);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const [selectedButton, setSelectedButton] = React.useState();
  const [reading, setReading] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  // Uploading image
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = React.useState("");
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
  return (
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
            <Button>Submit</Button>
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

export default ExecutionComponent;
