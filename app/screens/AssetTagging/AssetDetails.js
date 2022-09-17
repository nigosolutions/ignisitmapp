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
  Modal
} from "native-base";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";


function AssetDetails(props) {

  const [formData, setData] = React.useState({device:"",system:"",mfname:"",mfptno:"",spec:"",drawno:"",floorno:"",roomno:""});
  // const [devTypes, setDevTypes] = React.useState(["Dev1", "Dev2", "Dev3", "Dev4"])
  // const [systems, setSystems] = React.useState(["Sys1", "Sys2", "Sys3", "Sys4"])
  const [devTypes, setDevTypes] = React.useState([]);
  const [systems, setSystems] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [assTag, setAssTag] = React.useState();
  // const { navigation } = props
  // const imagepath = navigation.getParam('imagepath',"../../assets/logo.png")
  const {imagepath, WoID} = props.route.params;
  // console.log(WoID)
 

  const validate = () => {
    // console.log(formData)
    var ret = true;
    Object.entries(formData).map(([k,v]) => {
      // console.log(k)
      // console.log(v)
      if (v == "") {
        // console.log(k);
        // return true;
        ret = false;
      }
      }
    )
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


    // let data = {"formData":formData,"assetTag":assTag,"image":imagepath};
    // await axios
    // .push("https://d40a1684-b76e-4d52-b202-bbe21e245ba9.mock.pstmn.io/addAsset", {data: {formData:"Checking"}})
    // .then((res) => {
    //   // console.log(res.data.systems);
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    await axios({
      method: 'post',
      url: "https://d40a1684-b76e-4d52-b202-bbe21e245ba9.mock.pstmn.io/addAsset",
      data: {
        formData: 'formdata',
        assetTag: 'assettag',
        image: 'image'
      }
    })
    .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err);
      });

	};

  

  const generateTag = () => {
    return Math.floor(Math.random() * 1000) 
  }
  

  const submit = async () => {
    // console.log(validate())
    if (validate() == true) {
      console.log('All filled');
      let tag = generateTag();
      // console.log(tag);
      setAssTag(tag.toString());
      await onFinish();
      setShowModal(true);
    }
    else {
      // console.log('Fill all values')
      alert('Fill all required values')
    }
  };

  React.useEffect(async () => {
    getDeviceData();
  },[]);

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
                <Select mb={2} placeholder="Select the Device" onValueChange={value => setData({...formData,device: value})}>
                
                  {devTypes.map((item)=>(
                    <Select.Item label={item} value={item} />
                  ))}
                </Select>
                <FormControl.Label>System</FormControl.Label>
                <Select mb={2} placeholder="Select the System" onValueChange={value => setData({...formData,system: value})}>
                 
                  {systems.map((item)=>(
                    <Select.Item label={item} value={item} />
                  ))}
                </Select>

                <FormControl.Label>Manufacturer Name</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer name" onChangeText={value => setData({...formData,mfname: value})}/>
                <FormControl.Label>Manufacturer P/N</FormControl.Label>
                <Input mb={2} placeholder="Enter the manufacturer P/N" onChangeText={value => setData({...formData,mfptno: value})}/>
                <FormControl.Label>Specification</FormControl.Label>
                <Input mb={2} placeholder="Enter the specification" onChangeText={value => setData({...formData,spec: value})}/>
                <FormControl.Label>Drawing No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the drawing no." onChangeText={value => setData({...formData,drawno: value})}/>
                <FormControl.Label>Floor No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the floor no." onChangeText={value => setData({...formData,floorno: value})}/>
                <FormControl.Label>Room No.</FormControl.Label>
                <Input mb={2} placeholder="Enter the room no." onChangeText={value => setData({...formData,roomno: value})}/>
              </FormControl>
            </ScrollView>
            {/* <Button.Group alignSelf={"center"}>
              <Button colorScheme={"coolGray"}>Cancel</Button>
              <Button>Submit</Button>
            </Button.Group> */}
          </Box>
          <Divider orientation="vertical" />
          <VStack flex={2} space={2} alignItems={'center'} paddingTop={10}>
            {/* <Box borderWidth={2} borderColor={"black"}>
              <Text>Hello</Text>
              <Image alt="Device image" source={require("../../assets/logo.png")}/>
            </Box> */}
            <Image alt="Device image" source={{uri:imagepath}} borderWidth={2} borderColor={"black"} flex={1} style={{ width: "100%" , maxHeight: 400}}/>

            {/* <QRCode value="Device100"/> */}
            {/* <Button maxW={200}>Change image</Button> */}
          </VStack>
        </HStack>
        <Button.Group alignSelf={"center"}>
          <Button colorScheme={"coolGray"} onPress={()=>props.navigation.navigate("ATHome",{WoID:WoID})}>Cancel</Button>
          {/* <Button onPress={()=>{console.log(formData)}}>Submit</Button> */}
          <Button onPress={submit}>Submit</Button>
        </Button.Group>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="300px">
            <Modal.CloseButton />
            <Modal.Header alignItems={"center"}>Asset Tag Generated</Modal.Header>
            <Modal.Footer>
              <VStack flex={1} alignItems={'center'} space={5}>
                <QRCode value={assTag}/>
                <Text>{assTag}</Text>
                <Button style={{backgroundColor:'grey'}} onPress={() => {
                setShowModal(false);
                props.navigation.navigate("ATHome",{WoID:WoID});
              }}>
                  PRINT TAG
                </Button>
                <Button style={{backgroundColor:'black'}} onPress={() => {
                setShowModal(false);
                props.navigation.navigate("ATHome",{WoID:WoID});
              }}>
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
