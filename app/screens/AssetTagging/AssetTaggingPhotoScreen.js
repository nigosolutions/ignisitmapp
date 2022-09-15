import React from "react";
import { Box, HStack, VStack, Text, Icon, Image, Button} from "native-base";
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

  const { WoID } = props.route.params;
  // console.log(props.route.params);

  return (
    <Box flex={1} padding={10}>
      <VStack space={10} flex={1}>
        <Text style={styles.desc_title}>Work Order {WoID}</Text>
        <VStack flex={1}>
          <Text style={styles.desc_title}>Add Asset Photo</Text>
          {/* <HStack justifyContent={"space-around"} flex={1}>
            <Box style={styles.card} padding={10} margin={10}>
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
          </HStack> */}
          <Box alignItems={'center'} flex={1}>
            {pickedImagePath == "" ? (
            <Box style={styles.card} margin={10}>
              <VStack  flex={1} space={5} padding={5}>
                <Box style={styles.card} shadow={1} padding={10}>
                  <TouchableOpacity onPress={openCamera}>
                    <HStack space={5} alignItems={"center"}>
                      <Icon
                        size={50}
                        name="camera"
                        as={MaterialCommunityIcons}
                        color="grey"
                      />
                      <Text style={styles.title}>Open Camera</Text>
                    </HStack>
                  </TouchableOpacity>
                </Box>
                <Box style={styles.card} shadow={1} padding={10}>
                  <TouchableOpacity
                    onPress={showImagePicker}
                  >
                    <HStack space={5} alignItems={"center"}>
                      <Icon
                        size={50}
                        name="upload"
                        as={MaterialCommunityIcons}
                        color="grey"
                      />
                      <Text style={styles.title}>Upload Image</Text>
                    </HStack>
                  </TouchableOpacity>
                </Box>
              </VStack>
            </Box>
            ) : (
              <VStack flex={1} space={2} alignItems={"center"} w="100%" margin={5}>
                <Box style={styles.card} justifyContent={"center"} w="100%" padding={2}>
                  <Image
                    flex={1}
                    source={{ uri: pickedImagePath }}
                    style={{ width: "100%" }}
                    alt={'Device Image'}
                  />
                </Box>
               <Button.Group alignItems="center">
                   <Button onPress={() => {setPickedImagePath("")}}>Change Photo</Button>
                   <Button onPress={() => props.navigation.navigate("DetailScreen",{imagepath:pickedImagePath, WoID:WoID})}>Continue</Button>
                </Button.Group>
              </VStack> 
            )}
          </Box>
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
    justifyContent: "center",
    maxHeight: 400,
    maxWidth: 400,
  },
});

export default AssetTaggingPhotoScreen;
