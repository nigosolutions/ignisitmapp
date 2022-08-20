import React from "react";
import { Box, HStack, VStack, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

function AssetTaggingPhotoScreen(props) {
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

  return (
    <Box flex={1} padding={10}>
      <VStack space={10} flex={1}>
        <Text style={styles.desc_title}>Work Order #3224</Text>
        <VStack flex={1}>
          <Text style={styles.desc_title}>Add Asset Photo</Text>
          <HStack justifyContent={"space-around"} flex={1}>
            <Box style={styles.card} padding={10} margin={10}>
              {/* <TouchableOpacity onPress={()=>{console.log('Open Camera')}}> */}
              <TouchableOpacity onPress={openCamera}>
                <VStack space={10} alignItems={"center"}>
                  <Text style={styles.title}>Open Camera</Text>
                  <Icon
                    size={200}
                    name="camera"
                    as={MaterialCommunityIcons}
                    color="grey"
                  />
                </VStack>
              </TouchableOpacity>
            </Box>
            <Box style={styles.card} padding={10} margin={10}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Details")}
              >
                <VStack space={10} alignItems={"center"}>
                  <Text style={styles.title}>Upload Image</Text>
                  <Icon
                    size={200}
                    name="upload"
                    as={MaterialCommunityIcons}
                    color="grey"
                  />
                </VStack>
              </TouchableOpacity>
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

var styles = StyleSheet.create({
  title: {
    color: "black",
    fontWeight: "500",
    fontSize: 20,
  },
  desc_title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 20,
  },
  subtext: {
    color: "#99879D",
    fontWeight: "normal",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    height: 350,
  },
});

export default AssetTaggingPhotoScreen;
