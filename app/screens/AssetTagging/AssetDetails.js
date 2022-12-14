import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
  Image,
  Modal,
  Icon,
  KeyboardAvoidingView,
} from "native-base";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";
import Select2 from "react-select2-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import S3 from "react-aws-s3";
import S3 from "aws-sdk";
import {
  REACT_APP_ACCESS_ID,
  REACT_APP_ACCESS_KEY,
  REACT_APP_BUCKET_NAME,
  REACT_APP_REGION,
} from "@env";
// import * as fs from 'react-native-fs';
// import * as fs from 'expo-file-system';
// import fs from 'react-native-fs';
// import Base64Binary from 'base64-arraybuffer';

import { RNS3 } from "react-native-aws3";

function AssetDetails(props) {
  const [formData, setData] = React.useState({
    device: "",
    device_id: "",
    system: "",
    system_id: "",
    mfr_name: "",
    mfr_pn: "",
    specification: "",
    drawing_no: "",
    floor_no: "",
    room_no: "",
    asset_tag: "",
  });

  const [devTypes, setDevTypes] = React.useState([]);
  const [selectdev, setselectDev] = React.useState();
  const [systems, setSystems] = React.useState([]);
  const [selectsys, setselectSystems] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  // const [assTag, setAssTag] = React.useState();
  // const { navigation } = props
  // const imagepath = navigation.getParam('imagepath',"../../assets/logo.png")
  // const { imagepath, WoID, wo } = props.route.params;
  const { WoID, wo } = props.route.params;
  // console.log(WoID)

  //Base url to save images
  const s3Url = "https://ignis-building-docs.s3.amazonaws.com";

  const [pickedImagePath, setPickedImagePath] = React.useState("");
  // const img = require('../../assets/logo.png');
  const [filePath, setFilePath] = React.useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = React.useState("");
  const [imageLocation, setImageLocation] = React.useState("");
  const [isLoadingSubmit, setLoadingSubmit] = React.useState(false);

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
      setFilePath(result);
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
      setFilePath(result);
      console.log(result.uri);
    }
  };

  const validate = () => {
    console.log(formData);
    var ret = true;
    Object.entries(formData).map(([k, v]) => {
      // console.log(k)
      // console.log(v)
      if (v == "") {
        // console.log(k);
        // return true;
        ret = false;
      }
    });
    return ret;
  };

  const getDeviceData = async () => {
    console.log(selectsys[0]);
    await axios({
      method: "get",
      url: `https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/devices?id=${selectsys[0]}`,
    })
      .then((res) => {
        // console.log(res.data.message);
        setDevTypes(res.data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getSystemData = async () => {
    await axios({
      method: "get",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/systems",
    })
      .then((res) => {
        // console.log(res.data.message);
        setSystems(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = async () => {
    console.log(formData);

    await axios({
      method: "post",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
      data: {
        formData: formData,
        otherData: {
          image: imageLocation,
          building_id: wo.building_id,
          wo_id: wo.wo_id,
        },
      },
    })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const generateTag = async () => {
    let ID = 1;
    setLoading(true);
    await axios({
      method: "get",
      url: `https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets`,
      params: { type: "AssetID" },
    })
      .then((res) => {
        // console.log(res.data.message);
        ID = parseInt(res.data.message.asset_id) + ID;
        let tag = ID.toString();
        tag = wo.building_id.toString() + tag;
        tag = "AS".concat(tag);
        setData({ ...formData, asset_tag: tag });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });

    // let tag = Math.floor(Math.random() * 1000);
    // tag = tag.toString();
    // tag = "AS".concat(tag);

    // //Updating formData with tag value
    // // setAssTag(tag);
    // setData({ ...formData, asset_tag: tag });

    //Adding asset tag and imagepath to formData
    // let temp = {assetTag: tag,image: imagepath}
    // console.log(temp)
    // setData({...formData,...temp});
    // console.log(formData);
  };

  //   const uploadImageOnS3 = async (file) => {
  //     const s3bucket = new S3({
  //       accessKeyId: REACT_APP_ACCESS_ID,
  //       secretAccessKey: REACT_APP_ACCESS_KEY,
  //       Bucket: REACT_APP_BUCKET_NAME,
  //       signatureVersion: 'v4',
  //     });
  //     let contentType = 'image/jpeg';
  //     let contentDeposition = 'inline;filename="' + file.name + '"';
  //     const base64 = await fs.readFile(file.uri, 'base64');
  //     const arrayBuffer = Base64Binary.decode(base64);
  //     s3bucket.createBucket(() => {
  //       const params = {
  //         Bucket: REACT_APP_BUCKET_NAME,
  //         Key: file.name,
  //         Body: arrayBuffer,
  //         ContentDisposition: contentDeposition,
  //         ContentType: contentType,
  //     };
  //     s3bucket.upload(params, (err, data) => {
  //       if (err) {
  //         console.log('error in callback');
  //       }
  //     console.log('success');
  //     console.log("Respomse URL : "+ data.Location);
  //     });
  //   });
  //  };

  const uploadFile = () => {
    setLoadingSubmit(true);
    let dirName = formData.asset_tag;
    dirName = dirName + "/";
    let time = new Date().toJSON().slice(0, 16);
    time = time.replace(":", "");
    let filename = formData.asset_tag.concat("-", time);
    console.log(dirName);
    console.log(filename);

    if (Object.keys(filePath).length == 0) {
      alert("Please select image first");
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.uri,
        name: filename,
        type: "image/jpeg",
      },
      {
        keyPrefix: dirName, // Ex. myuploads/
        bucket: "ignis-building-docs", // Ex. aboutreact
        region: "us-east-1", // Ex. ap-south-1
        accessKey: "AKIA22XEQOCAMOW65Y6R",
        // Ex. AKIH73GS7S7C53M46OQ
        secretKey: "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",
        // Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
        successActionStatus: 201,
      }
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`
        )
      )
      .then((response) => {
        if (response.status !== 201) alert("Failed to upload image to S3");
        console.log(response.body);
        setFilePath("");
        setImageLocation(response.body.postResponse.location);
        setLoadingSubmit(false);

        //Display asset tag QR code
        setShowModal(true);

        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      });
  };

  const submit = async () => {
    // console.log(validate())
    if (validate() == true) {
      console.log("All filled");

      //Generating asset tag
      // generateTag();
      // console.log(tag);
      // console.log(assTag);

      if (pickedImagePath == "") {
        alert("Take asset photo or upload image");
      } else {
        uploadFile();
        // //Display asset tag QR code
        // setShowModal(true);
      }
    } else {
      // console.log('Fill all values')
      alert("Fill all required values");
    }

    // await uploadImageOnS3(file);

    // let dirName = formData.asset_tag;
    // const config = {
    //   bucketName: REACT_APP_BUCKET_NAME,
    //   region: REACT_APP_REGION,
    //   accessKeyId: REACT_APP_ACCESS_ID,
    //   secretAccessKey: REACT_APP_ACCESS_KEY,
    //   s3Url,
    //   dirName,
    // };
    // let time = new Date().toJSON().slice(0, 16);
    // let filename = formData.asset_tag.concat("-", ".jpg");
    // console.log(dirName);
    // console.log(filename);
    // console.log(config);
    // const ReactS3Client = new S3(config);
    // try {
    //   let data = await ReactS3Client.uploadFile(pickedImagePath, filename);
    //   console.log(data);
    //   if (data.status === 204) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //     // fail = true;
    //   }
    // } catch (err) {
    //   console.log(err);
    //   // fail = true;
    // }
  };

  React.useEffect(async () => {
    getSystemData();
  }, []);

  React.useEffect(async () => {
    getDeviceData(selectsys);
    setData({ ...formData, device: "", device_id: "" });
  }, [selectsys]);

  return (
    <Box padding={5} flex={1}>
      {/* <Box rounded={10} padding={10} bgColor={"white"} flex={1}> */}
      <VStack rounded={10} padding={5} space={2} bgColor={"white"} flex={1}>
        <HStack space={10} padding={5} flex={1}>
          <Box flex={2}>
            <Text bold fontSize="xl" mb="4">
              Asset Details
            </Text>
            <KeyboardAvoidingView>
              <ScrollView w="100%">
                <FormControl isRequired>
                  <FormControl.Label>System</FormControl.Label>
                  <Select2
                    value={selectsys}
                    colorTheme={"black"}
                    isSelectSingle
                    style={{ borderRadius: 5 }}
                    popupTitle="Select item"
                    title="Select item"
                    data={systems}
                    onSelect={(data, value) => {
                      // console.log(data.length);
                      if (data.length != 0) {
                        setselectSystems(data);
                        // console.log(data);
                        setData({
                          ...formData,
                          system: value[0].name,
                          system_id: value[0].id,
                        });
                        // setData({ ...formData, system: value[0].name });
                      }
                    }}
                    onRemoveItem={(data) => {
                      setselectSystems(data);
                    }}
                  />
                  <FormControl.Label>Device</FormControl.Label>
                  <Select2
                    value={selectdev}
                    colorTheme={"black"}
                    isSelectSingle
                    style={{ borderRadius: 5 }}
                    popupTitle="Select item"
                    title="Select item"
                    data={devTypes}
                    onSelect={(data, value) => {
                      if (data.length != 0) {
                        setselectDev(data);
                        // console.log(value);
                        setData({
                          ...formData,
                          device: value[0].name,
                          device_id: value[0].id,
                        });
                        // setData({ ...formData, device_id: value[0].id });
                      }
                    }}
                    onRemoveItem={(data) => {
                      setselectDev(data);
                    }}
                  />

                  <FormControl.Label>Manufacturer Name</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the manufacturer name"
                    onChangeText={(value) =>
                      setData({ ...formData, mfr_name: value })
                    }
                  />
                  <FormControl.Label>Manufacturer P/N</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the manufacturer P/N"
                    onChangeText={(value) =>
                      setData({ ...formData, mfr_pn: value })
                    }
                  />
                  <FormControl.Label>Specification</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the specification"
                    onChangeText={(value) =>
                      setData({ ...formData, specification: value })
                    }
                  />
                  <FormControl.Label>Drawing No.</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the drawing no."
                    onChangeText={(value) =>
                      setData({ ...formData, drawing_no: value })
                    }
                  />
                  <FormControl.Label>Floor No.</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the floor no."
                    onChangeText={(value) =>
                      setData({ ...formData, floor_no: value })
                    }
                  />
                  <FormControl.Label>Room No.</FormControl.Label>
                  <Input
                    size={"lg"}
                    minH={10}
                    mb={2}
                    placeholder="Enter the room no."
                    onChangeText={(value) =>
                      setData({ ...formData, room_no: value })
                    }
                  />
                  <FormControl.Label>Tag</FormControl.Label>
                  <HStack alignItems={"center"} flex={1} space={2}>
                    <Input
                      size={"lg"}
                      minH={10}
                      value={formData.asset_tag}
                      flex={2}
                      placeholder="Enter tag no. or generate new"
                      onChangeText={(value) =>
                        setData({ ...formData, asset_tag: value })
                      }
                    />
                    <Button
                      colorScheme={"lightBlue"}
                      flex={1}
                      onPress={generateTag}
                      isLoading={isLoading}
                      isLoadingText="Generating"
                    >
                      Generate Tag
                    </Button>
                  </HStack>
                </FormControl>
              </ScrollView>
            </KeyboardAvoidingView>
            {/* <Button.Group alignSelf={"center"}>
              <Button colorScheme={"coolGray"}>Cancel</Button>
              <Button>Submit</Button>
            </Button.Group> */}
          </Box>
          <Divider orientation="vertical" />
          <VStack flex={2} space={2} alignItems={"center"} paddingTop={10}>
            {/* <Box borderWidth={2} borderColor={"black"}>
              <Text>Hello</Text>
              <Image alt="Device image" source={require("../../assets/logo.png")}/>
            </Box> */}
            {/* <Image
              alt="Device image"
              // source={{ uri: imagepath }}
              source={img}
              borderWidth={2}
              borderColor={"black"}
              flex={1}
              style={{ width: "100%", maxHeight: 400 }}
            /> */}
            {/* <Box alignItems={"center"} flex={1}> */}
            {pickedImagePath == "" ? (
              <Box style={styles.card} margin={10}>
                <VStack flex={1} space={5} padding={5}>
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
                    <TouchableOpacity onPress={showImagePicker}>
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
              <VStack
                flex={1}
                space={2}
                alignItems={"center"}
                w="100%"
                margin={5}
              >
                <Box
                  style={styles.card}
                  justifyContent={"center"}
                  w="100%"
                  padding={2}
                >
                  <Image
                    flex={1}
                    source={{ uri: pickedImagePath }}
                    style={{ width: "100%" }}
                    borderWidth={2}
                    borderColor={"black"}
                    alt={"Device Image"}
                    resizeMode={"stretch"}
                  />
                </Box>
                <Button.Group alignItems="center">
                  <Button
                    onPress={() => {
                      console.log(pickedImagePath);
                      setPickedImagePath("");
                    }}
                  >
                    Change Photo
                  </Button>
                </Button.Group>
              </VStack>
            )}
            {/* </Box> */}
          </VStack>
        </HStack>
        <Button.Group alignSelf={"center"}>
          <Button
            colorScheme={"coolGray"}
            onPress={() =>
              props.navigation.navigate("ATHome", { WoID: WoID, wo: wo })
            }
          >
            Cancel
          </Button>
          {/* <Button onPress={()=>{console.log(formData)}}>Submit</Button> */}
          <Button colorScheme={"lightBlue"} isLoading={isLoadingSubmit}
                      isLoadingText="Submitting" onPress={submit}>
            Submit
          </Button>
        </Button.Group>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="300px">
            {/* <Modal.CloseButton /> */}
            <Modal.Header alignItems={"center"}>Asset Tag QR Code</Modal.Header>
            <Modal.Footer>
              <VStack flex={1} alignItems={"center"} space={5}>
                <QRCode
                  value={
                    formData.asset_tag == "" ? "NoTagGiven" : formData.asset_tag
                  }
                />
                <Text>{formData.asset_tag}</Text>
                <Button
                  style={{ backgroundColor: "grey" }}
                  onPress={() => {
                    // onFinish();
                    // setShowModal(false);
                  }}
                >
                  PRINT TAG
                </Button>
                <Button
                  style={{ backgroundColor: "black" }}
                  onPress={() => {
                    onFinish();
                    setShowModal(false);
                    props.navigation.navigate("ATHome", {
                      WoID: WoID,
                      wo: wo,
                    });
                  }}
                >
                  CONTINUE
                </Button>
              </VStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        {/* </Box> */}
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

export default AssetDetails;
