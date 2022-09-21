import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Input,
  ScrollView,
  SectionList,
  Select,
  Stack,
  Text,
  VStack,
  Image,
  Modal,
} from "native-base";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

function AssetDetails(props) {
  const [formData, setData] = React.useState({
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
  // const [devTypes, setDevTypes] = React.useState(["Dev1", "Dev2", "Dev3", "Dev4"])
  // const [systems, setSystems] = React.useState(["Sys1", "Sys2", "Sys3", "Sys4"])
  const [devTypes, setDevTypes] = React.useState([]);
  const [systems, setSystems] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  // const [assTag, setAssTag] = React.useState();
  // const { navigation } = props
  // const imagepath = navigation.getParam('imagepath',"../../assets/logo.png")
  const { imagepath, WoID, wo } = props.route.params;
  // console.log(WoID)

  const validate = () => {
    // console.log(formData)
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
    // setLoading(true);
    // api
    //   .get("/addAsset")
    //   .then((res) => {
    //     setDevTypes(res.data.message.Items.device);
    //     setSystems(res.data.message.Items.system);
    //     console.log(res.data.message.Items);
    //   })
    //   .catch((err) => {
    //     alert("Error in fetching device details!");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
    await axios
      .get("https://d40a1684-b76e-4d52-b202-bbe21e245ba9.mock.pstmn.io/devices")
      .then((res) => {
        // console.log(res.data.systems);
        setDevTypes(res.data.devTypes);
        setSystems(res.data.systems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = async () => {
    // setAALoading(true);
    // console.log("Success:", values);
    // api
    // 	.post("/addAsset", { project: values })
    // 	.then((res) => {
    // 		console.log(res);
    // 		alert("Asset added Successfully!");
    // 	})
    // 	.catch((err) => {
    // 		message.error("Error!");
    // 	})
    // 	.finally(() => {
    // 		setAPLoading(false);
    // 	});

    // console.log(assTag);
    console.log(formData);

    await axios({
      method: "post",
      url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
      data: {
        formData: formData,
        otherData: {
          image: "imagepath",
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

  const generateTag = () => {
    let tag = Math.floor(Math.random() * 1000);
    tag = tag.toString();
    tag = "AS".concat(tag);

    //Updating formData with tag value
    // setAssTag(tag);
    setData({ ...formData, asset_tag: tag });

    //Adding asset tag and imagepath to formData
    // let temp = {assetTag: tag,image: imagepath}
    // console.log(temp)
    // setData({...formData,...temp});
    // console.log(formData);
  };

  const submit = () => {
    // console.log(validate())
    if (validate() == true) {
      console.log("All filled");

      //Generating asset tag
      // generateTag();
      // console.log(tag);
      // console.log(assTag);

      //Display asset tag QR code
      setShowModal(true);
    } else {
      // console.log('Fill all values')
      alert("Fill all required values");
    }
  };

  React.useEffect(async () => {
    getDeviceData();
    // console.log(wo);
  }, []);

  return (
    <Box padding={5} flex={1}>
      {/* <Box rounded={10} padding={10} bgColor={"white"} flex={1}> */}
      <VStack rounded={10} padding={5} space={2} bgColor={"white"} flex={1}>
        <HStack space={10} padding={5} flex={1}>
          <Box flex={2}>
            <Text bold fontSize="xl" mb="4">
              Asset Details
            </Text>
            <ScrollView w="100%">
              <FormControl isRequired>
                <FormControl.Label>Device</FormControl.Label>
                <Select
                  mb={2}
                  placeholder="Select the Device"
                  onValueChange={(value) =>
                    setData({ ...formData, device: value })
                  }
                >
                  {devTypes.map((item) => (
                    <Select.Item label={item} value={item} />
                  ))}
                </Select>
                <FormControl.Label>System</FormControl.Label>
                <Select
                  mb={2}
                  placeholder="Select the System"
                  onValueChange={(value) =>
                    setData({ ...formData, system: value })
                  }
                >
                  {systems.map((item) => (
                    <Select.Item label={item} value={item} />
                  ))}
                </Select>

                <FormControl.Label>Manufacturer Name</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the manufacturer name"
                  onChangeText={(value) =>
                    setData({ ...formData, mfr_name: value })
                  }
                />
                <FormControl.Label>Manufacturer P/N</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the manufacturer P/N"
                  onChangeText={(value) =>
                    setData({ ...formData, mfr_pn: value })
                  }
                />
                <FormControl.Label>Specification</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the specification"
                  onChangeText={(value) =>
                    setData({ ...formData, specification: value })
                  }
                />
                <FormControl.Label>Drawing No.</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the drawing no."
                  onChangeText={(value) =>
                    setData({ ...formData, drawing_no: value })
                  }
                />
                <FormControl.Label>Floor No.</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the floor no."
                  onChangeText={(value) =>
                    setData({ ...formData, floor_no: value })
                  }
                />
                <FormControl.Label>Room No.</FormControl.Label>
                <Input
                  mb={2}
                  placeholder="Enter the room no."
                  onChangeText={(value) =>
                    setData({ ...formData, room_no: value })
                  }
                />
                <FormControl.Label>Tag</FormControl.Label>
                <HStack alignItems={"center"} flex={1} space={2}>
                  <Input
                    value={formData.asset_tag}
                    flex={2}
                    placeholder="Enter tag no. or generate new"
                    onChangeText={(value) =>
                      setData({ ...formData, asset_tag: value })
                    }
                  />
                  <Button size={"sm"} flex={1} onPress={generateTag}>
                    Generate
                  </Button>
                </HStack>
              </FormControl>
            </ScrollView>
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
            <Image
              alt="Device image"
              source={{ uri: imagepath }}
              borderWidth={2}
              borderColor={"black"}
              flex={1}
              style={{ width: "100%", maxHeight: 400 }}
            />

            {/* <QRCode value="Device100"/> */}
            {/* <Button maxW={200}>Change image</Button> */}
          </VStack>
        </HStack>
        <Button.Group alignSelf={"center"}>
          <Button
            colorScheme={"coolGray"}
            onPress={() => props.navigation.navigate("ATHome", { WoID: WoID })}
          >
            Cancel
          </Button>
          {/* <Button onPress={()=>{console.log(formData)}}>Submit</Button> */}
          <Button onPress={submit}>Submit</Button>
        </Button.Group>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="300px">
            <Modal.CloseButton />
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
                    onFinish();
                    setShowModal(false);
                  }}
                >
                  PRINT TAG
                </Button>
                <Button
                  style={{ backgroundColor: "black" }}
                  onPress={() => {
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

export default AssetDetails;
