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
    Modal
  } from "native-base";
  import React from "react";
  import axios from "axios";
  import Select2 from "react-select2-native";

  
  function ViewAssets(props) {
    // console.log(props.asset);
    const [formData, setData] = React.useState({
      "device": props.asset.device,
      "device_id": props.asset.device_id,
      "system": props.asset.system,
      "system_id": props.asset.system_id,
      "mfr_name": props.asset.mfr_name,
      "mfr_pn": props.asset.mfr_pn,
      "specification": props.asset.specification,
      "drawing_no": props.asset.drawing_no,
      "floor_no": props.asset.floor_no,
      "room_no": props.asset.room_no,
      "asset_tag": props.asset.asset_tag,
    });
    // console.log(formData);
    const [devTypes, setDevTypes] = React.useState([]);
    const [selectdev, setselectDev] = React.useState([{
      "checked": true,
      "id": props.asset.device_id,
      "name": props.asset.device,
    }]);
    const [systems, setSystems] = React.useState([]);
    const [selectsys, setselectSystems] = React.useState([{
      "checked": true,
      "id": props.asset.system_id,
      "name": props.asset.system,
    }]);
    const [isLoading, setLoading] = React.useState(false);
    // const [isDisabled, setIsDisabled] = React.useState(false);
    // const [showModal, setShowModal] = React.useState(false);

    // const { imagepath, WoID, wo } = props.route.params;
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
      // console.log(selectsys[0]);
      await axios({
        method: "get",
        url: `https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/devices?id=${selectsys[0].id}`,
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
      setLoading(true);
      await axios({
        method: "put",
        url: "https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/assets",
        data: {
          formData: formData,
          asset_id: props.asset.asset_id,
        },
      })
        .then((res) => {
          console.log(res.status);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          setLoading(false);
        });
    };
  
  
    const submit = () => {
      // console.log(validate())
      // console.log(formData);
      if (validate() == true) {
        console.log("All filled");
      } else {
        // console.log('Fill all values')
        alert("Fill all required values");
      }
    };
    

    React.useEffect(async () => {
        // setselectDev(props.asset.device);
        // setselectSystems(props.asset.system);
        getSystemData();
      
    }, []);
  
    React.useEffect(async () => {
      if (selectsys.length != 0) {
      getDeviceData(selectsys);
      // setData({ ...formData, device: "", device_id: "" });
      }
    }, [selectsys]);



    React.useEffect(() => {
      setselectSystems([{
        "checked": true,
        "id": props.asset.system_id,
        "name": props.asset.system,
      }]);
      setselectDev([{
        "checked": true,
        "id": props.asset.device_id,
        "name": props.asset.device,
      }]);
      setData({
        "device": props.asset.device,
        "device_id": props.asset.device_id,
        "system": props.asset.system,
        "system_id": props.asset.system_id,
        "mfr_name": props.asset.mfr_name,
        "mfr_pn": props.asset.mfr_pn,
        "specification": props.asset.specification,
        "drawing_no": props.asset.drawing_no,
        "floor_no": props.asset.floor_no,
        "room_no": props.asset.room_no,
        "asset_tag": props.asset.asset_tag,
      });

    }, [props.asset]);


    return (
      <>
        <Modal.Content bgColor={"white"} maxHeight={"75%"} maxWidth={"75%"}>
          <Modal.CloseButton />
          {/* <Modal.Header>Asset </Modal.Header> */}
          <Modal.Body>
            <Box flex={1}>
                {/* <Box rounded={10} padding={10} bgColor={"white"} flex={1}> */}
                <VStack rounded={10}  space={2} bgColor={"white"} flex={1}>
                <HStack space={10} padding={5} flex={1}>
                    <Box flex={2}>
                    <Text bold fontSize="xl" mb="4">
                        Asset Details 
                    </Text>
                    <ScrollView w="100%">
                        <FormControl isRequired>
                        <FormControl.Label>System</FormControl.Label>
                        {props.isDisabled ? (
                            <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.system}
                            value={formData.system}
                        />
                        ):(
                        <Select2
                            // value={formData.system}
                            value={selectsys}
                            colorTheme={"black"}
                            isSelectSingle
                            style={{ borderRadius: 5 }}
                            popupTitle="Select system"
                            title={formData.system}
                            data={systems}
                            onSelect={(data,value) => {
                              // console.log(data.length);
                              if (data.length != 0) {
                              setselectSystems(value);
                              console.log(value);
                              setData({ ...formData, system: value[0].name, system_id: value[0].id, device: "", device_id: "" });
                              }
                            }}
                      
                            onRemoveItem={(data) => {
                            setselectSystems(data);
                            }}
                        />)}
                        <FormControl.Label>Device</FormControl.Label>
                        {props.isDisabled ? (
                            <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.device}
                            value={formData.device}
                        />
                        ):(
                        <Select2
                            value={selectdev}
                            // value={formData.device}
                            colorTheme={"black"}
                            isSelectSingle
                            style={{ borderRadius: 5 }}
                            popupTitle="Select device"
                            title={formData.device}
                            // title="Select device"
                            data={devTypes}
                            onSelect={(data,value) => {
                              if (data.length != 0) {
                              setselectDev(data);
                              console.log(value);
                              console.log(data);
                              setData({ ...formData, device: value[0].name, device_id: value[0].id });
                              }
                            }}
                            onRemoveItem={(data) => {
                            setselectDev(data);
                            }}
                        />)}
        
                        <FormControl.Label>Manufacturer Name</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.mfr_name}
                            value={formData.mfr_name}
                            onChangeText={(value) =>
                            setData({ ...formData, mfr_name: value })
                            }
                        />
                        <FormControl.Label>Manufacturer P/N</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.mfr_pn}
                            value={formData.mfr_pn}
                            onChangeText={(value) =>
                            setData({ ...formData, mfr_pn: value })
                            }
                        />
                        <FormControl.Label>Specification</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.specification}
                            value={formData.specification}
                            onChangeText={(value) =>
                            setData({ ...formData, specification: value })
                            }
                        />
                        <FormControl.Label>Drawing No.</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.drawing_no}
                            value={formData.drawing_no}
                            onChangeText={(value) =>
                            setData({ ...formData, drawing_no: value })
                            }
                        />
                        <FormControl.Label>Floor No.</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.floor_no}
                            value={formData.floor_no}
                            onChangeText={(value) =>
                            setData({ ...formData, floor_no: value })
                            }
                        />
                        <FormControl.Label>Room No.</FormControl.Label>
                        <Input
                            size={"lg"}
                            minH={10}
                            mb={2}
                            isDisabled={props.isDisabled}
                            // placeholder={props.asset.room_no}
                            value={formData.room_no}
                            onChangeText={(value) =>
                            setData({ ...formData, room_no: value })
                            }
                        />
                        <FormControl.Label>Tag</FormControl.Label>
                        <HStack alignItems={"center"} flex={1} space={2}>
                            <Input
                            size={"lg"}
                            minH={10}
                            isDisabled={true}
                            flex={2}
                            // placeholder={props.asset.asset_tag}
                            value={formData.asset_tag}
                            onChangeText={(value) =>
                                setData({ ...formData, asset_tag: value })
                            }
                            />
        
                        </HStack>
                        </FormControl>
                    </ScrollView>

                    </Box>
                    <Divider orientation="vertical" />
                    <VStack flex={2} space={2} alignItems={"center"} paddingTop={10}>
                    {/* <Box borderWidth={2} borderColor={"black"}>
                        <Text>Hello</Text>
                        <Image alt="Device image" source={require("../../assets/logo.png")}/>
                    </Box> */}
                    <Image
                        alt="Device image"
                        // source={{ uri: imagepath }}
                        borderWidth={2}
                        borderColor={"black"}
                        flex={1}
                        style={{ width: "100%", maxHeight: 400 }}
                    />
        
                    </VStack>
                </HStack>
                {props.isDisabled==false &&  
                <Button 
                colorScheme={"lightBlue"} 
                isLoading={isLoading}
                isLoadingText="Submitting" onPress={()=>{
                  submit();
                  onFinish();
                }}>
                    Submit
                </Button>
                }
                
                {/* </Box> */}
                </VStack>
            </Box>
        </Modal.Body>
            {/* <Modal.Footer justifyContent={"center"}>
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
            </Modal.Footer> */}
        </Modal.Content>    
        </>
    );
  }
  
  export default ViewAssets;
  