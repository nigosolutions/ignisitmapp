import { FAB, Icon, ListItem, SearchBar } from "@rneui/themed";
import {
  Box,
  Button,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
  FlatList,
  Spacer,
  Center,
  Spinner,
} from "native-base";
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import axios from "axios";
import { set } from "react-native-reanimated";
// import { TouchableOpacity } from "react-native-gesture-handler";

var styles = StyleSheet.create({
  title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 15,
  },
  desc_title: {
    color: "#4e5d78",
    fontWeight: "bold",
    fontSize: 20,
  },
  subtext: {
    color: "#8a94a6",
    fontWeight: "bold",
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 0,
    paddingTop: 5,
    color: "#8a94a6",
    fontWeight: "bold",
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey",
  },
  listContainer: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  selectedLC: {
    backgroundColor: "#ebf2ff",
    borderRadius: 10,
  },
  DTitle: {
    color: "black",
    fontWeight: "bold",
    // size: 20
  },
});



function WOScreen(props) {
  // const [status, setStatus] = React.useState(0);
  const [selectedWo, setselectedWo] = React.useState(0);
  const [wo, setWO] = React.useState(new Set());
  const [pwo, setPWO] = React.useState([]);
  const [cwo, setCWO] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  // React.useEffect(() => {
  //   setWO([
  //     {
  //       name: "Asset tagging",
  //       type: "Asset Tagging",
  //       id: "AT3224",
  //       details: "Details of Asset tagging",
  //       date: "10 Jan",
  //       building: {
  //         name: "Building 1",
  //         location: { address: "XYZ street", coords: [25.2854, 51.531] },
  //       },
  //       status: "pending",
  //     },
  //     {
  //       name: "Asset tagging",
  //       type: "Asset Tagging",
  //       id: 2,
  //       details: "Details of Asset tagging",
  //       date: "11 Jan",
  //       building: {
  //         name: "Building 2",
  //         location: { address: "XYZ street", coords: [25, 55] },
  //       },
  //       status: "pending",
  //     },
  //     {
  //       name: "Asset tagging",
  //       type: "Asset Tagging",
  //       id: 3,
  //       details: "Details of Asset tagging",
  //       date: "12 Jan",
  //       building: {
  //         name: "Building 3",
  //         location: { address: "XYZ street", coords: [24.9909, 51.5493] },
  //       },
  //       status: "pending",
  //     },
  //     {
  //       name: "ITM Work Order",
  //       type: "ITM",
  //       details: "Details of Asset tagging",
  //       date: "12 Jan",
  //       building: {
  //         name: "Building 3",
  //         location: { address: "XYZ street", coords: [25.1659, 51.5976] },
  //       },
  //       status: "pending",
  //     },
  //     {
  //       name: "ITM Work Order",
  //       type: "ITM",
  //       id: 5,
  //       details: "Details of Asset tagging",
  //       date: "12 Jan",
  //       building: {
  //         name: "Building 3",
  //         location: { address: "XYZ street", coords: [25.1659, 51.5976] },
  //       },
  //       status: "pending",
  //     },
  //   ]);
  // }, []);



  // const pendingWO = [
  //   {
  //     name: "Asset tagging",
  //     type: "Asset Tagging",
  //     id: "AT3224",
  //     details: "Details of Asset tagging",
  //     date: "10 Jan",
  //     building: {
  //       name: "Building 1",
  //       location: { address: "XYZ street", coords: [25.2854, 51.531] },
  //     },
  //     status: "pending",
  //   },
  //   {
  //     name: "Asset tagging",
  //     type: "Asset Tagging",
  //     id: 2,
  //     details: "Details of Asset tagging",
  //     date: "11 Jan",
  //     building: {
  //       name: "Building 2",
  //       location: { address: "XYZ street", coords: [25, 55] },
  //     },
  //     status: "pending",
  //   },
  //   {
  //     name: "Asset tagging",
  //     type: "Asset Tagging",
  //     id: 3,
  //     details: "Details of Asset tagging",
  //     date: "12 Jan",
  //     building: {
  //       name: "Building 3",
  //       location: { address: "XYZ street", coords: [24.9909, 51.5493] },
  //     },
  //     status: "pending",
  //   },
  //   {
  //     name: "ITM Work Order",
  //     type: "ITM",
  //     id: 4,
  //     details: "Details of Asset tagging",
  //     date: "12 Jan",
  //     building: {
  //       name: "Building 3",
  //       location: { address: "XYZ street", coords: [25.1659, 51.5976] },
  //     },
  //     status: "pending",
  //   },
  //   {
  //     name: "ITM Work Order",
  //     type: "ITM",
  //     id: 5,
  //     details: "Details of Asset tagging",
  //     date: "12 Jan",
  //     building: {
  //       name: "Building 3",
  //       location: { address: "XYZ street", coords: [25.1659, 51.5976] },
  //     },
  //     status: "pending",
  //   },
  // ];

  // const completedWO = [
  //   {
  //     name: "Asset tagging",
  //     type: "Asset Tagging",
  //     id: 3,
  //     details: "Details of Asset tagging",
  //     date: "12 Jan",
  //     building: {
  //       name: "Building 3",
  //       location: { address: "XYZ street", coords: [24.9909, 51.5493] },
  //     },
  //     status: "completed",
  //   },
  //   {
  //     name: "Asset tagging",
  //     type: "Asset Tagging",
  //     id: 5,
  //     details: "Details of Asset tagging",
  //     date: "12 Jan",
  //     building: {
  //       name: "Building 3",
  //       location: { address: "XYZ street", coords: [25.1659, 51.5976] },
  //     },
  //     status: "completed",
  //   },
  // ];



  const getWO = async (stat) => {
    // await axios
    // .get("https://d40a1684-b76e-4d52-b202-bbe21e245ba9.mock.pstmn.io/workorders", {params: {status: stat}})
    // .then((res) => {
    //   // console.log(res.data.data);
    //   if (stat == "pending") {
    //     setPWO([...pwo,...res.data.data]);
    //   } else {
    //     setCWO([...cwo,...res.data.data]);
    //   }
    //   // setWO(res.data.data);
    //   // console.log(cwo)
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    setLoading(true);
    await axios
    .get("https://bjiwogsbrc.execute-api.us-east-1.amazonaws.com/Prod/workorders", {params: {status: stat}})
    .then((res) => {
      if (stat == "Pending") {
        setPWO([...pwo,...res.data.message]);
        // setPWO(Set([...pwo,...res.data.message]));
        // setWO(new Set([...wo,...res.data.message]));
      } else {
        setCWO([...cwo,...res.data.message]);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  

  React.useEffect(async () => {
    getWO("Completed");
    getWO("Pending");
    // console.log(wo);
  }, []);

  //Tab
  const FirstRoute = () => (
    <Box flex={1}>
      <SearchBar
        placeholder="Enter Search Text"
        round
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e5e5e5" }}
        lightTheme
      />

      {loading === true ? (<Center flex={1}>
        <Spinner size="lg"/>
      </Center>) : (
      <FlatList
        data={pwo}
        renderItem={({ item }) => {
          const color = item.wo_id === selectedWo.wo_id ? "#ebf2ff" : "#e5e5e5";
          return (
            <Pressable
              onPress={() => {
                setselectedWo(item);
              }}
            >
              <Box
                backgroundColor={color}
                borderRadius={10}
                padding={2}
                margin={2}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack alignItems={"center"}>
                    <Icon
                      size={40}
                      name="pending"
                      type="material"
                      color="grey"
                    />
                    <Text fontSize={10}>{item.status}</Text>
                  </VStack>

                  <VStack justifyContent={"center"}>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      style={styles.title}
                    >
                      {item.type}
                    </Text>
                    <Text
                      _dark={{
                        color: "warmGray.200",
                      }}
                      style={styles.subtext}
                    >
                      {item.full_id}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="center"
                  >
                    {new Date(item.date).toDateString()}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.wo_id}
      />
      )}
      {/* <ScrollView>
        <VStack space={3} padding={3}>
          {wo.map((item) =>
            item.status != "completed" ? (
              <ListItem
                containerStyle={
                  item === selectedWo ? styles.selectedLC : styles.listContainer
                }
                onPress={() => {
                  setselectedWo(item);
                }}
              >
                <VStack alignItems={"center"}>
                  <Icon size={40} name="pending" type="material" color="grey" />
                  <Text fontSize={10}>Pending</Text>
                </VStack>
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleView}>
                    {"WO: "}
                    {item.id}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Text>{item.date}</Text>
              </ListItem>
            ) : null
          )}
        </VStack>
      </ScrollView> */}
    </Box>
  );

  const SecondRoute = () => (
    <Box>
      <SearchBar
        placeholder="Enter Search Text"
        round
        containerStyle={{ backgroundColor: "white" }}
        inputContainerStyle={{ backgroundColor: "#e5e5e5" }}
        lightTheme
      />

      {loading === true ? (<Center flex={1}>
        <Spinner size="lg"/>
      </Center>) : (
      <FlatList
        data={cwo}
        renderItem={({ item }) => {
          const color = item.wo_id === selectedWo.wo_id ? "#ebf2ff" : "#e5e5e5";
          return (
            <Pressable
              onPress={() => {
                setselectedWo(item);
              }}
            >
              <Box
                backgroundColor={color}
                borderRadius={10}
                padding={2}
                margin={2}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack alignItems={"center"}>
                    <Icon size={40} name="done" type="material" color="grey" />
                    <Text fontSize={10}>Completed</Text>
                  </VStack>

                  <VStack justifyContent={"center"}>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      style={styles.title}
                    >
                      {item.type}
                    </Text>
                    <Text
                      _dark={{
                        color: "warmGray.200",
                      }}
                      style={styles.subtext}
                    >
                      {item.full_id}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="center"
                  >
                    {new Date(item.date).toDateString()}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.wo_id}
        // extraData={selectedWo}
      />
      )}
    </Box>
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pending" },
    { key: "second", title: "Completed" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"#4e5d78"}
      indicatorStyle={{ backgroundColor: "#FF7D00" }}
      inactiveColor={"#8a94a6"}
      style={{ backgroundColor: "white" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );
  //Tab End

  return (
    <Box padding={3} bgColor={"#E5E5E5"} flex={1}>
      <Box padding={2} rounded={15} bgColor={"white"} flex={1}>
        <HStack flex={1}>
          <Box
            bgColor={"white"}
            flex={1}
            borderRightWidth={1}
            borderColor={"#e5e5e5"}
          >
            <VStack flex={1}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
              />
            </VStack>
          </Box>
          <Box bgColor={"white"} flex={2}>
            <VStack space={2} padding={2} flex={1}>
              {selectedWo === 0 ? (
                <Box justifyContent={"center"} alignItems={"center"} flex={1}>
                  <Text color={"#4e5d78"} fontSize={20}>
                    Select a Work Order to View Details
                  </Text>
                </Box>
              ) : (
                <>
                  <VStack borderBottomWidth={1} borderColor={"#e5e5e5"}>
                    <Text style={styles.desc_title}>{selectedWo.type}</Text>
                    <Text style={styles.subtext}>WO#: {selectedWo.wo_id}</Text>
                  </VStack>
                  <ScrollView>
                    <Text style={styles.desc_title}>Details:</Text>
                    <Text></Text>
                    <Text>{selectedWo.details}</Text>
                    <Text>{selectedWo.building_name}</Text>
                    <Text></Text>
                    <Text style={styles.desc_title}>Location:</Text>
                    <Text></Text>
                    <Text>{selectedWo.building_area}</Text>
                    <Text></Text>
                    <Box flex={1} alignItems={"center"}>
                      <MapView
                        width={"75%"}
                        height={300}
                        region={{
                          latitude: selectedWo.building_loc[0],
                          longitude: selectedWo.building_loc[1],
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                      >
                        <Marker
                          coordinate={{
                            latitude: selectedWo.building_loc[0],
                            longitude: selectedWo.building_loc[1],
                          }}
                          title={selectedWo.building_name}
                          description={selectedWo.building_area}
                        />
                      </MapView>
                    </Box>
                  </ScrollView>
                  <Box
                    alignItems={"center"}
                    borderTopColor={"#e5e5e5"}
                    borderTopWidth={"1"}
                    paddingTop={3}
                  >
                    <Button
                      colorScheme={"lightBlue"}
                      onPress={() => {
                        // setselectedWo(0);
                        selectedWo.type === "Asset Tagging"
                          ? props.navigation.navigate("AssetTagging", {
                              screen: "ATHome",
                              params: { WoID: selectedWo.wo_id,wo: selectedWo },
                            })
                          : props.navigation.navigate("ITM", {
                            screen: "ITMHome",
                            params: { WoID: selectedWo.wo_id },
                          });
                      }}
                    >
                      {selectedWo.status === "Pending" ? "Continue" : "View"}
                    </Button>
                  </Box>
                </>
              )}
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default WOScreen;
